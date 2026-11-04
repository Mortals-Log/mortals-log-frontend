// @/apis/content/mappers
// DB 행(ContentRows)을 기존 도메인 객체로 되돌린다.
// 결과는 src/const/fixtures 의 FULL_ALBUMS, MASTER_TRACKS, MASTER_CHORDS, FULL_CONCERTS, FULL_EVENTS,
// EVENT_INTERVIEW 와 같은 모양이라 화면 코드는 그대로 쓸 수 있다. (scripts/verify-mappers.ts 가 동일성을 검증한다)

import type { Album, AlbumList } from '@/types/album';
import type { Chord } from '@/types/chord';
import type { ConcertItem, ConcertList } from '@/types/concert';
import type {
	AlbumLinkRow,
	AlbumRow,
	ConcertRow,
	ContentRows,
	MediaAppearanceRow,
	TrackOriginRow,
	TrackRow,
} from '@/types/content-row';
import type { EventItem, EventList } from '@/types/event';
import type { Track } from '@/types/track';

export interface ContentData {
	/** FULL_ALBUMS */
	albums: AlbumList;
	/** MASTER_TRACKS */
	tracks: Record<string, Track>;
	/** MASTER_CHORDS */
	chords: Record<string, Chord[]>;
	/** FULL_CONCERTS */
	concerts: ConcertList;
	/** FULL_EVENTS */
	events: EventList;
	/** EVENT_INTERVIEW */
	interviews: EventList;
}

/** 이미지를 올려 두는 Supabase Storage 의 공개 버킷 이름 (supabase/migrations/20261028090000_storage_images.sql) */
export const STORAGE_BUCKET = 'images';

export interface MapOptions {
	/** Supabase 프로젝트 URL. 있으면 DB 의 이미지 경로를 공개 URL(imageUrl)로 바꾼다. 없으면 imageUrl 을 만들지 않는다. */
	storageBaseUrl?: string;
}

const toStorageUrl = (path: string | null | undefined, options: MapOptions): string | undefined => {
	if (!path || !options.storageBaseUrl) return undefined;

	const encodedPath = path.split('/').map(encodeURIComponent).join('/');
	return `${options.storageBaseUrl.replace(/\/$/, '')}/storage/v1/object/public/${STORAGE_BUCKET}/${encodedPath}`;
};

// 원본 객체에서 "키가 없던" 선택 필드는 DB 에서 null / 빈 배열 / false 로 저장된다. 되돌릴 때 키째 뺀다.
const compact = <T extends object>(value: T): T =>
	Object.fromEntries(Object.entries(value).filter(([, entry]) => entry !== undefined)) as T;

const nonEmpty = <T>(values: T[]): T[] | undefined => (values.length > 0 ? values : undefined);
const onlyTrue = (flag: boolean): true | undefined => (flag ? true : undefined);

const getDigits = (text: string): string => text.replace(/[^0-9]/g, '');
const bySortOrder = (a: { sort_order: number }, b: { sort_order: number }): number => a.sort_order - b.sort_order;

// 'YYYY-MM-DD' -> 화면이 쓰는 표기
const toDottedDate = (isoDate: string): string => isoDate.replace(/-/g, '.');
const toMonthDay = (isoDate: string): string => `${isoDate.slice(5, 7)}.${isoDate.slice(8, 10)}`;
const toYear = (isoDate: string): string => isoDate.slice(0, 4);

const mapTrackRow = (row: TrackRow, originalTrackIds: string[]): Track => ({
	id: row.id,
	title: row.title,
	enTitle: row.title_en,
	...compact({
		originalTrackIds: nonEmpty(originalTrackIds),
		version: row.version ?? undefined,
		ageLimit: onlyTrue(row.is_age_restricted),
		isLead: onlyTrue(row.is_lead),
		duration: row.duration ?? undefined,
		lyrics: row.lyrics ?? undefined,
		lyricist: nonEmpty(row.lyricists),
		composer: nonEmpty(row.composers),
		arranger: nonEmpty(row.arrangers),
		mvLink: row.music_video_youtube_id ?? undefined,
		singing: row.karaoke_numbers ?? undefined,
		cdOnly: onlyTrue(row.is_cd_only),
	}),
});

// 수록곡은 id 배열로 돌려준다. 'Side A' 처럼 면이 나뉜 앨범은 { 면: id[] } 로 돌려준다.
const mapAlbumTracks = (trackRows: TrackRow[]): Album['tracks'] => {
	const sortedRows = [...trackRows].sort((a, b) => a.track_no - b.track_no);
	if (sortedRows.length === 0) return undefined;

	if (sortedRows.some(row => row.side)) {
		const trackIdsBySide: Record<string, string[]> = {};
		sortedRows.forEach(row => {
			const side = row.side ?? '';
			trackIdsBySide[side] = [...(trackIdsBySide[side] ?? []), row.id];
		});
		return trackIdsBySide;
	}

	return sortedRows.map(row => row.id);
};

