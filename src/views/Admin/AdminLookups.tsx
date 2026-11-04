'use client';

// @/views/Admin/AdminLookups
// 앨범·곡·원곡 관계·라인업 이름·"기존에 쓴 값" 목록을 한 번 불러 모든 화면이 함께 쓴다
// (앨범 이름 표시, 앨범/곡 선택, 번호 자동 채움, 플랫폼·장르 등의 드롭다운).
// reload() 는 저장한 뒤 부른다. 다시 불러오는 동안에는 이전 데이터를 그대로 보여준다.

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { fetchTableRows } from '@/apis/admin/table-rows';
import { MEMBERS } from '@/const/members';
import { ALBUMS, ALBUM_LINKS, CONCERTS, MEDIA_APPEARANCES, TRACK_CHORDS, TRACKS, TRACK_ORIGINS } from './admin-tables';
import { EMPTY_VOCAB, type Lookups, type TableRow, type VocabKey } from './form-codec';

const EMPTY_LOOKUPS: Lookups = {
	albums: [],
	tracks: [],
	origins: [],
	lineupNames: [],
	chordTrackIds: [],
	vocab: EMPTY_VOCAB,
};

interface LookupsState {
	lookups: Lookups;
	isReady: boolean;
	errorMessage: string | null;
	reload: () => void;
}

export const AdminLookupsContext = createContext<LookupsState>({
	lookups: EMPTY_LOOKUPS,
	isReady: false,
	errorMessage: null,
	reload: () => undefined,
});

/** 값들을 많이 쓴 순서로 중복 없이 모은다 (같은 횟수면 먼저 나온 순). */
const collectByFrequency = (values: unknown[]): string[] => {
	const counts = new Map<string, number>();
	for (const value of values) {
		const text = typeof value === 'string' ? value.trim() : '';
		if (text) counts.set(text, (counts.get(text) ?? 0) + 1);
	}
	return [...counts.keys()].sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0));
};

const getArray = (row: TableRow, column: string): unknown[] => (Array.isArray(row[column]) ? row[column] : []);

/** 정해 둔 멤버 이름을 앞에, 지난 공연에서 쓴 다른 이름을 많이 쓴 순서로 뒤에 둔다. */
const getLineupNames = (concerts: TableRow[]): string[] => {
	const usedNames = collectByFrequency(concerts.flatMap(concert => getArray(concert, 'lineup')));
	const fixedNames: string[] = Object.values(MEMBERS);
	return [...fixedNames, ...usedNames.filter(name => !fixedNames.includes(name))];
};

const getVocab = (
	albums: TableRow[],
	links: TableRow[],
	tracks: TableRow[],
	media: TableRow[],
): Record<VocabKey, string[]> => ({
	linkPlatforms: collectByFrequency(links.map(link => link.platform)),
	mediaPlatforms: collectByFrequency(media.map(item => item.platform)),
	genres: collectByFrequency(albums.flatMap(album => getArray(album, 'genres'))),
	styles: collectByFrequency(albums.flatMap(album => getArray(album, 'styles'))),
	people: collectByFrequency(
		tracks.flatMap(track => [
			...getArray(track, 'lyricists'),
			...getArray(track, 'composers'),
			...getArray(track, 'arrangers'),
		]),
	),
	sides: collectByFrequency(tracks.map(track => track.side)),
	versions: collectByFrequency(tracks.map(track => track.version)),
	karaoke: collectByFrequency(tracks.flatMap(track => Object.keys((track.karaoke_numbers as object | null) ?? {}))),
});

const fetchLookups = async (): Promise<Lookups> => {
	const [albums, links, tracks, origins, concerts, media, chords] = await Promise.all([
		fetchTableRows(ALBUMS),
		fetchTableRows(ALBUM_LINKS, 'platform'),
		fetchTableRows(TRACKS, 'id,album_id,track_no,title,side,version,lyricists,composers,arrangers,karaoke_numbers'),
		fetchTableRows(TRACK_ORIGINS),
		fetchTableRows(CONCERTS, 'lineup'),
		fetchTableRows(MEDIA_APPEARANCES, 'platform'),
		fetchTableRows(TRACK_CHORDS, 'track_id'),
	]);
	return {
		albums,
		tracks,
		origins,
		lineupNames: getLineupNames(concerts),
		chordTrackIds: chords.map(chord => String(chord.track_id)),
		vocab: getVocab(albums, links, tracks, media),
	};
};

interface LoadResult {
	lookups: Lookups | null;
	errorMessage: string | null;
}

export const AdminLookupsProvider = ({ children }: { children: ReactNode }) => {
	const [reloadCount, setReloadCount] = useState(0);
	const [result, setResult] = useState<LoadResult | null>(null);

	useEffect(() => {
		let isCancelled = false;
		fetchLookups()
			.then((lookups): LoadResult => ({ lookups, errorMessage: null }))
			.catch((error: unknown): LoadResult => ({
				lookups: null,
				errorMessage: error instanceof Error ? error.message : '참조 데이터를 불러오지 못했습니다.',
			}))
			.then(next => {
				// 다시 불러오다 실패해도 이전에 불러온 데이터는 그대로 둔다.
				if (!isCancelled) {
					setResult(previous => ({
						lookups: next.lookups ?? previous?.lookups ?? null,
						errorMessage: next.errorMessage,
					}));
				}
			});
		return () => {
			isCancelled = true;
		};
	}, [reloadCount]);

	const reload = useCallback(() => setReloadCount(count => count + 1), []);

	const state = useMemo<LookupsState>(
		() => ({
			lookups: result?.lookups ?? EMPTY_LOOKUPS,
			isReady: result?.lookups != null,
			errorMessage: result?.errorMessage ?? null,
			reload,
		}),
		[result, reload],
	);

	return <AdminLookupsContext.Provider value={state}>{children}</AdminLookupsContext.Provider>;
};

export const useAdminLookups = () => useContext(AdminLookupsContext);
