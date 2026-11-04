// @/views/Admin/album-bulk
// 앨범 + 링크 + 수록곡을 한 화면에서 등록·수정하기 위한 입력 → DB 행 변환 (순수 함수, 화면과 분리).
// 번호 규칙은 기존 데이터를 따른다: 곡 번호·링크 순서는 1부터, 링크 순서는 구분(kind)별, 곡 ID 는 TRK_앨범ID_번호(3자리).
// 이미 저장된 링크·곡은 id(source)를 들고 있어서, 바뀐 것만 수정하고 비운 링크는 지운다. 저장된 곡은 지우지 않는다.

import { ALBUMS } from './admin-tables';
import { toRowValues, type FormValues, type RowContext, type TableRow } from './form-codec';

export interface LinkDraft {
	kind: 'streaming' | 'store';
	platform: string;
	url: string;
	/** 이미 저장된 링크의 원래 행 (새 링크는 없음) */
	source?: TableRow;
}

export interface TrackDraft {
	/** 화면에서 칸을 구별하는 고유 키 (순서를 바꾸거나 접어도 입력 상태가 유지된다). 저장하지 않는다. */
	key: string;
	side: string;
	title: string;
	titleEn: string;
	duration: string;
	isLead: boolean;
	isCdOnly: boolean;
	isAgeRestricted: boolean;
	lyricists: string[];
	composers: string[];
	arrangers: string[];
	/** 이미 저장된 곡의 원래 행 (새 곡은 없음) */
	source?: TableRow;
}

export interface BundleLink {
	/** 저장된 링크의 id (새 링크는 없음) */
	id?: number;
	/** 저장할 값: album_id, kind, platform, url, sort_order */
	values: TableRow;
	/** 구분·순서가 바뀌는지 (유일 제약 때문에 먼저 임시로 비켜야 한다) */
	isMoved: boolean;
	/** 저장된 링크인데 아무것도 안 바뀌었는지 */
	isUnchanged: boolean;
}

export interface BundleTrack {
	id: string;
	isNew: boolean;
	values: TableRow;
	/** 수록 번호가 바뀌는 저장된 곡 (번호는 앨범 안에서 유일해야 해서 먼저 임시 값으로 비켜야 한다) */
	isMoved: boolean;
	/** 저장된 곡의 원래 수록 번호 */
	previousTrackNo?: number;
	isUnchanged: boolean;
}

export interface AlbumBundle {
	albumId: string;
	album: TableRow;
	links: BundleLink[];
	removedLinkIds: number[];
	tracks: BundleTrack[];
}

export const DEFAULT_CREDIT = '천진우';

export const createEmptyLink = (): LinkDraft => ({ kind: 'streaming', platform: '', url: '' });
let draftCounter = 0;

export const createEmptyTrack = (): TrackDraft => ({
	key: `new-${++draftCounter}`,
	side: '',
	title: '',
	titleEn: '',
	duration: '',
	isLead: false,
	isCdOnly: false,
	isAgeRestricted: false,
	lyricists: [DEFAULT_CREDIT],
	composers: [DEFAULT_CREDIT],
	arrangers: [DEFAULT_CREDIT],
});

const toStringList = (value: unknown): string[] =>
	Array.isArray(value) && value.length > 0 ? value.map(String) : [''];

export const toLinkDraft = (row: TableRow): LinkDraft => ({
	kind: row.kind === 'store' ? 'store' : 'streaming',
	platform: row.platform === null || row.platform === undefined ? '' : String(row.platform),
	url: String(row.url ?? ''),
	source: row,
});

export const toTrackDraft = (row: TableRow): TrackDraft => ({
	key: `saved-${String(row.id)}`,
	side: row.side === null || row.side === undefined ? '' : String(row.side),
	title: String(row.title ?? ''),
	titleEn: String(row.title_en ?? ''),
	duration: row.duration === null || row.duration === undefined ? '' : String(row.duration),
	isLead: row.is_lead === true,
	isCdOnly: row.is_cd_only === true,
	isAgeRestricted: row.is_age_restricted === true,
	lyricists: toStringList(row.lyricists),
	composers: toStringList(row.composers),
	arrangers: toStringList(row.arrangers),
	source: row,
});

const cleanNames = (names: string[]): string[] => [...new Set(names.map(name => name.trim()).filter(Boolean))];

