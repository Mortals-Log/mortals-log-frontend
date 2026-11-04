-- 관리자 임시 저장: 작성 중인 폼을 저장해 두고 다른 관리자와 공유한다.
-- 사이트에 나가는 데이터가 아니라 작업 중인 내용이라 콘텐츠 테이블과 분리했다. 관리자만 읽고 쓴다.
--
--   scope    어느 목록의 폼인지 (albums, tracks, track_chords, concerts, media_appearances)
--   target   수정 중인 행의 키 (새로 추가하는 폼이면 null). 같은 행의 임시 저장은 하나만 둔다.
--   payload  폼에 입력한 값 (이미지 파일은 담기지 않는다)
--   revision 저장할 때마다 1 씩 늘어난다. 두 관리자가 동시에 고치면 나중 저장이 충돌로 거절된다.

create table public.admin_drafts (
	id               uuid primary key default gen_random_uuid(),
	scope            text not null check (scope in ('albums', 'tracks', 'track_chords', 'concerts', 'media_appearances')),
	target           text,
	title            text not null,
	payload          jsonb not null,
	revision         integer not null default 1,
	created_by_email text,
	updated_by_email text,
	created_at       timestamptz not null default now(),
	updated_at       timestamptz not null default now()
);

-- 이미 수정 중인 행에는 임시 저장을 하나만 둔다 (여러 복사본이 갈라지지 않게).
create unique index admin_drafts_scope_target_key on public.admin_drafts (scope, target) where target is not null;

create trigger admin_drafts_set_updated_at
	before update on public.admin_drafts
	for each row execute function public.set_updated_at();

alter table public.admin_drafts enable row level security;

-- 정책이 이것뿐이라 anon(비로그인)과 일반 가입자는 읽을 수도 없다.
create policy "admin_drafts: admin write"
	on public.admin_drafts
	for all
	to authenticated
	using ((select public.is_admin()))
	with check ((select public.is_admin()));

comment on table public.admin_drafts is '관리자 임시 저장(공유). 사이트에 나가지 않는다.';
