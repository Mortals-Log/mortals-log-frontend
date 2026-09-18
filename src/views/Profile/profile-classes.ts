// @/views/Profile/profile-classes — Profile/*.style.ts 페이지 로컬 styled 이관

/* eslint-disable storybook/default-exports */

// ── ProfileHeader
export const PH_HEADER =
	'flex gap-10 items-end max-tablet:flex-col max-tablet:items-center max-tablet:text-center max-tablet:gap-5 max-mobile:gap-6';
export const PH_MAIN_IMAGE =
	'w-[30%] min-w-[240px] aspect-[3/4] object-cover rounded-[4px] max-tablet:w-full max-tablet:max-w-[280px] max-mobile:max-w-[240px]';
export const PH_INFO_SUMMARY = 'flex-1 w-full';
export const PH_NAME_GROUP =
	"font-serif font-medium mb-6 [&_.name]:text-h1 [&_.name]:text-black [&_.name]:mb-[1.2rem] [&_.sub-name]:text-md [&_.sub-name]:text-gray-600 [&_.sub-name]:tracking-[0.05em] [&_.sub-name:not(:last-child)]:after:content-['|'] [&_.sub-name:not(:last-child)]:after:font-bold [&_.sub-name:not(:last-child)]:after:text-primary [&_.sub-name:not(:last-child)]:after:mx-[0.2rem] max-tablet:[&_.name]:mb-2 max-tablet:[&_.sub-name]:text-sm max-mobile:[&_.name]:text-h2 max-mobile:[&_.name]:mb-[0.8rem]";
export const PH_DESCRIPTION =
	'pl-4 my-[0.8rem] border-l-[2.5px] border-solid border-primary font-serif text-sm font-normal text-gray-700 leading-[1.5] whitespace-pre-wrap [word-break:keep-all] max-tablet:text-left max-tablet:my-6 max-mobile:border-l-0 max-mobile:border-t max-mobile:border-solid max-mobile:border-gray-200 max-mobile:pl-0 max-mobile:pt-6 max-mobile:mt-6 max-mobile:mb-0 max-mobile:mx-auto';

// ── ProfileDetailSection
export const PD_DEBUT_INFO =
	'inline-flex items-center gap-2 [&_.divider]:inline-block [&_.divider]:w-px [&_.divider]:h-3 [&_.divider]:bg-gray-300 max-mobile:[&_.divider]:h-2.5';

// ── ProfileCareerSection
export const PC_TIMELINE_CONTAINER =
	"relative pt-8 px-4 pb-0 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[100px] after:bg-[linear-gradient(to_bottom,transparent,var(--color-white))] after:pointer-events-none after:transition-opacity after:duration-300 max-tablet:pt-6 max-tablet:px-[0.8rem] max-tablet:pb-0 max-mobile:pt-6 max-mobile:px-2 max-mobile:pb-0 max-mobile:after:h-[80px]";
export const PC_TIMELINE_YEAR_GROUP =
	"mb-8 [&_.year-label]:flex [&_.year-label]:relative [&_.year-label]:items-center [&_.year-label]:font-sans [&_.year-label]:text-xl [&_.year-label]:font-bold [&_.year-label]:text-gray-700 [&_.year-label]:mb-4 [&_.year-label]:gap-4 [&_.year-label]:before:content-[''] [&_.year-label]:before:w-3 [&_.year-label]:before:h-3 [&_.year-label]:before:rounded-full [&_.year-label]:before:bg-primary max-tablet:[&_.year-label]:before:w-2 max-tablet:[&_.year-label]:before:h-2 max-tablet:[&_.year-label]:mb-0 max-tablet:[&_.year-label]:gap-[0.8rem] max-tablet:[&_.year-label]:font-semibold max-mobile:[&_.year-label]:before:w-2 max-mobile:[&_.year-label]:before:h-2 max-mobile:[&_.year-label]:gap-2";
