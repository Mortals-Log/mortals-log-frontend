// @/utils/tracks

/* eslint-disable storybook/default-exports */

import { FULL_ALBUMS } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';
import { Track } from '@/types/track';

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

export const IsTrackMatch = (track: Track, slugFromUrl: string) => {
	const decodedSlug = decodeURIComponent(slugFromUrl).toLowerCase();
	const normalize = (text: string) => text.toLowerCase().replace(/[\s\-_.]/g, '');

	const normalizedSlug = normalize(decodedSlug);
	const isTitleMatch = normalize(track.id) === normalizedSlug || normalize(track.title) === normalizedSlug;

	if (decodedSlug.includes('_live') && track.id.startsWith('TRK_LV')) {
		const titlePart = decodedSlug.split('_')[0];
		return normalize(track.title) === normalize(titlePart);
	}

	if (decodedSlug.includes('_')) {
		const [titlePart, versionPart] = decodedSlug.split('_');

		const isBaseTitleMatch = normalize(track.title) === normalize(titlePart);

		const isVersionMatch = track.version ? normalize(track.version).includes(normalize(versionPart)) : false;

		return isBaseTitleMatch && isVersionMatch;
	}

	return isTitleMatch;
};
