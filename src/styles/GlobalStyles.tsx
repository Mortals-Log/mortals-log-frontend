'use client';

// @/styles/GlobalStyles

import { Global, css } from '@emotion/react';

import Reset from './reset';

const globalStyles = css`
	${Reset}

	/*Pretandard*/
	/*Light - Pretendard*/
  	@font-face {
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 300;
		font-display: swap;
		src:
			url(/fonts/Pretendard-Light.woff2) format('woff2'),
			url(/fonts/Pretendard-Light.woff) format('woff'),
			url(/fonts/Pretendard-Light.ttf) format('truetype'),
			url(/fonts/Pretendard-Light.otf) format('opentype');
	}

	/*Regular - Pretendard*/
	@font-face {
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src:
			url('/fonts/Pretendard-Regular.woff2') format('woff2'),
			url('/fonts/Pretendard-Regular.woff') format('woff'),
			url('/fonts/Pretendard-Regular.ttf') format('truetype'),
			url('/fonts/Pretendard-Regular.otf') format('opentype');
	}

	/*Medium - Pretendard*/
	@font-face {
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 500;
		font-display: swap;
		src:
			url('/fonts/Pretendard-Medium.woff2') format('woff2'),
			url('/fonts/Pretendard-Medium.woff') format('woff'),
			url('/fonts/Pretendard-Medium.ttf') format('truetype'),
			url('/fonts/Pretendard-Medium.otf') format('opentype');
	}

	/*Semibold - Pretendard*/
	@font-face {
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 600;
		font-display: swap;
		src:
			url('/fonts/Pretendard-SemiBold.woff2') format('woff2'),
			url('/fonts/Pretendard-SemiBold.woff') format('woff'),
			url('/fonts/Pretendard-SemiBold.ttf') format('truetype'),
			url('/fonts/Pretendard-SemiBold.otf') format('opentype');
	}

	/*NotoSelifKR*/
	/*Light - NotoSerifKR*/
	@font-face {
		font-family: 'Noto Serif KR';
		font-style: normal;
		font-weight: 300;
		font-display: swap;
		src:
			url('/fonts/NotoSerifKR-Light.woff') format('woff'),
			url('/fonts/NotoSerifKR-Light.ttf') format('truetype');
	}

	/*Regular - NotoSerifKR*/
	@font-face {
		font-family: 'Noto Serif KR';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src:
			url('/fonts/NotoSerifKR-Regular.woff') format('woff'),
			url('/fonts/NotoSerifKR-Regular.ttf') format('truetype');
	}

	/*Medium - NotoSerifKR*/
	@font-face {
		font-family: 'Noto Serif KR';
		font-style: normal;
		font-weight: 500;
		font-display: swap;
		src:
			url('/fonts/NotoSerifKR-Medium.woff') format('woff'),
			url('/fonts/NotoSerifKR-Medium.ttf') format('truetype');
	}

	/*SemiBold - NotoSerifKR*/
	@font-face {
		font-family: 'Noto Serif KR';
		font-style: normal;
		font-weight: 600;
		font-display: swap;
		src:
			url('/fonts/NotoSerifKR-SemiBold.woff') format('woff'),
			url('/fonts/NotoSerifKR-SemiBold.ttf') format('truetype');
	}

	html {
		scroll-behavior: smooth;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizelegibility;
	}

	h1,
	h2,
	h3,
	header {
		font-family: 'Noto Serif KR', Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
	}

	body,
	button,
	input,
	select,
	table,
	textarea {
		font-family: 'Pretendard', Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
	}

	button:focus:not(:focus-visible) {
		outline: none;
	}

	body {
		font-family: 'Pretendard';
		overflow-x: hidden;

		width: 100%;
		min-height: 100vh;
		margin: 0;
		padding: 0;
		color: #303239;
		background-color: #ffffff;

		font-synthesis: none;
		text-rendering: optimizeLegibility;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		@supports (-webkit-touch-callout: none) {
			min-height: -webkit-fill-available;
		}

		&::before {
			content: '';
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-image: url('/assets/noise.svg');
			opacity: 0.4;
			pointer-events: none;
			z-index: 9999;

			@media print {
				background-image: none;
			}
		}
	}

	#root {
		width: 100%;
		min-width: 100vw;
		min-height: 100vh;
	}
`;

const GlobalStyle = () => <Global styles={globalStyles} />;

export default GlobalStyle;
