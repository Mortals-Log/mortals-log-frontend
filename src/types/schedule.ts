/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

export interface TimeSlot {
	part?: string;
	time: string;
}

export interface Schedule {
	title: string;
	location: string;
	date: string;
	schedules: TimeSlot[];
	link?: string;
}
