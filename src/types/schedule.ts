// @types/schedule

/* eslint-disable storybook/default-exports */

export interface Schedule {
	id: string;
	date: string;
	type: 'ALBUM' | 'CONCERT' | 'EVENT' | 'ANNIVERSARY' | 'BIRTHDAY';
	content: string;
	isPeriod?: boolean;
	time?: string | null;
	link?: string;
}

export type CalendarSchedules = Record<string, Schedule[]>;
