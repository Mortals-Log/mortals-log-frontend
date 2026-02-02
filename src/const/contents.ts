// @const/contents

/* eslint-disable storybook/default-exports */

import { Links } from '@/types/links';

export const METADATA = {
	NAME: 'MORTALS LOG',
	DESCRIPTION: '필멸자들을 위한 비공식 팬페이지',
	ARCHIVE_VERSION: 'VER 2026.01.12',
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
			{ label: 'Apple Music', url: 'https://music.apple.com/kr/artist/%EC%B2%9C%EC%A7%84%EC%9A%B0/1641616138?ls' },
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

export const NAV_ITEMS = [
	{ id: 1, name: 'PROFILE', path: '/profile', isEnabled: true },
	{ id: 2, name: 'ALBUM', path: '/album', isEnabled: true },
	{ id: 3, name: 'SCHEDULE', path: '/schedule', isEnabled: true },
	{ id: 4, name: 'GOODS', path: '/goods', isEnabled: true },
	{ id: 5, name: 'ABOUT', path: '/about', isEnabled: true },
	// { id: 6, name: 'PHOTOS', path: '#photos', isEnabled: false },
] as const;

export const ACTIVE_NAV_ITEMS = NAV_ITEMS.filter(item => item.isEnabled);
