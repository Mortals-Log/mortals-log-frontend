// scripts/seed-rows
// src/const/fixtures 의 정적 데이터를 supabase/migrations 의 테이블 행으로 바꾼다. (DB 접근 없음)

import { FULL_ALBUMS } from '@/const/fixtures/albums';
import { MASTER_CHORDS } from '@/const/fixtures/chords';
import { BAND, FESTIVAL, JOIN_CONCERT, LISTENING, SOLO_CONCERT, TOUR_CONCERT } from '@/const/fixtures/concert';
import { EVENT_INTERVIEW, EVENT_MAGAZINE, EVENT_RADIO } from '@/const/fixtures/event';
import { MASTER_TRACKS } from '@/const/fixtures/tracks';
import type { Album } from '@/types/album';
import type { ConcertItem } from '@/types/concert';
import type {
	AlbumLinkRow,
	AlbumRow,
	ConcertRow,
	ContentRows,
	MediaAppearanceRow,
	TrackChordRow,
	TrackOriginRow,
	TrackRow,
} from '@/types/content-row';

// 'TRK_LP01_001' -> ['LP01', '001'], 'TRK_LP01_*' 같은 와일드카드는 접두사만 검사한다.
const TRACK_ID_PATTERN = /^TRK_([A-Z]{2}\d{2})_(\d{3})$/;
const ALBUM_REFERENCE_PATTERN = /^TRK_([A-Z]{2}\d{2})_/;
const DOTTED_DATE_PATTERN = /^\d{4}\.\d{2}\.\d{2}$/;
const MONTH_DAY_PATTERN = /^(\d{2})\.(\d{2})$/;
const HTTP_URL_PATTERN = /^https?:\/\//;

const getTrackReferences = (album: Album): string[] => {
	if (!album.tracks) return [];
	return Array.isArray(album.tracks) ? album.tracks : Object.values(album.tracks).flat();
};

// 앨범에는 id 가 없어서, 수록곡 id 접두사(TRK_LP01_*)에서 'LP01' 을 가져와 id 로 쓴다.
const getAlbumId = (album: Album): string => {
	const [firstReference] = getTrackReferences(album);
	const match = firstReference?.match(ALBUM_REFERENCE_PATTERN);

	if (!match) throw new Error(`앨범 id 를 만들 수 없습니다 (tracks 참조 없음): ${album.title}`);
	return match[1];
};

const toIsoDate = (dottedDate: string): string => {
	if (!DOTTED_DATE_PATTERN.test(dottedDate)) throw new Error(`날짜 형식이 올바르지 않습니다: ${dottedDate}`);
	return dottedDate.replace(/\./g, '-');
};

// 'MM.DD' + 연도 -> 'YYYY-MM-DD'. 달력에 없는 날짜는 DB 가 아니라 여기서 먼저 막는다.
const toIsoFromMonthDay = (year: string, monthDay: string): string => {
	const match = monthDay.trim().match(MONTH_DAY_PATTERN);
	if (!match) throw new Error(`날짜 형식이 올바르지 않습니다: ${year} ${monthDay}`);

	const [month, day] = [Number(match[1]), Number(match[2])];
	const date = new Date(Date.UTC(Number(year), month - 1, day));
	if (date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
		throw new Error(`달력에 없는 날짜입니다: ${year}.${monthDay}`);
	}

	return `${year}-${match[1]}-${match[2]}`;
};

// '09.05 ~ 09.06' -> 시작일, 종료일
const toDateRange = (year: string, date: string): Pick<ConcertRow, 'start_date' | 'end_date'> => {
	const [start, end] = date.split('~');
	return { start_date: toIsoFromMonthDay(year, start), end_date: end ? toIsoFromMonthDay(year, end) : null };
};

// 'Side A' / 'Side B' 처럼 면이 나뉜 앨범의 트랙 -> 면 이름
const getSideByTrackId = (albums: Album[]): Map<string, string> => {
	const sideByTrackId = new Map<string, string>();

	albums.forEach(album => {
		if (!album.tracks || Array.isArray(album.tracks)) return;

		Object.entries(album.tracks).forEach(([side, trackIds]) => {
			trackIds.forEach(trackId => sideByTrackId.set(trackId, side));
		});
	});

	return sideByTrackId;
};

const buildAlbumRows = (albums: Album[]): AlbumRow[] =>
	albums.map(album => ({
		id: getAlbumId(album),
		album_type: album.type,
		volume: album.volume ?? null,
		title: album.title,
		image_key: album.fileName ?? null,
		release_date: toIsoDate(album.releaseDate),
		intro: album.intro ?? null,
		genres: album.genre ?? [],
		styles: album.style ?? [],
		distributor: album.distributor ?? null,
		total_duration: album.totalDuration ?? null,
		agency: album.agency ?? null,
	}));

