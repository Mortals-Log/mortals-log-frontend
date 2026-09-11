// @/views/ScheduleCalendar/calendar-classes — ScheduleCalendar/*.style.ts 이관
// react-calendar 라이브러리 오버라이드는 globals.css @layer components (.schedule-calendar / .schedule-calendar--compact)

/* eslint-disable storybook/default-exports */

import { cn } from '@/utils/cn';
import { SCHEDULE_TYPE_CLASS } from '@/const/schedule';
import { Schedule } from '@/types/schedule';

// ── ScheduleCalendar.style.ts
export const SC_TOOLBAR = 'flex justify-end gap-2 mb-[0.3rem] max-mobile:justify-between';
export const SC_VIEW_SWITCHER =
	'flex bg-gray-50 border border-solid border-gray-100 rounded-[10px] [&_button]:flex-1 [&_button]:py-2 [&_button]:px-4 [&_button]:font-sans [&_button]:text-xs [&_button]:font-medium [&_button]:text-gray-700 [&_button]:whitespace-nowrap [&_button]:[word-break:keep-all] [&_button]:border-none [&_button]:rounded-lg [&_button]:cursor-pointer [&_button]:transition-all [&_button]:duration-200 [&_button.active]:bg-primary [&_button.active]:text-white [&_button:hover:not(.active)]:text-primary';
export const SC_TODAY_BUTTON =
	'py-2 px-4 font-sans text-xs font-medium text-primary whitespace-pre-wrap [word-break:keep-all] border border-solid border-primary rounded-[10px] cursor-pointer transition-all duration-200 hover:bg-primary hover:text-white active:scale-95 max-mobile:py-[0.4rem] max-mobile:px-[0.8rem]';
export const scWrapper = (compact: boolean) => cn('schedule-calendar', compact && 'schedule-calendar--compact');
export const SC_SCHEDULE_LIST = 'flex flex-col w-full gap-[0.3rem]';
export const scTileItem = (type: Schedule['type']) =>
	cn(
		'sc-tile-item block w-full min-w-0 py-[0.3rem] px-[0.4rem] mb-0.5 font-sans text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis rounded before:content-[""] before:inline-block before:w-1 before:h-1 before:mr-1 before:flex-shrink-0 before:bg-current before:rounded-full before:align-middle before:mt-[-2px] max-mobile:before:hidden max-tablet:text-tiny max-tablet:leading-[1.5] max-tablet:max-h-12 max-tablet:py-[0.2rem] max-tablet:px-[0.3rem] max-mobile:[display:-webkit-box] max-mobile:[-webkit-line-clamp:2] max-mobile:[-webkit-box-orient:vertical] max-mobile:whitespace-normal max-mobile:text-clip max-mobile:leading-[1.5] max-mobile:max-h-12',
		SCHEDULE_TYPE_CLASS[type].text,
		SCHEDULE_TYPE_CLASS[type].bg,
	);

// ── ScheduleWeekView.style.ts
export const SWV_WEEK_CONTAINER =
	'grid grid-cols-7 overflow-hidden bg-transparent max-tablet:w-screen max-tablet:relative max-tablet:left-1/2 max-tablet:right-1/2 max-tablet:-ml-[50vw] max-tablet:-mr-[50vw] max-tablet:max-w-[100vw] max-tablet:overflow-x-hidden max-tablet:px-1';
export const swvDayContainer = (isToday: boolean, isSelected: boolean) =>
	cn(
		'flex flex-col min-w-0 min-h-[300px] rounded-lg cursor-pointer transition-[background-color] duration-200 max-tablet:min-h-[260px] max-tablet:rounded-[4px] max-mobile:min-h-[180px]',
		isSelected ? 'bg-primary' : isToday ? 'bg-gray-50' : 'bg-transparent',
		!isSelected && 'hover:bg-gray-100',
	);
export const swvDayHeader = (isToday: boolean, isSelected: boolean) =>
	cn(
		'flex flex-col items-center py-2 px-1 gap-0.5 font-sans [&_.day_name]:text-xs [&_.day_name]:mb-1 [&_.day_number]:text-sm [&_.day_number]:font-medium max-mobile:[&_.day_name]:text-tiny max-mobile:[&_.day_number]:text-xs',
		isSelected ? '[&_.day_name]:text-white/80' : '[&_.day_name]:text-gray-400',
		isSelected
			? '[&_.day_number]:text-white'
			: isToday
				? '[&_.day_number]:text-primary'
				: '[&_.day_number]:text-gray-700',
	);
