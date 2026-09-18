// @/utils/tracks

/* eslint-disable storybook/default-exports */

import { FULL_ALBUMS } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';
import { Track } from '@/types/track';

export const GetTrackSlug = (track: Track): string => {
	let slug = track.title;

	if (track.id.startsWith('TRK_LV')) {
		const hasLiveTag = track.version?.toLowerCase().includes('live');

		if (!hasLiveTag) {
			slug = `${track.title}_Live`;
		} else if (track.version) {
			slug = `${track.title}_${track.version}`;
		}
	} else if (track.version) {
		slug = `${track.title}_${track.version}`;
	}

	return slug;
};

export const GetTracks = (tracks: string[] | Record<string, string[]>): string[] => {
	if (!Array.isArray(tracks)) {
		const allIds = Object.values(tracks).flat();
		return Wildcards(allIds);
	}

	return Wildcards(tracks);
};

const Wildcards = (patterns: string[]): string[] => {
	return patterns.flatMap(pattern => {
		if (pattern.endsWith('*')) {
			const prefix = pattern.slice(0, -1);
			return Object.keys(MASTER_TRACKS)
				.filter(id => id.startsWith(prefix))
				.sort();
		}
		return pattern;
	});
};

export const GetTrackToAlbumMap = () => {
	const map = new Map();
	const allTrackIds = Object.keys(MASTER_TRACKS);

	FULL_ALBUMS.forEach(({ items }) => {
		items.forEach(({ tracks, title, releaseDate }) => {
			const albumInfo = { albumTitle: title, releaseDate };

			const trackList = Array.isArray(tracks) ? tracks : Object.values(tracks || {}).flat();

			trackList.forEach((t: any) => {
				if (typeof t === 'string' && t.includes('*')) {
					const pattern = t.replace('*', '');
					allTrackIds.forEach(id => {
						if (id.startsWith(pattern) && !map.has(id)) {
							map.set(id, albumInfo);
						}
					});
				} else if (!map.has(t)) {
					map.set(t, albumInfo);
				}
			});
		});
	});
	return map;
};

const NormalizeSlug = (text: string): string => text.toLowerCase().replace(/[\s\-_.]/g, '');

const BuildSlugToTrackIdMap = (): Map<string, string> => {
	const map = new Map<string, string>();

	Object.values(MASTER_TRACKS).forEach(track => {
		[GetTrackSlug(track), track.id].forEach(candidate => {
			const key = NormalizeSlug(candidate);
			const existingId = map.get(key);

			if (existingId && existingId !== track.id) {
				throw new Error(`Duplicate track slug "${key}" for ${existingId} and ${track.id}`);
			}

			map.set(key, track.id);
		});
	});

	return map;
};

const SLUG_TO_TRACK_ID = BuildSlugToTrackIdMap();

export const GetTrackByUrlSlug = (slugFromUrl: string): Track | undefined => {
	const trackId = SLUG_TO_TRACK_ID.get(NormalizeSlug(decodeURIComponent(slugFromUrl)));
	return trackId ? MASTER_TRACKS[trackId] : undefined;
};

export interface OriginalTrackRef {
	id: string;
	slug: string;
	title: string;
}

export const GetOriginalTracks = (track: Track): OriginalTrackRef[] => {
	if (!track.originalTrackIds?.length) return [];

	return track.originalTrackIds
		.map(id => MASTER_TRACKS[id])
		.filter((t): t is Track => !!t)
		.map(t => ({ id: t.id, slug: GetTrackSlug(t), title: t.title }));
};
