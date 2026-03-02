// @/types/schedule

/* eslint-disable storybook/default-exports */

export interface Schedule {
	id: string;
	date: string;
	type: 'ALBUM' | 'CONCERT' | 'TICKETING' | 'EVENT' | 'ANNIVERSARY' | 'BIRTHDAY';
	content: string;
	imageUrl?: string;

	// concert
	ageLimit?: boolean;
	time?: string | null;

	// birthday
	message?: string;
	hashtags?: string[];

	// anniversary
	specialLink?: { label: string; url: string };
	fileUrl?: { label: string; url: string };
}

export type CalendarSchedules = Record<string, Schedule[]>;
