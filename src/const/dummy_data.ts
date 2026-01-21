// @const/dummy_data

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import { Schedule } from '@/types/schedule';

export const DUMMY_SCHEDULE: Schedule[] = [
	{
		title: '천진우의 연말시상식',
		location: '홍대 롤링홀',
		date: '2025. 11. 21',
		schedules: [{ time: '20:00' }],
	},
	{
		title: '부산불바다2',
		location: '부산 리얼라이즈',
		date: '2026. 01. 17',
		schedules: [
			{ part: '1부', time: '16:00' },
			{ part: '2부', time: '19:00' },
		],
	},
	{
		title: '고독의 포크 전사 주정뱅이 딴따라',
		location: '홍대 롤링홀',
		date: '2026. 02. 06 ~ 07',
		schedules: [
			{ part: '02. 06 (토)', time: '16:00' },
			{ part: '02. 07 (일)', time: '16:00' },
		],
	},
];
