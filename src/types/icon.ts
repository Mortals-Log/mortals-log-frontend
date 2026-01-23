// @/types/icon.ts

/* eslint-disable storybook/default-exports */

export const SUPPORTED_SERVICES = [
	'instagram',
	'kakaotalk',
	'youtube',
	'applemusic',
	'spotify',
	'soundcloud',
	'linktree',
	'cd',
	'lp',
	'goods',
	'sing',
] as const;

export type IconKey = (typeof SUPPORTED_SERVICES)[number];
