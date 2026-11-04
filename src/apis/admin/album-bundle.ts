// @/apis/admin/album-bundle
// 앨범 + 링크 + 수록곡을 한 번에 등록·수정한다. 한 요청으로 묶을 수 없어서 순서대로 저장한다.
// 등록은 중간에 실패하면 앨범을 지워 되돌린다(링크·곡은 앨범을 지우면 함께 지워진다).
// 수정은 되돌릴 수 없으므로 실패하면 일부만 저장됐을 수 있다고 알린다.

import { getSupabaseBrowserClient } from '@/lib/supabase-browser';
import { ALBUM_LINKS, ALBUMS, TRACKS } from '@/views/Admin/admin-tables';
import type { AlbumBundle } from '@/views/Admin/album-bulk';
import type { TableRow } from '@/views/Admin/form-codec';
import { removeImages } from './images';
import { deleteTableRow, insertTableRow, insertTableRows, updateTableRow } from './table-rows';

/** 곡 순서를 바꿀 때 임시로 쓰는 수록 번호의 시작값 (실제 번호와 겹치지 않게 크게 잡는다) */
const TEMP_TRACK_NO_BASE = 1000;
const TRACK_ORDER_MIGRATION = '20261104090100_track_order.sql';

const getMessage = (error: unknown): string => (error instanceof Error ? error.message : '저장하지 못했습니다.');

export interface AlbumChildren {
	links: TableRow[];
	tracks: TableRow[];
}

/** 앨범에 딸린 링크(스트리밍 먼저, 구매처 다음)와 수록곡을 모두 읽는다. */
export const fetchAlbumChildren = async (albumId: string): Promise<AlbumChildren> => {
	const client = getSupabaseBrowserClient();
	const [links, tracks] = await Promise.all([
		client.from('album_links').select('*').eq('album_id', albumId).order('sort_order'),
		client.from('tracks').select('*').eq('album_id', albumId).order('track_no'),
	]);
	if (links.error) throw new Error(`앨범 링크를 불러오지 못했습니다: ${links.error.message}`);
	if (tracks.error) throw new Error(`수록곡을 불러오지 못했습니다: ${tracks.error.message}`);

	const kindRank = (row: TableRow) => (row.kind === 'streaming' ? 0 : 1);
	return {
		links: [...(links.data ?? [])].sort(
			(a, b) => kindRank(a) - kindRank(b) || Number(a.sort_order) - Number(b.sort_order),
		),
		tracks: tracks.data ?? [],
	};
};

/** 새 앨범과 링크·곡을 등록한다. uploadedPaths 는 앨범 저장이 실패하면 함께 지울 이미지다. */
export const createAlbumBundle = async (bundle: AlbumBundle, uploadedPaths: string[]): Promise<void> => {
	try {
		await insertTableRow(ALBUMS, bundle.album);
	} catch (error) {
		await removeImages(uploadedPaths).catch(() => undefined);
		throw error;
	}

	try {
		const links = bundle.links.map(link => link.values);
		const tracks = bundle.tracks.map(track => track.values);
		if (links.length > 0) await insertTableRows(ALBUM_LINKS, links);
		if (tracks.length > 0) await insertTableRows(TRACKS, tracks);
	} catch (error) {
		const reason = getMessage(error);
		try {
			await deleteTableRow(ALBUMS, bundle.album);
		} catch {
			throw new Error(`${reason} 앨범 ${bundle.albumId} 가 일부만 등록됐을 수 있으니 앨범 목록에서 확인하십시오.`, {
				cause: error,
			});
		}
		await removeImages(uploadedPaths).catch(() => undefined);
		throw new Error(`${reason} 앨범 등록을 취소했습니다. 입력 내용을 확인하고 다시 시도하십시오.`, { cause: error });
	}
};

/**
 * 저장된 앨범을 고친다. 링크·곡은 (앨범, 구분/번호) 순서가 유일해야 해서, 순서가 바뀌는 항목을 먼저 임시 값으로 비켜 둔 뒤 반영한다.
 * 저장된 곡은 지우지 않고(앨범을 비공개로 숨긴다) 순서만 바꿀 수 있으며, 새 곡은 목록 위치에 추가한다.
 */
export const updateAlbumBundle = async (bundle: AlbumBundle, row: TableRow): Promise<void> => {
	const savedTracks = bundle.tracks.filter(candidate => !candidate.isNew);
	const movedTracks = savedTracks.filter(candidate => candidate.isMoved);

	try {
		// 수록 번호는 앨범 안에서 유일해야 하므로, 번호가 바뀌는 곡은 가장 먼저 임시 번호(1000 + 원래 번호)로 비켜 둔다.
		// 아직 마이그레이션을 적용하지 않았다면 이 첫 단계에서 멈추므로 아무것도 바뀌지 않는다.
		// 곡 ID 는 코드·원곡 관계가 참조하는 고정 식별자라 바꾸지 않는다.
		for (const track of movedTracks) {
			await updateTableRow(TRACKS, { id: track.id }, { track_no: TEMP_TRACK_NO_BASE + Number(track.previousTrackNo) });
		}

		await updateTableRow(ALBUMS, row, bundle.album);

		for (const id of bundle.removedLinkIds) await deleteTableRow(ALBUM_LINKS, { id });

		const savedLinks = bundle.links.filter(link => link.id !== undefined);
		for (const link of savedLinks.filter(candidate => candidate.isMoved)) {
			await updateTableRow(ALBUM_LINKS, { id: link.id }, { sort_order: -Number(link.id) });
		}
		for (const link of savedLinks.filter(candidate => !candidate.isUnchanged)) {
			await updateTableRow(ALBUM_LINKS, { id: link.id }, link.values);
		}
		const newLinks = bundle.links.filter(link => link.id === undefined).map(link => link.values);
		if (newLinks.length > 0) await insertTableRows(ALBUM_LINKS, newLinks);

		for (const track of savedTracks.filter(candidate => !candidate.isUnchanged)) {
			await updateTableRow(TRACKS, { id: track.id }, track.values);
		}
		const newTracks = bundle.tracks.filter(track => track.isNew).map(track => track.values);
		if (newTracks.length > 0) await insertTableRows(TRACKS, newTracks);
	} catch (error) {
		const reason = getMessage(error);
		if (reason.includes('tracks_id_matches_album_and_position')) {
			throw new Error(
				`곡 순서를 바꾸려면 마이그레이션 ${TRACK_ORDER_MIGRATION} 을 먼저 적용해야 합니다. 지금 데이터베이스는 곡 ID가 수록 번호와 같아야 한다는 규칙을 두고 있습니다. 아무것도 저장되지 않았습니다.`,
				{ cause: error },
			);
		}
		throw new Error(`${reason} 일부만 저장됐을 수 있습니다. 목록으로 돌아가 앨범을 다시 열어 확인하십시오.`, {
			cause: error,
		});
	}
};
