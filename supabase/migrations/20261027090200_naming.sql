-- 이름 정리. 값은 바꾸지 않고 이름만 바꾼다. (설계 근거: docs/backend-schema-review.md 2장)
-- 앱 쪽 영향: src/types/content-row.ts, scripts/seed-rows.ts, src/apis/content/{mappers,fetch-content-rows}.ts 뿐이다.
-- (화면 코드는 매퍼가 만든 도메인 객체를 쓰므로 바뀌지 않는다.)

-- 테이블: events 는 일정 화면의 'EVENT(그 외)'와 혼동된다. 내용은 인터뷰·라디오·잡지 출연이다.
alter table public.events rename to media_appearances;
alter table public.media_appearances rename column type to appearance_type;
alter table public.media_appearances rename column event_date to appeared_on;
alter table public.media_appearances rename column content to title;
alter table public.media_appearances rename column host to source_name; -- 라디오 프로그램 / 매체 / 유튜브 채널
alter table public.media_appearances rename column description_content to description;
alter policy events_public_read on public.media_appearances rename to media_appearances_public_read;
alter policy events_admin_write on public.media_appearances rename to media_appearances_admin_write;
alter index public.events_event_date_content_key rename to media_appearances_appeared_on_title_key;

-- albums
alter table public.albums rename column type to album_type;
alter table public.albums rename column file_name to image_key; -- 커버 이미지 파일명 (slug 아님)
alter table public.albums rename column genre to genres;
alter table public.albums rename column style to styles;
comment on column public.albums.image_key is '커버 이미지 파일명. /images/albums/{album_type}_{발매연도}_{image_key}.webp 로 쓰인다. slug 가 아니며 같은 커버를 쓰는 앨범끼리 중복될 수 있다.';

-- tracks
alter table public.tracks rename column position to track_no; -- position 은 SQL 함수 이름이기도 하다
alter table public.tracks rename column section to side;
alter table public.tracks rename column en_title to title_en;
alter table public.tracks rename column age_limit to is_age_restricted;
alter table public.tracks rename column cd_only to is_cd_only;
alter table public.tracks rename column mv_link to music_video_youtube_id; -- 값이 URL 이 아니라 영상 ID 다
alter table public.tracks rename column lyricist to lyricists;
alter table public.tracks rename column composer to composers;
alter table public.tracks rename column arranger to arrangers;
alter table public.tracks rename column singing to karaoke_numbers;
comment on column public.tracks.id is 'TRK_{album_id}_{track_no 3자리}. album_id 와 track_no 에서 결정되며 CHECK 로 강제한다. 불변.';

-- concerts
alter table public.concerts rename column type to concert_type;
alter table public.concerts rename column content to title;
alter table public.concerts rename column file_name to image_key; -- 포스터 이미지 파일명
alter table public.concerts rename column age_limit to is_age_restricted;
alter table public.concerts rename column line_up to lineup;
alter table public.concerts rename column times to showtimes;
alter index public.concerts_start_date_content_key rename to concerts_start_date_title_key;
comment on column public.concerts.concert_type is '공연 형식: SOLO 단독 / JOIN 합동 / FESTIVAL 페스티벌 / LISTENING 음악감상회. 투어·밴드 여부는 is_tour, is_band_performance.';
