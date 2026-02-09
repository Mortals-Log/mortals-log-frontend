// @types/schedule

import { Price } from './concert';

/* eslint-disable storybook/default-exports */

export interface Schedule {
	id: string;
	date: string;
	type: 'ALBUM' | 'CONCERT' | 'EVENT' | 'ANNIVERSARY' | 'BIRTHDAY';
	content: string;
	imageUrl?: string;

	// concert
	isPeriod?: boolean;
	time?: string | null;
	location?: string;
	lineUp?: string[];
	reservationLink?: string;
	price?: Price;

	//etc
	link?: string;
}

export type CalendarSchedules = Record<string, Schedule[]>;
