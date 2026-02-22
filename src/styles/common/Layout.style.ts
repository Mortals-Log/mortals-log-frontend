// @styles/pages/common/Layout.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const MainContainer = styled.main`
	max-width: 1200px;
	margin: 0 auto;
	padding: 100px 60px;
	min-height: 100vh;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 80px 1.5rem;
	}
`;

export const ContentSection = styled.section`
	width: 100%;
	margin-top: 5rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-top: 4rem;
	}
`;
