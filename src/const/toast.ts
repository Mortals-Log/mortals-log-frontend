// @/const/toast — react-hot-toast 모양. 색·글꼴은 디자인 토큰(globals.css)을 그대로 쓴다.

/* eslint-disable storybook/default-exports */

import type { DefaultToastOptions } from 'react-hot-toast';

/** 성공·오류·진행 중은 아이콘 색으로만 구분하고, 나머지는 사이트의 카드와 같은 모양이다. */
export const TOASTER_OPTIONS: DefaultToastOptions = {
	duration: 3000,
	style: {
		maxWidth: 'min(28rem, calc(100vw - 2rem))',
		padding: '0.75rem 1rem',
		border: '1px solid var(--color-gray-200)',
		borderRadius: '0.625rem',
		background: 'var(--color-white)',
		color: 'var(--color-gray-700)',
		fontFamily: 'var(--font-sans)',
		fontSize: 'var(--text-sm)',
		fontWeight: 500,
		lineHeight: 1.5,
		wordBreak: 'keep-all',
		boxShadow: '0 0.5rem 1.5rem color-mix(in srgb, var(--color-black) 12%, transparent)',
	},
	success: {
		iconTheme: { primary: 'var(--color-green-600)', secondary: 'var(--color-white)' },
	},
	error: {
		duration: 4500,
		iconTheme: { primary: 'var(--color-pink-600)', secondary: 'var(--color-white)' },
	},
	loading: {
		iconTheme: { primary: 'var(--color-gray-500)', secondary: 'var(--color-gray-200)' },
	},
};

/** 화면 아래 가운데. 모바일의 하단 안전 영역(홈 바)에 가려지지 않게 띄운다. */
export const TOASTER_CONTAINER_STYLE = {
	bottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
} as const;

/** 링크·문구 복사처럼 짧게 알리는 토스트. 모양은 위 설정을 따르고 아이콘과 시간만 다르다. */
export const TOAST_OPTION = {
	icon: '📋',
	duration: 1500,
} as const;
