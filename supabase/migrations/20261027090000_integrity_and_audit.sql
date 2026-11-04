-- 무결성 제약 + 감사 컬럼 + 정리. 데이터는 바꾸지 않으며 현재 데이터에 그대로 적용된다.
-- (설계 근거: docs/backend-schema-review.md)

-- 1. 생성/수정 시각: 관리자 수정 이력의 최소 단위
create function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
	new.updated_at = now();
	return new;
end
$$;

do $$
declare
	target_table text;
begin
	foreach target_table in array array['albums', 'tracks', 'track_chords', 'concerts', 'events']
	loop
		execute format(
			'alter table public.%I add column created_at timestamptz not null default now(), add column updated_at timestamptz not null default now()',
			target_table
		);
		execute format(
			'create trigger %I before update on public.%I for each row execute function public.set_updated_at()',
			target_table || '_set_updated_at',
			target_table
		);
	end loop;
end
$$;

-- 2. 파생 id 일관성: id 는 (타입 + 번호) / (앨범 + 순서)로 결정되는 값이라 어긋나지 않게 DB 가 막는다.
--    id 는 불변으로 취급한다 (on update cascade 를 두지 않는 이유).
alter table public.albums
	add constraint albums_id_matches_type check (starts_with(id, type)),
	-- volume("N집")은 정규 앨범(LP)에서만 쓴다. 다른 타입의 회차는 id 숫자로 표현한다.
	add constraint albums_volume_only_for_lp check ((type = 'LP') = (volume is not null));

alter table public.tracks
	add constraint tracks_position_positive check (position > 0),
	add constraint tracks_id_matches_album_and_position
		check (id = 'TRK_' || album_id || '_' || lpad(position::text, 3, '0'));

-- 3. 재생시간 형식 ('m:ss')
alter table public.tracks
	add constraint tracks_duration_format check (duration is null or duration ~ '^[0-9]+:[0-5][0-9]$');

alter table public.albums
	add constraint albums_total_duration_format check (total_duration is null or total_duration ~ '^[0-9]+:[0-5][0-9]$');

-- 4. 정책 이름: 공백·콜론 제거 ("albums: public read" -> albums_public_read)
do $$
declare
	target_table text;
begin
	foreach target_table in array array['albums', 'tracks', 'track_chords', 'concerts', 'events']
	loop
		execute format('alter policy %I on public.%I rename to %I', target_table || ': public read', target_table, target_table || '_public_read');
		execute format('alter policy %I on public.%I rename to %I', target_table || ': admin write', target_table, target_table || '_admin_write');
	end loop;
end
$$;

-- 5. 컬럼 설명: 이름만으로 알기 어려운 의미를 DB 에 남긴다 (Supabase 대시보드에 표시됨)
comment on column public.albums.volume is '정규 앨범(LP)의 "N집". LP 에서만 값이 있고 나머지 타입은 null (CHECK 로 강제). 다른 타입의 회차는 id 숫자.';
comment on column public.albums.file_name is '커버 이미지 파일명. /images/albums/{type}_{발매연도}_{file_name}.webp 로 쓰인다. slug 가 아니며 같은 커버를 쓰는 앨범끼리 중복될 수 있다.';
comment on column public.tracks.id is 'TRK_{album_id}_{position 3자리}. album_id 와 position 에서 결정되며 CHECK 로 강제한다. 불변.';
comment on column public.tracks.mv_link is '뮤직비디오 YouTube 영상 ID (11자). URL 이 아니다.';
comment on column public.concerts.times is 'null 이면 화면에 "미정" 으로 표시한다.';
comment on column public.events.link is 'platform 에 따라 YouTube 영상 ID 이거나 URL 이다. (아직 정규화하지 않음)';
