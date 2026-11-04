// scripts/verify-mappers
// src/const -> 행(buildRows) -> 매퍼(mapContentRows) 를 거친 결과가 원래 상수와 같은지 확인한다.
// DB 접근 없이 동작한다.   pnpm tsx scripts/verify-mappers.ts

import assert from 'node:assert/strict';
import { mapContentRows } from '@/apis/content/mappers';
import { FULL_ALBUMS } from '@/const/fixtures/albums';
import { MASTER_CHORDS } from '@/const/fixtures/chords';
import { FULL_CONCERTS } from '@/const/fixtures/concert';
import { EVENT_INTERVIEW, FULL_EVENTS } from '@/const/fixtures/event';
import { MASTER_TRACKS } from '@/const/fixtures/tracks';
import type { AlbumList } from '@/types/album';
import type { ConcertList } from '@/types/concert';
import type { Track } from '@/types/track';
import { buildRows } from './seed-rows';

const results: { name: string; error?: string }[] = [];

const check = (name: string, run: () => void) => {
	try {
		run();
		results.push({ name });
	} catch (error) {
		results.push({ name, error: error instanceof Error ? error.message.slice(0, 1200) : String(error) });
	}
};

// 'TRK_LP01_*' 를 fixtures 의 트랙 id 로 푼다. (앱의 GetTracks 는 이제 스냅샷을 보므로 쓰지 않는다)
const GetTracks = (patterns: string[]): string[] =>
	patterns.flatMap(pattern =>
		pattern.endsWith('*')
			? Object.keys(MASTER_TRACKS)
					.filter(id => id.startsWith(pattern.slice(0, -1)))
					.sort()
			: pattern,
	);

// 원본 앨범은 'TRK_LP01_*' 와일드카드로, 매퍼는 실제 id 배열로 수록곡을 표현한다. 둘 다 id 로 풀어서 비교한다.
const expandAlbumTracks = (albums: AlbumList): AlbumList =>
	albums.map(group => ({
		...group,
		items: group.items.map(album => {
			if (!album.tracks) return album;

			const tracks = Array.isArray(album.tracks)
				? GetTracks(album.tracks)
				: Object.fromEntries(Object.entries(album.tracks).map(([section, ids]) => [section, GetTracks(ids)]));

			return { ...album, tracks };
		}),
	}));

// deepStrictEqual 은 객체 키 순서를 비교하지 않는다. 키 순서가 곧 화면 표시 순서인 중첩 레코드
// (스트리밍·구매 링크, 가격 종류, 노래방 번호)는 키 목록을 따로 비교한다. (jsonb 가 순서를 잃어 한 번 회귀를 만들었다)
const getOrderedKeySequences = (albums: AlbumList, concerts: ConcertList, tracks: Record<string, Track>) => ({
	store: albums
		.flatMap(group => group.items)
		.map(album => (album.store && typeof album.store === 'object' ? Object.keys(album.store) : null)),
	streaming: albums.flatMap(group => group.items).map(album => (album.streaming ? Object.keys(album.streaming) : null)),
	price: concerts.flatMap(group => group.items).map(item => (item.price ? Object.keys(item.price) : null)),
	singing: Object.values(tracks).map(track => (track.singing ? Object.keys(track.singing) : null)),
});

const data = mapContentRows(buildRows());

check('tracks == MASTER_TRACKS', () => assert.deepStrictEqual(data.tracks, MASTER_TRACKS));
check('tracks 키 순서 == MASTER_TRACKS', () =>
	assert.deepStrictEqual(Object.keys(data.tracks), Object.keys(MASTER_TRACKS)),
);
check('chords == MASTER_CHORDS', () => assert.deepStrictEqual(data.chords, MASTER_CHORDS));
check('albums == FULL_ALBUMS (수록곡은 id 로 풀어서)', () =>
	assert.deepStrictEqual(expandAlbumTracks(data.albums), expandAlbumTracks(FULL_ALBUMS)),
);
check('concerts == FULL_CONCERTS', () => assert.deepStrictEqual(data.concerts, FULL_CONCERTS));
check('events == FULL_EVENTS', () => assert.deepStrictEqual(data.events, FULL_EVENTS));
check('interviews == EVENT_INTERVIEW', () => assert.deepStrictEqual(data.interviews, EVENT_INTERVIEW));
check('표시 순서가 있는 중첩 레코드의 키 순서 (store/streaming/price/singing)', () =>
	assert.deepStrictEqual(
		getOrderedKeySequences(data.albums, data.concerts, data.tracks),
		getOrderedKeySequences(FULL_ALBUMS, FULL_CONCERTS, MASTER_TRACKS),
	),
);

results.forEach(({ name, error }) => console.info(`${error ? 'FAIL' : 'PASS'}  ${name}${error ? `\n${error}\n` : ''}`));

const failedCount = results.filter(result => result.error).length;
console.info(`\n${results.length - failedCount}/${results.length} passed`);
process.exit(failedCount === 0 ? 0 : 1);
