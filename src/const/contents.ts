// @const/contents

/* eslint-disable storybook/default-exports */

import { Citation, Profile } from '@/types/profile';
import { Links } from '@/types/links';

export const METADATA = {
	NAME: 'MORTALS LOG',
	DESCRIPTION: '필멸자들을 위한 비공식 팬페이지',
	ARCHIVE_VERSION: 'VER 2026.01.12',
};

export const NAME = {
	KOREAN: '천진우',
	ENGLISH: 'CHUN JINWOO',
	HANJA: '千鎭宇',
	SOCIALID: '1000_jinwoo',
};

export const LINKS: Links = [
	{
		category: 'SNS',
		items: [
			{ label: 'Instagram', url: 'https://www.instagram.com/1000_jinwoo' },

			{ label: 'Kakaotalk', url: 'https://open.kakao.com/o/gj0SK2Qe' },
		],
	},
	{
		category: 'MUSIC',
		items: [
			{ label: 'Apple Music', url: 'https://music.apple.com/kr/artist/...' },
			{ label: 'Spotify', url: 'https://open.spotify.com/artist/5OEgs7d2znP7y50pp8y7bK' },
			{ label: 'YouTube', url: 'https://www.youtube.com/channel/UCnjNCmBszWrgEO0NvfAbbVQ' },
			{ label: 'Sound Cloud', url: 'https://soundcloud.com/1000_jinwoo' },
		],
	},
	{
		category: 'SHOP',
		items: [
			{
				label: 'CD',
				url: 'https://gimbabrecords.com/product/search.html?view_type=&supplier_code=&category_no=&keyword=천진우&x=0&y=0',
			},
			{ label: 'LP', url: 'https://smartstore.naver.com/irrelevant/products/10239470111' },
			{ label: 'Goods', url: 'https://marpple.shop/kr/1000_jinwoo' },
		],
	},
	{
		category: 'ETC',
		items: [
			{
				label: 'Link Tree',
				url: 'https://linktr.ee/1000jinwoo?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn9XKUd5Bfg5-nWM88QQh643PrJrleX7QfjSieYPTZeUJc6nT11qYg3vGO8So_aem_3Du4C9eWuHq6MrdFtTKmDA',
			},
			{ label: 'Sing', url: 'https://www.tjmedia.com/song/accompaniment_apply_agree' },
		],
	},
];

export const SNS_PLATFORMS = {
	INSTAGRAM: {
		NAME: 'instagram',
		BASE_URL: 'https://www.instagram.com/p/',
	},
	YOUTUBE: {
		NAME: 'youtube',
		BASE_URL: 'https://www.youtube.com/watch?v=',
	},
} as const;

export const MODIFIERS: Citation[] = [
	{
		content: '여러분 인생에 브금 깔아보려고 노력 중인',
		platform: SNS_PLATFORMS.INSTAGRAM.NAME,
		account: 'nerv_mag',
		contentTitle: '[에바와 음악Vol.1] 인터뷰',
		postId: 'DMOosfnz7IV/?img_index=1',
	},
	{
		content: '학교에서 애들을 가르치면서 음악 하고 있는',
		platform: SNS_PLATFORMS.INSTAGRAM.NAME,
		account: 'sub_riot',
		contentTitle: '🎤 𝐀𝐫𝐭𝐢𝐬𝐭 𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐰𝐢𝐭𝐡 천진우 🎤 인터뷰',
		postId: 'DTZzRsdkbSK/?img_index=1',
	},
];

export const PROFILE: Profile = {
	id: NAME.SOCIALID,
	name: NAME.KOREAN,
	enName: NAME.ENGLISH,
	hanjaName: NAME.HANJA,

	mainImage: '/images/profile/main.jpg',
	modifier: MODIFIERS,
	description: {
		content: `사람과 사람 사이의 틈을 채울 생각은 없습니다.\n오히려 그 틈 자체를 낭만적으로 바라보고 노래로 옮겨적는 것 같습니다.`,
		platform: SNS_PLATFORMS.INSTAGRAM.NAME,
		account: 'nerv_mag',
		contentTitle: '[에바와 음악Vol.1] 인터뷰',
		postId: 'DMOosfnz7IV/?img_index=1',
	},

	birth: ['1996. 06. 13', '강원도 춘천시 (現 강원특별자치도 춘천시)'],
	nationality: '대한민국',

	education: '강원대학교 사범대학 (일반사회교육학 / 학사)',

	mbti: 'INTJ',
	bloodType: 'O형',

	debut: ['2022. 08. 20', 'EP 굴다리'],
	job: ['싱어송라이터', '교사'],
	alias: ['어둠의 김광석', '(음악)공장장'],
	fandom: '필멸자',

	officialLinks: LINKS,
};

