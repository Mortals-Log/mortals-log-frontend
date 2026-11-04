// @/views/Admin/labels
// 관리자 화면에서 DB 값(LP, streaming ...) 대신 보여주는 한글 이름과, 앨범·곡을 사람이 읽는 문구로 바꾸는 함수.

import type { TableRow } from './form-codec';

export interface Option {
	value: string;
	label: string;
}

export const ALBUM_TYPE_OPTIONS: readonly Option[] = [
	{ value: 'LP', label: '정규' },
	{ value: 'EP', label: 'EP' },
	{ value: 'SP', label: '싱글' },
	{ value: 'LV', label: '라이브' },
	{ value: 'VN', label: 'LP' },
];

export const CONCERT_FORMAT_OPTIONS: readonly Option[] = [
	{ value: 'SOLO', label: '단독 콘서트' },
	{ value: 'JOIN', label: '합동 콘서트' },
	{ value: 'FESTIVAL', label: '페스티벌' },
	{ value: 'LISTENING', label: '음악감상회' },
];

export const SEAT_TYPE_OPTIONS: readonly Option[] = [
	{ value: '스탠딩', label: '스탠딩' },
	{ value: '좌석', label: '좌석' },
];

export const LINK_KIND_OPTIONS: readonly Option[] = [
	{ value: 'streaming', label: '음원 사이트' },
	{ value: 'store', label: '구매처' },
];

export const APPEARANCE_TYPE_OPTIONS: readonly Option[] = [
	{ value: 'INTERVIEW', label: '인터뷰' },
	{ value: 'RADIO', label: '라디오' },
	{ value: 'MAGAZINE', label: '잡지' },
];

export const CHORD_MODE_OPTIONS: readonly Option[] = [
	{ value: 'separated', label: '분리 (코드만, 가사는 따로)' },
	{ value: 'integrated', label: '통합 (가사 위에 코드)' },
];

export const PUBLISH_OPTIONS: readonly Option[] = [
	{ value: 'public', label: '공개' },
	{ value: 'private', label: '비공개' },
];

/** concerts.price 의 키(DB 값)와 화면에 보이는 한글 이름 */
export const PRICE_KIND_OPTIONS: readonly Option[] = [
	{ value: 'regular', label: '일반' },
	{ value: 'student', label: '학생' },
	{ value: 'army', label: '군인' },
	{ value: 'onSpot', label: '현장 구매' },
	{ value: 'alien', label: '외국인' },
	{ value: 'teacher', label: '교사' },
	{ value: 'early', label: '얼리버드' },
	{ value: 'monk', label: '스님' },
];

const KARAOKE_LABELS: Record<string, string> = { tj: 'TJ', ky: 'KY' };

/** 노래방 카테고리 키(tj, ky ...)를 화면 이름으로. 새로 추가한 카테고리는 그대로 보인다. */
export const getKaraokeLabel = (category: string): string => KARAOKE_LABELS[category] ?? category;

export const getOptionLabel = (options: readonly Option[], value: unknown): string =>
	options.find(option => option.value === value)?.label ?? String(value ?? '');

/** 예: 정규 3집 / EP */
export const getAlbumTypeLabel = (album: TableRow): string => {
	const typeLabel = getOptionLabel(ALBUM_TYPE_OPTIONS, album.album_type);
	return album.album_type === 'LP' && album.volume ? `${typeLabel} ${String(album.volume)}집` : typeLabel;
};

/** 예: 정규 3집 · 푸줏간 */
export const getAlbumLabel = (album: TableRow): string => `${getAlbumTypeLabel(album)} · ${String(album.title)}`;

export const findAlbum = (albums: TableRow[], albumId: unknown): TableRow | undefined =>
	albums.find(album => album.id === albumId);

export const getAlbumLabelById = (albums: TableRow[], albumId: unknown): string => {
	const album = findAlbum(albums, albumId);
	return album ? getAlbumLabel(album) : String(albumId ?? '');
};

/** 예: 푸줏간 (정규 3집 · 앨범 제목) */
export const getTrackLabel = (track: TableRow, albums: TableRow[]): string => {
	const album = findAlbum(albums, track.album_id);
	return album ? `${String(track.title)} (${getAlbumLabel(album)})` : String(track.title);
};

export const getTrackLabelById = (tracks: TableRow[], albums: TableRow[], trackId: unknown): string => {
	const track = tracks.find(candidate => candidate.id === trackId);
	return track ? getTrackLabel(track, albums) : String(trackId ?? '');
};
