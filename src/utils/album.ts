/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import { Album } from '@/types/album';

export const GetLatestAlbum = (albumList: Album[]): Album | undefined => {
	if (albumList.length === 0) return undefined;
	return [...albumList].sort(
		(a, b) =>
			new Date(b.releaseDate.replace(/\.\s*/g, '-')).getTime() -
			new Date(a.releaseDate.replace(/\.\s*/g, '-')).getTime(),
	)[0];
};

export const GetAlbumCoverPath = (album: Album) => {
	if (!album.fileName) return '/images/albums/default.webp';
	const year = album.releaseDate.split('.')[0].trim();
	return `/images/albums/${album.type}_${year}_${album.fileName}.webp`;
};
