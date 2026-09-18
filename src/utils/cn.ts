/* eslint-disable storybook/default-exports */

import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

// globals.css @theme 의 커스텀 폰트 사이즈 토큰을 tailwind-merge 에 등록한다.
// 등록하지 않으면 twMerge 가 text-tiny / text-md / text-h1 등을 폰트 사이즈로 인식하지 못해,
// cn(BASE, '... text-white') 처럼 뒤에 text-<color> 가 붙으면 크기 클래스를 충돌로 보고 지운다.
const twMerge = extendTailwindMerge({
	extend: {
		classGroups: {
			'font-size': [{ text: ['display', 'h1', 'h2', 'h3', 'md', 'tiny'] }],
		},
	},
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
