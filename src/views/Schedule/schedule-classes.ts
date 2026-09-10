// @/views/Schedule/schedule-classes — Schedule/*.style.ts 이관

/* eslint-disable storybook/default-exports */

import { cn } from '@/utils/cn';
import { SCHEDULE_TYPE_CLASS } from '@/const/schedule';
import { Schedule } from '@/types/schedule';

// ── ScheduleUpcommingBanner.style.ts
export const SUB_SLIDER_CONTAINER =
	'flex overflow-x-auto gap-3 mt-4 [scroll-snap-type:x_mandatory] scroll-smooth [-webkit-overflow-scrolling:touch] [&::-webkit-scrollbar]:hidden';

export const subBannerItem = (type: Schedule['type'], dDay: number) =>
	cn(
		'flex relative w-72 min-h-24 py-6 px-4 items-center snap-start flex-shrink-0 rounded-lg border-[1.3px] border-solid transition-all duration-150 cursor-pointer font-sans [&_.dDay]:text-md [&_.dDay]:font-semibold [&_.dDay]:text-primary [&_.date]:ml-2 [&_.date]:uppercase [&_.date]:text-sm [&_.date]:font-medium [&_.date]:text-gray-600 [&_.type]:ml-2 [&_.type]:text-xs [&_.type]:font-medium [&_.type]:text-gray-500 [&_.content]:text-sm [&_.content]:font-normal [&_.content]:text-gray-700 [&_.content]:mt-[0.3rem] [&_.content]:leading-[1.4] [&_.content]:tracking-[-0.01em] max-tablet:w-60 max-tablet:min-h-20 max-tablet:py-[1.4rem] max-tablet:px-[0.8rem] max-tablet:[&_.dDay]:text-sm max-mobile:[&_.dDay]:text-sm',
		dDay === 0 ? 'border-primary' : 'border-gray-100',
		SCHEDULE_TYPE_CLASS[type].bannerHover,
	);

// ── ScheduleCalandarAgenda.style.ts
export const SCA_AGENDA_SECTION = 'mt-4 pt-6 border-t border-solid border-gray-100';
export const SCA_AGENDA_HEADER = 'mb-4 font-serif text-md font-normal text-gray-700';
export const SCA_AGENDA_LIST = 'flex flex-col gap-2';
export const scaAgendaItem = (type: Schedule['type']) =>
	cn(
		'flex items-center py-[1.3rem] px-4 rounded-[10px] bg-gray-50 cursor-pointer border-l-4 border-solid transition-all duration-200',
		SCHEDULE_TYPE_CLASS[type].borderL,
		SCHEDULE_TYPE_CLASS[type].hoverBg,
	);
export const SCA_ITEM_CONTENT_GROUP = 'flex-1 flex gap-2 max-tablet:gap-1 max-mobile:gap-1';
export const SCA_CONTENT_TEXT =
	'font-sans text-sm font-normal text-gray-700 whitespace-pre-wrap [word-break:keep-all] leading-[1.4]';
export const SCA_TIME_TAG = 'font-sans text-sm font-normal text-gray-600 max-tablet:text-xs';
