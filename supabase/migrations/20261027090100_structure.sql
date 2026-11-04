-- 구조 개선: 순서 있는 링크 테이블, 원곡 FK, 실제 날짜 타입, 공연 유형 분리, 게시 여부, 이미지 경로.
-- 이전 마이그레이션 적용 후 실행한다. json 컬럼의 키 순서를 sort_order 로 옮기므로 json(20261026160000 이후) 상태의 데이터에서 백필한다.
-- 데이터는 이 파일 안에서 변환되므로 재시드가 필요 없다. (설계 근거: docs/backend-schema-review.md)

-- A. 앨범 링크: store / streaming (json) -> album_links (행 + 순서)
create table public.album_links (
	id         bigint generated always as identity primary key,
	album_id   text not null references public.albums (id) on delete cascade,
	kind       text not null check (kind in ('streaming', 'store')),
	platform   text, -- 화면 아이콘 키 (YouTube, BUGS, LP, CD ...). 단일 구매 링크는 null
	url        text not null check (url ~ '^https?://'),
	sort_order int not null,
	unique (album_id, kind, sort_order)
);

comment on table public.album_links is '앨범의 스트리밍·구매 링크. 화면 표시 순서는 sort_order.';
comment on column public.album_links.platform is '화면의 아이콘을 찾는 키라서 대소문자를 바꾸지 않는다 (YouTube, BUGS, genie ...). 단일 구매 링크는 null.';

insert into public.album_links (album_id, kind, platform, url, sort_order)
select a.id, 'streaming', link.key, link.value, link.ordinal
from public.albums a, json_each_text(a.streaming) with ordinality as link (key, value, ordinal)
where a.streaming is not null;

insert into public.album_links (album_id, kind, platform, url, sort_order)
select a.id, 'store', link.key, link.value, link.ordinal
from public.albums a, json_each_text(a.store) with ordinality as link (key, value, ordinal)
where json_typeof(a.store) = 'object';

insert into public.album_links (album_id, kind, platform, url, sort_order)
select a.id, 'store', null, a.store #>> '{}', 1
from public.albums a
where json_typeof(a.store) = 'string';

alter table public.albums drop column store, drop column streaming;

-- B. 원곡 관계: text[] (FK 불가) -> 접합 테이블
create table public.track_origins (
	track_id          text not null references public.tracks (id) on delete cascade,
	original_track_id text not null references public.tracks (id) on delete restrict, -- 원곡이 참조 중이면 삭제를 막는다
	sort_order        int not null,
	primary key (track_id, original_track_id),
	check (track_id <> original_track_id)
);

comment on table public.track_origins is '라이브·버전 곡의 원곡 관계. 원곡이 참조되는 동안은 삭제할 수 없다.';

insert into public.track_origins (track_id, original_track_id, sort_order)
select t.id, origin.id, origin.ordinal
from public.tracks t, unnest(t.original_track_ids) with ordinality as origin (id, ordinal);

alter table public.tracks drop column original_track_ids;

-- C. 날짜: (year text, date text) -> date 타입. make_date 가 달력에 없는 날짜를 거부하므로 검증도 겸한다.
alter table public.concerts add column start_date date, add column end_date date, add column performance_dates_new date[];

update public.concerts
set start_date = make_date(year::int, split_part(trim(split_part(date, '~', 1)), '.', 1)::int, split_part(trim(split_part(date, '~', 1)), '.', 2)::int),
	end_date = case
		when strpos(date, '~') > 0
			then make_date(year::int, split_part(trim(split_part(date, '~', 2)), '.', 1)::int, split_part(trim(split_part(date, '~', 2)), '.', 2)::int)
	end,
	performance_dates_new = case
		when performance_dates is null then null
		else array(
			select make_date(year::int, split_part(day.value, '.', 1)::int, split_part(day.value, '.', 2)::int)
			from unnest(performance_dates) with ordinality as day (value, ordinal)
			order by day.ordinal
		)
	end;

alter table public.concerts
	alter column start_date set not null,
	add constraint concerts_date_range check (end_date is null or end_date >= start_date),
	drop column performance_dates,
	drop column year,
	drop column date;
