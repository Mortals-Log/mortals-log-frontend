// @/const/albums
// 앨범 데이터는 Supabase 스냅샷(@/generated/content)에서 온다. 수정은 관리자 페이지에서 한다.
// 손으로 쓰던 원본 데이터는 ./fixtures/albums.ts 에 보존되어 있다. (시드 / 검증 / 스토리용)

import { CONTENT } from '@/generated/content';
import type { Album, AlbumList } from '@/types/album';

export const ALBUM_TYPE_LABEL: Record<string, string> = {
	LP: '정규 앨범',
	EP: 'EP',
	SP: '싱글',
	LV: '라이브 앨범',
	VN: 'LP',
};

const getReleaseTime = (date: string) => Number(date.replace(/[^0-9]/g, ''));

const sortAlbumsLatest = (albums: Album[]) => {
	return [...albums].sort((a, b) => getReleaseTime(b.releaseDate) - getReleaseTime(a.releaseDate));
};

const getAlbumsByType = (type: Album['type']) =>
	sortAlbumsLatest(FULL_ALBUMS.flatMap(group => group.items).filter(album => album.type === type));

export const FULL_ALBUMS: AlbumList = CONTENT.albums;

export const GET_FULL_ALBUMS = () => FULL_ALBUMS;

export const GET_LP_ALBUMS = getAlbumsByType('LP');

export const GET_EP_ALBUMS = getAlbumsByType('EP');

export const GET_SP_ALBUMS = getAlbumsByType('SP');

export const GET_LV_ALBUMS = getAlbumsByType('LV');

export const GET_VN_ALBUMS = getAlbumsByType('VN');
