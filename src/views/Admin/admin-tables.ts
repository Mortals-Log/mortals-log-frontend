// @/views/Admin/admin-tables
// 관리자 화면이 편집하는 테이블과 필드 설정. 컬럼은 supabase/migrations 의 최종 스키마(@/types/content-row)를 따른다.
// required 는 DB 의 NOT NULL 과 같다. 문자열 배열(strings)은 required 면 빈 배열, 아니면 null 로 저장한다.
// 새 컬럼이 생기면 여기에 필드를 추가해야 화면에 나온다.

import { replaceTrackOrigins } from '@/apis/admin/table-rows';
import { mapConcertRow } from '@/apis/content/mappers';
import type { ConcertRow } from '@/types/content-row';
import { GetConcertPaths } from '@/utils/concert';
import { getMissingCredits } from './row-summaries';
import type { FormContext, FormValue, RowContext, FormValues, Lookups, TableRow, VocabKey } from './form-codec';
import {
	ALBUM_TYPE_OPTIONS,
	APPEARANCE_TYPE_OPTIONS,
	CONCERT_FORMAT_OPTIONS,
	LINK_KIND_OPTIONS,
	PUBLISH_OPTIONS,
	SEAT_TYPE_OPTIONS,
	getAlbumLabel,
	type Option,
} from './labels';

export type FieldKind =
	| 'text'
	| 'textarea'
	| 'number'
	| 'boolean'
	| 'date'
	| 'trackNo' // 같은 앨범에서 쓰지 않는 수록 번호만 고른다
	| 'select' // 선택지가 적어 칩으로 고른다
	| 'ref' // 앨범·곡 중 하나를 목록에서 고른다
	| 'strings' // +/− 로 칸을 늘리는 문자열 목록
	| 'slug' // 영어로 받아 소문자·하이픈 파일명으로 바꾼다
	| 'image' // 폴더에서 고른 이미지를 Storage 에 올리고 경로를 저장한다
	| 'chords' // 코드 악보 여러 버전
	| 'price' // 종류·금액 줄
	| 'ticketing' // 예매 회차
	| 'karaoke' // 노래방 카테고리·번호 줄
	| 'lineup' // 정해진 이름에서 고르거나 새로 추가
	| 'originTracks'; // 이 테이블의 컬럼이 아니라 track_origins 에 저장되는 원곡 목록

export interface FieldConfig {
	name: string;
	label: string;
	kind: FieldKind;
	required?: boolean;
	options?: readonly Option[];
	refTable?: 'albums' | 'tracks';
	/** 선택할 수 없는 항목의 id (목록에는 회색으로 보이고 이유를 안내한다) */
	unavailable?: (lookups: Lookups) => string[];
	/** strings 의 각 칸이 받는 입력 형식 */
	inputType?: 'text' | 'date' | 'time';
	/** 기존 데이터에서 모은 값을 드롭다운으로 보여주고, 없으면 "기타"로 직접 입력받는다 (text · strings) */
	vocab?: VocabKey;
	/** 입력에서 값을 알아서 다듬는다. youtube: 주소에서 영상 ID 만 / youtube-by-platform: 플랫폼이 YouTube 일 때만 */
	normalize?: 'youtube' | 'youtube-by-platform';
	/** 새로 만들 때만 채워 두는 값 */
	defaultValue?: FormValue;
	/** 새로 만들 때는 숨긴다 (DB 가 만들거나 prepare 가 채움). 수정 화면에서는 읽기 전용으로 보인다. */
	autoOnCreate?: boolean;
	/** 수정 화면에서는 바꿀 수 없다 (기본 키가 아니어도 다른 값과 짝이 맞아야 하는 필드) */
	lockedOnEdit?: boolean;
	/** 수정 화면에서 잠긴 이유 (없으면 기본 안내) */
	lockedHint?: string;
	/** 화면 전용 입력(DB 컬럼 없음). 저장하지 않고 다른 필드를 보이거나 숨기는 데만 쓴다. */
	virtual?: boolean;
	/** false 를 돌려주면 화면에서 숨기고 null 로 저장한다 */
	showIf?: (form: FormValues, lookups: Lookups) => boolean;
	/** 이 필드 위에 보여줄 구역 제목 */
	section?: string;
	hint?: string;
}