alter table public.concerts rename column performance_dates_new to performance_dates;

alter table public.events add column event_date date;
update public.events
set event_date = make_date(year::int, split_part(date, '.', 1)::int, split_part(date, '.', 2)::int);
alter table public.events alter column event_date set not null, drop column year, drop column date;

-- 같은 날 같은 제목이 중복 등록되는 것을 막는다 (현재 데이터에는 중복이 없다)
create unique index concerts_start_date_content_key on public.concerts (start_date, content);
create unique index events_event_date_content_key on public.events (event_date, content);

-- D. 공연 유형 분리: type 하나에 섞여 있던 (형식 / 투어 여부 / 밴드 공연 여부)를 나눈다.
--    기존 TOUR 3건은 출연자가 천진우 1명인 단독 순회, BAND_TOUR 2건은 밴드 5인의 단독 순회라서 형식은 모두 SOLO 로 옮긴다.
alter table public.concerts
	add column is_tour boolean not null default false,
	add column is_band_performance boolean not null default false;

update public.concerts set is_tour = true where type in ('TOUR', 'BAND_TOUR');
update public.concerts set is_band_performance = true where type in ('BAND', 'BAND_TOUR');
update public.concerts set type = 'SOLO' where type in ('TOUR', 'BAND', 'BAND_TOUR');

alter table public.concerts drop constraint concerts_type_check;
alter table public.concerts add constraint concerts_type_check check (type in ('SOLO', 'JOIN', 'FESTIVAL', 'LISTENING'));

comment on column public.concerts.type is '공연 형식: SOLO 단독 / JOIN 합동 / FESTIVAL 페스티벌 / LISTENING 음악감상회. 투어·밴드 여부는 is_tour, is_band_performance.';

-- E. 게시 여부: 관리자가 작성 중인 초안이 빌드·배포 때 공개되지 않도록 한다.
alter table public.albums add column is_published boolean not null default true;
alter table public.concerts add column is_published boolean not null default true;
alter table public.events add column is_published boolean not null default true;

-- F. 이미지: 저장소(Supabase Storage) 경로. 비어 있으면 기존 파일명 규칙을 쓴다. (화면 연결은 관리자 페이지 단계에서)
alter table public.albums add column cover_image_path text;
alter table public.concerts add column poster_image_path text;

-- G. 새 테이블 RLS + 공개 읽기 정책을 "게시된 것만"으로 교체
--    관리자는 admin_write(for all) 정책으로 초안도 읽는다. 곡·링크·원곡·코드는 소속 앨범의 게시 여부를 따른다.
alter table public.album_links enable row level security;
alter table public.track_origins enable row level security;

drop policy albums_public_read on public.albums;
drop policy tracks_public_read on public.tracks;
drop policy track_chords_public_read on public.track_chords;
drop policy concerts_public_read on public.concerts;
drop policy events_public_read on public.events;

create policy albums_public_read on public.albums for select to anon, authenticated
	using (is_published);

create policy tracks_public_read on public.tracks for select to anon, authenticated
	using (exists (select 1 from public.albums a where a.id = tracks.album_id and a.is_published));

create policy track_chords_public_read on public.track_chords for select to anon, authenticated
	using (exists (select 1 from public.tracks t join public.albums a on a.id = t.album_id where t.id = track_chords.track_id and a.is_published));

create policy album_links_public_read on public.album_links for select to anon, authenticated
	using (exists (select 1 from public.albums a where a.id = album_links.album_id and a.is_published));

create policy track_origins_public_read on public.track_origins for select to anon, authenticated
	using (exists (select 1 from public.tracks t join public.albums a on a.id = t.album_id where t.id = track_origins.track_id and a.is_published));

create policy concerts_public_read on public.concerts for select to anon, authenticated
	using (is_published);

create policy events_public_read on public.events for select to anon, authenticated
	using (is_published);

create policy album_links_admin_write on public.album_links for all to authenticated
	using ((select public.is_admin())) with check ((select public.is_admin()));

create policy track_origins_admin_write on public.track_origins for all to authenticated
	using ((select public.is_admin())) with check ((select public.is_admin()));
