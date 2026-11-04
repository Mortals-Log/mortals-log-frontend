-- 관리자 계정 규칙 변경: 본인 계정은 본인이, 계정 추가·삭제는 최종 관리자만 한다.
--
--   - 비밀번호는 본인만 바꾼다 (다른 사람의 비밀번호를 대신 정하는 함수는 없앤다).
--   - 최종 관리자는 관리자 계정을 추가·삭제만 한다 (권한 부여/해제 함수는 없앤다).
--   - 새 관리자는 모두 같은 "초기 비밀번호"로 만들어지고, 첫 로그인에서 반드시 바꿔야 한다.
--     바꾸기 전에는 app_metadata.must_change_password = true 라서 DB 가 관리자로 인정하지 않는다 (is_admin() = false).
--   - 모든 계정은 본인의 비밀번호를 바꾸고, 본인 계정을 탈퇴할 수 있다.
--
-- 초기 비밀번호는 사이트 코드에 두지 않고 admin_settings 에만 둔다. API 로는 읽을 수 없고, 최종 관리자만
-- admin_initial_password() 로 꺼낸다. 값은 docs/backend.md 의 SQL 로 정한다.

create table public.admin_settings (
	key   text primary key,
	value text not null
);

-- 정책을 하나도 만들지 않으므로 anon/authenticated 는 읽을 수도 쓸 수도 없다. security definer 함수만 읽는다.
alter table public.admin_settings enable row level security;
revoke all on public.admin_settings from anon, authenticated;

comment on table public.admin_settings is '관리자 설정값(초기 비밀번호 등). API 로 읽을 수 없다.';

-- 초기 비밀번호를 바꾸기 전의 관리자는 관리자가 아니다.
create or replace function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
	select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
		and coalesce(auth.jwt() -> 'app_metadata' ->> 'must_change_password', '') <> 'true'
$$;

-- 더 이상 쓰지 않는 함수: 다른 사람의 비밀번호·권한을 대신 바꾸는 기능
drop function if exists public.admin_set_role(uuid, boolean);
drop function if exists public.admin_reset_password(uuid, text);
-- 반환 열이 바뀌므로 지우고 다시 만든다.
drop function if exists public.admin_list_accounts();

create function public.admin_initial_password()
returns text
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
	stored_password text;
begin
	if not public.is_super_admin() then
		raise exception '최종 관리자만 사용할 수 있습니다.' using errcode = '42501';
	end if;

	select s.value into stored_password from public.admin_settings s where s.key = 'initial_password';
	if stored_password is null then
		raise exception '초기 비밀번호가 설정되어 있지 않습니다. docs/backend.md 를 참고해 설정하십시오.';
	end if;
	return stored_password;
end;
$$;

-- 관리자 계정 목록 (가입일·마지막 로그인은 돌려주지 않는다)
create function public.admin_list_accounts()
returns table (
	id uuid,
	email text,
	is_super boolean,
	must_change_password boolean,
	is_confirmed boolean
)
language plpgsql
stable
security definer
set search_path = ''
as $$
begin
	if not public.is_super_admin() then
		raise exception '최종 관리자만 사용할 수 있습니다.' using errcode = '42501';
	end if;

	return query
		select
			u.id,
			u.email::text,
			coalesce(u.raw_app_meta_data ->> 'super', '') = 'true',
			coalesce(u.raw_app_meta_data ->> 'must_change_password', '') = 'true',
			u.email_confirmed_at is not null
		from auth.users u
		where coalesce(u.raw_app_meta_data ->> 'role', '') = 'admin'
		order by
			coalesce(u.raw_app_meta_data ->> 'super', '') = 'true' desc,
			u.email;
end;
$$;