// todo: 정규 앨범, EP, 콘서트 등을 따로 분리한 뒤 CAREER_HISTORY로 통합하는 형태로 수정 필요
// 통합 형태는 각 파트별 데이터를 관리하고 유지보수하기 위함
// 현재는 페이지의 출력 형태를 위하여 데이터를 합쳐서 이용중
export const CAREER_HISTORY = [
	{
		year: '2026',
		items: [
			{ date: '02.07 ~ 02.08', content: '단독 콘서트 [고독의 포크 전사 주정뱅이 딴따라]' },
			{ date: '01.17', content: '단독 콘서트 [부산불바다2]' },
		],
	},
	{
		year: '2025',
		items: [
			{ date: '11.21', content: '단독 콘서트 [천진우의 연말시상식]' },
			{ date: '11.21', content: '정규 6집 [졸업앨범] 발매' },
			{ date: '08.17', content: '단독 콘서트 [오싹오싹 공포의 인간쓰레기]' },
			{ date: '06.13', content: '정규 5집 [꽃순이] 발매' },
			{ date: '05.03', content: '단독 콘서트 [천진우와의 가장 가까운 만남]' },
			{ date: '03.03', content: '단독 콘서트 [구토유발자들]' },
			{ date: '01.25', content: '단독 콘서트 [천진우와 무법자들]' },
		],
	},
	{
		year: '2024',
		items: [
			{ date: '12.20', content: '단독 콘서트 [대가리총 빵야빵야]' },
			{ date: '12.08', content: '단독 콘서트 [대뽀까지마라]' },
			{ date: '11.23', content: '단독 콘서트 [달달이 공연 제5호]' },
			{ date: '11.11', content: '정규 4집 [나는 기계가 싫어요] 발매' },
			{ date: '09.21', content: '단독 콘서트 [달달이 공연 제4호]' },
			{ date: '09.09', content: 'EP 앨범 [귀천] 발매' },
			{ date: '08.25', content: '단독 콘서트 [홍대불바다]' },
			{ date: '07.28', content: '단독 콘서트 [부산불바다]' },
			{ date: '05.15', content: '단독 콘서트 [달달이 공연 제3호]' },
			{ date: '02.24', content: '단독 콘서트 [달달이 공연 제2호]' },
			{ date: '01.28', content: '단독 콘서트 [달달이 공연 제1호]' },
		],
	},
	{
		year: '2023',
		items: [
			{ date: '12.16', content: '단독 콘서트 [앗-! 겁나게 뜨거 여러분의 사랑]' },
			{ date: '12.01', content: '정규 3집 [천진우 캐롤 모음집] 발매' },
			{ date: '07.29 ~ 08.06', content: '전국투어 [여름좀비]' },
			{ date: '07.07', content: 'EP 앨범 [일기장] 발매' },
			{ date: '06.24', content: '단독 콘서트 [아기다리 고기다리던 가라오케 업로드]' },
			{ date: '05.05', content: '단독 콘서트 [어른이날]' },
			{ date: '04.01', content: '정규 2집 [푸줏간] 발매' },
			{ date: '01.28', content: '단독 콘서트 [내일을 위한 오늘은 없다 대신에 여기 당신을 위한 공연이 왔다]' },
		],
	},
	{
		year: '2022',
		items: [
			{ date: '12.03', content: '단독 콘서트 [굴다리에서 명상좀비]' },
			{ date: '11.21', content: '정규 1집 [명상좀비] 발매' },
			{ date: '08.20', content: 'EP 앨범 [굴다리] 발매' },
			{ date: '08.20', content: 'EP 앨범 [굴다리]로 데뷔' },
		],
	},
];

const shopGroup = LINKS.find(g => g.category === 'SHOP');
const goodsUrl = shopGroup?.items.find(i => i.label === 'Goods')?.url || '';

export const NAV_ITEMS = [
	{ id: 1, name: 'PROFILE', path: '/profile', isEnabled: true },
	{ id: 2, name: 'ALBUM', path: '/album', isEnabled: true },
	{ id: 3, name: 'SCHEDULE', path: '/schedule', isEnabled: true },
	{ id: 4, name: 'GOODS', path: goodsUrl, isEnabled: true },
	{ id: 5, name: 'ABOUT', path: '/about', isEnabled: true },
	// { id: 6, name: 'PHOTOS', path: '#photos', isEnabled: false },
] as const;

export const ACTIVE_NAV_ITEMS = NAV_ITEMS.filter(item => item.isEnabled);