export interface FilterConfig {
	key: string;
	label: string;
	getOptions: (rows: TableRow[], lookups: Lookups) => readonly Option[];
	matches: (row: TableRow, value: string, lookups: Lookups) => boolean;
}

export interface SortConfig {
	key: string;
	label: string;
	compare: (a: TableRow, b: TableRow, lookups: Lookups) => number;
}

export interface TableConfig {
	table: string;
	label: string;
	/** 탭에 보이는 이름 (없으면 label) */
	tabLabel?: string;
	/** 목록의 "+ 추가" 버튼 문구 */
	addLabel?: string;
	/** 행을 가리키는 기본 키. 수정 화면에서는 바꿀 수 없다. */
	keys: string[];
	orderBy: { column: string; ascending?: boolean }[];
	fields: FieldConfig[];
	filters?: FilterConfig[];
	/** 첫 번째가 기본 정렬 */
	sorts?: SortConfig[];
	/** 저장 전에 값끼리의 관계를 검사한다. 어긋나면 이유를 담아 Error 를 던진다. */
	validate?: (values: TableRow, context: RowContext) => void;
	/** 새 행을 저장하기 직전에 값을 보정한다. */
	prepare?: (values: Record<string, unknown>, lookups: Lookups) => Record<string, unknown>;
	/** 새로 만들 때 한 필드를 바꾸면 다른 필드를 채워 준다. 바뀌어야 할 필드만 돌려준다. */
	onFieldChange?: (name: string, value: FormValue, form: FormValues, context: FormContext) => Partial<FormValues>;
	/** 이 테이블의 컬럼이 아닌 필드(virtual, originTracks)의 처음 값 */
	initialExtras?: (row: TableRow | null, lookups: Lookups) => FormValues;
	/** 행을 저장한 뒤 다른 테이블에 저장해야 하는 값을 저장한다. saved 는 방금 저장한 행(기본 키 포함)이다. */
	saveExtras?: (saved: TableRow, form: FormValues) => Promise<void>;
	/** 이 행과 관련된 앨범의 id (곡·코드에서 "앨범으로 이동"에 쓴다). 없으면 null. */
	getRelatedAlbumId?: (row: TableRow, lookups: Lookups) => string | null;
	/** 삭제 확인창에 덧붙일, 함께 사라지는 데이터 안내 (예: 앨범을 지우면 수록곡도 사라진다). 없으면 null. */
	getDeleteNote?: (row: TableRow, lookups: Lookups) => string | null;
	/** 영어 이름처럼 파일명에 쓰는 값을 사람이 비워 뒀을 때 대신 쓸 값 */
	resolveImageKey?: (values: TableRow, row: TableRow | null) => string;
	/** 이미지 필드를 올릴 Storage 경로 (예: albums/LP_2026_her.webp). 만들 수 없으면 이유를 담아 Error 를 던진다. */
	imageTarget?: (values: TableRow, row: TableRow | null) => string;
}

const PUBLISHED_FIELD: FieldConfig = {
	name: 'is_published',
	label: '공개',
	kind: 'boolean',
	hint: '체크하지 않으면 비공개입니다. 비공개 행은 배포해도 사이트에 나오지 않습니다. 앨범을 비공개로 하면 곡·링크도 함께 숨겨집니다.',
};

const asText = (value: FormValue | undefined): string => (typeof value === 'string' ? value : '');
const asStrings = (value: FormValue | undefined): string[] =>
	Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];

const pad2 = (value: number): string => String(value).padStart(2, '0');
const getMaxNumber = (numbers: number[]): number => Math.max(0, ...numbers.filter(Number.isFinite));

// ── 목록 정렬 · 필터 공통 ──

const compareText = (a: unknown, b: unknown): number => String(a ?? '').localeCompare(String(b ?? ''), 'ko');
const compareNumber = (a: unknown, b: unknown): number => Number(a ?? 0) - Number(b ?? 0);

const getAlbumReleaseDate = (lookups: Lookups, albumId: unknown): string =>
	String(lookups.albums.find(album => album.id === albumId)?.release_date ?? '');

