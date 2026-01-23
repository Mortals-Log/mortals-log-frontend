/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import { Album, AlbumList } from '@/types/album';

export const GetLatestAlbum = (fullAlbums: AlbumList): Album | undefined => {
	if (!fullAlbums || fullAlbums.length === 0 || !fullAlbums[0].items || fullAlbums[0].items.length === 0) {
		return undefined;
	}

	return fullAlbums[0].items[0];
};

export const GetAlbumCoverPath = (album: Album) => {
	if (!album.fileName) return '/images/albums/default.webp';
	const year = album.releaseDate.split('.')[0].trim();
	return `/images/albums/${album.type}_${year}_${album.fileName}.webp`;
};
