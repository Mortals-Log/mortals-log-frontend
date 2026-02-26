// @const/schedule.ts

/* eslint-disable storybook/default-exports */

import { Theme } from '@/styles/themes';
import { Schedule } from '@/types/schedule';

export const SCHEDULE_LABEL_MAP = {
	ALBUM: '앨범',
	CONCERT: '공연/음악감상회',
	ANNIVERSARY: '기념일',
	BIRTHDAY: '생일',
	EVENT: '그 외',
};

export const SCHEDULE_TYPE_COLORS: Record<Schedule['type'], { bg: string; text: string }> = {
	ALBUM: { bg: Theme.COLOR.BLUE100, text: Theme.COLOR.BLUE600 },
	CONCERT: { bg: Theme.COLOR.PURPLE100, text: Theme.COLOR.PURPLE600 },
	ANNIVERSARY: { bg: Theme.COLOR.PINK100, text: Theme.COLOR.PINK600 },
	BIRTHDAY: { bg: Theme.COLOR.YELLOW100, text: Theme.COLOR.YELLOW600 },
	EVENT: { bg: Theme.COLOR.GREEN100, text: Theme.COLOR.GREEN600 },
};
