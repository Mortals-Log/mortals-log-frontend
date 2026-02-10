// @types/schedule

/* eslint-disable storybook/default-exports */

export interface Schedule {
	id: string;
	date: string;
	type: 'ALBUM' | 'CONCERT' | 'EVENT' | 'ANNIVERSARY' | 'BIRTHDAY';
	content: string;
	imageUrl?: string;

	// concert
	ageLimit?: boolean;
	time?: string | null;
}

export type CalendarSchedules = Record<string, Schedule[]>;
