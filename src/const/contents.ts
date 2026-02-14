// @const/contents

/* eslint-disable storybook/default-exports */

export const METADATA = {
	NAME: 'MORTALS LOG',
	DESCRIPTION: '필멸자들을 위한 비공식 팬페이지',
	ARCHIVE_VERSION: 'VER 2026.01.12',
};

export const NAV_ITEMS = [
	{ id: 1, name: 'PROFILE', path: '/profile', isEnabled: true },
	{ id: 2, name: 'MUSIC', path: '/music', isEnabled: true },
	{ id: 3, name: 'SCHEDULE', path: '/schedule', isEnabled: true },
	{ id: 4, name: 'GOODS', path: '/goods', isEnabled: true },
	{ id: 5, name: 'ABOUT', path: '/about', isEnabled: true },
	// { id: 6, name: 'PHOTOS', path: '#photos', isEnabled: false },
] as const;

export const ACTIVE_NAV_ITEMS = NAV_ITEMS.filter(item => item.isEnabled);
