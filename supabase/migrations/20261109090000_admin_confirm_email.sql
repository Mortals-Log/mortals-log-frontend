-- 새 관리자가 초기 비밀번호로 로그인하지 못하던 문제를 고친다.
--
-- 계정 추가는 가입(signUp)으로 하는데, 프로젝트에서 이메일 확인이 켜져 있으면 가입 확인 메일의 링크를 누르기 전까지
-- Supabase 가 로그인을 막는다 ("Email not confirmed"). 기본 메일 발송은 팀 구성원 주소로만 가고 SMTP 를 연결하지 않으면
-- 메일이 도착하지 않으므로, 화면의 초기 비밀번호를 직접 전달해도 로그인할 수 없었다.
--
-- 최종 관리자가 직접 입력한 주소를 관리자로 지정하는 것이므로, 지정할 때 이메일 확인도 함께 끝낸다.
-- 새 관리자는 여전히 첫 로그인에서 비밀번호를 바꾸기 전까지 아무것도 할 수 없다 (must_change_password).

create or replace function public.admin_grant_admin(target_email text)
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
			|| jsonb_build_object('role', 'admin', 'must_change_password', true),
		email_confirmed_at = coalesce(u.email_confirmed_at, now()),
		updated_at = now()
	where u.id = target_id;
end;
$$;

revoke all on function public.admin_grant_admin(text) from public, anon;
grant execute on function public.admin_grant_admin(text) to authenticated;

-- 이미 추가했지만 메일을 확인하지 못해 로그인할 수 없던 관리자도 확인 처리한다.
update auth.users u
set email_confirmed_at = now(),
	updated_at = now()
where coalesce(u.raw_app_meta_data ->> 'role', '') = 'admin'
	and u.email_confirmed_at is null;