const PUBLISH_FILTER: FilterConfig = {
	key: 'publish',
	label: '공개 여부',
	getOptions: () => PUBLISH_OPTIONS,
	matches: (row, value) => (row.is_published !== false) === (value === 'public'),
};

const createYearFilter = (column: string): FilterConfig => ({
	key: 'year',
	label: '연도',
	getOptions: rows =>
		[...new Set(rows.map(row => String(row[column]).slice(0, 4)))]
			.sort()
			.reverse()
			.map(year => ({ value: year, label: `${year}년` })),
	matches: (row, value) => String(row[column]).startsWith(value),
});

const createAlbumFilter = (getAlbumId: (row: TableRow, lookups: Lookups) => unknown): FilterConfig => ({
	key: 'album',
	label: '앨범',
	getOptions: (_rows, lookups) =>
		[...lookups.albums]
			.sort((a, b) => compareText(b.release_date, a.release_date))
			.map(album => ({ value: String(album.id), label: getAlbumLabel(album) })),
	matches: (row, value, lookups) => getAlbumId(row, lookups) === value,
});

const createDateSorts = (column: string): SortConfig[] => [
	{ key: 'newest', label: '최신순', compare: (a, b) => compareText(b[column], a[column]) },
	{ key: 'oldest', label: '오래된 순', compare: (a, b) => compareText(a[column], b[column]) },
];

// ── 앨범: 종류를 고르면 정규 집 번호를 가장 최근 값 +1 로 채우고, 앨범 ID 는 저장할 때 자동으로 정한다 ──

const getNextVolume = (albums: TableRow[]): number =>
	getMaxNumber(albums.filter(album => album.album_type === 'LP').map(album => Number(album.volume))) + 1;

const getNextAlbumNumber = (albums: TableRow[], type: string): number =>
	getMaxNumber(
		albums.filter(album => album.album_type === type).map(album => Number(String(album.id).slice(type.length))),
	) + 1;

/** 정규는 집 번호(LP08), 나머지는 같은 종류의 다음 번호(EP04). 앨범 ID 는 사람이 정하지 않는다. */
const createAlbumId = (values: Record<string, unknown>, albums: TableRow[]): string => {
	const type = String(values.album_type);
	const id = type === 'LP' ? `LP${pad2(Number(values.volume))}` : `${type}${pad2(getNextAlbumNumber(albums, type))}`;
	if (albums.some(album => album.id === id)) {
		throw new Error(`앨범 번호: ${id} 앨범이 이미 있습니다. 정규 몇 집 번호를 확인하십시오.`);
	}
	return id;
};

const handleAlbumFieldChange: TableConfig['onFieldChange'] = (name, value, form, { lookups }) => {
	if (name !== 'album_type') return {};
	const nextType = asText(value);
	return { volume: nextType === 'LP' ? asText(form.volume) || String(getNextVolume(lookups.albums)) : '' };
};

const getAlbumImagePath = (values: TableRow, row: TableRow | null): string => {
	const merged = { ...row, ...values };
	if (!merged.image_key) throw new Error('이미지를 올리려면 영어 이름을 입력하십시오.');
	const year = String(merged.release_date ?? '').slice(0, 4);
	return `albums/${String(merged.album_type)}_${year}_${String(merged.image_key)}.webp`;
};

