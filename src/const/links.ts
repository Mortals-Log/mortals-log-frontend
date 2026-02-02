// @src/constants/links.ts

/* eslint-disable storybook/default-exports */

import { Links, LinkDetail } from '@/types/links';

export const MUSIC_PLATFORM = {
	APPLE_MUSIC: 'Apple Music',
	SPOTIFY: 'Spotify',
	YOUTUBE: 'YouTube',
	SOUNDCLOUD: 'Sound Cloud',
} as const;

export const SNS_PLATFORM = {
	INSTAGRAM: 'Instagram',
	KAKAOTALK: 'Kakaotalk',
} as const;

export const SHOP_PLATFORM = {
	CD: 'CD',
	LP: 'LP',
	GOODS: 'Goods',
} as const;

export const ETC_PLATFORM = {
	LINK_TREE: 'Link Tree',
} as const;

export const LINK_PLATFORM = {
	INSTAGRAM: {
		NAME: SNS_PLATFORM.INSTAGRAM,
		BASE_URL: 'https://www.instagram.com/p/',
	},
	YOUTUBE: {
		NAME: MUSIC_PLATFORM.YOUTUBE,
		BASE_URL: 'https://www.youtube.com/watch?v=',
	},
} as const;

export const LINK_SHOP: Record<string, LinkDetail> = {
	CD: {
		CATEGORY_KR: '앨범',
		STORE: '김밥레코즈',
	},
	LP: {
		CATEGORY_KR: 'LP(바이닐)',
		STORE: '레이블 이릴레반트',
	},
	Goods: {
		CATEGORY_KR: '천진우 공식 굿즈샵',
		STORE: '마플샵',
	},
};

export const LINK_LIST: Links = [
	{
		category: 'SNS',
		items: [
			{ label: SNS_PLATFORM.INSTAGRAM, url: 'https://www.instagram.com/1000_jinwoo' },

			{ label: SNS_PLATFORM.KAKAOTALK, url: 'https://open.kakao.com/o/gj0SK2Qe' },
		],
	},
	{
		category: 'MUSIC',
		items: [
			{
				label: MUSIC_PLATFORM.APPLE_MUSIC,
				url: 'https://music.apple.com/kr/artist/%EC%B2%9C%EC%A7%84%EC%9A%B0/1641616138?ls',
			},
			{ label: MUSIC_PLATFORM.SPOTIFY, url: 'https://open.spotify.com/artist/5OEgs7d2znP7y50pp8y7bK' },
			{ label: MUSIC_PLATFORM.YOUTUBE, url: 'https://www.youtube.com/channel/UCnjNCmBszWrgEO0NvfAbbVQ' },
			{ label: MUSIC_PLATFORM.SOUNDCLOUD, url: 'https://soundcloud.com/1000_jinwoo' },
		],
	},
	{
		category: 'SHOP',
		items: [
			{
				label: SHOP_PLATFORM.CD,
				url: 'https://gimbabrecords.com/product/search.html?view_type=&supplier_code=&category_no=&keyword=천진우&x=0&y=0',
			},
			{ label: SHOP_PLATFORM.LP, url: 'https://smartstore.naver.com/irrelevant/products/10239470111' },
			{ label: SHOP_PLATFORM.GOODS, url: 'https://marpple.shop/kr/1000_jinwoo' },
		],
	},
	{
		category: 'ETC',
		items: [
			{
				label: ETC_PLATFORM.LINK_TREE,
				url: 'https://linktr.ee/1000jinwoo?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAZXh0bgNhZW0CMTEAc3J0YwZhcHBfaWQMMjU2MjgxMDQwNTU4AAGn9XKUd5Bfg5-nWM88QQh643PrJrleX7QfjSieYPTZeUJc6nT11qYg3vGO8So_aem_3Du4C9eWuHq6MrdFtTKmDA',
			},
			{ label: 'Sing', url: 'https://www.tjmedia.com/song/accompaniment_apply_agree' },
		],
	},
];
