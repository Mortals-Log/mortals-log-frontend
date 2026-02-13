// @const/event.ts

/* eslint-disable storybook/default-exports */

import { EventItem, EventList } from '@/types/event';
import { LINK_PLATFORM } from './links';

export const EVENT_TYPE_LABEL: Record<string, string> = {
	INTERVIEW: '인터뷰',
	RADIO: '라디오',
	MAGAZINE: '매거진/잡지',
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
				platform: LINK_PLATFORM.YOUTUBE.NAME,
				link: 'YOJis-vq0sA',
				embed: 'YOJis-vq0sA?si=cP4hEwkMAxMjtSUj',
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
				platform: LINK_PLATFORM.YOUTUBE.NAME,
				link: 'u5vdrzXzbeA',
				quote: '중학교 기간제 교사로도 일하고 있고 싱어송라이터로서도 활동하고 있는 인디가수',
				embed: 'u5vdrzXzbeA?si=69SoIjt4SOBNIqiR',
			},
			{
				type: 'INTERVIEW',
				date: '01.12',
				host: 'sub_riot',
				content: '🎤 𝐀𝐫𝐭𝐢𝐬𝐭 𝐈𝐧𝐭𝐞𝐫𝐯𝐢𝐞𝐰 𝐰𝐢𝐭𝐡 천진우 🎤',
				platform: LINK_PLATFORM.INSTAGRAM.NAME,
				link: 'DTZzRsdkbSK/?img_index=1',
				quote: '학교에서 애들을 가르치면서 음악 하고 있는',
			},
		],
	},
	{
		year: '2025',
		items: [
			{
				type: 'INTERVIEW',
				date: '10.25', // 게시글 삭제로 인해 임시로 삽입했습니다.
				host: 'nerv_mag',
				content: '[에바와 음악Vol.1]',
				platform: LINK_PLATFORM.INSTAGRAM.NAME,
				link: 'DMOosfnz7IV/?img_index=1',
				quote: '여러분 인생에 브금 깔아보려고 노력 중인',
				descriptionContent: `사람과 사람 사이의 틈을 채울 생각은 없습니다.\n오히려 그 틈 자체를 낭만적으로 바라보고 노래로 옮겨적는 것 같습니다.`,
			},
		],
	},
];

export const EVENT_MAGAZINE: EventList = [
	{
		year: '2026',
		items: [
			{
				type: 'MAGAZINE',
				date: '02.11',
				host: 'BUV (버브)',
				content: '어둠의 김광석이라 불리는 뮤지션 천진우(@1000_jinwoo)를 아시나요?',
				platform: LINK_PLATFORM.INSTAGRAM.NAME,
				link: 'DUnPbd6DxtU/?img_index=1',
			},
		],
	},
];

export const GET_FULL_EVENT = () => {
	const combinedMap: Record<string, EventItem[]> = {};

	[...EVENT_RADIO, ...EVENT_INTERVIEW, ...EVENT_MAGAZINE].forEach(group => {
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
