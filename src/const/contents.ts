/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

export const METADATA = {
	NAME: 'MORTALS LOG',
	DESCRIPTION: '필멸자들을 위한 비공식 팬페이지',
	ARCHIVE_VERSION: 'VER 2026.01.12',
};

export const NAME = {
	KOREAN: '천진우',
	ENGLISH: 'CHUN JINWOO',
	HANJA: '千鎭宇',
	SOCIALID: '1000 Jinwoo',
};

export const OFFICIAL_LINKS = {
	INSTAGRAM: 'https://www.instagram.com/jinwoo_chun',
	YOUTUBE: 'https://www.youtube.com/...',
	SPOTIFY: 'https://open.spotify.com/...',
	GOODS_SHOP: 'https://...',
	OPEN_CHAT: 'https://...',
	KARAOKE_REQUEST: 'https://...',
};

export const ARTIST_PROFILE = {
	BIRTH: '1996.6.13',
	DEBUT_DATE: '2022. 08. 20',
	JOB: '싱어송라이터, 교사',
	MBTI: 'INTJ',
};

export const NAV_ITEMS = [
	{ id: 1, name: 'PROFILE', path: '#profile', isEnabled: true },
	{ id: 2, name: 'ALBUM', path: '#album', isEnabled: true },
	{ id: 3, name: 'SCHEDULE', path: '#schedule', isEnabled: true },
	{ id: 4, name: 'GOODS', path: '#goods', isEnabled: true },
	{ id: 5, name: 'ABOUT', path: '#about', isEnabled: true },
	// { id: 6, name: 'PHOTOS', path: '#photos', isEnabled: false },
] as const;

export const ACTIVE_NAV_ITEMS = NAV_ITEMS.filter(item => item.isEnabled);
