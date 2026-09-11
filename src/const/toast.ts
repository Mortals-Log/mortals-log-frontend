// @/const/toast — react-hot-toast 옵션 (Toast.style.tsx 에서 이관, themes.ts 의존 제거)

/* eslint-disable storybook/default-exports */

export const TOAST_OPTION = {
	icon: '📋',
	duration: 1500,
	style: {
		borderRadius: '10px',
		background: '#303239',
		color: '#FFFFFF',
		fontSize: '0.875rem',
		padding: '0.8rem 1rem',
		marginBottom: '1.5rem',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
	},
} as const;
