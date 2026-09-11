// @/const/chord-providers

export const CHORD_PROVIDERS = {
	DOTSAE: '돗새',
	KWON_SAJANG: '권주부',
	KIM_SEODDANG: 'Ukulele boy (김서땡)',
} as const;

export type ChordProvider = (typeof CHORD_PROVIDERS)[keyof typeof CHORD_PROVIDERS];
