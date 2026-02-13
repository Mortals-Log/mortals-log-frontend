// @types/event

/* eslint-disable storybook/default-exports */

export interface EventItem {
	type: 'INTERVIEW' | 'RADIO' | 'MAGAZINE';
	date: string;
	content: string;
	host?: string;
	link?: string;
	embed?: string;
	platform?: string;
	quote?: string;
	descriptionContent?: string;
}

export interface Event {
	year: string;
	items: EventItem[];
}

export type EventList = Event[];
