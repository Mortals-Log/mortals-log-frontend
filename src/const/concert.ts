// @const/concert.ts

import { Concert, ConcertItem } from '@/types/concert';

/* eslint-disable storybook/default-exports */

export const CONCERT_TYPE_LABEL: Record<string, string> = {
	SOLO: '단독 콘서트',
	JOIN: '합동 콘서트',
	TOUR: '전국 투어',
	LISTENING: '음악감상회',
};
export const SOLO_CONCERT: Concert[] = [
	{
		year: '2026',
		items: [
			{
				type: 'SOLO',
				date: '02.07 ~ 02.08',
				content: '고독의 포크 전사 주정뱅이 딴따라',
			},
			{
				type: 'SOLO',
				date: '01.17',
				content: '부산불바다2',
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
			},
			{
				type: 'SOLO',
				date: '08.17',
				content: '오싹오싹 공포의 인간쓰레기',
			},
			{
				type: 'SOLO',
				date: '05.03',
				content: '천진우와의 가장 가까운 만남',
			},
			{
				type: 'SOLO',
				date: '03.03',
				content: '구토유발자들',
			},
			{
				type: 'SOLO',
				date: '01.25',
				content: '천진우와 무법자들',
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
			},
			{
				type: 'SOLO',
				date: '12.08',
				content: '대뽀까지마라',
			},
			{
				type: 'SOLO',
				date: '11.23',
				content: '달달이 공연 제5호',
			},
			{
				type: 'SOLO',
				date: '09.21',
				content: '달달이 공연 제4호',
			},
			{
				type: 'SOLO',
				date: '08.25',
				content: '홍대불바다',
			},
			{
				type: 'SOLO',
				date: '07.28',
				content: '부산불바다',
			},
			{
				type: 'SOLO',
				date: '05.15',
				content: '달달이 공연 제3호',
			},
			{
				type: 'SOLO',
				date: '02.24',
				content: '달달이 공연 제2호',
			},
			{
				type: 'SOLO',
				date: '01.28',
				content: '달달이 공연 제1호',
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
			},
			{
				type: 'SOLO',
				date: '06.24',
				content: '아기다리 고기다리던 가라오케 업로드',
			},
			{
				type: 'SOLO',
				date: '05.05',
				content: '어른이날',
			},
			{
				type: 'SOLO',
				date: '01.28',
				content: '내일을 위한 오늘은 없다 대신에 여기 당신을 위한 공연이 왔다',
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
			},
		],
	},
];

export const TOUR_CONCERT: Concert[] = [
	{
		year: '2023',
		items: [{ type: 'TOUR', date: '07.29 ~ 08.06', content: '여름좀비' }],
	},
];

export const GET_FULL_CONCERTS = () => {
	const combinedMap: Record<string, ConcertItem[]> = {};

	[...SOLO_CONCERT, ...TOUR_CONCERT].forEach(group => {
		if (!combinedMap[group.year]) {
			combinedMap[group.year] = [];
		}
		combinedMap[group.year].push(...group.items);
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

export const FULL_CONCERTS: Concert[] = GET_FULL_CONCERTS();
