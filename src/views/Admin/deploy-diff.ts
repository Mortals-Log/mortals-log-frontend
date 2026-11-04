// @/views/Admin/deploy-diff
// 배포 전 변경 확인: "지금 사이트가 만들어진 데이터"(빌드 때 저장한 공개 행)와 "지금 배포하면 반영될 데이터"(지금 공개된 행)를
// 비교해 새로 공개 · 수정 · 사이트에서 내려가는 항목을 한글로 정리한다. 순수 함수라 화면과 분리했다.

import type { ContentRows } from '@/types/content-row';
import {
	ALBUM_LINKS,
	ALBUMS,
	CONCERTS,
	MEDIA_APPEARANCES,
	TRACK_CHORDS,
	TRACK_ORIGINS,
	TRACKS,
	type FieldConfig,
	type TableConfig,
} from './admin-tables';
import type { TableRow } from './form-codec';
import { getAlbumLabel, getAlbumLabelById, getOptionLabel, getTrackLabelById } from './labels';

export type ChangeKind = 'added' | 'changed' | 'removed';

export interface FieldChange {
	label: string;
	before: string;
	after: string;
}

/** isStored: Storage 에 올린 이미지(true) / public/images 의 파일(false) */
export interface ChangeImage {
	path: string;
	isStored: boolean;
}

export interface ChangeItem {
	kind: ChangeKind;
	title: string;
	/** 앨범 커버·공연 포스터 (대표 이미지를 보여줄 때) */
	image?: ChangeImage;
	fields: FieldChange[];
}

export interface ChangeSection {
	name: string;
	items: ChangeItem[];
}

/** 비교에서 빼는 컬럼: 식별자·편집 시각·공개 여부(공개된 행만 비교하므로 항상 true) */
const IGNORED_COLUMNS = new Set(['id', 'created_at', 'updated_at', 'is_published']);
const MAX_VALUE_LENGTH = 60;

interface LabelContext {
	albums: TableRow[];
	tracks: TableRow[];
}

interface SectionSpec {
	key: keyof ContentRows;
	name: string;
	config: TableConfig;
	getId: (row: TableRow) => string;
	getTitle: (row: TableRow, context: LabelContext) => string;
	getImage?: (row: TableRow) => ChangeImage | undefined;
}

const getTrackTitle = (context: LabelContext, trackId: unknown): string =>
	getTrackLabelById(context.tracks, context.albums, trackId);

const getImage = (config: TableConfig, row: TableRow): ChangeImage | undefined => {
	const stored = row.cover_image_path ?? row.poster_image_path;
	if (typeof stored === 'string' && stored) return { path: stored, isStored: true };
	try {
		// 올린 이미지가 없으면 사이트가 쓰는 public/images 파일 규칙의 경로를 쓴다.
		const path = config.imageTarget?.(row, row);
		return path ? { path, isStored: false } : undefined;
	} catch {
		return undefined;
	}
};

const SECTIONS: SectionSpec[] = [
	{
		key: 'albums',
		name: '앨범',
		config: ALBUMS,
		getId: row => String(row.id),
		getTitle: row => getAlbumLabel(row),
		getImage: row => getImage(ALBUMS, row),
	},
	{
		key: 'albumLinks',
		name: '앨범 링크',
		config: ALBUM_LINKS,
		getId: row => String(row.id),
		getTitle: (row, context) =>
			`${getAlbumLabelById(context.albums, row.album_id)} · ${String(row.platform ?? '구매 링크')}`,
	},
	{
		key: 'tracks',
		name: '곡',
		config: TRACKS,
		getId: row => String(row.id),
		getTitle: (row, context) => `${String(row.track_no)}. ${getTrackTitle(context, row.id)}`,
	},
	{
		key: 'trackOrigins',
		name: '원곡 관계',
		config: TRACK_ORIGINS,
		getId: row => `${String(row.track_id)}|${String(row.original_track_id)}`,
		getTitle: (row, context) =>
			`${getTrackTitle(context, row.track_id)} ← 원곡 ${getTrackTitle(context, row.original_track_id)}`,
	},
	{
		key: 'trackChords',
		name: '코드',
		config: TRACK_CHORDS,
		getId: row => String(row.track_id),
		getTitle: (row, context) => getTrackTitle(context, row.track_id),
	},
	{
		key: 'concerts',
		name: '공연',
		config: CONCERTS,
		getId: row => String(row.id),
		getTitle: row => `${String(row.start_date)} ${String(row.title)}`,
		getImage: row => getImage(CONCERTS, row),
	},
	{
		key: 'mediaAppearances',
		name: '출연',
		config: MEDIA_APPEARANCES,
		getId: row => String(row.id),
		getTitle: row => `${String(row.appeared_on)} ${String(row.title)}`,
	},
];

