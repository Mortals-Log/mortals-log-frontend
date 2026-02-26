// @styles/common/VideoWrapper.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const VideoWrapper = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	max-width: 800px;
	aspect-ratio: 16 / 9;

	margin: 1rem auto 3rem;
	border-radius: 10px;
	background-color: ${props => props.theme.COLOR.GRAY700};
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
		background: transparent;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-bottom: 2rem;
		border-radius: 8px;
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
	}
`;
