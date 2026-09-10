// @/views/Goods/goods-classes
// Goods.style.ts 이관 클래스 (Buttons.style.ts 의 LinkButton/CardButton 베이스 포함)

/* eslint-disable storybook/default-exports */

export const GOODS_GRID =
	'grid grid-cols-3 pt-6 gap-4 max-laptop:grid-cols-2 max-laptop:gap-2 max-mobile:grid-cols-1';

export const GOODS_CARD_BUTTON =
	'relative flex flex-col py-10 px-6 bg-white border border-gray-200 rounded-[10px] font-sans text-md font-semibold text-white no-underline overflow-hidden cursor-pointer hover:border-primary active:border-primary max-mobile:py-8 max-mobile:px-6 [&_.category]:block [&_.category]:mb-2 [&_.category]:font-sans [&_.category]:text-tiny [&_.category]:font-medium [&_.category]:text-gray-500 [&_.category]:tracking-[0.1em] max-tablet:[&_.category]:mb-1 [&_.item]:font-sans [&_.item]:text-md [&_.item]:font-bold [&_.item]:text-black max-tablet:[&_.item]:text-sm';

export const GOODS_LINK_BUTTON =
	'inline-flex items-center gap-2 py-[0.8rem] px-4 font-sans text-sm font-normal text-gray-700 bg-white border border-gray-200 rounded-[5px] no-underline transition-all duration-200 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:flex-shrink-0 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-px active:scale-[0.98] max-tablet:py-[0.7rem] max-tablet:px-[0.9rem] max-tablet:hover:translate-y-0 max-tablet:[&_svg]:w-[14px] max-tablet:[&_svg]:h-[14px] w-full [&:not(:last-child)]:mb-2';

export const GOODS_GUIDE_SECTION =
	'w-full p-8 my-8 bg-gray-100 border border-dashed border-gray-300 rounded-[10px] [&_.title]:font-sans [&_.title]:text-lg [&_.title]:font-bold [&_.title]:text-black [&_.title]:whitespace-pre-wrap [&_.title]:[word-break:keep-all] [&_.title]:mb-8 max-tablet:p-6 max-tablet:my-4 max-tablet:[&_.title]:mb-4 max-tablet:[&_.title]:text-md max-mobile:my-6';

export const GOODS_GUIDE_ITEM =
	"flex items-start mb-[0.8rem] leading-[1.8] gap-2.5 font-sans text-sm font-medium text-gray-700 whitespace-pre-wrap [word-break:keep-all] before:content-['•'] before:flex-shrink-0 before:text-primary max-mobile:leading-[1.6] max-mobile:gap-2 max-mobile:mb-[0.6rem]";

export const GOODS_GUIDE_SLOGAN =
	'p-8 my-8 rounded-[10px] border border-dashed border-primary font-serif text-md font-semibold text-gray-700 text-center leading-[1.6] [word-break:keep-all] max-tablet:p-6 max-tablet:my-[1.2rem] max-tablet:text-sm max-mobile:my-4 max-mobile:text-xs';
