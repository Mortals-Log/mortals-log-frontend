// @types/schedule

/* eslint-disable storybook/default-exports */

export interface Schedule {
	id: string;
	date: string;
	type: 'ALBUM' | 'CONCERT' | 'EVENT' | 'ANNIVERSARY' | 'BIRTHDAY';
	content: string;
	imageUrl?: string;
	isPeriod?: boolean;
	time?: string | null;
	link?: string;
}

export type CalendarSchedules = Record<string, Schedule[]>;