// 링크는 sort_order 순서대로 { 플랫폼: URL } 로 만든다. 객체 키 순서가 곧 화면 표시 순서다.
const toLinkRecord = (links: AlbumLinkRow[]): Record<string, string> | undefined => {
	const entries = [...links]
		.sort(bySortOrder)
		.flatMap(link => (link.platform ? [[link.platform, link.url] as const] : []));
	return entries.length > 0 ? Object.fromEntries(entries) : undefined;
};

// 구매 링크가 플랫폼 없이 하나뿐이면 문자열, 아니면 { 판매 형태: URL } 이다.
const toStore = (links: AlbumLinkRow[]): Album['store'] => {
	if (links.length === 1 && links[0].platform === null) return links[0].url;
	return toLinkRecord(links);
};

export const mapAlbumRow = (
	row: AlbumRow,
	trackRows: TrackRow[],
	linkRows: AlbumLinkRow[],
	options: MapOptions = {},
): Album => ({
	type: row.album_type,
	title: row.title,
	releaseDate: toDottedDate(row.release_date),
	...compact({
		volume: row.volume ?? undefined,
		fileName: row.image_key ?? undefined,
		imageUrl: toStorageUrl(row.cover_image_path, options),
		tracks: mapAlbumTracks(trackRows),
		genre: nonEmpty(row.genres),
		style: nonEmpty(row.styles),
		distributor: row.distributor ?? undefined,
		totalDuration: row.total_duration ?? undefined,
		agency: row.agency ?? undefined,
		intro: row.intro ?? undefined,
		store: toStore(linkRows.filter(link => link.kind === 'store')),
		streaming: toLinkRecord(linkRows.filter(link => link.kind === 'streaming')),
	}),
});

const sortAlbumsLatest = (albums: Album[]): Album[] =>
	[...albums].sort((a, b) => Number(getDigits(b.releaseDate)) - Number(getDigits(a.releaseDate)));

const groupAlbumsByYear = (albums: Album[]): AlbumList => {
	const albumsByYear = new Map<string, Album[]>();

	albums.forEach(album => {
		const year = album.releaseDate.split('.')[0].trim();
		albumsByYear.set(year, [...(albumsByYear.get(year) ?? []), album]);
	});

	return [...albumsByYear.keys()]
		.sort((a, b) => Number(b) - Number(a))
		.map(year => ({ year, items: sortAlbumsLatest(albumsByYear.get(year) ?? []) }));
};

// 화면은 공연 유형을 한 값으로 받는다. DB 의 (형식, 투어 여부, 밴드 공연 여부)를 기존 7개 값으로 다시 조합한다.
const toLegacyConcertType = (row: ConcertRow): ConcertItem['type'] => {
	if (row.is_band_performance) return row.is_tour ? 'BAND_TOUR' : 'BAND';
	if (row.is_tour) return 'TOUR';
	return row.concert_type;
};

// FULL_CONCERTS 와 같이 장소·시간이 비어 있으면 '미정' 을 채운다. fileName 키는 값이 없어도 항상 둔다.
export const mapConcertRow = (row: ConcertRow, options: MapOptions = {}): ConcertItem => ({
	type: toLegacyConcertType(row),
	date: row.end_date ? `${toMonthDay(row.start_date)} ~ ${toMonthDay(row.end_date)}` : toMonthDay(row.start_date),
	content: row.title,
	location: row.location || '미정',
	times: row.showtimes || ['미정'],
	fileName: row.image_key ?? undefined,
	...compact({
		imageUrl: toStorageUrl(row.poster_image_path, options),
		performanceLocation: row.performance_location ?? undefined,
		seatType: row.seat_type ?? undefined,
		performanceDates: row.performance_dates?.map(toMonthDay),
		lineUp: row.lineup ?? undefined,
		price: row.price ?? undefined,
		ticketing: row.ticketing ?? undefined,
		ageLimit: onlyTrue(row.is_age_restricted),
	}),
});

const getConcertSortKey = (date: string): number => Number(getDigits(date.split('~')[0]).padEnd(4, '0'));
const getEventSortKey = (date: string): number => Number(getDigits(date).padEnd(4, '0'));

// 행은 DB id(= 시드/등록 순서) 순서로 들어온다. 같은 날짜끼리는 이 순서가 유지된다.
const groupConcerts = (rows: ConcertRow[], options: MapOptions): ConcertList => {
	const concertsByYear = new Map<string, ConcertItem[]>();

	rows.forEach(row => {
		const year = toYear(row.start_date);
		concertsByYear.set(year, [...(concertsByYear.get(year) ?? []), mapConcertRow(row, options)]);
	});

	return [...concertsByYear.keys()]
		.sort((a, b) => Number(b) - Number(a))
		.map(year => ({
			year,
			items: [...(concertsByYear.get(year) ?? [])].sort(
				(a, b) => getConcertSortKey(b.date) - getConcertSortKey(a.date),
			),
		}));
};

