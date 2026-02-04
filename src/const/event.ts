// @const/event.ts

/* eslint-disable storybook/default-exports */

import { EventItem, EventList } from '@/types/event';

export const EVENT_TYPE_LABEL: Record<string, string> = {
	INTERVIEW: '인터뷰',
	RADIO: '라디오',
} as const;

export const EVENT_RADIO: EventList = [
	{
		year: '2023',
		items: [
			{
				type: 'RADIO',
				date: '07.25',
				host: '광주mbc - 정오의희망곡',
				content: "[정오의희망곡] 7/25(화) 건강한 나를 지키는 법 / 나만 알고 싶다,,, 싱어송라이터 '천진우' | 광주mbc",
				link: 'https://www.youtube.com/watch?v=YOJis-vq0sA',
			},
		],
	},
];

export const EVENT_INTERVIEW: EventList = [
	{
		year: '2026',
		items: [
			{
				type: 'INTERVIEW',
				date: '02.03',
				host: '피디씨 by PDC',
				content: '[누구세요?] EP.01 학생이 먼저 듣고 부모가 빠진 가수',
				link: 'https://www.youtube.com/watch?v=u5vdrzXzbeA',
			},
		],
	},
];

export const GET_FULL_EVENT = () => {
	const combinedMap: Record<string, EventItem[]> = {};

	[...EVENT_RADIO, ...EVENT_INTERVIEW].forEach(group => {
		if (!combinedMap[group.year]) {
			combinedMap[group.year] = [];
		}

		const enrichedItems = group.items.map(item => {
			return {
				...item,
			};
		});

		combinedMap[group.year].push(...enrichedItems);
	});

	return Object.keys(combinedMap)
		.sort((a, b) => Number(b) - Number(a))
		.map(year => ({
			year,
			items: combinedMap[year].sort((a, b) => {
				const dateA = a.date.replace(/[^0-9]/g, '').padEnd(4, '0');
				const dateB = b.date.replace(/[^0-9]/g, '').padEnd(4, '0');

				return Number(dateB) - Number(dateA);
			}),
		}));
};

export const FULL_EVENTS: EventList = GET_FULL_EVENT();
