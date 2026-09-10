// @/views/ScheduleDetail/detail-classes — ScheduleDetail/*.style.ts 이관

/* eslint-disable storybook/default-exports */

import { cn } from '@/utils/cn';

// ── ScheduleDetail.style.ts
export const SD_MAIN =
	'max-w-[800px] mx-auto min-h-screen py-[100px] px-5 max-tablet:py-20 max-tablet:px-[1.8rem] max-mobile:py-20 max-mobile:px-6';
export const SD_HEADER_SECTION = 'border-b border-solid border-gray-200 pb-4 mb-8 max-mobile:pb-2 max-mobile:mb-4';
export const SD_CATEGORY_BADGE = 'inline-block mb-[0.2rem] font-sans text-sm font-medium text-primary max-mobile:text-xs';
export const sdMainTitle = (ageLimit: boolean) =>
	cn(
		'font-serif text-h2 font-medium text-gray-700 leading-[1.5] whitespace-pre-wrap [word-break:keep-all] max-mobile:text-h3',
		ageLimit ? 'before:content-["🔞"]' : 'before:content-[""]',
	);

// ── ScheduleDetailBody.style.ts
export const SDB_MAIN_SECTION = 'flex items-center gap-12 max-tablet:flex-col';
export const SDB_IMAGE_WRAPPER =
	'flex-[0_0_400px] overflow-hidden mx-auto p-2 rounded-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.1)] [&_img]:w-full [&_img]:h-full [&_img]:object-fill [&_img]:block max-tablet:flex-1 max-tablet:max-w-[400px]';
export const SDB_CONTENT_SECTION = 'flex-1 flex flex-col gap-10 max-tablet:gap-8';
export const SDB_INFO_GROUP = 'flex flex-col gap-[0.8rem] items-center';
export const SDB_INFO_TITLE =
	'm-0 tracking-[0.1em] uppercase font-serif text-sm font-medium text-primary max-mobile:text-xs';
export const SDB_INFO_ITEM =
	"flex items-center justify-center text-center gap-3 font-sans text-md font-normal text-gray-700 [&_.part]:font-serif [&_.part]:text-md [&_.part]:font-medium [&_.part]:text-primary [&_.time]:flex [&_.time]:items-center [&_.time]:before:content-['|'] [&_.time]:before:inline-block [&_.time]:before:text-gray-400 [&_.time]:before:mr-3 [&_.info]:font-serif [&_.info]:text-xs [&_.info]:before:content-['*'] [&_.info]:before:text-primary [&_.info]:before:mr-1 max-mobile:text-sm max-mobile:gap-2 max-mobile:[&_.part]:text-sm max-mobile:[&_.time]:before:mr-2";
export const SDB_LINEUP_WRAPPER = 'flex flex-wrap justify-center gap-2 max-tablet:gap-[0.3rem] max-mobile:gap-[0.3rem]';
export const SDB_LINEUP_ITEM =
	'py-[0.8rem] px-4 border border-solid border-primary/[0.47] rounded-[20px] font-sans text-sm font-normal text-gray-700 max-mobile:py-2 max-mobile:px-[0.8rem]';
export const SDB_MAP_SECTION = 'flex flex-col w-full mt-16 pt-8 gap-4 border-t border-solid border-gray-200';
export const SDB_MAP_FRAME_WRAPPER =
	'w-full h-[400px] rounded-[10px] overflow-hidden grayscale-[0.2] shadow-[0_4px_20px_rgba(0,0,0,0.05)] [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-none max-tablet:h-[350px] max-tablet:rounded-[4px] max-mobile:h-[300px]';
export const SDB_HASHTAG_WRAPPER = 'flex flex-wrap items-center justify-center text-center';
export const SDB_HASHTAG =
	'font-serif text-sm font-medium text-gray-700 p-2 cursor-pointer transition-all duration-200 hover:text-primary max-tablet:p-[0.3rem]';
export const SDB_COPY_ANNOTATION = 'font-sans text-sm font-medium text-gray-500 max-tablet:text-xs';
