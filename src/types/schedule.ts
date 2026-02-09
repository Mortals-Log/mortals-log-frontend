// @types/schedule

/* eslint-disable storybook/default-exports */

export interface Schedule {
	id: string;
	targetId?: string;
	date: string;
	type: 'ALBUM' | 'CONCERT' | 'EVENT' | 'ANNIVERSARY' | 'BIRTHDAY';
	content: string;
	imageUrl?: string;

	// concert
	time?: string | null;
}

export type CalendarSchedules = Record<string, Schedule[]>;