// 새로 추가한 줄: 아무것도 입력하지 않았으면 무시하고, 일부만 채웠으면 오류로 알린다.
const isBlankLink = (link: LinkDraft) => !link.platform.trim() && !link.url.trim();
const isBlankNewTrack = (track: TrackDraft) =>
	!track.side.trim() &&
	!track.title.trim() &&
	!track.titleEn.trim() &&
	!track.duration.trim() &&
	!track.isLead &&
	!track.isCdOnly &&
	!track.isAgeRestricted &&
	cleanNames(track.lyricists).filter(name => name !== DEFAULT_CREDIT).length === 0 &&
	cleanNames(track.composers).filter(name => name !== DEFAULT_CREDIT).length === 0 &&
	cleanNames(track.arrangers).filter(name => name !== DEFAULT_CREDIT).length === 0;

// 값은 문자열·숫자·불리언·문자열 배열뿐이라 JSON 으로 비교하면 충분하다.
const isSameValues = (values: TableRow, source: TableRow): boolean =>
	Object.entries(values).every(([key, value]) => JSON.stringify(value) === JSON.stringify(source[key] ?? null));

export const buildAlbumBundle = (
	albumForm: FormValues,
	linkDrafts: LinkDraft[],
	trackDrafts: TrackDraft[],
	context: RowContext,
	/** 화면에서 −/초기화로 목록에서 뺀 저장된 링크의 id (저장하면 지운다) */
	deletedLinkIds: number[] = [],
): AlbumBundle => {
	const album = toRowValues(ALBUMS, albumForm, context);
	const albumId = String(context.isCreate ? album.id : context.row?.id);
	const isVinyl = album.album_type === 'VN';

	const sortOrders: Record<string, number> = {};
	const removedLinkIds: number[] = [...deletedLinkIds];
	const links: BundleLink[] = [];
	linkDrafts.forEach((link, index) => {
		const position = index + 1;
		if (isBlankLink(link)) {
			// 이미 저장된 링크를 비웠다면 지우는 것으로 본다.
			if (link.source) removedLinkIds.push(Number(link.source.id));
			return;
		}
		const url = link.url.trim();
		if (!/^https?:\/\//.test(url)) {
			throw new Error(`링크 ${position}번: 주소를 http:// 또는 https:// 로 시작하게 입력하십시오.`);
		}
		sortOrders[link.kind] = (sortOrders[link.kind] ?? 0) + 1;
		const values: TableRow = {
			kind: link.kind,
			platform: link.platform.trim() || null,
			url,
			sort_order: sortOrders[link.kind],
		};
		links.push({
			id: link.source ? Number(link.source.id) : undefined,
			values: link.source ? values : { album_id: albumId, ...values },
			isMoved:
				Boolean(link.source) && (link.source?.kind !== values.kind || link.source?.sort_order !== values.sort_order),
			isUnchanged: Boolean(link.source) && isSameValues(values, link.source ?? {}),
		});
	});

	// 수록 번호는 목록에서의 위치(1부터)다. 곡 ID 는 다른 데이터(코드·원곡 관계)가 참조하므로 순서를 바꿔도 그대로 두고,
	// 새 곡의 ID 는 이미 쓰는 번호와 겹치지 않게 가장 큰 번호 다음부터 붙인다.
	const idNumbers = trackDrafts.flatMap(track =>
		track.source ? [Number(String(track.source.id).split('_').pop())] : [],
	);
	let nextIdNumber = Math.max(0, ...idNumbers, ...trackDrafts.map(track => Number(track.source?.track_no ?? 0))) + 1;

	const tracks: BundleTrack[] = [];
	trackDrafts
		.filter(track => track.source || !isBlankNewTrack(track))
		.forEach((track, index) => {
			const trackNo = index + 1;
			if (!track.title.trim()) throw new Error(`수록곡 ${trackNo}번: 제목을 입력하십시오.`);

			const values: TableRow = {
				track_no: trackNo,
				side: isVinyl ? track.side.trim() || null : null,
				title: track.title.trim(),
				title_en: track.titleEn.trim(),
				duration: track.duration.trim() || null,
				is_lead: track.isLead,
				// 이전에 임시 저장한 곡에는 이 두 값이 없을 수 있다.
				is_cd_only: Boolean(track.isCdOnly),
				is_age_restricted: Boolean(track.isAgeRestricted),
				lyricists: cleanNames(track.lyricists),
				composers: cleanNames(track.composers),
				arrangers: cleanNames(track.arrangers),
			};

			if (track.source) {
				const previousTrackNo = Number(track.source.track_no);
				tracks.push({
					id: String(track.source.id),
					isNew: false,
					values,
					isMoved: previousTrackNo !== trackNo,
					previousTrackNo,
					isUnchanged: isSameValues(values, track.source),
				});
				return;
			}
			const id = `TRK_${albumId}_${String(nextIdNumber++).padStart(3, '0')}`;
			tracks.push({
				id,
				isNew: true,
				values: { id, album_id: albumId, ...values },
				isMoved: false,
				isUnchanged: false,
			});
		});

	return { albumId, album, links, removedLinkIds, tracks };
};
