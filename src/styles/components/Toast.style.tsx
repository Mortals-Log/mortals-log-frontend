// @/styles/components/Toast.style

/* eslint-disable storybook/default-exports */

import { Theme } from '@styles/themes';

export const TOAST_OPTION = {
	icon: '📋',
	duration: 1500,
	style: {
		borderRadius: '10px',
		background: Theme.COLOR.GRAY700,
		color: Theme.COLOR.WHITE,
		fontSize: Theme.FONT.SIZE.SM,
		padding: '0.8rem 1rem',
		marginBottom: '1.5rem',
		boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
	},
} as const;
