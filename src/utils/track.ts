// @util/tracks.ts

/* eslint-disable storybook/default-exports */

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
