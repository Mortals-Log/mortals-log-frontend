// @/views/Album/album-classes — Album/*.style.ts 이관

/* eslint-disable storybook/default-exports */

import { cn } from '@/utils/cn';

// ── AlbumTypeSection.style.ts
export const AT_TAB_LIST =
	'flex sticky z-10 top-[60px] justify-between items-start py-[1.2rem] px-2 m-0 bg-white/80 backdrop-blur-[15px] border-b border-solid border-gray-100/[0.27] max-tablet:hidden';
export const AT_TAB_GROUP =
	"flex flex-wrap flex-1 p-0 m-0 gap-6 list-none overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] after:content-[''] after:pr-6 max-tablet:gap-x-[1.2rem] max-tablet:gap-y-4 max-tablet:px-[5px]";
export const atTabItem = (active: boolean) =>
	cn(
		"relative cursor-pointer whitespace-nowrap font-serif text-md font-semibold transition-colors duration-200 after:content-[''] after:absolute after:top-0 after:right-[-8px] after:w-1 after:h-1 after:rounded-full after:bg-primary after:transition-all after:duration-200",
		active
			? 'text-primary after:opacity-100 after:scale-100'
			: 'text-gray-300 after:opacity-0 after:scale-0 hover:text-primary hover:opacity-80',
	);

// ── AlbumReleaseSection.style.ts
export const AR_MOBILE_SECTION = 'hidden max-tablet:block max-tablet:scroll-mt-16';
export const arYearSection = (isOpen: boolean) =>
	cn('flex gap-8 scroll-mt-16 first-of-type:mt-4 max-tablet:hidden', isOpen ? 'my-12' : 'my-6');
export const arYearWrapper = (isOpen: boolean) =>
	cn('sticky flex h-fit top-20 z-10 justify-center items-center', isOpen ? 'flex-col gap-4' : 'w-full flex-row');
export const AR_YEAR_TITLE = 'font-serif text-h2 font-medium text-primary';

// ── AlbumPromotionSection.style.ts
export const AP_CONTENT_WRAPPER =
	'relative flex w-full z-[2] items-center p-8 gap-12 max-tablet:flex-col max-tablet:p-4 max-tablet:gap-6 max-mobile:gap-[1.2rem]';
export const AP_IMAGE_AREA = 'flex-1 flex relative max-tablet:justify-center max-tablet:w-full max-tablet:mb-4';
export const AP_COVER_IMAGE =
	'w-full max-w-[450px] aspect-square object-cover rounded-[10px] shadow-[0_10px_20px_rgba(0,0,0,0.1)] max-tablet:max-w-[380px]';
export const AP_INFO_AREA = 'flex-1 flex flex-col items-start font-sans text-primary max-tablet:items-center';
export const AP_TAG = 'font-sans text-xs font-light text-primary tracking-[1px] mb-[0.7rem] max-tablet:mb-[0.4rem]';
export const AP_TITLE = 'font-serif text-h2 font-semibold text-primary mb-4 max-tablet:mb-2';
export const AP_INFO = 'font-sans text-md font-normal text-gray-500 mb-4 max-tablet:mb-2 max-mobile:text-sm';
export const AP_DESCRIPTION =
	'font-sans text-sm font-normal text-gray-500 leading-[1.2] whitespace-pre-wrap [word-break:keep-all] max-tablet:text-center';
export const AP_TRACK_PREVIEW_LIST = 'flex flex-col list-none gap-[0.8rem] mt-[1.2rem] mb-6 mx-0 p-0 max-tablet:gap-2';
export const AP_TRACK_ITEM =
	'flex items-center gap-2 font-serif text-sm text-primary [&_.number]:text-sm [&_.number]:font-semibold [&_.name]:tracking-[0.05rem] [&_.name]:font-medium';
export const AP_MORE_TEXT = 'font-serif text-sm font-normal text-gray-500 mt-1 pl-[1.6rem] max-tablet:pl-0 max-mobile:text-xs';
export const AP_VIEW_MORE_LINK =
	"inline-block w-fit bg-black py-4 px-6 font-sans text-md font-semibold text-white rounded-[10px] no-underline transition-all duration-300 cursor-pointer after:content-['→'] after:ml-0.5 after:text-white hover:bg-primary hover:text-white active:scale-[0.98] max-tablet:py-4 max-tablet:px-[1.2rem] max-mobile:py-[0.8rem] max-mobile:px-[1.4rem] max-mobile:text-sm";
export const AP_DDAY_BADGE =
	'absolute z-10 top-4 left-4 p-[0.8rem] rounded-[10px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] bg-primary font-sans text-sm font-medium text-white max-tablet:top-[0.1rem] max-tablet:left-[0.1rem] max-tablet:shadow-[0_2px_8px_rgba(0,0,0,0.1)]';
