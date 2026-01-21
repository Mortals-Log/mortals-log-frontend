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
		fileName: 'graduation',
		releaseDate: '2025. 11. 21',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		title: '꽃순이',
		fileName: 'flower',
		releaseDate: '2025. 06. 13',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		title: '나는 기계가 싫어요',
		fileName: 'machine',
		releaseDate: '2024. 11. 11',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		title: '천진우 캐롤 모음집',
		fileName: 'carols',
		releaseDate: '2023. 12. 01',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		title: '푸줏간',
		fileName: 'butcher',
		releaseDate: '2023. 04. 01',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		title: '명상좀비',
		fileName: 'zombie',
		releaseDate: '2022. 11. 21',
		store: '#',
		musicVideo: '#',
	},
];

const EP_ALBUMS: Album[] = [
	{
		type: 'EP',
		title: '굴다리',
		fileName: 'underpass',
		releaseDate: '2022. 08. 20',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'EP',
		title: '일기장',
		fileName: 'diary',
		releaseDate: '2023. 07. 07',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'EP',
		title: '귀천',
		fileName: 'back-to-haeven',
		releaseDate: '2024. 09. 09',
		store: '#',
		musicVideo: '#',
	},
];

const SP_ALBUMS: Album[] = [
	{
		type: 'SP',
		title: '속편',
		fileName: 'sequel',
		releaseDate: '2023. 01. 25',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'SP',
		title: '인간쓰레기',
		fileName: 'human-trash',
		releaseDate: '2024. 03. 03',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'SP',
		title: '고백',
		fileName: 'confession',
		releaseDate: '2024. 04. 04',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'SP',
		title: '세모 네모 동그라미',
		fileName: 'shapes',
		releaseDate: '2024. 05. 05',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'SP',
		title: '이별이 그대는 쉽나요',
		fileName: 'parting',
		releaseDate: '2024. 06. 13',
		store: '#',
		musicVideo: '#',
	},
];

const LV_ALBUMS: Album[] = [
	{
		type: 'LV',
		title: '천진우 라이브',
		fileName: 'live-v1',
		releaseDate: '2024. 01. 11',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LV',
		title: '천진우 라이브2',
		fileName: 'live-v2',
		releaseDate: '2025. 02. 09',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LV',
		title: '구토유발자들',
		fileName: 'nauseators',
		releaseDate: '2025. 04. 18',
		store: '#',
		musicVideo: '#',
	},
];

const VN_ALBUMS: Album[] = [
	{
		type: 'VN',
		title: '[네이버] 천진우 [굴다리] 바이닐 (LP 앨범)',
		fileName: 'underpass',
		releaseDate: '2024. 04. 24',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'VN',
		title: '[김밥레코즈] 천진우 / 굴다리 (12" Marble Colored Vinyl)',
		fileName: 'underpass',
		releaseDate: '2024. 04. 24',
		store: '#',
		musicVideo: '#',
	},
];

export const ALL_ALBUMS = [...LP_ALBUMS, ...EP_ALBUMS, ...SP_ALBUMS, ...LV_ALBUMS, ...VN_ALBUMS].sort(
	(a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime(),
);

export { LP_ALBUMS, EP_ALBUMS, VN_ALBUMS };
