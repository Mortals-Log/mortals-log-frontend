// @/utils/album

/* eslint-disable storybook/default-exports */

import { Album, AlbumList } from '@/types/album';
import { GetSlug } from '@/utils/urlSlug';

export const GetLatestAlbum = (fullAlbums: AlbumList): Album | undefined => {
	if (!fullAlbums?.[0]?.items?.length) return undefined;
	return fullAlbums[0].items[0];
};

const GetAlbumImageKey = (album: Album) => {
	const year = album.releaseDate.split('.')[0].trim();
	const safeFileName = album.fileName?.trim() || 'default';

	return `${album.type}_${year}_${safeFileName}`;
};

export const GetAlbumPaths = (album: Album) => {
	const key = GetAlbumImageKey(album);
	const slug = GetSlug(album.title);

	return {
		key,
		imageSrc: album.fileName ? `/images/albums/${key}.webp` : '/images/default.webp',
		detailUrl: `/album/${slug}`,
	};
};

export const IsAlbumMatch = (album: Album, slugFromUrl: string) => {
	if (!slugFromUrl) return false;

	const decodedSlug = decodeURIComponent(slugFromUrl).toLowerCase();
	const targetTitle = album.title.toLowerCase().replace(/[\s-]/g, '');
	const urlSlug = decodedSlug.replace(/[\s-]/g, '');

	return targetTitle === urlSlug;
};