-- 가입된 계정을 새 관리자로 만든다. 첫 로그인에서 비밀번호를 바꾸도록 표시한다.
create function public.admin_grant_admin(target_email text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
	target_id uuid;
	target_role text;
begin
	if not public.is_super_admin() then
		raise exception '최종 관리자만 사용할 수 있습니다.' using errcode = '42501';
	end if;

	select u.id, coalesce(u.raw_app_meta_data ->> 'role', '')
	into target_id, target_role
	from auth.users u
	where lower(u.email) = lower(trim(target_email));
	if target_id is null then
		raise exception '가입된 계정을 찾을 수 없습니다.';
	end if;
	if target_role = 'admin' then
		raise exception '이미 관리자인 계정입니다.';
	end if;

	update auth.users u
	set raw_app_meta_data = coalesce(u.raw_app_meta_data, '{}'::jsonb)
		|| jsonb_build_object('role', 'admin', 'must_change_password', true)
	where u.id = target_id;
end;
$$;

-- 본인 비밀번호를 바꾼다. 초기 비밀번호 변경 표시도 함께 지운다. 현재 접속 외의 로그인 세션은 끊는다.
-- 계정을 추가할 때 가입(signUp)에 실어 보낸 user_metadata.initial_password (가입 확인 메일 템플릿이
-- {{ .Data.initial_password }} 로 새 관리자에게 보낸다)도 이때 지워서 계정에 계속 남지 않게 한다.
create function public.admin_change_own_password(new_password text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
	me uuid := (select auth.uid());
	current_hash text;
	stored_initial text;
begin
	if me is null then
		raise exception '로그인이 필요합니다.' using errcode = '42501';
	end if;
	if new_password is null or char_length(new_password) < 8 then
		raise exception '비밀번호는 8자 이상이어야 합니다.';
	end if;

	select u.encrypted_password into current_hash from auth.users u where u.id = me;
	if current_hash is not null and extensions.crypt(new_password, current_hash) = current_hash then
		raise exception '현재 비밀번호와 다른 비밀번호를 입력하십시오.';
	end if;

	select s.value into stored_initial from public.admin_settings s where s.key = 'initial_password';
	if stored_initial is not null and new_password = stored_initial then
		raise exception '초기 비밀번호는 사용할 수 없습니다. 다른 비밀번호를 입력하십시오.';
	end if;

	update auth.users u
	set encrypted_password = extensions.crypt(new_password, extensions.gen_salt('bf')),
		raw_app_meta_data = coalesce(u.raw_app_meta_data, '{}'::jsonb) - 'must_change_password',
		raw_user_meta_data = coalesce(u.raw_user_meta_data, '{}'::jsonb) - 'initial_password',
		updated_at = now()
	where u.id = me;

	delete from auth.sessions s
	where s.user_id = me and s.id is distinct from nullif(auth.jwt() ->> 'session_id', '')::uuid;
end;
$$;

-- 본인 계정을 탈퇴한다. 현재 비밀번호를 다시 확인하고, 마지막 최종 관리자는 탈퇴할 수 없다.
create function public.admin_delete_own_account(current_password text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
	me uuid := (select auth.uid());
	current_hash text;
	is_super boolean;
	other_super_count integer;
begin
	if me is null then
		raise exception '로그인이 필요합니다.' using errcode = '42501';
	end if;

	select u.encrypted_password, coalesce(u.raw_app_meta_data ->> 'super', '') = 'true'
	into current_hash, is_super
	from auth.users u
	where u.id = me;
	if current_hash is null or extensions.crypt(coalesce(current_password, ''), current_hash) <> current_hash then
		raise exception '현재 비밀번호가 올바르지 않습니다.';
	end if;

	if is_super then
		select count(*) into other_super_count
		from auth.users u
		where u.id <> me and coalesce(u.raw_app_meta_data ->> 'super', '') = 'true';
		if other_super_count = 0 then
			raise exception '마지막 최종 관리자는 탈퇴할 수 없습니다. 먼저 다른 최종 관리자를 지정하십시오.';
		end if;
	end if;

	delete from auth.users u where u.id = me;
end;
$$;

-- 로그인한 사용자만 호출할 수 있다 (최종 관리자 전용 함수는 안에서 다시 확인한다).
do $$
declare
	signature text;
begin
	foreach signature in array array[
		'public.admin_initial_password()',
		'public.admin_list_accounts()',
		'public.admin_grant_admin(text)',
		'public.admin_change_own_password(text)',
		'public.admin_delete_own_account(text)'
	]
	loop
		execute format('revoke all on function %s from public, anon', signature);
		execute format('grant execute on function %s to authenticated', signature);
	end loop;
end;
$$;