export const PC_TIMELINE_ITEM_LIST = 'flex flex-col mt-4';
export const PC_TIMELINE_ITEM =
	"relative flex items-start gap-[0.8rem] py-[0.7rem] px-4 font-sans text-md text-gray-600 leading-[1.5] [word-break:keep-all] transition-transform duration-200 before:content-[''] before:w-1.5 before:h-1.5 before:rounded-full before:mt-[0.55rem] before:flex-shrink-0 before:bg-gray-400 [&_.date]:min-w-[50px] [&_.date]:font-semibold [&_.date]:flex-shrink-0 [&_.content]:font-normal max-tablet:py-2 max-tablet:px-4 max-tablet:before:mt-2 max-tablet:[&_.date]:min-w-[42px] max-mobile:gap-3 max-mobile:py-2 max-mobile:px-[0.2rem] max-mobile:text-sm max-mobile:before:w-1 max-mobile:before:h-1 max-mobile:before:mt-2";

// ── ProfileDiscographySection
export const PDG_SLIDER_CONTAINER = 'w-full relative flex items-center mt-5 py-4';
export const PDG_SLIDER =
	'flex overflow-x-auto gap-5 [&::-webkit-scrollbar]:hidden max-tablet:grid max-tablet:w-full max-tablet:grid-cols-3 max-tablet:gap-4 max-tablet:overflow-x-visible max-mobile:grid-cols-2 max-mobile:gap-8';
export const PDG_ALBUM_CARD =
	'flex flex-col flex-[0_0_180px] snap-start cursor-pointer mb-2 hover:[&_img]:scale-105 hover:[&_.overlay]:opacity-100 max-mobile:flex-none max-mobile:w-full';
export const PDG_COVER_WRAPPER =
	'relative aspect-square overflow-hidden bg-white rounded-[2px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-500 hover:[&_img]:scale-[1.15]';
export const PDG_OVERLAY =
	'flex items-center justify-center absolute top-0 left-0 w-full h-full opacity-0 bg-black/40 backdrop-blur-[4px] transition-opacity duration-300 [&_span]:border-[1.2px] [&_span]:border-solid [&_span]:border-white/40 [&_span]:py-[0.8rem] [&_span]:px-[1.2rem] [&_span]:rounded-[2px] [&_span]:font-serif [&_span]:text-tiny [&_span]:font-medium [&_span]:text-white [&_span]:tracking-[0.1rem] [&_span]:transition-transform [&_span]:duration-300 max-tablet:hidden';
export const PDG_ALBUM_INFO =
	'mt-3 font-sans [&_.title]:block [&_.title]:mb-1 [&_.title]:text-md [&_.title]:font-semibold [&_.title]:text-gray-600 [&_.title]:overflow-hidden [&_.title]:text-ellipsis [&_.title]:whitespace-nowrap [&_.info]:text-sm [&_.info]:font-medium [&_.info]:text-gray-500 max-tablet:mt-2 max-tablet:[&_.title]:text-sm max-tablet:[&_.info]:text-xs';

const NAV_BUTTON_BASE =
	'absolute top-0 bottom-0 w-[50px] h-full z-10 cursor-pointer bg-transparent flex justify-center items-center transition-all duration-[0.4s] [&_span]:opacity-0 [&_span]:font-sans [&_span]:text-h2 [&_span]:font-medium [&_span]:text-gray-100 [&_span]:transition-all [&_span]:duration-300 hover:[&_span]:opacity-100 hover:[&_span]:translate-x-0 max-tablet:hidden';

export const pdgNavButton = (direction: 'left' | 'right') =>
	direction === 'left'
		? `${NAV_BUTTON_BASE} left-0 [&_span]:translate-x-[10px] hover:bg-[linear-gradient(to_right,#780606c0_0%,#78060600_100%)]`
		: `${NAV_BUTTON_BASE} right-0 [&_span]:translate-x-[-10px] hover:bg-[linear-gradient(to_left,#780606c0_0%,#78060600_100%)]`;
