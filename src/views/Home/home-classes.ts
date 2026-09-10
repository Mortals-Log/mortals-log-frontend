// @/views/Home/home-classes — Home/*.style.ts 페이지 로컬 styled 이관

/* eslint-disable storybook/default-exports */

// ── Home.style.ts
// 원본 tablet padding 규칙("50x" 오타)이 무효라 base padding 이 tablet 에도 적용되던 현재 동작 재현
export const HOME_MAIN =
	'max-w-[800px] mx-auto flex flex-col min-h-[calc(100vh-60px)] items-center pt-[100px] px-[60px] pb-[30px] max-mobile:pt-[90px] max-mobile:px-4 max-mobile:pb-[10px]';
export const HOME_HERO_SECTION =
	'flex relative w-full min-h-[60vh] flex-col justify-center items-center overflow-hidden text-center';
export const HOME_DESCRIPTION =
	'block mb-4 font-serif text-md font-normal text-primary tracking-[0.4rem] [word-break:keep-all] text-center max-laptop:text-sm max-laptop:tracking-[0.2rem] max-laptop:mb-[0.8rem] max-mobile:text-xs max-mobile:mb-2';
export const HOME_MAIN_TITLE =
	'font-serif text-display font-semibold text-black m-0 tracking-[-0.02em] text-center [word-break:keep-all]';
export const HOME_SUBTITLE_CONTAINER =
	'overflow-hidden text-center whitespace-pre-wrap my-6 max-mobile:my-4 max-mobile:whitespace-normal';
export const HOME_SUBTITLE_WRAPPER = 'inline-flex items-center gap-[0.8rem] max-laptop:gap-2';
export const HOME_SUBTITLE =
	"font-serif text-lg font-normal text-gray-600 [&:not(:first-child)]:before:content-['|'] [&:not(:first-child)]:before:mr-[0.8rem] [&:not(:first-child)]:before:text-primary max-laptop:text-md max-laptop:[&:not(:first-child)]:before:mr-2 max-tablet:text-sm";

// ── ProfileSection.style.ts
export const PS_SECTION = 'w-full flex relative justify-center mx-auto mt-24 max-tablet:mt-20';
export const PS_BACKGROUND_TEXT =
	'absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 rotate-[-25deg] font-sans text-[11vw] font-bold text-primary opacity-5 leading-[0.9] text-center z-0 select-none pointer-events-none max-tablet:text-[25vw] max-tablet:top-[55%] max-tablet:left-[30%] max-mobile:text-[30vw] max-mobile:top-[55%] max-mobile:left-[30%]';
export const PS_SECTION_WRAPPER =
	'flex relative w-full mx-auto items-center justify-center gap-16 max-laptop:gap-12 max-tablet:flex-col max-tablet:gap-8 max-mobile:flex-col max-mobile:gap-6';
export const PS_IMAGE_SECTION =
	'relative flex-[0_0_340px] w-full max-laptop:flex-[0_0_290px] max-tablet:flex-none max-tablet:max-w-[280px] max-mobile:max-w-[250px]';
export const PS_MAIN_IMAGE = 'w-full aspect-[3/4] object-cover transition-[filter] duration-500';
export const PS_HANJA_BADGE =
	'absolute top-[-20px] right-[-20px] bg-black py-[18px] px-2.5 [font-family:serif] text-[1.7rem] font-normal text-white [writing-mode:vertical-rl] tracking-[0.7rem] max-laptop:py-[15px] max-laptop:px-2 max-laptop:text-[1.5rem] max-laptop:tracking-[0.4rem] max-mobile:top-[-15px] max-mobile:right-[-10px] max-mobile:text-[1.4rem] max-mobile:tracking-[0.4rem]';
