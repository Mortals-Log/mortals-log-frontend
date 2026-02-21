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
	GRAY50: '#F8F9FB',
	WHITE: '#FFFFFF',
	BLACK: '#000000',
	GREEN600: '#3CD080',
	GREEN500: '#65D196',
	GREEN400: '#83DDAC',
	GREEN300: '#A7EFC8',
	GREEN200: '#CBF6DF',
	GREEN100: '#E7FEF2',
	BLUE600: '#2C7BE5',
	BLUE500: '#509CF7',
	BLUE400: '#79B4F9',
	BLUE300: '#AED1FB',
	BLUE200: '#CEE7F7',
	BLUE100: '#E6F4FE',
	PINK600: '#FD5B73',
	PINK500: '#FF8093',
	PINK400: '#FF95A5',
	PINK300: '#FFB6C1',
	PINK200: '#FFE7EA',
	PINK100: '#FFF7F8',
	YELLOW600: '#E5A500',
	YELLOW500: '#FDBA12',
	YELLOW400: '#FFD358',
	YELLOW300: '#FFE494',
	YELLOW200: '#FFF1C2',
	YELLOW100: '#FFF9E5',
	PURPLE600: '#7E3AF2',
	PURPLE500: '#8B5CF6',
	PURPLE400: '#A78BFA',
	PURPLE300: '#C4B5FD',
	PURPLE200: '#DDD6FE',
	PURPLE100: '#EDE9FE',
	FILTER: 'rgba(127, 130, 149, 0.30)',
	TOAST: 'rgba(0, 0, 0, 0.80)',

	TJ: '#00AFEC',
	KY: '#8270DB',
} as const;

export const FONT = {
	SERIF: "'Noto Serif KR', serif",
	SANS: "'Pretendard', sans-serif",

	SIZE: {
		// 본문 타이틀: Hero Section
		DISPLAY: 'clamp(3.5rem, 12vw, 9rem)',

		// 페이지 제목 및 섹션 헤더
		H1: 'clamp(1.75rem, 4vw, 3rem)',
		H2: 'clamp(1.375rem, 3vw, 2rem)',
		H3: 'clamp(1.125rem, 2vw, 1.5rem)',

		// 본문 및 서브 텍스트
		XL: '1.25rem', // 리스트 강조, 리드 문구
		LG: '1.125rem', // 일반 본문 강조
		MD: '1rem', // 기본 본문
		SM: '0.875rem', // 부가 설명, 메타 데이터
		XS: '0.75rem', // 캡션, 태그라인, 저작권 표시

		// 디테일용 텍스트
		TINY: '0.65rem',
	},

	WEIGHT: {
		LIGHT: 300,
		REGULAR: 400,
		MEDIUM: 500,
		SEMIBOLD: 600,
		BOLD: 700,
	},
} as const;

export const Theme = {
	COLOR,
	FONT,
} as const;

export type ColorType = typeof COLOR;
export type FontType = typeof FONT;