export const ALBUMS: TableConfig = {
	table: 'albums',
	label: '앨범',
	tabLabel: '앨범 관리',
	addLabel: '앨범 등록',
	keys: ['id'],
	orderBy: [{ column: 'id' }],
	getDeleteNote: (row, lookups) => {
		const trackIds = lookups.tracks.filter(track => track.album_id === row.id).map(track => String(track.id));
		const chordCount = trackIds.filter(id => lookups.chordTrackIds.includes(id)).length;
		return `이 앨범의 수록곡 ${trackIds.length}곡, 곡 코드 ${chordCount}개, 구매·스트리밍 링크, 원곡 관계도 함께 삭제됩니다.`;
	},
	prepare: (values, lookups) => ({ ...values, id: createAlbumId(values, lookups.albums) }),
	onFieldChange: handleAlbumFieldChange,
	imageTarget: getAlbumImagePath,
	// 영어 이름을 비워 두고 이미지를 올리면 앨범 ID(소문자)를 파일명에 쓴다. 예: EP04 → EP_2026_ep04.webp
	resolveImageKey: (values, row) => String({ ...row, ...values }.id).toLowerCase(),
	filters: [
		{
			key: 'type',
			label: '종류',
			getOptions: () => ALBUM_TYPE_OPTIONS,
			matches: (row, value) => row.album_type === value,
		},
		createYearFilter('release_date'),
		PUBLISH_FILTER,
	],
	sorts: [
		...createDateSorts('release_date'),
		{ key: 'title', label: '제목순', compare: (a, b) => compareText(a.title, b.title) },
	],
	fields: [
		{
			name: 'id',
			label: '앨범 ID',
			kind: 'text',
			autoOnCreate: true,
			hint: '저장할 때 종류와 번호로 자동 정해집니다.',
		},
		{
			name: 'album_type',
			label: '종류',
			kind: 'select',
			required: true,
			options: ALBUM_TYPE_OPTIONS,
			lockedOnEdit: true,
			hint: '등록한 뒤에는 바꿀 수 없습니다.',
		},
		{
			name: 'volume',
			label: '정규 몇 집',
			kind: 'number',
			showIf: form => form.album_type === 'LP',
			hint: '가장 최근 정규 앨범의 다음 번호가 채워집니다. 필요하면 고치십시오.',
		},
		{ name: 'title', label: '제목', kind: 'text', required: true },
		{
			name: 'image_key',
			label: '영어 이름',
			kind: 'slug',
			hint: '앨범의 공식 영어 이름입니다. 소문자·하이픈으로 바뀌어 커버 이미지 파일명에 쓰입니다. 비워 두고 이미지를 올리면 앨범 ID로 정해집니다.',
		},
		{
			name: 'cover_image_path',
			label: '커버 이미지',
			kind: 'image',
			hint: '이미지를 고르면 사이트 규칙(종류_연도_영어이름.webp)에 맞는 이름으로 자동 저장됩니다. 원본 파일 이름은 상관없습니다.',
		},
		{ name: 'release_date', label: '발매일', kind: 'date', required: true },
		{ name: 'intro', label: '소개', kind: 'textarea' },
		{ name: 'genres', label: '장르', kind: 'strings', required: true, vocab: 'genres' },
		{ name: 'styles', label: '스타일', kind: 'strings', required: true, vocab: 'styles' },
		{ name: 'distributor', label: '유통', kind: 'text' },
		{ name: 'total_duration', label: '총 재생시간', kind: 'text' },
		{ name: 'agency', label: '기획사', kind: 'text' },
		PUBLISHED_FIELD,
	],
};

/** 앨범 화면 안에서 함께 편집하는 링크 (별도 탭은 없다) */
export const ALBUM_LINKS: TableConfig = {
	table: 'album_links',
	label: '앨범 링크',
	keys: ['id'],
	orderBy: [{ column: 'album_id' }, { column: 'kind' }, { column: 'sort_order' }],
	fields: [
		{ name: 'id', label: 'ID', kind: 'number', autoOnCreate: true },
		{ name: 'album_id', label: '앨범', kind: 'ref', refTable: 'albums', required: true },
		{ name: 'kind', label: '구분', kind: 'select', required: true, options: LINK_KIND_OPTIONS },
		{ name: 'platform', label: '플랫폼', kind: 'text', vocab: 'linkPlatforms' },
		{ name: 'url', label: '주소', kind: 'text', required: true, hint: 'http:// 또는 https:// 로 시작' },
		{ name: 'sort_order', label: '표시 순서', kind: 'number', required: true },
	],
};

const getNextTrackNo = (tracks: TableRow[], albumId: string): number =>
	getMaxNumber(tracks.filter(track => track.album_id === albumId).map(track => Number(track.track_no))) + 1;

