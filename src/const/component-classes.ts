// @/const/component-classes
// src/styles/components/Buttons.style.ts, Table.style.ts 의 공용 export 를 Tailwind 클래스로 이관.
// 원본 파일은 Task 18 에서 소비처 0 확인 후 삭제.

/* eslint-disable storybook/default-exports */

/** Buttons.style.ts MoreButton — styled(Link) */
export const MORE_BUTTON =
	'flex w-full items-center justify-center gap-2 mt-4 py-4 px-6 no-underline bg-transparent border border-primary rounded-[10px] font-sans text-sm font-medium text-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white active:scale-[0.98] max-tablet:p-4 max-mobile:p-3 max-mobile:text-xs';

/** Buttons.style.ts ExpandButton 베이스 — margin-top 은 소비처에서 $isExpanded 로 부여 */
export const EXPAND_BUTTON =
	'flex relative w-full items-center justify-center z-10 py-4 px-6 gap-2 bg-transparent border border-primary rounded-[10px] font-sans text-sm font-medium text-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white active:bg-primary active:scale-[0.98] max-tablet:p-4 max-mobile:p-3 max-mobile:text-xs';

/** Buttons.style.ts LinkButton — styled(Link) */
export const LINK_BUTTON =
	'inline-flex items-center gap-2 py-[0.8rem] px-4 font-sans text-sm font-normal text-gray-700 bg-white border border-gray-200 rounded-[5px] no-underline transition-all duration-200 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:flex-shrink-0 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-px active:scale-[0.98] max-tablet:py-[0.7rem] max-tablet:px-[0.9rem] max-tablet:hover:translate-y-0 max-tablet:[&_svg]:w-[14px] max-tablet:[&_svg]:h-[14px]';

/** Buttons.style.ts PrimaryButton — styled(Link) */
export const PRIMARY_BUTTON =
	'block w-full max-w-[400px] mx-auto mt-5 p-6 bg-black rounded-lg text-center no-underline font-sans text-md font-medium text-white transition-all duration-200 hover:bg-primary hover:text-white';

/** Buttons.style.ts ViewMoreButton — styled.button (blink 커서 애니메이션은 globals.css @keyframes blink) */
export const VIEW_MORE_BUTTON =
	"flex items-center justify-center w-fit bg-black py-4 px-6 font-sans text-md font-semibold text-white rounded-[10px] transition-all duration-300 cursor-pointer after:content-['|'] after:ml-0.5 after:text-white after:animate-[blink_1s_step-end_infinite] hover:bg-primary hover:text-white active:scale-[0.98] max-tablet:py-4 max-tablet:px-[1.2rem] max-tablet:after:ml-1 max-mobile:py-[0.8rem] max-mobile:px-[1.4rem] max-mobile:text-sm";

/** Buttons.style.ts CardButton 베이스 — styled(Link) */
export const CARD_BUTTON =
	'relative flex flex-col py-10 px-6 bg-white border border-gray-200 rounded-[10px] font-sans text-md font-semibold text-white no-underline overflow-hidden cursor-pointer hover:border-primary active:border-primary max-mobile:py-8 max-mobile:px-6';

/** Buttons.style.ts ToggleButton — styled.button */
export const TOGGLE_BUTTON =
	'whitespace-nowrap ml-4 text-xs text-gray-400 font-medium cursor-pointer [&_.text-desktop]:inline [&_.text-desktop]:mr-1 hover:text-primary active:text-primary max-tablet:hidden max-mobile:hidden';

/** Table.style.ts Table — styled.table (tr/th/td 자식 규칙 포함) */
export const TABLE_WRAPPER =
	'w-full border-collapse whitespace-nowrap [word-break:keep-all] [&_tr]:border-b [&_tr]:border-gray-300 [&_th]:text-center [&_th]:align-middle [&_th]:py-4 [&_th]:px-2.5 [&_td]:p-0 [&_td]:leading-[1.5] [&_td]:align-middle max-tablet:[&_th]:text-sm max-mobile:[&_tr]:flex max-mobile:[&_tr]:flex-col max-mobile:[&_th]:block max-mobile:[&_th]:w-fit max-mobile:[&_th]:border-b max-mobile:[&_th]:border-primary max-mobile:[&_th]:pb-2 max-mobile:[&_th]:text-sm max-mobile:[&_th]:font-medium max-mobile:[&_th]:text-primary max-mobile:[&_th]:text-left max-mobile:[&_td]:w-full max-mobile:[&_td]:block max-mobile:[&_td]:pb-2';

/** common/ArrowIcon.style.ts ArrowIcon — styled.span, $isExpanded 로 rotate */
export const ARROW_ICON = 'inline-block transition-transform duration-300 text-xs';

/** Buttons.style.ts SourceLink 베이스 — styled(Link), $disabled 는 SOURCE_LINK_DISABLED 로 */
export const SOURCE_LINK =
	"inline-block w-4/5 whitespace-nowrap overflow-hidden text-ellipsis font-sans text-xs font-normal text-gray-400 no-underline transition-all duration-300 before:content-['REF._'] before:font-medium before:tracking-[0.5px] hover:text-primary hover:translate-x-[3px] max-tablet:w-full";

export const SOURCE_LINK_DISABLED =
	'opacity-50 cursor-not-allowed pointer-events-none grayscale hover:transform-none! hover:text-inherit!';
