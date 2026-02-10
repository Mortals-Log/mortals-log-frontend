// @const/concert.ts

import { ConcertItem, ConcertList } from '@/types/concert';
import { GenerateSchedules } from '@/utils/concert';
import { GenerateTargetId } from '@/utils/id';

/* eslint-disable storybook/default-exports */

export const CONCERT_TYPE_LABEL: Record<string, string> = {
	SOLO: '단독 콘서트',
	JOIN: '합동 콘서트',
	TOUR: '전국 투어',
	LISTENING: '음악감상회',
};

export const MEMBERS = {
	// 코어 멤버
	CJW: '천진우',
	KJE: '강주은',
	KHS: '김한수',
	LJD: '리장단',
	BY: '법영이',

	// 자주 출연
	JS: '중식이',
	GT: '기토',
	YDH: '양동훈',
	KTH: '김태현',
	LDH: '이덕현',
	WD: '왑띠',

	// 그 외
	KIH: '김인한',
	G: '걔',
	PSG: '박성균',
	SKL: '설규리',
	LJM: '이정민',
	GSB: '정새벽',

	OS: '오쉽 밴드',
	DB: '대방중 뉴진스',
	HANABI: '금옥중 하나비 밴드',
} as const;

// --- 자주 쓰이는 라인업 ---

/** 1. 천진우 솔로 (기본) */
export const SOLO_LINEUP = [MEMBERS.CJW];

/** 2. 무법자들/풀밴드 (천진우, 강주은, 김한수, 리장단, 법영이) */
export const BAND_LINEUP = [MEMBERS.CJW, MEMBERS.KJE, MEMBERS.KHS, MEMBERS.LJD, MEMBERS.BY];

/** 3. 불바다 조합 (천진우, 기토, 양동훈, 리장단) */
export const BULBADA_LINEUP = [MEMBERS.CJW, MEMBERS.GT, MEMBERS.YDH, MEMBERS.LJD];

/** 4. 달달이 조합 (천진우, 김태현, 리장단) */
export const DALDAL_TRIO = [MEMBERS.CJW, MEMBERS.KTH, MEMBERS.LJD];

/** 5. 중식이 콜라보 (천진우, 중식이) */
export const WITH_JS = [MEMBERS.CJW, MEMBERS.JS];

