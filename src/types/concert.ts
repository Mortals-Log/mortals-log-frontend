// @types/alubm

/* eslint-disable storybook/default-exports */

export interface ConcertItem {
	type: 'SOLO' | 'JOIN' | 'TOUR' | 'LISTENING';
	date: string;
	content: string;
}

export interface Concert {
	year: string;
	items: ConcertItem[];
}

// SOLO: 단독 콘서트
// JOIN: 합동 콘서트
// TOUR: 전국 투어
// LISTENING: 음악감상회
