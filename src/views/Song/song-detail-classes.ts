// @/views/Song/song-detail-classes — Song/SongDetail*.styles.ts 이관

/* eslint-disable storybook/default-exports */

import { cn } from '@/utils/cn';
import { LAYOUT_MAIN_TITLE } from '@/const/layout-classes';

// ── SongDetailHeader.styles.ts
export const SDH_BADGE_GROUP = 'inline-flex flex-wrap gap-[0.3rem] mr-[0.3rem] mb-0 max-tablet:gap-[0.2rem]';
export const SDH_MAIN_TITLE = cn(LAYOUT_MAIN_TITLE, 'max-mobile:mt-0');
export const SDH_HEADER_SECTION = 'mt-2 pb-[0.8rem] border-b border-solid border-gray-200 max-mobile:pb-2';
export const SDH_ORIGINAL_LINK_GROUP = 'flex flex-wrap gap-[0.3rem] mt-2';
export const SDH_ORIGINAL_LINK =
	'inline py-[0.4rem] px-[0.6rem] bg-gray-50 border border-solid border-gray-300 rounded font-sans text-sm font-normal text-gray-500 cursor-pointer transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white max-mobile:text-xs';
export const SDH_DESCRIPTION =
	"mt-2 font-sans text-sm font-normal text-gray-500 leading-[1.6] whitespace-pre-wrap [&_.type]:after:content-['|'] [&_.type]:after:mx-[0.2rem] [&_.type]:after:text-primary [&_.type]:after:opacity-60 [&_.album]:cursor-pointer [&_.album]:transition-colors [&_.album]:duration-200 [&_.album:hover]:text-primary [&_.album:hover]:underline [&_.album:hover]:underline-offset-2 max-mobile:text-xs";

// ── SongDetailMeta.styles.ts
export const SDM_META_SECTION = 'flex flex-col gap-4 border-b border-solid border-gray-200 py-4 print:hidden';
export const SDM_CREDIT_LIST = 'flex items-start flex-wrap gap-6 max-tablet:gap-[1.3rem] max-mobile:gap-[1.2rem]';
export const SDM_ITEM_LABEL = 'block min-w-fit font-sans text-sm font-normal text-gray-500 mb-2 max-tablet:text-xs';
export const SDM_CREDIT_ITEM = 'font-sans text-md font-normal text-gray-700 tracking-[0.05rem] max-tablet:text-sm';
export const SDM_STREAMING_SECTION = 'block';
export const SDM_SINGING_WRAPPER = 'flex gap-2 max-mobile:gap-[0.3rem]';
export const sdmSingingBadge = (brand: 'TJ' | 'KY') =>
	cn(
		'flex items-center border-[0.5px] border-solid border-gray-200 rounded font-sans text-sm text-gray-700 [&_.brand]:py-[0.2rem] [&_.brand]:px-2 [&_.brand]:font-medium [&_.brand]:text-white [&_.brand]:rounded-l [&_.number]:py-[0.2rem] [&_.number]:px-[0.4rem] [&_.number]:font-normal [&_.number]:text-gray-700 max-mobile:text-xs',
		brand === 'TJ' ? '[&_.brand]:bg-tj' : '[&_.brand]:bg-ky',
	);

// ── SongDetailContent.styles.ts
export const SDC_CONTENT_SECTION = 'w-full mt-2';
export const SDC_CONTENT_HEADER = 'flex flex-col mb-[0.3rem]';
export const SDC_TAB_GROUP = 'flex gap-4 my-4 max-mobile:gap-[0.8rem] print:hidden';
export const sdcTabButton = (isActive: boolean) =>
	cn(
		"relative bg-none border-none p-0 cursor-pointer transition-colors duration-200 font-sans text-lg font-normal after:content-[''] after:absolute after:w-full after:h-0.5 after:left-0 after:bottom-[-4px] after:bg-gray-700 max-mobile:text-md",
		isActive ? 'text-gray-700 after:opacity-100' : 'text-gray-300 after:opacity-0 hover:text-gray-700 hover:opacity-80',
	);
export const SDC_CHORD_SUB_HEADER = 'flex flex-col pb-4 gap-4 border-b border-solid border-gray-100';
export const SDC_VERSION_SELECTOR = 'flex flex-wrap gap-6 max-mobile:gap-[1.2rem] print:hidden';
export const sdcVersionChip = (isActive: boolean) =>
	cn(
		"relative cursor-pointer whitespace-nowrap [word-break:keep-all] font-sans text-md font-semibold transition-colors duration-100 after:content-[''] after:absolute after:top-0.5 after:right-[-8px] after:w-1 after:h-1 after:rounded-full after:bg-gray-700 after:transition-opacity after:duration-200",
		isActive ? 'text-gray-700 after:opacity-100' : 'text-gray-300 after:opacity-0 hover:text-gray-500',
	);
export const SDC_GUIDE_WRAPPER =
	"flex flex-col gap-2 [&_.guide-item]:font-sans [&_.guide-item]:text-sm [&_.guide-item]:text-gray-500 [&_.guide-item]:leading-[1.2] [&_.guide-item]:whitespace-pre-wrap [&_.guide-item]:[word-break:keep-all] [&_.guide-item]:before:content-['*_'] [&_.guide-item]:before:text-primary max-tablet:[&_.guide-item]:text-xs";
export const sdcContent = (isChord: boolean) =>
	cn(
		'font-sans text-md font-normal text-gray-700 whitespace-pre-wrap [word-break:break-all]',
		isChord ? 'leading-[2]' : 'leading-[1.8]',
	);
export const SDC_STICKY_CHORD_BAR =
	'sticky top-[65px] z-10 py-4 px-6 my-4 bg-white/80 backdrop-blur-[15px] border border-solid border-gray-200 rounded-lg [&_.chord]:font-sans [&_.chord]:text-md [&_.chord]:font-semibold [&_.chord]:text-primary [&_.chord]:tracking-[0.1rem] [&_.chord]:whitespace-pre-wrap [&_.chord]:[word-break:break-all] max-tablet:top-[60px] max-tablet:[&_.chord]:text-sm';
export const SDC_BUTTON_WRAPPER = 'flex w-full justify-end items-center gap-[0.8rem] my-4 print:hidden';
export const SDC_DOWNLOAD_BUTTON =
	'flex items-center cursor-pointer font-sans text-sm font-medium text-gray-700 transition-all duration-200 hover:text-primary';
