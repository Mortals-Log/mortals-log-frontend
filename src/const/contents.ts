// @const/contents

/* eslint-disable react-refresh/only-export-components */
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

export const LINKS: Links = {
	INSTAGRAM: 'https://www.instagram.com/1000_jinwoo',
	YOUTUBE: 'https://www.youtube.com/channel/UCnjNCmBszWrgEO0NvfAbbVQ',
	SPOTIFY: 'https://open.spotify.com/artist/5OEgs7d2znP7y50pp8y7bK',
	APPLE_MUSIC: 'https://music.apple.com/kr/artist/천진우/1641616138?ls',
	GOODS_CD:
		'https://gimbabrecords.com/product/search.html?view_type=&supplier_code=&category_no=&keyword=천진우&x=0&y=0',
	GOODS_LP: 'https://smartstore.naver.com/irrelevant/products/10239470111',
	GOODS_SHOP: 'https://marpple.shop/kr/1000_jinwoo',
	OPEN_CHAT: 'https://open.kakao.com/o/gj0SK2Qe',
	TJ_SONG_REQUEST: 'https://www.tjmedia.com/song/accompaniment_apply_agree',
};

export const MODIFIERS: Citation[] = [
	[
		'여러분 인생에 브금 깔아보려고 노력 중인',
		'instragram@nerv_mag, [에바와 음악Vol.1] 인터뷰 발췌',
		'https://www.instagram.com/p/DMOosfnz7IV/?img_index=1',
	],
	[
		'학교에서 애들을 가르치면서 음악 하고 있는',
		'instagram@sub_riot, 🎤 𝐀𝐫𝐭𝐢𝐬𝐭 𝐈𝐧𝐭𝐞𝐫𝐯𝐢 e𝐰 𝐰𝐢𝐭𝐡 천진우 🎤 인터뷰 발췌',
		'https://www.instagram.com/p/DTZzRsdkbSK/?img_index=1',
	],
];

export const PROFILE: Profile = {
	id: NAME.SOCIALID,
	name: NAME.KOREAN,
	enName: NAME.ENGLISH,
	hanjaName: NAME.HANJA,

	mainImage: '/images/profile/main.jpg',
	modifier: MODIFIERS,
	description: [
		`사람과 사람 사이의 틈을 채울 생각은 없습니다.\n오히려 그 틈 자체를 낭만적으로 바라보고 노래로 옮겨적는 것 같습니다.`,
		'nerv_mag [에바와 음악Vol.1] 인터뷰 발췌',
		'https://www.instagram.com/p/DMOosfnz7IV/?img_index=1',
	],

	birth: ['1996. 06. 13', '강원도 춘천시 (現 강원특별자치도 춘천시)'],
	nationality: 'Korea',

	education: '강원대학교 사범대학 (일반사회교육학 / 학사)',

	mbti: 'INTJ',
	bloodType: 'O형',

	debut: ['2022. 08. 20', 'EP 굴다리'],
	job: ['싱어송라이터', '교사'],
	alias: ['어둠의 김광석', '음악 공장장'],
	fandom: '필멸자',

	officialLinks: LINKS,
};

export const NAV_ITEMS = [
	{ id: 1, name: 'PROFILE', path: '/profile', isEnabled: true },
	{ id: 2, name: 'ALBUM', path: '/album', isEnabled: true },
	{ id: 3, name: 'SCHEDULE', path: '/schedule', isEnabled: true },
	{ id: 4, name: 'GOODS', path: LINKS.GOODS_SHOP, isEnabled: true },
	{ id: 5, name: 'ABOUT', path: '/about', isEnabled: true },
	// { id: 6, name: 'PHOTOS', path: '#photos', isEnabled: false },
] as const;

export const ACTIVE_NAV_ITEMS = NAV_ITEMS.filter(item => item.isEnabled);
