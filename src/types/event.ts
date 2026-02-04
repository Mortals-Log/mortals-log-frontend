// @types/event

/* eslint-disable storybook/default-exports */

export interface EventItem {
	type: 'INTERVIEW' | 'RADIO';
	date: string;
	content: string;
	host?: string;
	link?: string;
}

export interface Event {
	year: string;
	items: EventItem[];
}

export type EventList = Event[];
