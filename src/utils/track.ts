// @/utils/tracks

/* eslint-disable storybook/default-exports */

import { FULL_ALBUMS } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';

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
