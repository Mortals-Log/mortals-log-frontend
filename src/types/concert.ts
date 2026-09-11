// @/types/concert

/* eslint-disable storybook/default-exports */

interface Ticketing {
	ticketingDate?: string;
	ticketingTime?: string;
	ticketingLink?: string;
}

export interface ConcertItem {
	id?: string;
	type: 'SOLO' | 'JOIN' | 'TOUR' | 'LISTENING' | 'FESTIVAL';
	date: string;
	content: string;
	location?: string;
	times?: string[];
	/**
	 * date 가 기간(예: "09.05 ~ 09.06")일 때, 실제로 공연하는 날짜만 골라서 지정한다.
	 * 지정하지 않으면 기존처럼 date 범위의 모든 날짜에 공연하는 것으로 간주한다.
	 * (금~일 페스티벌 중 하루만 공연하는 경우 등에 사용)
	 */
	performanceDates?: string[];
	lineUp?: string[];
	price?: Price;
	fileName?: string;
	ticketing?: Ticketing[];
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
	early?: string;
}

export type ConcertList = Concert[];
// SOLO: 단독 콘서트
// JOIN: 합동 콘서트
// TOUR: 전국 투어
// LISTENING: 음악감상회
