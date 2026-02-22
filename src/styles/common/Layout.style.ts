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

export const SectionTitle = styled.h3`
	display: flex;
	align-items: baseline;
	gap: 0.5rem;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H3};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};

	border-bottom: 2px solid ${props => props.theme.COLOR.PRIMARY};
	padding-bottom: 1rem;
	letter-spacing: 2px;

	flex-wrap: wrap;
	word-break: keep-all;

	span {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY500};

		text-transform: uppercase;
		letter-spacing: 1.5px;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding-bottom: 0.7rem;
		letter-spacing: 1px;

		gap: 0.4rem;

		span {
			font-size: ${props => props.theme.FONT.SIZE.XS};
			letter-spacing: 1px;
		}
	}
`;
