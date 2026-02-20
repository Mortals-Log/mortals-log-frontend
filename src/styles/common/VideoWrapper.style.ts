// @styles/common/VideoWrapper.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const VideoWrapper = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	max-width: 800px;
	aspect-ratio: 16 / 9;
	margin-bottom: 4rem;
	border-radius: 10px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	@media (max-width: 850px) {
		margin-bottom: 2rem;
	}
`;