export const SOLO_CONCERT: ConcertList = [
	{
		year: '2026',
		items: [
			{
				type: 'SOLO',
				date: '02.07 ~ 02.08',
				content: '고독의 포크 전사 주정뱅이 딴따라',
				location: '홍대 롤링홀',
				times: ['16:00'],
				price: { regular: '55,000', onSpot: '66,000' },
				lineUp: SOLO_LINEUP,
				reservationLink: 'https://ticket.melon.com/performance/index.htm?prodId=212599',
			},
			{
				type: 'SOLO',
				date: '01.17',
				content: '부산불바다2',
				location: '부산 리얼라이즈',
				times: ['16:00', '19:00'],
				price: { regular: '50,000', army: '40,000' },
				lineUp: [...BULBADA_LINEUP, MEMBERS.BY],
				fileName: 'SOLO_20260117',
			},
		],
	},
	{
		year: '2025',
		items: [
			{
				type: 'SOLO',
				date: '11.21',
				content: '천진우의 연말시상식',
				location: '홍대 롤링홀',
				times: ['20:00'],
				price: { regular: '55,000', student: '45,000' },
				lineUp: [...BAND_LINEUP.filter(m => m !== MEMBERS.LJD), MEMBERS.HANABI],
			},
			{
				type: 'SOLO',
				date: '08.17',
				content: '오싹오싹 공포의 인간쓰레기',
				location: '홍대 롤링홀',
				times: ['17:00'],
				price: { regular: '55,000', onSpot: '66,000' },
				lineUp: [...BAND_LINEUP.filter(m => m !== MEMBERS.LJD), MEMBERS.LDH],
			},
			{
				type: 'SOLO',
				date: '05.03',
				content: '천진우와의 가장 가까운 만남',
				location: '대전 럭스라운지',
				times: ['18:00'],
				lineUp: [...BAND_LINEUP.filter(m => m !== MEMBERS.LJD), MEMBERS.LDH],
			},
			{
				type: 'SOLO',
				date: '03.03',
				content: '구토유발자들',
				location: '홍대 얼라이브홀',
				times: ['16:00'],
				price: { regular: '45,000', student: '35,000' },
				lineUp: [...BAND_LINEUP],
			},
			{
				type: 'SOLO',
				date: '01.25',
				content: '천진우와 무법자들',
				location: '홍대 청춘예찬',
				times: ['16:00'],
				price: { regular: '45,000', student: '35,000' },
				lineUp: [...BAND_LINEUP],
			},
		],
	},
	{
		year: '2024',
		items: [
			{
				type: 'SOLO',
				date: '12.20',
				content: '대가리총 빵야빵야',
				location: '스페이스 한강',
				times: ['20:00'],
				price: { regular: '33,000' },
				lineUp: [...BAND_LINEUP],
			},
			{
				type: 'SOLO',
				date: '12.08',
				content: '대뽀까지마라',
				location: '부산 리얼라이즈',
				times: ['16:00'],
				price: { regular: '35,000', student: '25,000' },
				lineUp: [...DALDAL_TRIO],
			},
			{
				type: 'SOLO',
				date: '11.23',
				content: '달달이 공연 제5호',
				location: '수상한 창고',
				times: ['16:00'],
				price: { regular: '40,000', student: '30,000' },
				lineUp: [...DALDAL_TRIO],
			},
			{
				type: 'SOLO',
				date: '09.21',
				content: '달달이 공연 제4호',
				location: '홍대 플렉스라운지',
				times: ['16:00'],
				price: { regular: '35,000', student: '25,000' },
				lineUp: [MEMBERS.CJW, MEMBERS.KJE, MEMBERS.KTH, MEMBERS.KHS],
			},
			{
				type: 'SOLO',
				date: '08.25',
				content: '홍대불바다',
				location: '홍대 청춘예찬',
				times: ['16:00'],
				price: { regular: '35,000', student: '25,000' },
				lineUp: [...BULBADA_LINEUP],
			},
			{
				type: 'SOLO',
				date: '07.28',
				content: '부산불바다',
				location: '부산 오방가르드',
				times: ['16:00'],
				price: { regular: '30,000', student: '20,000', alien: '100,000' },
				lineUp: [...BULBADA_LINEUP],
			},
			{
				type: 'SOLO',
				date: '05.15',
				content: '달달이 공연 제3호',
				location: '홍대 플렉스라운지',
				times: ['16:00'],
				price: { regular: '35,000', student: '25,000', teacher: '25,000' },
				lineUp: [MEMBERS.CJW, MEMBERS.KHS, MEMBERS.SKL, MEMBERS.OS],
			},
			{
				type: 'SOLO',
				date: '02.24',
				content: '달달이 공연 제2호',
				location: '수상한 창고',
				times: ['16:00'],
				price: { regular: '35,000' },
				lineUp: [...WITH_JS],
			},
			{
				type: 'SOLO',
				date: '01.28',
				content: '달달이 공연 제1호',
				location: '수상한 창고',
				times: ['16:00'],
				price: { regular: '35,000' },
				lineUp: [MEMBERS.CJW, MEMBERS.GT],
			},
		],
	},
	{
		year: '2023',
		items: [
			{
				type: 'SOLO',
				date: '12.16',
				content: '앗-! 겁나게 뜨거 여러분의 사랑',
				location: '홍대 스페이스홍',
				times: ['13:00'],
				price: { regular: '35,000' },
				lineUp: [MEMBERS.CJW, MEMBERS.WD, MEMBERS.DB],
			},
			{
				type: 'SOLO',
				date: '06.24',
				content: '아기다리 고기다리던 가라오케 업로드',
				location: '중식이 스튜디오',
				times: ['16:00'],
				price: { regular: '30,000' },
				lineUp: [...SOLO_LINEUP],
			},
			{
				type: 'SOLO',
				date: '05.05',
				content: '어른이날',
				location: '홍대 스페이스홍',
				times: ['16:00'],
				price: { regular: '30,000', student: '25,000' },

				lineUp: [...SOLO_LINEUP],
			},
			{
				type: 'SOLO',
				date: '01.28',
				content: '내일을 위한 오늘은 없다 대신에 여기 당신을 위한 공연이 왔다',
				location: '중식이 스튜디오',
				times: ['16:00'],
				price: { regular: '30,000' },
				lineUp: [MEMBERS.CJW, MEMBERS.G],
			},
		],
	},
	{
		year: '2022',
		items: [
			{
				type: 'SOLO',
				date: '12.03',
				content: '굴다리에서 명상좀비',
				location: '중식이 스튜디오',
				times: ['16:00'],
				price: { regular: '10,000', student: '7,000' },
				lineUp: [...WITH_JS, MEMBERS.GSB],
			},
		],
	},
];

