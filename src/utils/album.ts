/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import { Album } from '@/types/album';

export const GetLatestAlbum = (albumList: Album[]): Album | undefined => {
	if (albumList.length === 0) return undefined;
	return [...albumList].sort(
		(a, b) =>
			new Date(b.releaseDate.replace(/\./g, '-')).getTime() - new Date(a.releaseDate.replace(/\./g, '-')).getTime(),
	)[0];
};
