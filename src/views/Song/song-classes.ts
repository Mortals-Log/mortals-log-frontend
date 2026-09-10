// @/views/Song/song-classes — Song/Song.styles.ts 이관

/* eslint-disable storybook/default-exports */

import { cn } from '@/utils/cn';

export const SONG_SORT_TAB_GROUP =
	'flex list-none justify-end items-center gap-5 mb-4 px-6 max-tablet:gap-[1.2rem] max-tablet:px-[1.2rem] max-mobile:gap-4 max-mobile:px-4';

export const songSortTab = (active: boolean) =>
	cn(
		"relative cursor-pointer py-1 px-0 transition-all duration-200 font-sans text-sm after:content-[''] after:absolute after:top-0 after:right-[-6px] after:w-1 after:h-1 after:rounded-full after:bg-primary after:transition-opacity after:duration-200",
		active
			? 'font-semibold text-primary after:opacity-100 after:scale-100'
			: 'font-medium text-gray-500 after:opacity-0 after:scale-0 hover:text-primary hover:opacity-80',
	);

export const SONG_TRACK_SECTION = 'w-full flex flex-col gap-2 max-tablet:gap-[0.4rem] max-mobile:gap-[0.3rem]';
