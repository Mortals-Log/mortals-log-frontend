-- 관리자 계정 관리: "최종 관리자"만 다른 관리자 계정의 권한을 주고 빼고, 비밀번호를 다시 정하고, 계정을 지운다.
--
-- 계정 수정은 원래 service_role 키가 필요한 작업이다. 그 키를 Vercel(서버)에 두지 않으려고
-- 호출자를 DB 에서 직접 확인하는 함수(security definer)로 처리한다. 사이트 코드에는 service_role 이 없다.
--
-- 권한 구분 (모두 auth.users.raw_app_meta_data, 사용자가 직접 바꿀 수 없다)
--   role = 'admin'                 관리자: 콘텐츠를 쓸 수 있다 (public.is_admin())
--   role = 'admin', super = true   최종 관리자: 위에 더해 관리자 계정을 관리할 수 있다
--
-- 최종 관리자는 이 파일을 적용한 뒤 SQL 로 한 번 지정한다 (docs/backend.md 참고):
--   update auth.users
--   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin","super":true}'::jsonb
--   where email = '<최종 관리자 이메일>';
-- 지정한 뒤에는 로그아웃 후 다시 로그인해야 화면에 반영된다.

-- 호출한 사람이 최종 관리자인가. JWT 가 아니라 DB 의 현재 값으로 판단하므로 권한을 뺏으면 바로 효력이 생긴다.
create or replace function public.is_super_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
	select coalesce(
		(
			select u.raw_app_meta_data ->> 'role' = 'admin' and u.raw_app_meta_data ->> 'super' = 'true'
			from auth.users u
			where u.id = (select auth.uid())
		),
		false
	)
$$;

-- 계정 목록 (관리자 권한이 없는 가입자 포함: 권한을 줄 대상을 찾는 데 쓴다)
create or replace function public.admin_list_accounts()
returns table (
	id uuid,
	email text,
	is_admin boolean,
	is_super boolean,
	is_confirmed boolean,
	created_at timestamptz,
	last_sign_in_at timestamptz
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
			coalesce(u.raw_app_meta_data ->> 'role', '') = 'admin',
			coalesce(u.raw_app_meta_data ->> 'super', '') = 'true',
			u.email_confirmed_at is not null,
			u.created_at,
			u.last_sign_in_at
		from auth.users u
		order by
			coalesce(u.raw_app_meta_data ->> 'super', '') = 'true' desc,
			coalesce(u.raw_app_meta_data ->> 'role', '') = 'admin' desc,
			u.created_at;
end;
$$;

-- 관리자 권한을 주거나(make_admin = true) 뺀다.
create or replace function public.admin_set_role(target uuid, make_admin boolean)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
	target_is_super boolean;
begin
	if not public.is_super_admin() then
		raise exception '최종 관리자만 사용할 수 있습니다.' using errcode = '42501';
	end if;
	if target = (select auth.uid()) then
		raise exception '자기 자신의 권한은 바꿀 수 없습니다.';
	end if;

	select coalesce(u.raw_app_meta_data ->> 'super', '') = 'true'
	into target_is_super
	from auth.users u
	where u.id = target;
	if not found then
		raise exception '계정을 찾을 수 없습니다.';
	end if;
	if target_is_super then
		raise exception '최종 관리자의 권한은 바꿀 수 없습니다.';
	end if;

	update auth.users u
	set raw_app_meta_data = case
		when make_admin then coalesce(u.raw_app_meta_data, '{}'::jsonb) || jsonb_build_object('role', 'admin')
		else coalesce(u.raw_app_meta_data, '{}'::jsonb) - 'role'
	end
	where u.id = target;
end;
$$;

-- 계정을 지운다 (로그인 정보·세션도 함께 지워진다). 콘텐츠 행에는 작성자 정보가 없어 영향이 없다.
create or replace function public.admin_delete_account(target uuid)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
	target_is_super boolean;
begin
	if not public.is_super_admin() then
		raise exception '최종 관리자만 사용할 수 있습니다.' using errcode = '42501';
	end if;
	if target = (select auth.uid()) then
		raise exception '자기 자신의 계정은 지울 수 없습니다.';
	end if;

	select coalesce(u.raw_app_meta_data ->> 'super', '') = 'true'
	into target_is_super
	from auth.users u
	where u.id = target;
	if not found then
		raise exception '계정을 찾을 수 없습니다.';
	end if;
	if target_is_super then
		raise exception '최종 관리자의 계정은 지울 수 없습니다.';
	end if;

	delete from auth.users u where u.id = target;
end;
$$;

-- 비밀번호를 새로 정한다 (본인 것이거나 최종 관리자가 아닌 계정). 기존 로그인 세션은 모두 끊는다.
create or replace function public.admin_reset_password(target uuid, new_password text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
	target_is_super boolean;
begin
	if not public.is_super_admin() then
		raise exception '최종 관리자만 사용할 수 있습니다.' using errcode = '42501';
	end if;
	if new_password is null or char_length(new_password) < 8 then
		raise exception '비밀번호는 8자 이상이어야 합니다.';
	end if;

	select coalesce(u.raw_app_meta_data ->> 'super', '') = 'true'
	into target_is_super
	from auth.users u
	where u.id = target;
	if not found then
		raise exception '계정을 찾을 수 없습니다.';
	end if;
	if target_is_super and target <> (select auth.uid()) then
		raise exception '다른 최종 관리자의 비밀번호는 바꿀 수 없습니다.';
	end if;

	update auth.users u
	set encrypted_password = extensions.crypt(new_password, extensions.gen_salt('bf')),
		updated_at = now()
	where u.id = target;

	delete from auth.sessions s where s.user_id = target;
end;
$$;

-- 로그인한 사용자만 호출할 수 있다 (함수 안에서 최종 관리자인지 다시 확인한다).
do $$
declare
	signature text;
begin
	foreach signature in array array[
		'public.is_super_admin()',
		'public.admin_list_accounts()',
		'public.admin_set_role(uuid, boolean)',
		'public.admin_delete_account(uuid)',
		'public.admin_reset_password(uuid, text)'
	]
	loop
		execute format('revoke all on function %s from public, anon', signature);
		execute format('grant execute on function %s to authenticated', signature);
	end loop;
end;
$$;

comment on function public.is_super_admin() is '호출자가 최종 관리자(app_metadata role=admin, super=true)인지. DB 의 현재 값으로 판단한다.';
comment on function public.admin_list_accounts() is '최종 관리자 전용: 모든 계정과 관리자 여부.';
comment on function public.admin_set_role(uuid, boolean) is '최종 관리자 전용: 관리자 권한 부여/해제. 자기 자신과 최종 관리자는 대상이 될 수 없다.';
comment on function public.admin_delete_account(uuid) is '최종 관리자 전용: 계정 삭제. 자기 자신과 최종 관리자는 지울 수 없다.';
comment on function public.admin_reset_password(uuid, text) is '최종 관리자 전용: 비밀번호 재설정(8자 이상) 후 기존 세션 종료.';
