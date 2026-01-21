// @const/albums.ts

/* eslint-disable storybook/default-exports */

import { Album } from '@/types/album';

export const ALBUM_TYPE_LABEL: Record<string, string> = {
	LP: '정규 앨범',
	EP: 'EP',
	SP: '싱글 앨범',
	LV: '라이브 앨범',
	VN: '바이닐(Vinyl)',
};

const LP_ALBUMS: Album[] = [
	{
		type: 'LP',
		title: '졸업앨범',
		releaseDate: '2025. 11. 21',
		coverImage: '#',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		title: '꽃순이',
		releaseDate: '2025. 06. 13',
		coverImage: '#',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		title: '나는 기계가 싫어요',
		releaseDate: '2024. 11. 11',
		coverImage: '#',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		title: '천진우 캐롤 모음집',
		releaseDate: '2023. 12. 01',
		coverImage: '#',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		title: '푸줏간',
		releaseDate: '2023. 04. 01',
		coverImage: '#',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		title: '명상좀비',
		releaseDate: '2022. 11. 21',
		coverImage: '#',
		store: '#',
		musicVideo: '#',
	},
];

const EP_ALBUMS: Album[] = [
	// EP 추가 예정
	{
		type: 'EP',
		title: '굴다리',
		releaseDate: '2022. 08. 20',
		coverImage: '#',
		store: '#',
		musicVideo: '#',
	},
];

const SP_ALBUMS: Album[] = [
	// 싱글 앨범 추가 예정
];

const LV_ALBUMS: Album[] = [
	// 라이브 앨범 추가 예정
];

const VN_ALBUMS: Album[] = [
	// 바이닐 추가 예정
];

export const ALL_ALBUMS = [...LP_ALBUMS, ...EP_ALBUMS, ...SP_ALBUMS, ...LV_ALBUMS, ...VN_ALBUMS].sort(
	(a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
);

export { LP_ALBUMS, EP_ALBUMS, VN_ALBUMS };
