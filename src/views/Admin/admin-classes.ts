// @/views/Admin/admin-classes
// 관리자 화면 공용 Tailwind 클래스. 입력은 모바일에서 확대되지 않도록 16px(text-base)이고, 누르는 대상은 높이 44px(min-h-11) 이상이다.
// 폼 컨트롤은 기본으로 글꼴을 물려받지 않아서 font-sans(Pretendard)를 직접 지정한다.

export const INPUT_CLASS =
	'min-h-12 w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 font-sans text-base text-gray-700 outline-none focus:border-primary disabled:bg-gray-100 disabled:text-gray-500';
export const PRIMARY_BUTTON_CLASS =
	'min-h-11 rounded-md bg-primary px-5 py-2 font-sans text-base font-medium text-white disabled:cursor-not-allowed disabled:opacity-50';
export const SECONDARY_BUTTON_CLASS =
	'min-h-11 rounded-md border border-gray-300 bg-white px-5 py-2 font-sans text-base text-gray-600 disabled:cursor-not-allowed disabled:opacity-50';
/** 목록 카드의 수정·삭제 같은 보조 버튼. 한 줄에 나란히 놓는다. */
export const SMALL_BUTTON_CLASS =
	'min-h-9 whitespace-nowrap rounded-md border border-gray-300 bg-white px-3 py-1 font-sans text-sm text-gray-600 disabled:cursor-not-allowed disabled:opacity-50';
/** 줄 끝의 − 버튼 */
export const ICON_BUTTON_CLASS =
	'flex size-11 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-white font-sans text-xl text-gray-600 disabled:cursor-not-allowed disabled:opacity-50';

export const CHIP_CLASS =
	'min-h-11 rounded-full border px-4 py-1.5 font-sans text-base transition-colors disabled:cursor-not-allowed disabled:opacity-50';
export const CHIP_ON_CLASS = 'border-primary bg-primary text-white';
export const CHIP_OFF_CLASS = 'border-gray-300 bg-white text-gray-600';

export const BADGE_CLASS = 'inline-flex items-center rounded-full px-3 py-1 font-sans text-sm font-medium';
export const BADGE_TONE_CLASS = {
	primary: 'bg-primary text-white',
	gray: 'bg-gray-100 text-gray-600',
	green: 'bg-green-200 text-gray-700',
	blue: 'bg-blue-100 text-blue-600',
	yellow: 'bg-yellow-200 text-gray-700',
} as const;

export type BadgeTone = keyof typeof BADGE_TONE_CLASS;