const handleTrackFieldChange: TableConfig['onFieldChange'] = (name, value, form, { lookups }) => {
	if (name !== 'album_id') return {};
	// 앨범을 고르면 그 앨범에서 쓰지 않는 맨 뒤 번호를 선택해 둔다 (다른 번호도 고를 수 있다).
	void form;
	return { track_no: String(getNextTrackNo(lookups.tracks, asText(value))) };
};

const compareTracksByAlbum =
	(direction: 1 | -1) =>
	(a: TableRow, b: TableRow, lookups: Lookups): number =>
		direction * compareText(getAlbumReleaseDate(lookups, a.album_id), getAlbumReleaseDate(lookups, b.album_id)) ||
		compareText(a.album_id, b.album_id) ||
		compareNumber(a.track_no, b.track_no);

/** 같은 앨범에서 이미 쓰는 수록 번호는 쓸 수 없다 (DB 에도 같은 제약이 있다). 수정 중인 곡 자신은 제외한다. */
const validateTrackNumber: TableConfig['validate'] = (values, { row, lookups }) => {
	const duplicated = lookups.tracks.find(
		track =>
			track.album_id === values.album_id && Number(track.track_no) === Number(values.track_no) && track.id !== row?.id,
	);
	if (duplicated) {
		throw new Error(
			`수록 번호: ${String(values.track_no)}번은 이미 "${String(duplicated.title)}" 곡이 쓰고 있습니다. 비어 있는 번호를 선택하십시오.`,
		);
	}
};

/** 곡 ID 는 TRK_앨범ID_번호. 곡을 옮겨 번호와 ID 가 어긋난 앨범에서도 기존 ID 와 겹치지 않게 번호를 올린다. */
const createTrackId = (values: Record<string, unknown>, lookups: Lookups): Record<string, unknown> => {
	const takenIds = new Set(lookups.tracks.map(track => String(track.id)));
	let number = Number(values.track_no);
	while (takenIds.has(`TRK_${String(values.album_id)}_${String(number).padStart(3, '0')}`)) number += 1;
	return { ...values, id: `TRK_${String(values.album_id)}_${String(number).padStart(3, '0')}` };
};

