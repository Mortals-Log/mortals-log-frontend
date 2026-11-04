// @/views/Admin/row-summaries
// 목록 카드에 보여줄 요약. DB 값(LP, streaming, 앨범 ID ...)을 한글 이름·앨범 제목으로 바꾸고,
// 곡은 원곡 관계를, 코드는 악보 일부를, 공연은 밴드 공연 여부를 한눈에 보이게 한다.

import type { BadgeTone } from './admin-classes';
import type { Lookups, TableRow } from './form-codec';
import {
	APPEARANCE_TYPE_OPTIONS,
	CONCERT_FORMAT_OPTIONS,
	LINK_KIND_OPTIONS,
	getAlbumLabelById,
	getAlbumTypeLabel,
	getOptionLabel,
	getTrackLabel,
} from './labels';

export interface RowBadge {
	label: string;
	tone: BadgeTone;
}

export interface RowSummary {
	title: string;
	subtitle?: string;
	badges: RowBadge[];
	/** 제목 아래 보조 줄 */
	lines: string[];
}

const CREDIT_LABELS = [
	['작사', 'lyricists'],
	['작곡', 'composers'],
	['편곡', 'arrangers'],
] as const;

const toNames = (value: unknown): string[] => (Array.isArray(value) ? value.map(String).filter(Boolean) : []);

/** 작사·작곡·편곡 중 이름이 하나도 없는 항목의 이름 (예: ['작곡']) */
export const getMissingCredits = (row: TableRow): string[] =>
	CREDIT_LABELS.filter(([, key]) => toNames(row[key]).length === 0).map(([label]) => label);

const getAlbumSummary = (row: TableRow, lookups: Lookups): RowSummary => {
	const albumTracks = lookups.tracks.filter(track => track.album_id === row.id);

	return {
		title: String(row.title),
		subtitle: `${String(row.release_date)} · ${String(row.id)}`,
		badges: [{ label: getAlbumTypeLabel(row), tone: 'primary' }],
		lines: [`수록곡 ${albumTracks.length}곡`],
	};
};

const getAlbumLinkSummary = (row: TableRow, lookups: Lookups): RowSummary => ({
	title: getAlbumLabelById(lookups.albums, row.album_id),
	subtitle: row.platform ? String(row.platform) : '구매 링크',
	badges: [{ label: getOptionLabel(LINK_KIND_OPTIONS, row.kind), tone: row.kind === 'store' ? 'green' : 'blue' }],
	lines: [String(row.url)],
});

const getTrackSummary = (row: TableRow, lookups: Lookups): RowSummary => {
	const { albums, tracks, origins } = lookups;
	const findTrack = (trackId: unknown) => tracks.find(track => track.id === trackId);

	const originalTracks = origins
		.filter(origin => origin.track_id === row.id)
		.sort((a, b) => Number(a.sort_order) - Number(b.sort_order))
		.map(origin => findTrack(origin.original_track_id))
		.filter((track): track is TableRow => track !== undefined);

	const missingCredits = getMissingCredits(row);
	const badges: RowBadge[] = [];
	if (row.is_lead) badges.push({ label: '타이틀곡', tone: 'primary' });
	if (originalTracks.length > 0) badges.push({ label: '커버 · 원곡 있음', tone: 'blue' });
	if (row.is_age_restricted) badges.push({ label: '연령 제한', tone: 'gray' });
	if (row.is_cd_only) badges.push({ label: 'CD 전용', tone: 'gray' });
	if (missingCredits.length === CREDIT_LABELS.length) badges.push({ label: '필수 정보 미입력', tone: 'yellow' });

	const lines: string[] = [];
	if (originalTracks.length > 0) {
		lines.push(`원곡: ${originalTracks.map(track => getTrackLabel(track, albums)).join(', ')}`);
	}

	return {
		title: `${String(row.track_no)}. ${String(row.title)}`,
		subtitle: getAlbumLabelById(albums, row.album_id),
		badges,
		lines,
	};
};

const getChordSummary = (row: TableRow, lookups: Lookups): RowSummary => {
	const versionCount = Array.isArray(row.chords) ? row.chords.length : 0;
	const track = lookups.tracks.find(candidate => candidate.id === row.track_id);

	return {
		title: track ? String(track.title) : String(row.track_id),
		subtitle: track ? getAlbumLabelById(lookups.albums, track.album_id) : undefined,
		badges: [{ label: `악보 ${versionCount}개`, tone: 'primary' }],
		lines: [],
	};
};

const getConcertSummary = (row: TableRow): RowSummary => {
	const badges: RowBadge[] = [{ label: getOptionLabel(CONCERT_FORMAT_OPTIONS, row.concert_type), tone: 'gray' }];
	if (row.is_band_performance) badges.unshift({ label: '밴드 공연', tone: 'primary' });
	if (row.is_tour) badges.push({ label: '투어', tone: 'gray' });

	const dates = row.end_date ? `${String(row.start_date)} ~ ${String(row.end_date)}` : String(row.start_date);
	return {
		title: String(row.title),
		subtitle: dates,
		badges,
		lines: [[row.location, row.performance_location].filter(Boolean).join(' · ')].filter(Boolean),
	};
};

const getAppearanceSummary = (row: TableRow): RowSummary => ({
	title: String(row.title),
	subtitle: String(row.appeared_on),
	badges: [{ label: getOptionLabel(APPEARANCE_TYPE_OPTIONS, row.appearance_type), tone: 'gray' }],
	lines: row.source_name ? [String(row.source_name)] : [],
});

export const getRowSummary = (table: string, row: TableRow, lookups: Lookups): RowSummary => {
	let summary: RowSummary;
	switch (table) {
		case 'albums':
			summary = getAlbumSummary(row, lookups);
			break;
		case 'album_links':
			summary = getAlbumLinkSummary(row, lookups);
			break;
		case 'tracks':
			summary = getTrackSummary(row, lookups);
			break;
		case 'track_chords':
			summary = getChordSummary(row, lookups);
			break;
		case 'concerts':
			summary = getConcertSummary(row);
			break;
		default:
			summary = getAppearanceSummary(row);
	}
	if (row.is_published === false) summary.badges.push({ label: '비공개', tone: 'yellow' });
	return summary;
};

/** 검색에 쓰는 글: 화면에 보이는 문구(앨범 제목·한글 이름 포함)를 모두 이어 붙인다. */
export const getSearchText = (summary: RowSummary): string =>
	[summary.title, summary.subtitle, ...summary.badges.map(badge => badge.label), ...summary.lines]
		.filter(Boolean)
		.join(' ')
		.toLowerCase();
