// @/utils/album

/* eslint-disable storybook/default-exports */

import { Album, AlbumList } from '@/types/album';
import { GetSlug } from '@/utils/urlSlug';

export const GetLatestAlbum = (fullAlbums: AlbumList): Album | undefined => {
	if (!fullAlbums?.[0]?.items?.length) return undefined;
	return fullAlbums[0].items[0];
};

const GetAlbumImageKey = (album: Album) => {
	// todo: dummy에서는 .으로 db에서는 -으로 분리하고 있어 나중에 수정 필요
	const year = album.releaseDate.split(/[.-]/)[0].trim();
	const safeCoverImage = album.coverImage?.trim() || 'default';

	return `${album.type}_${year}_${safeCoverImage}`;
};

export const GetAlbumPaths = (album: Album) => {
	const key = GetAlbumImageKey(album);
	const slug = GetSlug(album.title);

	return {
		key,
		imageSrc: album.coverImage ? `/images/albums/${key}.webp` : '/images/default.webp',
		detailUrl: `/album/${slug}`,
	};
};

export const IsAlbumMatch = (album: any, slugFromUrl: string) => {
	if (!slugFromUrl || !album) return false;

	// todo: 현재 더미 데이터에서의 필드명(title)과 DB에서의 필드명(albumTitle)이 차이 발생 / 나중에 수정 필요
	const rawTitle = album.title || album.albumTitle;
	if (!rawTitle) return false;

	const decodedSlug = decodeURIComponent(slugFromUrl).toLowerCase();
	const targetTitle = String(rawTitle)
		.toLowerCase()
		.replace(/[\s-_.]/g, '');
	const urlSlug = decodedSlug.replace(/[\s-_.]/g, '');

	return targetTitle === urlSlug;
};
