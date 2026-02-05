// @const/schedule.ts

/* eslint-disable storybook/default-exports */

import { theme } from '@/styles/themes';
import { Schedule } from '@/types/schedule';

export const SCHEDULE_LABEL_MAP = {
	ALBUM: '앨범',
	CONCERT: '공연/음악감상회',
	ANNIVERSARY: '기념일',
	BIRTHDAY: '생일',
	EVENT: '그 외',
};

export const SCHEDULE_TYPE_COLORS: Record<Schedule['type'], { bg: string; text: string }> = {
	ALBUM: { bg: theme.COLOR.BLUE100, text: theme.COLOR.BLUE600 },
	CONCERT: { bg: theme.COLOR.PURPLE100, text: theme.COLOR.PURPLE600 },
	ANNIVERSARY: { bg: theme.COLOR.PINK100, text: theme.COLOR.PINK600 },
	BIRTHDAY: { bg: theme.COLOR.YELLOW100, text: theme.COLOR.YELLOW600 },
	EVENT: { bg: theme.COLOR.GREEN100, text: theme.COLOR.GREEN600 },
};
