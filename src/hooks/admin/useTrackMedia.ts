'use client';

// @/hooks/admin/useTrackMedia
// "노래방" 탭과 "MV" 탭의 상태 (kind 로 구분). 해당 항목(노래방 번호 또는 뮤직비디오)이 이미 등록된 곡만 목록에 올리고,
// 입력칸으로 고친 곡만 한 번에 저장한다. 새로 등록하려면 "추가"로 이미 있는 곡을 목록에 올린 뒤 입력한다.
// 삭제는 곡이 아니라 그 탭의 항목만 비운다. 다른 탭의 항목은 읽지도 쓰지도 않는다.
// 입력칸은 모두 글자라서 저장할 때 형식을 확인한다 (뮤직비디오는 YouTube 주소/ID → 영상 ID).

import { useCallback, useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { fetchTableRows } from '@/apis/admin/table-rows';
import { updateTrackMedia, type TrackMediaUpdate } from '@/apis/admin/track-media';
import { TRACKS } from '@/views/Admin/admin-tables';
import { useAdminLookups } from '@/views/Admin/AdminLookups';
import { extractYoutubeId, type TableRow } from '@/views/Admin/form-codec';

/** 노래방 번호 칸은 항상 보이는 기본 카테고리. 데이터에 다른 카테고리가 있으면 그 칸도 보인다. */
const DEFAULT_KARAOKE_CATEGORIES = ['tj', 'ky'];

const COLUMNS = 'id,album_id,track_no,side,title,version,karaoke_numbers,music_video_youtube_id';

export type TrackMediaKind = 'karaoke' | 'video';

export interface TrackMediaRow {
	id: string;
	albumId: string;
	title: string;
	version: string;
	/** 카테고리 → 번호 (저장된 값) */
	karaoke: Record<string, string>;
	videoId: string;
}

export interface TrackMediaInput {
	karaoke: Record<string, string>;
	video: string;
}

const toRow = (row: TableRow): TrackMediaRow => ({
	id: String(row.id),
	albumId: String(row.album_id),
	title: String(row.title),
	version: row.version ? String(row.version) : '',
	karaoke: Object.fromEntries(
		Object.entries((row.karaoke_numbers as Record<string, unknown> | null) ?? {}).map(([category, number]) => [
			category,
			String(number),
		]),
	),
	videoId: row.music_video_youtube_id ? String(row.music_video_youtube_id) : '',
});

const toInput = (row: TrackMediaRow): TrackMediaInput => ({ karaoke: { ...row.karaoke }, video: row.videoId });

/** 그 탭의 항목이 저장되어 있는 곡 = 등록된 곡 */
const hasSavedMedia = (row: TrackMediaRow, kind: TrackMediaKind): boolean =>
	kind === 'video' ? row.videoId.trim() !== '' : Object.values(row.karaoke).some(number => number.trim() !== '');

const isChanged = (row: TrackMediaRow, input: TrackMediaInput, kind: TrackMediaKind): boolean =>
	kind === 'video'
		? input.video.trim() !== row.videoId.trim()
		: toKaraokeKey(input.karaoke) !== toKaraokeKey(row.karaoke);

/** 비교용: 키 순서와 앞뒤 공백이 달라도 같은 값이면 같은 문자열 */
const toKaraokeKey = (karaoke: Record<string, string>): string =>
	JSON.stringify(
		Object.entries(karaoke)
			.map(([category, number]) => [category, number.trim()] as const)
			.filter(([, number]) => number !== '')
			.sort(([a], [b]) => a.localeCompare(b)),
	);

/** 입력칸 값을 그 탭의 저장할 값으로 바꾼다. 알아볼 수 없는 뮤직비디오는 오류. */
const toSavedValues = (row: TrackMediaRow, input: TrackMediaInput, kind: TrackMediaKind) => {
	if (kind === 'video') {
		const videoText = input.video.trim();
		const youtubeId = videoText === '' ? null : extractYoutubeId(videoText);
		if (videoText !== '' && !youtubeId) {
			throw new Error(`${row.title}: 뮤직비디오는 YouTube 주소나 영상 ID(11자)로 입력하십시오.`);
		}
		return { musicVideoYoutubeId: youtubeId };
	}
	const karaokeEntries = Object.entries(input.karaoke)
		.map(([category, number]) => [category, number.trim()] as const)
		.filter(([, number]) => number !== '');
	return { karaokeNumbers: karaokeEntries.length > 0 ? Object.fromEntries(karaokeEntries) : null };
};

const EMPTY_VALUES = { karaoke: { karaokeNumbers: null }, video: { musicVideoYoutubeId: null } } as const;

export const useTrackMedia = (kind: TrackMediaKind) => {
	const { lookups, reload: reloadLookups } = useAdminLookups();
	const [reloadCount, setReloadCount] = useState(0);
	const [rows, setRows] = useState<TrackMediaRow[] | null>(null);
	const [inputs, setInputs] = useState<Record<string, TrackMediaInput>>({});
	/** "추가"로 목록에 올렸지만 아직 저장하지 않은 곡 */
	const [addedIds, setAddedIds] = useState<string[]>([]);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		let isCancelled = false;
		fetchTableRows(TRACKS, COLUMNS)
			.then(loaded => {
				if (isCancelled) return;
				const nextRows = loaded.map(toRow);
				setRows(nextRows);
				setInputs(Object.fromEntries(nextRows.map(row => [row.id, toInput(row)])));
				setErrorMessage(null);
			})
			.catch((error: unknown) => {
				if (!isCancelled) setErrorMessage(error instanceof Error ? error.message : '곡을 불러오지 못했습니다.');
			});
		return () => {
			isCancelled = true;
		};
	}, [reloadCount]);

	/** 노래방 번호 칸: 기본 카테고리 + 데이터에 있는 다른 카테고리 */
	const categories = useMemo(
		() => [...new Set([...DEFAULT_KARAOKE_CATEGORIES, ...lookups.vocab.karaoke])],
		[lookups.vocab.karaoke],
	);

	/** 목록에 보이는 곡: 이미 등록된 곡 + 방금 추가한 곡 */
	const registeredRows = useMemo(
		() => (rows ?? []).filter(row => hasSavedMedia(row, kind) || addedIds.includes(row.id)),
		[rows, addedIds, kind],
	);

	/** "추가"로 고를 수 있는 곡: 아직 목록에 없는, 이미 있는 곡 */
	const candidates = useMemo(
		() => (rows ?? []).filter(row => !hasSavedMedia(row, kind) && !addedIds.includes(row.id)),
		[rows, addedIds, kind],
	);

	const changedIds = useMemo(
		() =>
			(rows ?? [])
				.filter(row => {
					const input = inputs[row.id];
					return input ? isChanged(row, input, kind) : false;
				})
				.map(row => row.id),
		[rows, inputs, kind],
	);

	const setKaraoke = useCallback((trackId: string, category: string, number: string) => {
		setInputs(previous => ({
			...previous,
			[trackId]: { ...previous[trackId], karaoke: { ...previous[trackId].karaoke, [category]: number } },
		}));
	}, []);

	const setVideo = useCallback((trackId: string, video: string) => {
		setInputs(previous => ({ ...previous, [trackId]: { ...previous[trackId], video } }));
	}, []);

	const addTrack = useCallback((trackId: string) => {
		setAddedIds(previous => (previous.includes(trackId) ? previous : [...previous, trackId]));
	}, []);

	/** 저장하지 않은 변경과 추가한 곡을 모두 되돌린다. */
	const discardChanges = useCallback(() => {
		setInputs(Object.fromEntries((rows ?? []).map(row => [row.id, toInput(row)])));
		setAddedIds([]);
	}, [rows]);

	const save = async () => {
		const changedRows = (rows ?? []).filter(row => changedIds.includes(row.id));
		if (changedRows.length === 0) return;

		let updates: TrackMediaUpdate[];
		try {
			updates = changedRows.map(row => ({ id: row.id, title: row.title, ...toSavedValues(row, inputs[row.id], kind) }));
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '입력을 확인하십시오.');
			return;
		}

		setIsSaving(true);
		try {
			await updateTrackMedia(updates);
			toast.success(`${updates.length}곡을 저장했습니다. 사이트에 반영하려면 배포하십시오.`);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '저장하지 못했습니다.');
		} finally {
			// 일부만 저장됐을 수 있으므로 성공/실패와 관계없이 DB 의 현재 값으로 다시 맞춘다.
			setIsSaving(false);
			setAddedIds([]);
			setReloadCount(count => count + 1);
			reloadLookups();
		}
	};

	/**
	 * 곡의 이 탭 항목(노래방 번호 또는 뮤직비디오)을 지우고 목록에서 뺀다. 곡과 다른 항목은 남고, 다른 곡의 저장하지 않은 입력도 그대로 둔다.
	 * 저장된 값이 없는 곡(방금 추가만 한 곡)은 DB 요청 없이 목록에서만 뺀다.
	 */
	const remove = async (row: TrackMediaRow) => {
		if (hasSavedMedia(row, kind)) {
			setIsSaving(true);
			try {
				await updateTrackMedia([{ id: row.id, title: row.title, ...EMPTY_VALUES[kind] }]);
			} catch (error) {
				toast.error(error instanceof Error ? error.message : '삭제하지 못했습니다.');
				setIsSaving(false);
				return;
			}
			setIsSaving(false);
			reloadLookups();
			toast.success('삭제했습니다. 사이트에 반영하려면 배포하십시오.');
		}
		const emptied = kind === 'video' ? { videoId: '' } : { karaoke: {} };
		setRows(previous =>
			previous ? previous.map(item => (item.id === row.id ? { ...item, ...emptied } : item)) : previous,
		);
		setInputs(previous => ({
			...previous,
			[row.id]: kind === 'video' ? { ...previous[row.id], video: '' } : { ...previous[row.id], karaoke: {} },
		}));
		setAddedIds(previous => previous.filter(id => id !== row.id));
	};

	return {
		rows,
		registeredRows,
		candidates,
		inputs,
		categories,
		changedIds,
		errorMessage,
		isSaving,
		setKaraoke,
		setVideo,
		addTrack,
		remove,
		discardChanges,
		save,
	};
};
