-- 콘텐츠 테이블: src/const/*.ts 의 정적 데이터를 옮긴 것.
-- 필드는 src/types/{album,track,concert,event,chord}.ts 와 1:1 로 대응한다.

create table public.albums (
	id             text primary key, -- 트랙 id 접두사와 동일: 'LP01', 'EP02', 'SP03', 'LV01', 'VN01'
	type           text not null check (type in ('LP', 'EP', 'SP', 'LV', 'VN')),
	volume         int,
	title          text not null,
	file_name      text, -- 커버 이미지 파일명(/images/albums/<file_name>.webp). 같은 커버를 쓰는 앨범끼리 중복 가능 (EP·바이닐 'tunnel')
	release_date   date not null,
	intro          text,
	genre          text[] not null default '{}',
	style          text[] not null default '{}',
	distributor    text,
	total_duration text,
	agency         text,
	store          jsonb, -- string | { [플랫폼]: url }
	streaming      jsonb  -- { [플랫폼]: url }
);

create table public.tracks (
	id                 text primary key, -- 'TRK_LP01_001'
	album_id           text not null references public.albums (id) on delete cascade,
	position           int not null, -- id 끝 3자리 (수록 순서)
	section            text, -- 'Side A' 처럼 면이 나뉜 앨범만 사용
	title              text not null,
	en_title           text not null,
	version            text,
	age_limit          boolean not null default false,
	is_lead            boolean not null default false,
	cd_only            boolean not null default false,
	duration           text,
	lyrics             text,
	lyricist           text[] not null default '{}',
	composer           text[] not null default '{}',
	arranger           text[] not null default '{}',
	mv_link            text,
	singing            jsonb, -- { tj, ky }
	original_track_ids text[] not null default '{}',
	unique (album_id, position)
);

create table public.track_chords (
	track_id text primary key references public.tracks (id) on delete cascade,
	chords   jsonb not null -- Chord[] ({ chords, tuning, provider, chordModeType })
);

create table public.concerts (
	id                   bigint generated always as identity primary key,
	year                 text not null, -- 원본의 연도 그룹
	type                 text not null check (
		type in ('SOLO', 'JOIN', 'TOUR', 'LISTENING', 'FESTIVAL', 'BAND', 'BAND_TOUR')
	),
	date                 text not null, -- 표시 그대로: '03.09', '09.05 ~ 09.06'
	content              text not null,
	location             text,
	performance_location text,
	seat_type            text check (seat_type in ('스탠딩', '좌석')),
	times                text[], -- null 이면 앱이 '미정' 기본값을 채운다
	performance_dates    text[],
	line_up              text[],
	price                jsonb, -- Price (number | PriceTier[] 가 섞여 있어 jsonb 로 보존)
	file_name            text,
	ticketing            jsonb, -- Ticketing[]
	age_limit            boolean not null default false
);

create table public.events (
	id                  bigint generated always as identity primary key,
	year                text not null,
	type                text not null check (type in ('INTERVIEW', 'RADIO', 'MAGAZINE')),
	date                text not null, -- '03.09'
	content             text not null,
	host                text,
	link                text,
	platform            text,
	quote               text,
	description_content text
);
