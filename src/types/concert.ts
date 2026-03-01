// @/types/concert

/* eslint-disable storybook/default-exports */

interface Ticketing {
	ticketingDate?: string;
	ticketingTime?: string;
	ticketingLink?: string;
}

export interface ConcertItem {
	id?: string;
	type: 'SOLO' | 'JOIN' | 'TOUR' | 'LISTENING';
	date: string;
	content: string;
	location?: string;
	times?: string[];
	lineUp?: string[];
	price?: Price;
	fileName?: string;
	ticketing?: Ticketing;
	ageLimit?: boolean;
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