export const JOIN_CONCERT: ConcertList = [
	{
		year: '2025',
		items: [
			{
				type: 'JOIN',
				date: '04.18',
				content: '와따리가따리 시즌2',
				location: '홍대 플렉스라운지',
				times: ['21:00'],
				lineUp: [...WITH_JS],
			},
		],
	},
	{
		year: '2024',
		items: [
			{
				type: 'JOIN',
				date: '04.19',
				content: '19금 스탠드업 코미디 콜라보 딸딸이 공연',
				location: '수상한 창고',
				times: ['20:00'],
				price: { regular: '40,000' },
				lineUp: [MEMBERS.CJW, MEMBERS.KIH, MEMBERS.PSG, MEMBERS.LJM, MEMBERS.OS],
				ageLimit: true,
			},
			{
				type: 'JOIN',
				date: '04.06',
				content: '와따리가따리 시즌1',
				location: '홍대 롤링홀',
				lineUp: [...WITH_JS],
			},
		],
	},
];

export const TOUR_CONCERT: ConcertList = [
	{
		year: '2023',
		items: [
			{
				type: 'TOUR',
				date: '07.29',
				content: '여름좀비 - 춘천',
				location: '춘천 클럽투투',
				price: { regular: '30,000' },
				lineUp: [...SOLO_LINEUP],
			},
			{
				type: 'TOUR',
				date: '08.04',
				content: '여름좀비 - 부산',
				location: '부산 오방가르드',
				price: { regular: '30,000' },
				lineUp: [...SOLO_LINEUP],
				fileName: 'TOUR_20230729',
			},
			{
				type: 'TOUR',
				date: '08.06',
				content: '여름좀비 - 서울',
				location: '홍대 언플러그드',
				price: { regular: '30,000' },
				lineUp: [...SOLO_LINEUP],
				fileName: 'TOUR_20230729',
			},
		],
	},
];

export const LISTENING: ConcertList = [
	{
		year: '2025',
		items: [
			{
				type: 'LISTENING',
				date: '06.14',
				content: '제1회 음악감상회',
				location: '수상한 창고',
				times: ['15:00'],
				price: { regular: '25,000' },
			},
			{
				type: 'LISTENING',
				date: '10.09',
				content: '제2회 음악감상회',
				location: '수상한 창고',
				times: ['13:00'],
				price: { regular: '25,000' },
			},
		],
	},
];

export const GET_FULL_CONCERTS = () => {
	const combinedMap: Record<string, ConcertItem[]> = {};

	[...SOLO_CONCERT, ...JOIN_CONCERT, ...TOUR_CONCERT, ...LISTENING].forEach(group => {
		if (!combinedMap[group.year]) {
			combinedMap[group.year] = [];
		}

		const enrichedItems = group.items.map(item => {
			const pendingTimes = item.times || ['미정'];
			const pendingLocation = item.location || '미정';

			const id = item.id || GenerateTargetId(item.type, group.year, item.date);

			return {
				...item,
				id: id,
				location: pendingLocation,
				schedules: item.schedules || GenerateSchedules(item.date, group.year, pendingTimes),
				fileName: item.fileName || id,
			};
		});

		combinedMap[group.year].push(...enrichedItems);
	});

	return Object.keys(combinedMap)
		.sort((a, b) => Number(b) - Number(a))
		.map(year => ({
			year,
			items: combinedMap[year].sort((a, b) => {
				const dateA = a.date
					.split('~')[0]
					.replace(/[^0-9]/g, '')
					.padEnd(4, '0');
				const dateB = b.date
					.split('~')[0]
					.replace(/[^0-9]/g, '')
					.padEnd(4, '0');

				return Number(dateB) - Number(dateA);
			}),
		}));
};

export const FULL_CONCERTS: ConcertList = GET_FULL_CONCERTS();
