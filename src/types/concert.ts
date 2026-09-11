// @/types/concert

/* eslint-disable storybook/default-exports */

interface Ticketing {
	ticketingDate?: string;
	ticketingTime?: string;
	ticketingLink?: string;
	/** 회차 구분 라벨(예: "얼리버드", "일반"). 없으면 등록 순서대로 "1차/2차" 로 표기한다. */
	label?: string;
	/** 매진 여부 — true 면 오픈 상태와 무관하게 매진 안내를 보여준다. */
	soldOut?: boolean;
}

export interface ConcertItem {
	id?: string;
	type: 'SOLO' | 'JOIN' | 'TOUR' | 'LISTENING' | 'FESTIVAL';
	date: string;
	content: string;
	location?: string;
	/** 페스티벌처럼 전체 행사장(location)과 천진우가 실제로 공연하는 장소(스테이지)가 다를 때 지정한다. */
	performanceLocation?: string;
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

/** 1일권/2일권처럼 하나의 항목에 여러 단가가 붙는 경우를 표현한다. */
export interface PriceTier {
	label: string;
	amount: number;
}

/** 숫자면 그대로 표시 시 천 단위 콤마+'원'을 자동으로 붙인다. */
export type PriceValue = number | PriceTier[];

export interface Price {
	regular: PriceValue;
	student?: PriceValue;
	army?: PriceValue;
	onSpot?: PriceValue;
	alien?: PriceValue;
	teacher?: PriceValue;
	early?: PriceValue;
	monk?: PriceValue;
}

export type ConcertList = Concert[];
// SOLO: 단독 콘서트
// JOIN: 합동 콘서트
// TOUR: 전국 투어
// LISTENING: 음악감상회
