// @/styles/emotion

/* eslint-disable storybook/default-exports */

import '@emotion/react';
import { ColorType, FontType, WindowType } from '@styles/themes';

declare module '@emotion/react' {
	export interface Theme {
		COLOR: ColorType;
		FONT: FontType;
		WINDOW_SIZE: WindowType;
	}
}
