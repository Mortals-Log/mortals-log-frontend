// @/const/schedule

/* eslint-disable storybook/default-exports */

import { Schedule } from '@/types/schedule';

export const SCHEDULE_LABEL_MAP = {
	ALBUM: '앨범',
	CONCERT: '공연/음악감상회',
	TICKETING: '티켓팅',
	ANNIVERSARY: '기념일',
	BIRTHDAY: '생일',
	EVENT: '그 외',
};

// themes.ts 의존 제거: 토큰 값(hex)을 리터럴로 인라인
export const SCHEDULE_TYPE_COLORS: Record<Schedule['type'], { bg: string; text: string }> = {
	ALBUM: { bg: '#E6F4FE', text: '#2C7BE5' },
	CONCERT: { bg: '#EDE9FE', text: '#7E3AF2' },
	TICKETING: { bg: '#FDF2FF', text: '#B85CB5' },
	ANNIVERSARY: { bg: '#FFF7F8', text: '#FD5B73' },
	BIRTHDAY: { bg: '#FFF9E5', text: '#E5A500' },
	EVENT: { bg: '#E7FEF2', text: '#3CD080' },
};

// Tailwind 유틸 클래스 매핑 (일정 타입별 색). 인라인 style 이 필요한 곳은 SCHEDULE_TYPE_COLORS 사용.
// Tailwind 스캐너가 인식하도록 모든 클래스는 정적 문자열 리터럴로 나열.
export const SCHEDULE_TYPE_CLASS: Record<
	Schedule['type'],
	{ text: string; bg: string; border: string; borderL: string; hoverBg: string; bannerHover: string }
> = {
	ALBUM: {
		text: 'text-blue-600',
		bg: 'bg-blue-100',
		border: 'border-blue-600',
		borderL: 'border-l-blue-600',
		hoverBg: 'hover:bg-blue-100',
		bannerHover: 'hover:border-[#2C7BE533] hover:bg-[#E6F4FE66]',
	},
	CONCERT: {
		text: 'text-purple-600',
		bg: 'bg-purple-100',
		border: 'border-purple-600',
		borderL: 'border-l-purple-600',
		hoverBg: 'hover:bg-purple-100',
		bannerHover: 'hover:border-[#7E3AF233] hover:bg-[#EDE9FE66]',
	},
	TICKETING: {
		text: 'text-orchid-600',
		bg: 'bg-orchid-100',
		border: 'border-orchid-600',
		borderL: 'border-l-orchid-600',
		hoverBg: 'hover:bg-orchid-100',
		bannerHover: 'hover:border-[#B85CB533] hover:bg-[#FDF2FF66]',
	},
	ANNIVERSARY: {
		text: 'text-pink-600',
		bg: 'bg-pink-100',
		border: 'border-pink-600',
		borderL: 'border-l-pink-600',
		hoverBg: 'hover:bg-pink-100',
		bannerHover: 'hover:border-[#FD5B7333] hover:bg-[#FFF7F866]',
	},
	BIRTHDAY: {
		text: 'text-yellow-600',
		bg: 'bg-yellow-100',
		border: 'border-yellow-600',
		borderL: 'border-l-yellow-600',
		hoverBg: 'hover:bg-yellow-100',
		bannerHover: 'hover:border-[#E5A50033] hover:bg-[#FFF9E566]',
	},
	EVENT: {
		text: 'text-green-600',
		bg: 'bg-green-100',
		border: 'border-green-600',
		borderL: 'border-l-green-600',
		hoverBg: 'hover:bg-green-100',
		bannerHover: 'hover:border-[#3CD08033] hover:bg-[#E7FEF266]',
	},
};
