// @/views/Music/music-classes — Music.style.ts 이관

/* eslint-disable storybook/default-exports */

import { cn } from '@/utils/cn';

export const MUSIC_MAIN =
	'max-w-[800px] mx-auto min-h-screen py-[100px] px-5 max-tablet:py-20 max-tablet:px-[1.8rem] max-mobile:py-20 max-mobile:px-6';

export const MUSIC_TAB_GROUP =
	'flex w-full items-center mt-16 mb-6 list-none overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] max-tablet:pb-1';

export const musicTab = (active: boolean) =>
	cn(
		'flex-1 flex min-w-fit justify-center items-center p-4 cursor-pointer whitespace-nowrap transition-colors duration-300 border-solid border-t-[1.5px] border-t-gray-100 border-b-2 rounded-t-[15px] font-serif text-sm font-semibold max-mobile:py-[0.8rem] max-mobile:px-4',
		active
			? 'border-b-primary bg-white text-primary'
			: 'border-b-gray-400 bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-500',
	);
