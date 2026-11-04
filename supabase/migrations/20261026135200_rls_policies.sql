-- 읽기는 누구나, 쓰기는 관리자만.
--
-- 관리자 판정은 JWT 의 app_metadata.role = 'admin' 으로 한다.
-- app_metadata 는 사용자가 직접 수정할 수 없고(대시보드 / service_role 만 가능),
-- Auth 의 회원가입이 열려 있어도 임의 가입자는 쓰기 권한을 얻지 못한다.
-- ("로그인한 사용자면 허용" 으로 두면 anon key 는 공개값이라 누구나 가입 후 쓸 수 있다.)

create function public.is_admin()
returns boolean
language sql
stable
set search_path = ''
as $$
	select coalesce(auth.jwt() -> 'app_metadata' ->> 'role', '') = 'admin'
$$;

-- 새 콘텐츠 테이블을 추가하면 아래 배열에도 넣는다.
do $$
declare
	target_table text;
begin
	foreach target_table in array array['albums', 'tracks', 'track_chords', 'concerts', 'events']
	loop
		execute format('alter table public.%I enable row level security', target_table);

		execute format(
			'create policy %I on public.%I for select to anon, authenticated using (true)',
			target_table || ': public read',
			target_table
		);

		execute format(
			'create policy %I on public.%I for all to authenticated using ((select public.is_admin())) with check ((select public.is_admin()))',
			target_table || ': admin write',
			target_table
		);
	end loop;
end
$$;
