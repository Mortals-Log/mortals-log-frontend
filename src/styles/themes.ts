/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

export const COLOR = {
	PRIMARY: '#780606',
	GRAY700: '#303239',
	GRAY600: '#50525F',
	GRAY500: '#7F8295',
	GRAY400: '#AEB2C6',
	GRAY300: '#D0D3E1',
	GRAY200: '#E4E5ED',
	GRAY100: '#F1F2F6',
	WHITE: '#FFFFFF',
	BLACK: '#000000',
	GREEN600: '#3CD080',
	GREEN500: '#65D196',
	GREEN400: '#83DDAC',
	GREEN300: '#A7EFC8',
	GREEN200: '#CBF6DF',
	GREEN100: '#E7FEF2',
	BLUE500: '#509CF7',
	BLUE400: '#79B4F9',
	BLUE300: '#AED1FB',
	BLUE200: '#CEE7F7',
	PINK600: '#FD5B73',
	PINK500: '#FF8093',
	PINK400: '#FF95A5',
	PINK300: '#FFB6C1',
	PINK200: '#FFE7EA',
	PINK100: '#FFF7F8',
	YELLOW500: '#FED235',
	YELLOW400: '#FFE168',
	YELLOW300: '#FFE88A',
	YELLOW200: '#FFF0B3',
	YELLOW100: '#FFF8DC',
	FILTER: 'rgba(127, 130, 149, 0.30)',
	TOAST: 'rgba(0, 0, 0, 0.80)',
} as const;

export const FONT = {
	SERIF: "'Noto Serif KR', serif",
	SANS: "'Pretendard', sans-serif",

	SIZE: {
		// 본문 타이틀: Hero Section
		DISPLAY: 'clamp(3.5rem, 12vw, 9rem)',

		// 페이지 제목 및 섹션 헤더
		H1: 'clamp(2.5rem, 8vw, 6rem)',
		H2: 'clamp(2rem, 5vw, 3.5rem)',
		H3: 'clamp(1.5rem, 3vw, 2.5rem)',

		// 본문 및 서브 텍스트
		XL: '1.25rem', // 리스트 강조, 리드 문구
		LG: '1.125rem', // 일반 본문 강조
		MD: '1rem', // 기본 본문
		SM: '0.875rem', // 부가 설명, 메타 데이터
		XS: '0.75rem', // 캡션, 태그라인, 저작권 표시

		// 디테일용 텍스트
		TINY: '0.625rem',
	},

	WEIGHT: {
		LIGHT: 300,
		REGULAR: 400,
		MEDIUM: 500,
		SEMIBOLD: 600,
		BOLD: 700,
	},
} as const;

export const theme = {
	COLOR,
	FONT,
} as const;

export type ColorType = typeof COLOR;
export type FontType = typeof FONT;