// 링크는 객체 키 순서 그대로 sort_order 1, 2, 3 ... 으로 옮긴다. 단일 구매 링크(문자열)는 platform 이 null 이다.
const buildAlbumLinkRows = (albums: Album[]): AlbumLinkRow[] =>
	albums.flatMap(album => {
		const albumId = getAlbumId(album);
		const streamingEntries: [string | null, string][] = Object.entries(album.streaming ?? {});
		const storeEntries: [string | null, string][] =
			typeof album.store === 'string' ? [[null, album.store]] : Object.entries(album.store ?? {});

		return [
			...streamingEntries.map(([platform, url], index) => ({
				album_id: albumId,
				kind: 'streaming' as const,
				platform,
				url,
				sort_order: index + 1,
			})),
			...storeEntries.map(([platform, url], index) => ({
				album_id: albumId,
				kind: 'store' as const,
				platform,
				url,
				sort_order: index + 1,
			})),
		];
	});

const buildTrackRows = (sideByTrackId: Map<string, string>): TrackRow[] =>
	Object.entries(MASTER_TRACKS).map(([key, track]) => {
		const match = track.id.match(TRACK_ID_PATTERN);
		if (!match || key !== track.id) throw new Error(`트랙 id 가 올바르지 않습니다: ${key}`);

		return {
			id: track.id,
			album_id: match[1],
			track_no: Number(match[2]),
			side: sideByTrackId.get(track.id) ?? null,
			title: track.title,
			title_en: track.enTitle,
			version: track.version ?? null,
			is_age_restricted: track.ageLimit ?? false,
			is_lead: track.isLead ?? false,
			is_cd_only: track.cdOnly ?? false,
			duration: track.duration ?? null,
			lyrics: track.lyrics ?? null,
			lyricists: track.lyricist ?? [],
			composers: track.composer ?? [],
			arrangers: track.arranger ?? [],
			music_video_youtube_id: track.mvLink ?? null,
			karaoke_numbers: track.singing ?? null,
		};
	});

const buildTrackOriginRows = (): TrackOriginRow[] =>
	Object.values(MASTER_TRACKS).flatMap(track =>
		(track.originalTrackIds ?? []).map((originalTrackId, index) => ({
			track_id: track.id,
			original_track_id: originalTrackId,
			sort_order: index + 1,
		})),
	);

const buildTrackChordRows = (): TrackChordRow[] =>
	Object.entries(MASTER_CHORDS).map(([trackId, chords]) => ({ track_id: trackId, chords }));

// 원본의 공연 유형 7개를 (형식, 투어 여부, 밴드 공연 여부)로 나눈다.
// TOUR(천진우 단독 순회)와 BAND_TOUR(밴드 5인의 단독 순회)는 형식이 SOLO 다.
const CONCERT_TYPE_PARTS: Record<
	ConcertItem['type'],
	Pick<ConcertRow, 'concert_type' | 'is_tour' | 'is_band_performance'>
> = {
	SOLO: { concert_type: 'SOLO', is_tour: false, is_band_performance: false },
	JOIN: { concert_type: 'JOIN', is_tour: false, is_band_performance: false },
	FESTIVAL: { concert_type: 'FESTIVAL', is_tour: false, is_band_performance: false },
	LISTENING: { concert_type: 'LISTENING', is_tour: false, is_band_performance: false },
	TOUR: { concert_type: 'SOLO', is_tour: true, is_band_performance: false },
	BAND: { concert_type: 'SOLO', is_tour: false, is_band_performance: true },
	BAND_TOUR: { concert_type: 'SOLO', is_tour: true, is_band_performance: true },
};

// FULL_CONCERTS 는 '미정' 기본값을 채워 넣으므로 쓰지 않고, 원본 그룹을 그대로 옮긴다.
const buildConcertRows = (): ConcertRow[] =>
	[...SOLO_CONCERT, ...JOIN_CONCERT, ...TOUR_CONCERT, ...LISTENING, ...FESTIVAL, ...BAND].flatMap(group =>
		group.items.map(item => ({
			...CONCERT_TYPE_PARTS[item.type],
			title: item.content,
			...toDateRange(group.year, item.date),
			location: item.location ?? null,
			performance_location: item.performanceLocation ?? null,
			seat_type: item.seatType ?? null,
			showtimes: item.times ?? null,
			performance_dates: item.performanceDates?.map(day => toIsoFromMonthDay(group.year, day)) ?? null,
			lineup: item.lineUp ?? null,
			price: item.price ?? null,
			image_key: item.fileName ?? null,
			ticketing: item.ticketing ?? null,
			is_age_restricted: item.ageLimit ?? false,
		})),
	);

const buildMediaAppearanceRows = (): MediaAppearanceRow[] =>
	[...EVENT_RADIO, ...EVENT_INTERVIEW, ...EVENT_MAGAZINE].flatMap(group =>
		group.items.map(item => ({
			appearance_type: item.type,
			appeared_on: toIsoFromMonthDay(group.year, item.date),
			title: item.content,
			source_name: item.host ?? null,
			link: item.link ?? null,
			platform: item.platform ?? null,
			quote: item.quote ?? null,
			description: item.descriptionContent ?? null,
		})),
	);