export const TRACKS: TableConfig = {
	table: 'tracks',
	label: '곡',
	keys: ['id'],
	orderBy: [{ column: 'id' }],
	getDeleteNote: (row, lookups) =>
		lookups.chordTrackIds.includes(String(row.id))
			? '이 곡의 코드 악보와 원곡 관계도 함께 삭제됩니다.'
			: '이 곡의 원곡 관계도 함께 삭제됩니다.',
	validate: validateTrackNumber,
	getRelatedAlbumId: row => (row.album_id ? String(row.album_id) : null),
	prepare: createTrackId,
	onFieldChange: handleTrackFieldChange,
	filters: [
		createAlbumFilter(row => row.album_id),
		{
			key: 'credits',
			label: '필수 정보',
			getOptions: () => [
				{ value: 'filled', label: '작사·작곡·편곡 입력됨' },
				{ value: 'missing', label: '하나라도 미입력' },
			],
			matches: (row, value) => (getMissingCredits(row).length === 0) === (value === 'filled'),
		},
		{
			key: 'lead',
			label: '타이틀곡',
			getOptions: () => [{ value: 'lead', label: '타이틀곡만' }],
			matches: row => row.is_lead === true,
		},
	],
	sorts: [
		{ key: 'album-newest', label: '앨범 최신순', compare: compareTracksByAlbum(-1) },
		{ key: 'album-oldest', label: '앨범 오래된 순', compare: compareTracksByAlbum(1) },
		{ key: 'title', label: '제목순', compare: (a, b) => compareText(a.title, b.title) },
	],
	initialExtras: (row, lookups) => ({
		original_track_ids: row
			? lookups.origins
					.filter(origin => origin.track_id === row.id)
					.sort((a, b) => compareNumber(a.sort_order, b.sort_order))
					.map(origin => String(origin.original_track_id))
			: [''],
	}),
	saveExtras: (saved, form) =>
		replaceTrackOrigins(
			String(saved.id),
			asStrings(form.original_track_ids)
				.map(id => id.trim())
				.filter(Boolean),
		),
	fields: [
		{
			name: 'id',
			label: '곡 ID',
			kind: 'text',
			autoOnCreate: true,
			hint: '저장할 때 TRK_앨범ID_번호 형태로 자동 생성됩니다.',
		},
		{
			name: 'album_id',
			label: '앨범',
			kind: 'ref',
			refTable: 'albums',
			required: true,
			lockedOnEdit: true,
			lockedHint: '곡이 속한 앨범은 바꿀 수 없습니다.',
		},
		{
			name: 'track_no',
			label: '수록 번호',
			kind: 'trackNo',
			required: true,
			lockedOnEdit: true,
			lockedHint: '수록 번호(곡 순서)는 앨범 관리에서 곡을 위·아래로 옮겨 바꿉니다.',
			hint: '같은 앨범에서 이미 쓰는 번호는 선택할 수 없습니다. 앨범을 고르면 맨 뒤 번호가 선택됩니다.',
		},
		{
			name: 'side',
			label: 'Side',
			kind: 'text',
			vocab: 'sides',
			showIf: (form, lookups) => lookups.albums.find(album => album.id === form.album_id)?.album_type === 'VN',
			hint: 'LP(바이닐) 앨범의 곡만 입력합니다.',
		},
		{ name: 'title', label: '제목', kind: 'text', required: true },
		{ name: 'title_en', label: '영문 제목', kind: 'text', required: true },
		{ name: 'version', label: '버전', kind: 'text', vocab: 'versions' },
		{ name: 'is_lead', label: '타이틀곡', kind: 'boolean' },
		{ name: 'is_age_restricted', label: '연령 제한', kind: 'boolean' },
		{ name: 'is_cd_only', label: 'CD 전용', kind: 'boolean' },
		{ name: 'duration', label: '재생시간', kind: 'text' },
		{
			name: 'original_track_ids',
			label: '원곡',
			kind: 'originTracks',
			hint: '커버·리메이크처럼 원곡이 있는 곡만 고르십시오. 여러 곡이면 + 로 추가합니다.',
		},
		{ name: 'lyrics', label: '가사', kind: 'textarea' },
		{ name: 'lyricists', label: '작사', kind: 'strings', required: true, vocab: 'people', defaultValue: ['천진우'] },
		{ name: 'composers', label: '작곡', kind: 'strings', required: true, vocab: 'people', defaultValue: ['천진우'] },
		{ name: 'arrangers', label: '편곡', kind: 'strings', required: true, vocab: 'people', defaultValue: ['천진우'] },
		{
			name: 'music_video_youtube_id',
			label: '뮤직비디오',
			kind: 'text',
			normalize: 'youtube',
			hint: 'YouTube 주소를 그대로 붙여 넣으면 영상 ID만 저장됩니다.',
		},
		{ name: 'karaoke_numbers', label: '노래방 번호', kind: 'karaoke', vocab: 'karaoke' },
	],
};

/** 화면의 탭은 아니고, 곡 목록에 원곡 관계를 보여주려고 읽는 테이블 설정 */
export const TRACK_ORIGINS: TableConfig = {
	table: 'track_origins',
	label: '원곡 관계',
	keys: ['track_id', 'original_track_id'],
	orderBy: [{ column: 'track_id' }, { column: 'sort_order' }],
	fields: [
		{ name: 'track_id', label: '곡', kind: 'ref', refTable: 'tracks', required: true },
		{ name: 'original_track_id', label: '원곡', kind: 'ref', refTable: 'tracks', required: true },
		{ name: 'sort_order', label: '표시 순서', kind: 'number', required: true },
	],
};

const getTrackAlbumId = (row: TableRow, lookups: Lookups): unknown =>
	lookups.tracks.find(track => track.id === row.track_id)?.album_id;

