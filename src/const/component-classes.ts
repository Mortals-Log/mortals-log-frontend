// @/const/component-classes
// src/styles/components/Buttons.style.ts, Table.style.ts 의 공용 export 를 Tailwind 클래스로 이관.
// 원본 파일은 Task 18 에서 소비처 0 확인 후 삭제.

/* eslint-disable storybook/default-exports */

import { cn } from '@/utils/cn';
import { SCHEDULE_TYPE_CLASS } from '@/const/schedule';
import { Schedule } from '@/types/schedule';

// ── components/Badge.style.ts 이관 (BadgeList 외 소비처: Schedule / ScheduleCalendar / SongDetail) ──
export const BASE_BADGE =
	'inline-flex items-center justify-center py-1 px-1.5 rounded flex-shrink-0 whitespace-nowrap font-sans text-tiny font-medium tracking-[0.02em] max-tablet:py-0.5 max-tablet:px-1';

/** Badge.style.ts TypeBadge — 일정 타입별 bg/text */
export const typeBadge = (type: Schedule['type']) =>
	cn(
		'inline-flex items-center justify-center py-1 px-1.5 rounded flex-shrink-0 whitespace-nowrap font-sans text-xs font-medium tracking-[0.02em] max-tablet:py-0.5 max-tablet:px-1',
		SCHEDULE_TYPE_CLASS[type].bg,
		SCHEDULE_TYPE_CLASS[type].text,
	);

/** Badge.style.ts MusicBadge — styled a 이었던 (스트리밍 아이콘 버튼) */
export const MUSIC_BADGE =
	'flex items-center justify-center w-9 h-9 text-gray-700 bg-white border border-solid border-gray-200 rounded-lg transition-all duration-300 [&_svg]:w-[18px] [&_svg]:h-[18px] [&_svg]:flex-shrink-0 [&_span]:hidden [&_span]:font-sans [&_span]:text-sm [&_span]:font-medium [&_span]:text-current hover:bg-primary hover:border-primary hover:text-white active:bg-primary active:border-primary max-mobile:w-fit max-mobile:py-4 max-mobile:px-[0.8rem] max-mobile:mt-[0.2rem] max-mobile:mr-[0.3rem] max-mobile:[&_span]:inline max-mobile:[&_span]:ml-2 max-mobile:[&_span]:text-xs';

/** Badge.style.ts BadgeGroup */
export const BADGE_GROUP = 'flex flex-wrap gap-[0.3rem] max-tablet:gap-[0.2rem]';

/** Badge.style.ts LeadBadge */
export const LEAD_BADGE =
	'inline-flex items-center justify-center py-1 px-1.5 rounded flex-shrink-0 whitespace-nowrap font-sans text-tiny font-medium tracking-[0.02em] bg-primary text-white max-tablet:py-0.5 max-tablet:px-1';

/** Badge.style.ts AdultBadge */
export const ADULT_BADGE =
	'inline-flex items-center justify-center py-1 px-1.5 rounded flex-shrink-0 whitespace-nowrap font-sans text-xs font-medium tracking-[0.02em] border border-solid border-primary bg-primary/20 text-primary max-tablet:py-0.5 max-tablet:px-1';

/** Buttons.style.ts MoreButton — styled Link 이었던 */
export const MORE_BUTTON =
	'flex w-full items-center justify-center gap-2 mt-4 py-4 px-6 no-underline bg-transparent border border-primary rounded-[10px] font-sans text-sm font-medium text-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white active:scale-[0.98] max-tablet:p-4 max-mobile:p-3 max-mobile:text-xs';

/** Buttons.style.ts ExpandButton 베이스 — margin-top 은 소비처에서 $isExpanded 로 부여 */
export const EXPAND_BUTTON =
	'flex relative w-full items-center justify-center z-10 py-4 px-6 gap-2 bg-transparent border border-primary rounded-[10px] font-sans text-sm font-medium text-gray-700 cursor-pointer transition-all duration-200 hover:bg-primary hover:border-primary hover:text-white active:bg-primary active:scale-[0.98] max-tablet:p-4 max-mobile:p-3 max-mobile:text-xs';

/** Buttons.style.ts LinkButton — styled Link 이었던 */
export const LINK_BUTTON =
	'inline-flex items-center gap-2 py-[0.8rem] px-4 font-sans text-sm font-normal text-gray-700 bg-white border border-gray-200 rounded-[5px] no-underline transition-all duration-200 [&_svg]:w-4 [&_svg]:h-4 [&_svg]:flex-shrink-0 hover:bg-primary hover:border-primary hover:text-white hover:-translate-y-px active:scale-[0.98] max-tablet:py-[0.7rem] max-tablet:px-[0.9rem] max-tablet:hover:translate-y-0 max-tablet:[&_svg]:w-[14px] max-tablet:[&_svg]:h-[14px]';

/** Buttons.style.ts PrimaryButton — styled Link 이었던 */
export const PRIMARY_BUTTON =
	'block w-full max-w-[400px] mx-auto mt-5 p-6 bg-black rounded-lg text-center no-underline font-sans text-md font-medium text-white transition-all duration-200 hover:bg-primary hover:text-white';

/** Buttons.style.ts ViewMoreButton — styled button 이었던 (blink 커서 애니메이션은 globals.css @keyframes blink) */
export const VIEW_MORE_BUTTON =
	"flex items-center justify-center w-fit bg-black py-4 px-6 font-sans text-md font-semibold text-white rounded-[10px] transition-all duration-300 cursor-pointer after:content-['|'] after:ml-0.5 after:text-white after:animate-[blink_1s_step-end_infinite] hover:bg-primary hover:text-white active:scale-[0.98] max-tablet:py-4 max-tablet:px-[1.2rem] max-tablet:after:ml-1 max-mobile:py-[0.8rem] max-mobile:px-[1.4rem] max-mobile:text-sm";