export const SWV_SCHEDULE_LIST = 'flex flex-col gap-1 p-1 overflow-hidden';
export const swvScheduleItem = (type: Schedule['type'], isSelected: boolean) =>
	cn(
		'block relative w-full min-w-0 py-[0.3rem] px-[0.4rem] mb-0.5 font-sans text-xs font-medium whitespace-nowrap overflow-hidden text-ellipsis rounded [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] leading-[1.25] max-h-[3.2rem] before:content-[""] before:inline-block before:w-1 before:h-1 before:flex-shrink-0 before:mt-[-2px] before:mr-1 before:align-middle before:bg-current before:rounded-full max-mobile:before:hidden max-tablet:leading-[1.5] max-tablet:max-h-12 max-tablet:py-[0.2rem] max-tablet:px-[0.3rem] max-tablet:whitespace-normal max-tablet:text-clip max-mobile:text-tiny',
		isSelected ? 'text-white bg-white/20' : cn(SCHEDULE_TYPE_CLASS[type].text, SCHEDULE_TYPE_CLASS[type].bg),
	);

// ── ScheduleListView.style.ts
export const SLV_LIST_WRAPPER =
	'flex flex-col min-h-[13rem] gap-0.5 overflow-hidden max-tablet:w-screen max-tablet:relative max-tablet:left-1/2 max-tablet:right-1/2 max-tablet:-ml-[50vw] max-tablet:-mr-[50vw] max-tablet:max-w-[100vw] max-tablet:overflow-x-hidden max-tablet:px-1';
export const slvDayContainer = (isToday: boolean, isSelected: boolean) =>
	cn(
		'flex py-[1.2rem] px-4 gap-2 rounded-[10px] cursor-pointer max-tablet:py-4 max-tablet:px-[0.8rem]',
		isSelected ? 'bg-primary' : isToday ? 'bg-gray-50' : 'bg-transparent',
		!isSelected && 'hover:bg-gray-100',
	);
export const slvDayHeader = (isToday: boolean, isSelected: boolean) =>
	cn(
		'flex flex-col items-center gap-1 min-w-[40px] font-sans [&_.day_number]:text-md [&_.day_number]:font-normal [&_.day_name]:text-xs [&_.day_name]:text-gray-400 max-tablet:min-w-[35px] max-tablet:[&_.day_number]:text-sm max-mobile:min-w-[30px] max-mobile:[&_.day_name]:text-tiny',
		isSelected
			? '[&_.day_number]:text-white'
			: isToday
				? '[&_.day_number]:text-primary'
				: '[&_.day_number]:text-gray-700',
	);
export const SLV_SCHEDULE_LIST = 'flex flex-col gap-4 overflow-hidden';
export const slvScheduleItem = (type: Schedule['type'], isSelected: boolean) =>
	cn(
		'block relative w-full min-w-0 py-[5px] px-2 rounded font-sans text-sm font-normal whitespace-nowrap overflow-hidden text-ellipsis before:content-[""] before:inline-block before:w-1 before:h-4 before:flex-shrink-0 before:mr-1 before:align-middle before:rounded-[2px] max-tablet:before:h-[14px] max-tablet:before:mr-1.5 max-mobile:text-xs max-mobile:before:h-3',
		isSelected
			? 'bg-white/20 text-white before:bg-white'
			: cn('bg-transparent text-gray-700', SCHEDULE_TYPE_CLASS[type].beforeBg),
	);

// ── ScheduleLabel.style.ts
export const SL_LABEL_CONTAINER =
	'flex w-fit items-center py-2 px-4 mt-2 ml-auto gap-3 bg-white border border-solid border-gray-100 rounded-[10px] max-tablet:w-full max-tablet:flex-wrap max-tablet:justify-start max-tablet:ml-0 max-tablet:p-[0.8rem]';
export const SL_FILTER_TITLE = 'font-sans text-xs font-medium text-gray-600 whitespace-pre-wrap';
export const SL_LABEL_LIST = 'flex flex-wrap items-center gap-4 max-mobile:gap-x-4 max-mobile:gap-y-[0.8rem]';
export const slLabelItem = (isActive: boolean, eventType?: Schedule['type']) =>
	cn(
		'flex items-center gap-1.5 font-sans text-xs font-bold whitespace-nowrap cursor-pointer transition-all duration-200 before:content-[""] before:w-3 before:h-3 before:rounded-[4px] before:flex-shrink-0 before:border before:border-solid before:border-black/5 active:scale-95 max-mobile:font-semibold',
		eventType ? SCHEDULE_TYPE_CLASS[eventType].text : 'text-primary',
		eventType ? SCHEDULE_TYPE_CLASS[eventType].beforeBgLight : 'before:bg-primary',
		isActive ? 'opacity-100' : 'opacity-40 grayscale',
	);