export const PS_TEXT_SECTION = 'flex flex-col items-start max-mobile:w-full max-mobile:items-center max-mobile:text-center';
export const PS_MODIFIER_CONTAINER =
	'flex flex-col justify-end items-start w-[400px] min-h-[80px] mb-1 [will-change:transform,opacity,filter] hover:[&_a]:opacity-100 hover:[&_p]:[animation-play-state:paused] max-tablet:hidden max-mobile:hidden';
export const PS_MODIFIER_LINK_EXTRA = 'w-auto opacity-0 mb-2 whitespace-normal overflow-visible text-clip max-laptop:mb-1';
export const PS_MODIFIER_TEXT =
	'line-clamp-2 leading-[1.4] m-0 font-serif text-md font-bold text-gray-600 text-left [word-break:keep-all] animate-[fadeInBlur_0.8s_ease-out] max-laptop:text-sm max-laptop:font-semibold';
export const PS_NAME_SECTION =
	'flex items-baseline mb-[1.2rem] gap-[0.6rem] max-tablet:items-start max-tablet:flex-col max-tablet:mb-2 max-mobile:items-center max-mobile:mb-6 max-mobile:gap-[0.4rem]';
export const PS_ARTIST_NAME = 'font-serif text-h2 font-bold text-black max-tablet:text-xl';
export const PS_JOB_BADGE = 'font-sans text-md font-normal text-gray-400 tracking-[0.1rem] max-mobile:text-sm';
export const PS_PROFILE_DESCRIPTION =
	'block items-start mb-8 font-serif text-md font-medium text-gray-600 text-start whitespace-pre-wrap [word-break:keep-all] leading-[1.8] max-tablet:text-sm max-tablet:mb-6 max-mobile:text-xs max-mobile:text-center max-mobile:leading-[1.6]';

// ── InformationSection.style.ts
export const IS_INFORMATION_SECTION = 'w-full mx-auto px-6 max-tablet:px-4';
export const IS_SECTION_WRAPPER = 'grid grid-cols-2 max-tablet:grid-cols-1 max-tablet:gap-4';
export const IS_INFO_SECTION =
	'pt-8 [&_.section-label]:font-serif [&_.section-label]:text-sm [&_.section-label]:font-normal [&_.section-label]:text-primary [&_.section-label]:tracking-[0.2rem] [&_.section-label]:block [&_.section-label]:mb-6 max-tablet:[&_.section-label]:mb-[0.8rem] max-tablet:[&_.section-label]:tracking-[0.15rem] max-mobile:[&_.section-label]:mb-4';
export const IS_EVENT_LIST = 'flex flex-col gap-10 max-laptop:gap-8 max-tablet:w-full max-tablet:gap-6';
export const IS_CONTENT_CARD =
	'border-l-[1.5px] border-solid border-primary py-2 px-6 text-left [&_.title]:font-serif [&_.title]:text-md [&_.title]:font-normal [&_.title]:text-black [&_.title]:m-0 [&_.title]:mb-2 [&_.info-text]:font-sans [&_.info-text]:text-sm [&_.info-text]:font-light [&_.info-text]:text-gray-600 [&_.info-text]:opacity-70 [&_.info-text]:m-0 max-mobile:py-[0.3rem] max-mobile:px-4';
export const IS_TIME_SLOT_WRAPPER = 'flex justify-start gap-[0.4rem] mt-4 flex-wrap';
export const IS_TIME_TAG =
	'border border-solid border-black py-[0.4rem] px-[0.8rem] flex flex-col items-start min-w-[70px] [&_.part]:font-sans [&_.part]:text-tiny [&_.part]:font-normal [&_.part]:text-primary [&_.part]:mb-[0.1rem] [&_.part]:uppercase [&_.time]:font-sans [&_.time]:text-sm [&_.time]:font-medium [&_.time]:text-gray-600 max-tablet:[&_.time]:text-xs';
export const IS_ACTION_LINK =
	'flex justify-end mt-4 cursor-pointer font-sans text-sm font-light text-gray-700 no-underline hover:text-primary max-tablet:mt-[0.8rem]';