/** Buttons.style.ts CardButton 베이스 — styled Link 이었던 */
export const CARD_BUTTON =
	'relative flex flex-col py-10 px-6 bg-white border border-gray-200 rounded-[10px] font-sans text-md font-semibold text-white no-underline overflow-hidden cursor-pointer hover:border-primary active:border-primary max-mobile:py-8 max-mobile:px-6';

/** common/VideoWrapper.style.ts VideoWrapper — 16:9 iframe 래퍼 */
export const VIDEO_WRAPPER =
	'relative overflow-hidden w-full max-w-[800px] aspect-video mt-4 mb-12 mx-auto rounded-[10px] bg-gray-700 shadow-[0_10px_30px_rgba(0,0,0,0.2)] [&_iframe]:absolute [&_iframe]:top-0 [&_iframe]:left-0 [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0 [&_iframe]:bg-transparent max-mobile:mb-8 max-mobile:rounded-lg max-mobile:shadow-[0_8px_20px_rgba(0,0,0,0.2)]';

/** Buttons.style.ts ToggleButton — styled button 이었던 */
export const TOGGLE_BUTTON =
	'whitespace-nowrap ml-4 text-xs text-gray-400 font-medium cursor-pointer [&_.text-desktop]:inline [&_.text-desktop]:mr-1 hover:text-primary active:text-primary max-tablet:hidden max-mobile:hidden';

/** Table.style.ts Table — styled table 이었던 (tr/th/td 자식 규칙 포함) */
export const TABLE_WRAPPER =
	'w-full border-collapse whitespace-nowrap [word-break:keep-all] [&_tr]:border-b [&_tr]:border-gray-300 [&_th]:text-center [&_th]:align-middle [&_th]:py-4 [&_th]:px-2.5 [&_td]:p-0 [&_td]:leading-[1.5] [&_td]:align-middle max-tablet:[&_th]:text-sm max-mobile:[&_tr]:flex max-mobile:[&_tr]:flex-col max-mobile:[&_th]:block max-mobile:[&_th]:w-fit max-mobile:[&_th]:border-b max-mobile:[&_th]:border-primary max-mobile:[&_th]:pb-2 max-mobile:[&_th]:text-sm max-mobile:[&_th]:font-medium max-mobile:[&_th]:text-primary max-mobile:[&_th]:text-left max-mobile:[&_td]:w-full max-mobile:[&_td]:block max-mobile:[&_td]:pb-2';

/** common/ArrowIcon.style.ts ArrowIcon — styled span 이었던, $isExpanded 로 rotate */
export const ARROW_ICON = 'inline-block transition-transform duration-300 text-xs';

/** Buttons.style.ts SourceLink 베이스 — styled Link 이었던, $disabled 는 SOURCE_LINK_DISABLED 로 */
export const SOURCE_LINK =
	"inline-block w-4/5 whitespace-nowrap overflow-hidden text-ellipsis font-sans text-xs font-normal text-gray-400 no-underline transition-all duration-300 before:content-['REF._'] before:font-medium before:tracking-[0.5px] hover:text-primary hover:translate-x-[3px] max-tablet:w-full";

export const SOURCE_LINK_DISABLED =
	'opacity-50 cursor-not-allowed pointer-events-none grayscale hover:transform-none! hover:text-inherit!';

// ── components/AlbumCard.style.ts 이관 ──
export const ALBUM_GRID =
	'grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-x-8 gap-y-12 max-laptop:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] max-laptop:gap-8 max-laptop:py-4 max-mobile:grid-cols-2 max-mobile:gap-x-4 max-mobile:gap-y-8';
export const ALBUM_CARD = 'block cursor-pointer hover:[&_.overlay]:opacity-100';
export const ALBUM_COVER_WRAPPER =
	'relative aspect-square overflow-hidden bg-white rounded-[2px] shadow-[0_10px_30px_rgba(0,0,0,0.05)] [&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:transition-transform [&_img]:duration-500 hover:[&_img]:scale-110';
export const ALBUM_OVERLAY =
	'flex items-center justify-center absolute top-0 left-0 w-full h-full opacity-0 bg-black/40 backdrop-blur-[4px] transition-opacity duration-300 [&_span]:border-[1.2px] [&_span]:border-solid [&_span]:border-white/40 [&_span]:py-[0.8rem] [&_span]:px-[1.2rem] [&_span]:rounded-[2px] [&_span]:font-serif [&_span]:text-sm [&_span]:font-medium [&_span]:text-white [&_span]:tracking-[0.1rem] [&_span]:transition-transform [&_span]:duration-300 max-tablet:hidden';
export const ALBUM_INFO =
	'mt-[1.2rem] [&_.title]:[display:-webkit-box] [&_.title]:mb-2 [&_.title]:font-serif [&_.title]:text-lg [&_.title]:font-bold [&_.title]:text-gray-700 [&_.type-wrap]:flex [&_.type-wrap]:gap-2 [&_.type-wrap]:mb-1.5 [&_.type-wrap]:font-sans [&_.type-wrap]:text-sm [&_.type-wrap]:font-normal [&_.type-wrap]:text-primary [&_.type-wrap_.vol]:text-gray-400 [&_.date]:font-sans [&_.date]:text-sm [&_.date]:font-normal [&_.date]:text-gray-400 max-tablet:mt-[0.8rem] max-tablet:[&_.title]:text-md max-tablet:[&_.type-wrap]:text-xs max-tablet:[&_.date]:text-xs max-mobile:[&_.type-wrap]:text-sm max-mobile:[&_.date]:text-sm';
