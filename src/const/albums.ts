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

export const LP_ALBUMS: Album[] = [
	{
		type: 'LP',
		volume: 1,
		title: '명상좀비',
		fileName: 'zombie',
		releaseDate: '2022.11.21',
		tracks: ['TRK_LP01_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '26:08',
		agency: '천진우',
	},
	{
		type: 'LP',
		volume: 2,
		title: '푸줏간',
		fileName: 'butcher',
		releaseDate: '2023.04.01',
		tracks: ['TRK_LP02_*'],
		genre: ['포크 팝'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '24:47',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-2집-푸줏간-cd/23612/category/29/display/1/',
	},
	{
		type: 'LP',
		volume: 3,
		title: '천진우 캐롤 모음집',
		fileName: 'carols',
		releaseDate: '2023.12.01',
		tracks: ['TRK_LP03_*'],
		genre: ['포크 팝', '캐롤'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '19:41',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-3집-천진우-캐롤-모음집-cd/23613/category/29/display/1/',
	},
	{
		type: 'LP',
		volume: 4,
		title: '나는 기계가 싫어요',
		fileName: 'machine',
		releaseDate: '2024.11.11',
		tracks: ['TRK_LP04_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '32:09',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-나는-기계가-싫어요-cd/26620/category/29/display/1/',
	},
	{
		type: 'LP',
		volume: 5,
		title: '꽃순이',
		fileName: 'flower',
		releaseDate: '2025.06.13',
		tracks: ['TRK_LP05_*'],
		genre: ['포크/어쿠스틱', '인디'],
		style: ['인디 포크'],
		distributor: '아토엔터테인먼트',
		totalDuration: '15:24',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-꽃순이-cd/28585/category/29/display/1/',
	},
	{
		type: 'LP',
		volume: 6,
		title: '졸업앨범',
		fileName: 'graduation',
		releaseDate: '2025.11.21',
		intro: `데뷔 3년 차에 정규 6집을 발매하는 천진우는 사실 중학교 기간제 교사로도 일하고 있습니다.
앨범이 발매된 2025년에는 서울의 금옥중학교 1학년 11반 담임이자 생활상담부 소속 사회 선생님이였습니다.
독특한 커리어를 이어오던 그가 드디어 예술가와 교사의 경계를 허문 앨범을 들고 왔습니다.
앨범 커버 모델은 금옥중 밴드부 아이들이 되었고, 몇 곡에서는 학생들이 악기 세션 녹음에 직접 참여하기도 했으며, 5번 트랙 사춘기라는 노래에서는 아예 중2 제자에게 노래까지 시킵니다.
가사 역시 학교를 주제로 천진우 특유의 은유적인 표현이 돋보여 청소년들은 물론 어른들도 즐겁게 공감할 수 있습니다.
졸업앨범은 단순한 과거의 기록이 아닌 언제든 펼치기만 하면 그 때로 돌아갈 수 있는 타임머신이죠.
탑승하세요, 여러분을 천진우의 학교로 초대합니다.

01. 아이들
- 아이들에게 미안합니다, 이제 신세 질 일만 남아서...
Vocal 천진우
Chorus Vocal 천진우
Banjitar 천진우

02. 이번 방학엔 공부 좀 해라
- 방학 때 학생답게 공부 좀 하십쇼. 놀 궁리만 하지 말고
Vocal 천진우
Chorus Vocal 양동훈, 천진우
Acoustic Guitar 천진우
Electric Guitar 법영이, 천진우
Bass 양동훈
Trumpet 김한수

03. 성장통
- 잘 하는 것도 하나 없는데 자라는 와중에도 아파야 하나?
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우
Electric Guitar 안성훈(ASH), 천진우

04. 스카
- 스터디 카페와 스카 펑크의 만남
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우
Electric Guitar 천진우

05. 사춘기
- 만들긴 했는데 내가 부르려니 도저히 감성이 안 살아서, 중2 제자가 부름.
Guest Vocal 박예음
Chorus Vocal 이승환
Acoustic Guitar 천진우
Bass 이하윤

06. 여드름
- 청소년기의 자괴감 독재자 여드름.
Vocal 천진우
Chorus Vocal 천진우
Electric Guitar 천진우
Bass 천진우

07. 장래희망
- 진로 상담을 하다보면 단순히 돈 많이 버는 직업이 꿈이라는 대답을 종종 듣는다. 더 이상 결핍이 기본값이 아니게 된 세상에서 이건 매우 슬픈 일이다.
Vocal 천진우
Acoustic Guitar 천진우
Electric Guitar 신재성, 천진우

08. 졸업 *title
- 이 앨범 중 가장 마지막에 만든 노래. 졸업은 곧 새로운 시작일 뿐.
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우
Electric Guitar 천진우
Bass 이하윤

09. 퇴근
- 학교 얘기는 이제 끝! 퇴근하면 나도 나만의 구질구질한 삶이 있다.
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우
Banjitar 법영이
Contrabass 강주은
Harmonica 천진우

10. 비둘기들의 도시
- 서울에서 산지 어느덧 4년. 이젠 떠나고 싶다.
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우

11. 휴식행 티켓
- 감기라도 걸리지 않고서는 맘 편히 쉬지도 못하는 나
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우
Gayageum 이로운

[CREDIT]

Vocal 천진우
Guest Vocal 박예음
Chorus Vocal 천진우, 양동훈, 이승환
Acoustic Guitar 천진우
Electric Guitar 천진우, 법영이, 신재성, 안성훈(ASH)
Banjitar 법영이
Trumpet 김한수
Gayageum 이로운
Harmonica 천진우
Contrabass 강주은
Bass 양동훈, 이하윤, 천진우
Lyrics by 천진우
Composed by 천진우
Arranged by 천진우
Mixed and Mastered by 천진우
Photo by 천진우
Special Thanks to 안성훈(ASH)`,
		tracks: ['TRK_LP06_*'],
		genre: ['인디', '락/메탈'],
		style: ['인디 락'],
		distributor: '아토엔터테인먼트',
		totalDuration: '28:40',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-졸업앨범-cd/30244/category/29/display/1/',
	},
];

const EP_ALBUMS: Album[] = [
	{
		type: 'EP',
		title: '굴다리',
		fileName: 'underpass',
		releaseDate: '2022.08.20',
		tracks: ['TRK_EP01_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '21:42',
		agency: '천진우',
	},
	{
		type: 'EP',
		title: '일기장',
		fileName: 'diary',
		releaseDate: '2023.07.07',
		tracks: ['TRK_EP02_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '11:32',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-ep-일기장-cd/23611/category/29/display/1/',
	},
	{
		type: 'EP',
		title: '귀천',
		fileName: 'back-to-haeven',
		releaseDate: '2024.09.09',
		tracks: ['TRK_EP03_*'],
		genre: ['포크/어쿠스틱', '인디'],
		style: ['포크 팝', '인디 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '09:06',
		agency: '천진우',
		store:
			'https://gimbabrecords.com/product/천진우-ep-귀천-cd-인간쓰레기-고백-세모-네모-동그라미-수록/26170/category/29/display/1/',
	},
];

const SP_ALBUMS: Album[] = [
	{
		type: 'SP',
		title: '속편',
		fileName: 'sequel',
		releaseDate: '2023.01.25',
		tracks: ['TRK_SP01_*'],
		genre: ['발라드'],
		style: ['발라드'],
		distributor: '아토엔터테인먼트',
		totalDuration: '03:31',
		agency: '천진우',
	},
	{
		type: 'SP',
		title: '인간쓰레기',
		fileName: 'human-trash',
		releaseDate: '2024.03.03',
		tracks: ['TRK_SP02_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '02:42',
		agency: '천진우',
	},
	{
		type: 'SP',
		title: '고백',
		fileName: 'confession',
		releaseDate: '2024.04.04',
		tracks: ['TRK_SP03_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '03:18',
		agency: '천진우',
	},
	{
		type: 'SP',
		title: '세모 네모 동그라미',
		fileName: 'shapes',
		releaseDate: '2024.05.05',
		tracks: ['TRK_SP04_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '02:42',
		agency: '천진우',
	},
	{
		type: 'SP',
		title: '이별이 그대는 쉽나요',
		fileName: 'parting',
		releaseDate: '2024.06.13',
		tracks: ['TRK_SP05_*'],
		genre: ['댄스 팝'],
		style: ['팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '03:38',
		agency: '천진우',
	},
];

const LV_ALBUMS: Album[] = [
	{
		type: 'LV',
		title: '천진우 라이브',
		fileName: 'live-v1',
		releaseDate: '2024.01.11',
		tracks: ['TRK_LV01_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '26:44',
		agency: '천진우',
	},
	{
		type: 'LV',
		title: '천진우 라이브2',
		fileName: 'live-v2',
		releaseDate: '2025.02.09',
		tracks: ['TRK_LV02_*'],
		genre: ['포크/어쿠스틱', '인디'],
		style: ['포크 팝', '인디 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '33:38',
		agency: '천진우',
	},
	{
		type: 'LV',
		title: '구토유발자들',
		fileName: 'nauseators',
		releaseDate: '2025.04.18',
		tracks: ['TRK_LV03_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '42:27',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-구토유발자들-cd/28090/category/29/display/1/',
	},
];

const VN_ALBUMS: Album[] = [
	{
		type: 'VN',
		title: '굴다리 LP 앨범',
		fileName: 'underpass',
		releaseDate: '2024.04.24',
		tracks: {
			'Side A': ['TRK_VN01_001', 'TRK_VN01_002', 'TRK_VN01_003'],
			'Side B': ['TRK_VN01_004', 'TRK_VN01_005', 'TRK_VN01_006'],
		},
		store: 'https://smartstore.naver.com/irrelevant/products/10239470111',
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