const truncate = (text: string): string =>
	text.length > MAX_VALUE_LENGTH ? `${text.slice(0, MAX_VALUE_LENGTH)}…` : text;

const formatValue = (field: FieldConfig | undefined, value: unknown, context: LabelContext): string => {
	if (value === null || value === undefined || value === '') return '(없음)';
	if (typeof value === 'boolean') return value ? '예' : '아니오';
	if (field?.kind === 'ref') {
		return field.refTable === 'tracks' ? getTrackTitle(context, value) : getAlbumLabelById(context.albums, value);
	}
	if (field?.options) return getOptionLabel(field.options, value);
	if (field?.kind === 'chords' && Array.isArray(value)) return `악보 ${value.length}개`;
	if (Array.isArray(value) && value.every(item => typeof item !== 'object')) return truncate(value.join(', '));
	return truncate(typeof value === 'object' ? JSON.stringify(value) : String(value));
};

const diffFields = (config: TableConfig, before: TableRow, after: TableRow, context: LabelContext): FieldChange[] => {
	const columns = new Set([...Object.keys(before), ...Object.keys(after)]);
	const changes: FieldChange[] = [];
	for (const column of columns) {
		if (IGNORED_COLUMNS.has(column)) continue;
		if (JSON.stringify(before[column] ?? null) === JSON.stringify(after[column] ?? null)) continue;

		const field = config.fields.find(candidate => candidate.name === column);
		changes.push({
			label: field?.label ?? column,
			before: formatValue(field, before[column], context),
			after: formatValue(field, after[column], context),
		});
	}
	return changes;
};

const toRows = (value: unknown): TableRow[] => (Array.isArray(value) ? (value as TableRow[]) : []);

/** before: 지금 사이트의 데이터 / after: 지금 배포하면 반영될 데이터. 달라진 구역만 돌려준다. */
export const computeChanges = (before: ContentRows, after: ContentRows): ChangeSection[] => {
	// 이름을 붙일 때 새 데이터를 먼저 찾고, 없으면(내려가는 항목) 예전 데이터에서 찾는다.
	const context: LabelContext = {
		albums: [...toRows(after.albums), ...toRows(before.albums)],
		tracks: [...toRows(after.tracks), ...toRows(before.tracks)],
	};

	const sections: ChangeSection[] = [];
	for (const spec of SECTIONS) {
		const beforeById = new Map(toRows(before[spec.key]).map(row => [spec.getId(row), row]));
		const afterById = new Map(toRows(after[spec.key]).map(row => [spec.getId(row), row]));
		const items: ChangeItem[] = [];

		for (const [id, row] of afterById) {
			const previous = beforeById.get(id);
			const image = spec.getImage?.(row);
			if (!previous) {
				items.push({ kind: 'added', title: spec.getTitle(row, context), image, fields: [] });
				continue;
			}
			const fields = diffFields(spec.config, previous, row, context);
			if (fields.length > 0) items.push({ kind: 'changed', title: spec.getTitle(row, context), image, fields });
		}
		for (const [id, row] of beforeById) {
			if (!afterById.has(id)) items.push({ kind: 'removed', title: spec.getTitle(row, context), fields: [] });
		}

		if (items.length > 0) sections.push({ name: spec.name, items });
	}
	return sections;
};
