// @/types/icon

/* eslint-disable storybook/default-exports */

export const SUPPORTED_SERVICES = [
	'instagram',
	'kakaotalk',
	'youtube',
	'melon',
	'spotify',
	'applemusic',
	'bugs',
	'genie',
	'soundcloud',
	'cd',
	'lp',
	'goods',
	'linktree',
	'sing',
] as const;

export type IconKey = (typeof SUPPORTED_SERVICES)[number];