export const TRACK_CHORDS: TableConfig = {
	table: 'track_chords',
	label: '코드',
	keys: ['track_id'],
	orderBy: [{ column: 'track_id' }],
	getRelatedAlbumId: (row, lookups) => {
		const albumId = getTrackAlbumId(row, lookups);
		return albumId ? String(albumId) : null;
	},
	filters: [createAlbumFilter(getTrackAlbumId)],
	sorts: [
		{
			key: 'album-newest',
			label: '앨범 최신순',
			compare: (a, b, lookups) =>
				compareText(
					getAlbumReleaseDate(lookups, getTrackAlbumId(b, lookups)),
					getAlbumReleaseDate(lookups, getTrackAlbumId(a, lookups)),
				) || compareText(a.track_id, b.track_id),
		},
		{
			key: 'album-oldest',
			label: '앨범 오래된 순',
			compare: (a, b, lookups) =>
				compareText(
					getAlbumReleaseDate(lookups, getTrackAlbumId(a, lookups)),
					getAlbumReleaseDate(lookups, getTrackAlbumId(b, lookups)),
				) || compareText(a.track_id, b.track_id),
		},
		{
			key: 'title',
			label: '곡 제목순',
			compare: (a, b, lookups) =>
				compareText(
					lookups.tracks.find(track => track.id === a.track_id)?.title,
					lookups.tracks.find(track => track.id === b.track_id)?.title,
				),
		},
	],
	fields: [
		{
			name: 'track_id',
			label: '곡',
			kind: 'ref',
			refTable: 'tracks',
			required: true,
			unavailable: lookups => lookups.chordTrackIds,
			hint: '이미 코드가 등록된 곡은 회색으로 표시되며 선택할 수 없습니다. 그 곡은 목록에서 열어 수정하십시오.',
		},
		{
			name: 'chords',
			label: '코드 악보',
			kind: 'chords',
			required: true,
			hint: '튜닝·카포가 다른 악보는 + 로 버전을 추가하십시오.',
		},
	],
};

const getConcertImagePath = (values: TableRow, row: TableRow | null): string => {
	const merged = { image_key: null, ...row, ...values } as unknown as ConcertRow;
	const year = String(merged.start_date ?? '').slice(0, 4);
	if (!year) throw new Error('이미지를 올리려면 시작일을 먼저 입력하십시오.');

	const item = mapConcertRow(merged);
	return `concerts/${item.fileName || GetConcertPaths(item, year).key}.webp`;
};

export const CONCERTS: TableConfig = {
	table: 'concerts',
	label: '공연',
	keys: ['id'],
	orderBy: [{ column: 'start_date', ascending: false }, { column: 'id' }],
	imageTarget: getConcertImagePath,
	initialExtras: row => ({ has_end_date: Boolean(row?.end_date) }),
	filters: [
		{
			key: 'format',
			label: '형식',
			getOptions: () => CONCERT_FORMAT_OPTIONS,
			matches: (row, value) => row.concert_type === value,
		},
		{
			key: 'band',
			label: '밴드 공연',
			getOptions: () => [{ value: 'band', label: '밴드 공연' }],
			matches: row => row.is_band_performance === true,
		},
		{
			key: 'tour',
			label: '투어',
			getOptions: () => [{ value: 'tour', label: '투어' }],
			matches: row => row.is_tour === true,
		},
		createYearFilter('start_date'),
		PUBLISH_FILTER,
	],
	sorts: createDateSorts('start_date'),
	fields: [
		{ name: 'id', label: 'ID', kind: 'number', autoOnCreate: true },
		{ name: 'concert_type', label: '형식', kind: 'select', required: true, options: CONCERT_FORMAT_OPTIONS },
		{ name: 'is_band_performance', label: '밴드 공연', kind: 'boolean' },
		{ name: 'is_tour', label: '전국 투어', kind: 'boolean' },
		{ name: 'title', label: '제목', kind: 'text', required: true },
		{ name: 'start_date', label: '시작일', kind: 'date', required: true },
		{
			name: 'has_end_date',
			label: '여러 날에 걸친 공연 (종료일 설정)',
			kind: 'boolean',
			virtual: true,
			hint: '체크하면 종료일과, 기간 중 실제 공연일을 입력할 수 있습니다.',
		},
		{
			name: 'end_date',
			label: '종료일',
			kind: 'date',
			showIf: form => form.has_end_date === true,
		},
		{ name: 'location', label: '지역', kind: 'text' },
		{
			name: 'performance_location',
			label: '공연장',
			kind: 'text',
			showIf: form => form.concert_type === 'FESTIVAL',
			hint: '페스티벌에서 실제로 공연하는 장소(스테이지)입니다.',
		},
		{ name: 'seat_type', label: '좌석 형태', kind: 'select', options: SEAT_TYPE_OPTIONS },
		{
			name: 'showtimes',
			label: '공연 시간',
			kind: 'strings',
			section: '공연 시간',
			hint: '회차가 여러 개면 + 로 추가합니다 (1부, 2부 ...). 시간 범위는 "10:40 ~ 11:20"처럼 씁니다.',
		},
		{
			name: 'performance_dates',
			label: '실제 공연일',
			kind: 'strings',
			inputType: 'date',
			showIf: form => form.has_end_date === true,
			hint: '시작일~종료일 중 실제로 공연하는 날만 입력합니다 (예: 3일 페스티벌 중 하루만 출연). 비워 두면 기간의 모든 날에 공연하는 것으로 처리됩니다.',
		},
		{ name: 'lineup', label: '라인업', kind: 'lineup' },
		{
			name: 'price',
			label: '가격',
			kind: 'price',
			section: '가격 · 예매',
			hint: '종류와 금액을 한 줄씩 입력합니다. 같은 종류가 나뉘면(예: 현장 구매 — 청소년/일반) 세부 이름을 적고 줄을 늘리십시오.',
		},
		{ name: 'ticketing', label: '예매 정보', kind: 'ticketing', hint: '예매 회차(얼리버드, 일반 ...)마다 추가합니다.' },
		{
			name: 'poster_image_path',
			label: '포스터 이미지',
			kind: 'image',
			hint: '이미지를 고르면 사이트 규칙(형식_날짜.webp)에 맞는 이름으로 자동 저장됩니다. 원본 파일 이름은 상관없습니다.',
		},
		{ name: 'is_age_restricted', label: '연령 제한', kind: 'boolean' },
		PUBLISHED_FIELD,
	],
};

