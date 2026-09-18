// @/views/AlbumDetail/album-detail-classes — AlbumDetail/*.style.ts 이관

/* eslint-disable storybook/default-exports */

import { cn } from '@/utils/cn';

// ── AlbumDetailIntro.style.ts
export const ADI_CONTENT_SECTION = 'w-full mt-12 max-tablet:mt-10 max-mobile:mt-6';
export const adiIntroContainer = (isExpanded: boolean) =>
	cn(
		"relative py-4 px-4 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-20 after:bg-[linear-gradient(to_bottom,transparent,var(--color-white))] after:pointer-events-none after:transition-opacity after:duration-500 [&_.text]:font-sans [&_.text]:text-md [&_.text]:font-normal [&_.text]:text-gray-600 [&_.text]:leading-[1.8] [&_.text]:whitespace-pre-wrap [&_.text]:[word-break:keep-all] [&_.text]:overflow-hidden [&_.text]:transition-[max-height] [&_.text]:duration-200 max-tablet:[&_.text]:text-sm",
		isExpanded
			? 'after:opacity-0 [&_.text]:max-h-none'
			: '[&_.text]:max-h-[300px] max-tablet:[&_.text]:max-h-[250px] max-mobile:[&_.text]:max-h-[230px] after:opacity-100',
	);

// ── AlbumDetailMetaInfo.style.ts
export const ADM_CONTENT_SECTION =
	'flex gap-12 py-8 max-tablet:flex-col max-tablet:items-center max-tablet:gap-8 max-tablet:p-2';
export const ADM_INFO_WRAPPER = 'flex-1 flex flex-col justify-center';
export const admCoverImage = (hasStore: boolean) =>
	cn(
		'w-full aspect-square object-cover rounded-[10px] shadow-[0_20px_30px_rgba(0,0,0,0.1)] max-mobile:shadow-[0_15px_20px_rgba(0,0,0,0.1)]',
		hasStore ? 'max-w-[350px]' : 'max-w-[280px]',
	);
export const ADM_BADGE_GROUP =
	'flex flex-wrap gap-[0.3rem] mb-2 max-tablet:gap-[0.2rem] max-tablet:mb-[0.8rem] max-mobile:order-[10] max-mobile:mt-4';
export const ADM_TYPE_WRAP =
	"flex items-center gap-2 mb-[0.8rem] font-sans text-md [&_.type]:font-medium [&_.type]:text-primary [&_.vol]:font-normal [&_.vol]:text-gray-400 [&_.vol]:before:content-['|'] [&_.vol]:before:mr-2 [&_.vol]:before:text-gray-300 max-mobile:text-sm max-mobile:gap-1 max-mobile:[&_.vol]:before:mr-1";
export const ADM_ALBUM_TITLE = 'font-serif text-h2 font-medium text-gray-700 mb-[0.3rem]';
export const ADM_META_LIST = 'grid grid-cols-[120px_1fr] gap-y-[0.8rem] my-4 mx-2';
export const ADM_TERM = 'font-sans text-sm font-normal text-gray-500';
export const ADM_DESCRIPTION = 'font-sans text-sm font-normal text-gray-700';

// ── AlbumDetailTracks.style.ts
export const ADT_CONTENT_SECTION = 'w-full mt-8 max-mobile:mt-6';
export const ADT_SIDE_TITLE =
	'py-[1.2rem] border-b-2 border-solid border-gray-100 font-serif text-md font-medium text-gray-600 tracking-[0.1em] uppercase max-tablet:text-sm';