const mapMediaAppearanceRow = (row: MediaAppearanceRow): EventItem => ({
	type: row.appearance_type,
	date: toMonthDay(row.appeared_on),
	content: row.title,
	...compact({
		host: row.source_name ?? undefined,
		link: row.link ?? undefined,
		platform: row.platform ?? undefined,
		quote: row.quote ?? undefined,
		descriptionContent: row.description ?? undefined,
	}),
});

const groupEventsByYear = (rows: MediaAppearanceRow[]): Map<string, EventItem[]> => {
	const eventsByYear = new Map<string, EventItem[]>();

	rows.forEach(row => {
		const year = toYear(row.appeared_on);
		eventsByYear.set(year, [...(eventsByYear.get(year) ?? []), mapMediaAppearanceRow(row)]);
	});

	return eventsByYear;
};

const groupEvents = (rows: MediaAppearanceRow[]): EventList => {
	const eventsByYear = groupEventsByYear(rows);

	return [...eventsByYear.keys()]
		.sort((a, b) => Number(b) - Number(a))
		.map(year => ({
			year,
			items: [...(eventsByYear.get(year) ?? [])].sort((a, b) => getEventSortKey(b.date) - getEventSortKey(a.date)),
		}));
};

// EVENT_INTERVIEW: 정렬하지 않은 원본 그룹 순서(연도 등장 순)
const groupInterviews = (rows: MediaAppearanceRow[]): EventList => {
	const eventsByYear = groupEventsByYear(rows.filter(row => row.appearance_type === 'INTERVIEW'));
	return [...eventsByYear.entries()].map(([year, items]) => ({ year, items }));
};

// MASTER_TRACKS 의 원본 순서: 정규(LP) → EP → 싱글 → 라이브 → 바이닐, 같은 앨범 안에서는 수록 순서.
// 곡 목록의 가나다순 정렬은 제목이 같으면 입력 순서를 따르므로, DB 조회 순서와 무관하게 이 순서로 고정한다.
const ALBUM_TYPE_ORDER: Album['type'][] = ['LP', 'EP', 'SP', 'LV', 'VN'];

const getAlbumTypeRank = (albumId: string): number => {
	const rank = ALBUM_TYPE_ORDER.findIndex(type => albumId.startsWith(type));
	return rank === -1 ? ALBUM_TYPE_ORDER.length : rank;
};

const sortTrackRows = (trackRows: TrackRow[]): TrackRow[] =>
	[...trackRows].sort(
		(a, b) =>
			getAlbumTypeRank(a.album_id) - getAlbumTypeRank(b.album_id) ||
			a.album_id.localeCompare(b.album_id) ||
			a.track_no - b.track_no,
	);

const groupBy = <Row>(rows: Row[], getKey: (row: Row) => string): Map<string, Row[]> => {
	const groups = new Map<string, Row[]>();
	rows.forEach(row => groups.set(getKey(row), [...(groups.get(getKey(row)) ?? []), row]));
	return groups;
};

// 원곡 id 는 sort_order 순서로 모으되, 이 조회에서 보이지 않는 곡(비공개 앨범 등)은 뺀다.
const toOriginalTrackIdsByTrack = (originRows: TrackOriginRow[], visibleTrackIds: Set<string>): Map<string, string[]> =>
	new Map(
		[...groupBy(originRows, row => row.track_id).entries()].map(([trackId, origins]) => [
			trackId,
			[...origins]
				.sort(bySortOrder)
				.map(origin => origin.original_track_id)
				.filter(originalId => visibleTrackIds.has(originalId)),
		]),
	);

export const mapContentRows = (rows: ContentRows, options: MapOptions = {}): ContentData => {
	const trackRowsByAlbum = groupBy(rows.tracks, row => row.album_id);
	const linkRowsByAlbum = groupBy(rows.albumLinks, row => row.album_id);
	const originalTrackIdsByTrack = toOriginalTrackIdsByTrack(rows.trackOrigins, new Set(rows.tracks.map(row => row.id)));

	return {
		albums: groupAlbumsByYear(
			rows.albums.map(row =>
				mapAlbumRow(row, trackRowsByAlbum.get(row.id) ?? [], linkRowsByAlbum.get(row.id) ?? [], options),
			),
		),
		tracks: Object.fromEntries(
			sortTrackRows(rows.tracks).map(row => [row.id, mapTrackRow(row, originalTrackIdsByTrack.get(row.id) ?? [])]),
		),
		chords: Object.fromEntries(rows.trackChords.map(row => [row.track_id, row.chords])),
		concerts: groupConcerts(rows.concerts, options),
		events: groupEvents(rows.mediaAppearances),
		interviews: groupInterviews(rows.mediaAppearances),
	};
};
