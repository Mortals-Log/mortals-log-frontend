import { Global, css } from '@emotion/react';

import Reset from './reset';

const globalStyles = css`
	${Reset}

	/*Light*/
  @font-face {
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 300;
		font-display: swap;
		src:
			url(/fonts/Pretendard-Light.otf) format('truetype'),
			url(/fonts/Pretendard-Light.ttf) format('ttf'),
			url(/fonts/Pretendard-Light.woff) format('woff'),
			url(/fonts/Pretendard-Light.woff2) format('woff2');
	}

	/*Regular*/
	@font-face {
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src:
			url(/fonts/Pretendard-Regular.otf) format('truetype'),
			url(/fonts/Pretendard-Regular.ttf) format('ttf'),
			url(/fonts/Pretendard-Regular.woff) format('woff'),
			url(/fonts/Pretendard-Regular.woff2) format('woff2');
	}

	/*Medium*/
	@font-face {
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 500;
		font-display: swap;
		src:
			url(/fonts/Pretendard-Medium.ttf) format('ttf'),
			url(/fonts/Pretendard-Medium.otf) format('truetype'),
			url(/fonts/Pretendard-Medium.ttf) format('woff'),
			url(/fonts/Pretendard-Medium.woff2) format('woff2');
	}

	/*Semibold*/
	@font-face {
		font-family: 'Pretendard';
		font-style: normal;
		font-weight: 600;
		font-display: swap;
		src:
			url(/fonts/Pretendard-SemiBold.ttf) format('ttf'),
			url(/fonts/Pretendard-SemiBold.otf) format('truetype'),
			url(/fonts/Pretendard-SemiBold.woff) format('woff'),
			url(/fonts/Pretendard-SemiBold.woff2) format('woff2');
	}

	html {
		scroll-behavior: smooth;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-rendering: optimizelegibility;
	}

	body,
	button,
	input,
	select,
	table,
	textarea {
		font-family: 'Pretendard', Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
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
	}

	#root {
		width: 100%;
		min-width: 100vw;
		min-height: 100vh;
	}
`;

const GlobalStyle = () => <Global styles={globalStyles} />;

export default GlobalStyle;