// @styles/components/Toast.style

/* eslint-disable storybook/default-exports */

import { theme } from '@styles/themes';

export const TOAST_OPTION = {
	icon: '📋',
	duration: 1500,
	style: {
		borderRadius: '10px',
		background: theme.COLOR.GRAY700,
		color: theme.COLOR.WHITE,
		fontSize: theme.FONT.SIZE.SM,
		padding: '1rem 1.5rem',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
	},
} as const;
