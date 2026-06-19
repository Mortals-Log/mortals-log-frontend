// @/const/albums

/* eslint-disable storybook/default-exports */

import { Album } from '@/types/album';
import { RequestApi } from '@/utils/api';

const getReleaseTime = (date: string) => {
	if (!date) return 0;
	return Number(String(date).replace(/[^0-9]/g, ''));
};

const sortAlbumsLatest = (albums: Album[]) => {
	if (!albums || !Array.isArray(albums)) return [];

	return [...albums].sort((a, b) => getReleaseTime(b.releaseDate) - getReleaseTime(a.releaseDate));
};

export const ALBUM_TYPE = {
	LP: 'LP',
	EP: 'EP',
	SP: 'SP',
	LV: 'LV',
	VN: 'VN',
} as const;

export const ALBUM_TYPE_LABEL: Record<string, string> = {
	[ALBUM_TYPE.LP]: '정규 앨범',
	[ALBUM_TYPE.EP]: 'EP',
	[ALBUM_TYPE.SP]: '싱글',
	[ALBUM_TYPE.LV]: '라이브 앨범',
	[ALBUM_TYPE.VN]: 'LP',
};

export let FULL_ALBUMS: any[] = [];
export let GET_LP_ALBUMS: any[] = [];
export let GET_EP_ALBUMS: any[] = [];
export let GET_SP_ALBUMS: any[] = [];
export let GET_LV_ALBUMS: any[] = [];
export let GET_VN_ALBUMS: any[] = [];

export const GET_FULL_ALBUMS = () => {
	return FULL_ALBUMS;
};

const listeners = new Set<() => void>();
export const Album_Store = {
	subscribe: (callback: () => void) => {
		listeners.add(callback);
		return () => listeners.delete(callback);
	},
	getSnapshot: () => FULL_ALBUMS,
};

const notifyStoreChanges = () => listeners.forEach(callback => callback());

const fetchAllAlbumsFromDB = async (): Promise<any[]> => {
	try {
		const dbData = await RequestApi('/api/v1/albums');
		return dbData.map((album: any) => ({
			...album,
			title: album.albumTitle,
			type: album.albumType,
		}));
	} catch (error) {
		console.error('[API Error] MySQL로부터 앨범 데이터를 불러오지 못했습니다:', error);
		return [];
	}
};

export const INIT_ALBUM_DATA = async (): Promise<any[]> => {
	try {
		const allDbData = await fetchAllAlbumsFromDB();

		GET_LP_ALBUMS = sortAlbumsLatest(allDbData.filter(db => db.type === ALBUM_TYPE.LP));
		GET_EP_ALBUMS = sortAlbumsLatest(allDbData.filter(db => db.type === ALBUM_TYPE.EP));
		GET_SP_ALBUMS = sortAlbumsLatest(allDbData.filter(db => db.type === ALBUM_TYPE.SP));
		GET_LV_ALBUMS = sortAlbumsLatest(allDbData.filter(db => db.type === ALBUM_TYPE.LV));
		GET_VN_ALBUMS = sortAlbumsLatest(allDbData.filter(db => db.type === ALBUM_TYPE.VN));

		const allAlbums = [...GET_LP_ALBUMS, ...GET_EP_ALBUMS, ...GET_SP_ALBUMS, ...GET_LV_ALBUMS, ...GET_VN_ALBUMS];
		const combinedMap: Record<string, any[]> = {};

		allAlbums.forEach(album => {
			const separator = album.releaseDate.includes('.') ? '.' : '-';
			const year = album.releaseDate.split(separator)[0].trim();
			if (!combinedMap[year]) combinedMap[year] = [];
			combinedMap[year].push(album);
		});

		const formattedResult = Object.keys(combinedMap)
			.sort((a, b) => Number(b) - Number(a))
			.map(year => ({
				year,
				items: sortAlbumsLatest(combinedMap[year]),
			}));

		FULL_ALBUMS = formattedResult;

		notifyStoreChanges();

		return formattedResult;
	} catch (error) {
		console.error('[Error] 전체 앨범 데이터 초기화 실패.', error);
		return [];
	}
};