const formatTrackId = (albumId: string, trackNo: number): string =>
	`TRK_${albumId}_${String(trackNo).padStart(3, '0')}`;

// DB 에 넣기 전에 DB 제약과 같은 규칙으로 먼저 확인한다. (제약 위반을 원격에서 만나지 않도록)
const collectIntegrityProblems = (rows: ContentRows): string[] => {
	const problems: string[] = [];
	const albumIds = new Set<string>();
	const trackIds = new Set(rows.tracks.map(track => track.id));
	const trackCountByAlbum = new Map<string, number>();
	const trackNoKeys = new Set<string>();

	rows.albums.forEach(album => {
		if (albumIds.has(album.id)) problems.push(`앨범 id 중복: ${album.id}`);
		albumIds.add(album.id);

		if (!album.id.startsWith(album.album_type))
			problems.push(`앨범 id 와 타입 불일치: ${album.id} / ${album.album_type}`);
		if ((album.album_type === 'LP') !== (album.volume !== null)) {
			problems.push(`volume 은 LP 에만 있어야 합니다: ${album.id} / volume ${album.volume}`);
		}
		if (album.album_type === 'LP' && Number(album.id.slice(2)) !== album.volume) {
			problems.push(`앨범 id 와 volume 불일치: ${album.id} / volume ${album.volume}`);
		}
	});

	rows.tracks.forEach(track => {
		if (!albumIds.has(track.album_id)) problems.push(`트랙 ${track.id}: 앨범 ${track.album_id} 가 없습니다`);
		if (track.id !== formatTrackId(track.album_id, track.track_no))
			problems.push(`트랙 id 와 앨범·순서 불일치: ${track.id}`);

		const trackNoKey = `${track.album_id}#${track.track_no}`;
		if (trackNoKeys.has(trackNoKey)) problems.push(`트랙 순서 중복: ${trackNoKey}`);
		trackNoKeys.add(trackNoKey);

		trackCountByAlbum.set(track.album_id, (trackCountByAlbum.get(track.album_id) ?? 0) + 1);
	});

	albumIds.forEach(albumId => {
		if (!trackCountByAlbum.has(albumId)) problems.push(`앨범 ${albumId}: 수록곡이 없습니다`);
	});

	const linkKeys = new Set<string>();
	rows.albumLinks.forEach(link => {
		if (!albumIds.has(link.album_id)) problems.push(`링크: 앨범 ${link.album_id} 가 없습니다`);
		if (!HTTP_URL_PATTERN.test(link.url))
			problems.push(`링크 URL 형식 오류: ${link.album_id} ${link.platform} ${link.url}`);

		const linkKey = `${link.album_id}#${link.kind}#${link.sort_order}`;
		if (linkKeys.has(linkKey)) problems.push(`링크 순서 중복: ${linkKey}`);
		linkKeys.add(linkKey);
	});

	rows.trackOrigins.forEach(origin => {
		if (!trackIds.has(origin.track_id)) problems.push(`원곡 관계: 곡 ${origin.track_id} 가 없습니다`);
		if (!trackIds.has(origin.original_track_id))
			problems.push(`원곡 관계: 원곡 ${origin.original_track_id} 가 없습니다`);
		if (origin.track_id === origin.original_track_id)
			problems.push(`원곡 관계: 자기 자신을 가리킵니다 ${origin.track_id}`);
	});

	rows.trackChords.forEach(({ track_id }) => {
		if (!trackIds.has(track_id)) problems.push(`코드 ${track_id}: 해당 트랙이 없습니다`);
	});

	const concertKeys = new Set<string>();
	rows.concerts.forEach(concert => {
		if (concert.end_date !== null && concert.end_date < concert.start_date)
			problems.push(`공연 종료일이 시작일보다 빠릅니다: ${concert.title}`);

		const concertKey = `${concert.start_date}#${concert.title}`;
		if (concertKeys.has(concertKey)) problems.push(`공연 중복: ${concertKey}`);
		concertKeys.add(concertKey);
	});

	const appearanceKeys = new Set<string>();
	rows.mediaAppearances.forEach(appearance => {
		const appearanceKey = `${appearance.appeared_on}#${appearance.title}`;
		if (appearanceKeys.has(appearanceKey)) problems.push(`출연 중복: ${appearanceKey}`);
		appearanceKeys.add(appearanceKey);
	});

	return problems;
};

export const buildRows = (): ContentRows => {
	const albums = FULL_ALBUMS.flatMap(group => group.items);

	const rows: ContentRows = {
		albums: buildAlbumRows(albums),
		albumLinks: buildAlbumLinkRows(albums),
		tracks: buildTrackRows(getSideByTrackId(albums)),
		trackOrigins: buildTrackOriginRows(),
		trackChords: buildTrackChordRows(),
		concerts: buildConcertRows(),
		mediaAppearances: buildMediaAppearanceRows(),
	};

	const problems = collectIntegrityProblems(rows);
	if (problems.length > 0) {
		throw new Error(`시드 데이터 무결성 문제 ${problems.length}건:\n- ${problems.join('\n- ')}`);
	}

	return rows;
};
