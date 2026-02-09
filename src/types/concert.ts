// @types/concert

/* eslint-disable storybook/default-exports */

export interface Schedule {
	part: string;
	time: string;
}

export interface ConcertItem {
	id?: string;
	type: 'SOLO' | 'JOIN' | 'TOUR' | 'LISTENING';
	date: string;
	content: string;
	location?: string;
	times?: string[];
	schedules?: Schedule[];
	lineUp?: string[];
	price?: Price;
	fileName?: string;
	reservationLink?: string;
}

export interface Concert {
	year: string;
	items: ConcertItem[];
}

export interface Price {
	regular: string;
	student?: string;
	army?: string;
	onSpot?: string;
	alien?: string;
	teacher?: string;
}

export type ConcertList = Concert[];
// SOLO: 단독 콘서트
// JOIN: 합동 콘서트
// TOUR: 전국 투어
// LISTENING: 음악감상회
