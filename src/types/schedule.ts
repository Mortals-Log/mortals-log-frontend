// @types/schedule

/* eslint-disable storybook/default-exports */

import { theme } from '@/styles/themes';

export interface Schedule {
	type: 'ALBUM' | 'CONCERT' | 'EVENT' | 'ANNIVERSARY' | 'BIRTHDAY';
	content: string;
	isPeriod?: boolean;
	time?: string | null;
	link?: string;
}

export const SCHEDULE_TYPE_COLORS: Record<Schedule['type'], { bg: string; text: string }> = {
	ALBUM: { bg: theme.COLOR.BLUE100, text: theme.COLOR.BLUE600 },
	CONCERT: { bg: theme.COLOR.PURPLE100, text: theme.COLOR.PURPLE600 },
	ANNIVERSARY: { bg: theme.COLOR.PINK100, text: theme.COLOR.PINK600 },
	BIRTHDAY: { bg: theme.COLOR.YELLOW100, text: theme.COLOR.YELLOW600 },
	EVENT: { bg: theme.COLOR.GREEN100, text: theme.COLOR.GREEN600 },
};

export type CalendarSchedules = Record<string, Schedule[]>;
