// @const/albums.ts

/* eslint-disable storybook/default-exports */

import { Album, AlbumList } from '@/types/album';

const getReleaseTime = (date: string) => Number(date.replace(/[^0-9]/g, ''));

const sortAlbumsLatest = (albums: Album[]) => {
	return [...albums].sort((a, b) => getReleaseTime(b.releaseDate) - getReleaseTime(a.releaseDate));
};

export const ALBUM_TYPE_LABEL: Record<string, string> = {
	LP: '정규 앨범',
	EP: 'EP',
	SP: '싱글',
	LV: '라이브 앨범',
	VN: 'LP',
};

/* [todo] track 구조 개편
   라이브 앨범, 싱글 앨범 등으로 앨범 별로 중복 되는 곡이 있기에 tracks 구조 개편이 필요합니다.
   해당 tracks는 앨범 페이지의 "최근에 발행된 앨범" 홍복 섹션(AlbumPromotionSection)을 위해 임시로 추가한 데이터입니다.
   앨범 상세 페이지를 구현 때 트랙 구조를 개선 할 예정입니다. */
export const LP_ALBUMS: Album[] = [
	{
		type: 'LP',
		volume: 6,
		title: '졸업앨범',
		fileName: 'graduation',
		releaseDate: '2025.11.21',
		tracks: [
			'아이들',
			'이번 방학엔 공부 좀 해라',
			'성장통',
			'스카',
			'사춘기',
			'여드름',
			'장래희망',
			'졸업',
			'퇴근',
			'비둘기들의 도시',
			'휴식행 티켓',
		],
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		volume: 5,
		title: '꽃순이',
		fileName: 'flower',
		releaseDate: '2025.06.13',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		volume: 4,
		title: '나는 기계가 싫어요',
		fileName: 'machine',
		releaseDate: '2024.11.11',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		volume: 3,
		title: '천진우 캐롤 모음집',
		fileName: 'carols',
		releaseDate: '2023.12.01',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		volume: 2,
		title: '푸줏간',
		fileName: 'butcher',
		releaseDate: '2023.04.01',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LP',
		volume: 1,
		title: '명상좀비',
		fileName: 'zombie',
		releaseDate: '2022.11.21',
		store: '#',
		musicVideo: '#',
	},
];

const EP_ALBUMS: Album[] = [
	{
		type: 'EP',
		title: '굴다리',
		fileName: 'underpass',
		releaseDate: '2022.08.20',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'EP',
		title: '일기장',
		fileName: 'diary',
		releaseDate: '2023.07.07',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'EP',
		title: '귀천',
		fileName: 'back-to-haeven',
		releaseDate: '2024.09.09',
		store: '#',
		musicVideo: '#',
	},
];

const SP_ALBUMS: Album[] = [
	{
		type: 'SP',
		title: '속편',
		fileName: 'sequel',
		releaseDate: '2023.01.25',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'SP',
		title: '인간쓰레기',
		fileName: 'human-trash',
		releaseDate: '2024.03.03',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'SP',
		title: '고백',
		fileName: 'confession',
		releaseDate: '2024.04.04',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'SP',
		title: '세모 네모 동그라미',
		fileName: 'shapes',
		releaseDate: '2024.05.05',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'SP',
		title: '이별이 그대는 쉽나요',
		fileName: 'parting',
		releaseDate: '2024.06.13',
		store: '#',
		musicVideo: '#',
	},
];

const LV_ALBUMS: Album[] = [
	{
		type: 'LV',
		title: '천진우 라이브',
		fileName: 'live-v1',
		releaseDate: '2024.01.11',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LV',
		title: '천진우 라이브2',
		fileName: 'live-v2',
		releaseDate: '2025.02.09',
		store: '#',
		musicVideo: '#',
	},
	{
		type: 'LV',
		title: '구토유발자들',
		fileName: 'nauseators',
		releaseDate: '2025.04.18',
		store: '#',
		musicVideo: '#',
	},
];

const VN_ALBUMS: Album[] = [
	{
		type: 'VN',
		title: '굴다리 LP 앨범',
		fileName: 'underpass',
		releaseDate: '2024.04.24',
		store: '#',
		musicVideo: '#',
	},
];

export const GET_LP_ALBUMS = sortAlbumsLatest(LP_ALBUMS);

export const GET_EP_ALBUMS = sortAlbumsLatest(EP_ALBUMS);

export const GET_SP_ALBUMS = sortAlbumsLatest(SP_ALBUMS);

export const GET_LV_ALBUMS = sortAlbumsLatest(LV_ALBUMS);

export const GET_VN_ALBUMS = sortAlbumsLatest(VN_ALBUMS);

export const GET_FULL_ALBUMS = () => {
	const allAlbums = [...LP_ALBUMS, ...EP_ALBUMS, ...SP_ALBUMS, ...LV_ALBUMS, ...VN_ALBUMS];
	const combinedMap: Record<string, Album[]> = {};

	allAlbums.forEach(album => {
		const year = album.releaseDate.split('.')[0].trim();
		if (!combinedMap[year]) combinedMap[year] = [];
		combinedMap[year].push(album);
	});

	return Object.keys(combinedMap)
		.sort((a, b) => Number(b) - Number(a))
		.map(year => ({
			year,
			items: sortAlbumsLatest(combinedMap[year]),
		}));
};

export const FULL_ALBUMS: AlbumList = GET_FULL_ALBUMS();