export const MEDIA_APPEARANCES: TableConfig = {
	table: 'media_appearances',
	label: '출연',
	keys: ['id'],
	orderBy: [{ column: 'appeared_on', ascending: false }, { column: 'id' }],
	filters: [
		{
			key: 'type',
			label: '구분',
			getOptions: () => APPEARANCE_TYPE_OPTIONS,
			matches: (row, value) => row.appearance_type === value,
		},
		createYearFilter('appeared_on'),
		PUBLISH_FILTER,
	],
	sorts: createDateSorts('appeared_on'),
	fields: [
		{ name: 'id', label: 'ID', kind: 'number', autoOnCreate: true },
		{ name: 'appearance_type', label: '구분', kind: 'select', required: true, options: APPEARANCE_TYPE_OPTIONS },
		{ name: 'appeared_on', label: '날짜', kind: 'date', required: true },
		{ name: 'title', label: '제목', kind: 'text', required: true },
		{ name: 'source_name', label: '프로그램 / 매체 / 채널', kind: 'text' },
		{ name: 'platform', label: '플랫폼', kind: 'text', vocab: 'mediaPlatforms' },
		{
			name: 'link',
			label: '링크',
			kind: 'text',
			normalize: 'youtube-by-platform',
			hint: '플랫폼이 YouTube면 주소를 그대로 붙여 넣어도 영상 ID만 저장됩니다. 그 외에는 주소나 게시물 코드를 입력합니다.',
		},
		{
			name: 'quote',
			label: '인용',
			kind: 'textarea',
			hint: '홈 페이지의 설명문에 사용됩니다. 구분이 인터뷰일 때만 입력할 수 있습니다.',
			showIf: form => form.appearance_type === 'INTERVIEW',
		},
		{ name: 'description', label: '설명', kind: 'textarea' },
		PUBLISHED_FIELD,
	],
};

/** 화면 탭 순서. 앨범 링크·원곡 관계는 각각 앨범·곡 화면에서 함께 다루므로 탭이 없다. */
export const ADMIN_TABLES: TableConfig[] = [ALBUMS, TRACKS, TRACK_CHORDS, CONCERTS, MEDIA_APPEARANCES];
