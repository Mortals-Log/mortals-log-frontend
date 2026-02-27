// @styles/pages/common/Layout.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const MainContainer = styled.main`
	max-width: 800px;
	margin: 0 auto;
	padding: 100px 60px;
	min-height: 100vh;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		padding: 80px 1.8rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 80px 1.5rem;
	}
`;

export const ContentSection = styled.section`
	width: 100%;
	margin-top: 5rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		margin-top: 4rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-top: 4rem;
	}
`;

export const MainTitle = styled.div`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.BLACK};
	margin-top: 0.3rem;
	line-height: 1.3;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		margin-top: 0.2rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-top: 0.2rem;
	}
`;

export const SubTitle = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.PRIMARY};
	text-transform: uppercase;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;

export const Description = styled.div`
	margin-top: 0.8rem;
	margin-bottom: -2rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};

	line-height: 1.5;
	white-space: pre-wrap;
	word-break: keep-all;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		line-height: 1.2;
		margin-top: 0.5rem;
		margin-bottom: -2.5rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		line-height: 1.2;
		margin-top: 0.6rem;
		margin-bottom: -2.5rem;
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;

export const SectionTitle = styled.h3`
	display: flex;
	width: 100%;
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

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		padding-bottom: 0.6rem;
		letter-spacing: 1px;
		gap: 0.3rem;

		font-size: ${props => props.theme.FONT.SIZE.LG};

		span {
			font-size: ${props => props.theme.FONT.SIZE.SM};
			letter-spacing: 1px;
		}
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
