// @/styles/pages/Home/Home

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import * as L from '@/styles/common/Layout.style';

export const MainContainer = styled(L.MainContainer)`
	display: flex;
	flex-direction: column;
	min-height: calc(100vh - 60px);
	align-items: center;
	padding: 100px 60px 30px 60px;
	margin: 0 auto;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		padding: 90px 50px 10px 50x;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 90px 16px 10px 16px;
	}
`;

export const HeroSection = styled(motion.section)`
	display: flex;
	position: relative;
	width: 100%;
	min-height: 60vh;
	flex-direction: column;

	justify-content: center;
	align-items: center;
	overflow: hidden;
	text-align: center;
`;

export const Description = styled.span`
	display: block;
	margin-bottom: 1rem;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.PRIMARY};
	letter-spacing: 0.4rem;
	word-break: keep-all;
	text-align: center;

	@media ${props => props.theme.WINDOW_SIZE.laptop} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		letter-spacing: 0.2rem;
		margin-bottom: 0.8rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
		letter-spacing: 0.2rem;
		margin-bottom: 0.5rem;
	}
`;

export const MainTitle = styled.h1`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.DISPLAY};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.BLACK};

	margin: 0;
	letter-spacing: -0.02em;
	text-align: center;
	word-break: keep-all;
`;

export const SubTitleContainer = styled(motion.div)`
	overflow: hidden;
	text-align: center;
	white-space: pre-wrap;
	margin: 1.5rem 0rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin: 1rem 0rem;
		white-space: normal;
	}
`;

export const SubTitleWrapper = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 0.8rem;

	@media ${props => props.theme.WINDOW_SIZE.laptop} {
		gap: 0.5rem;
	}
`;

export const SubTitle = styled.span`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY600};

	& + &::before {
		content: '|';
		margin-right: 0.8rem;
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	@media ${props => props.theme.WINDOW_SIZE.laptop} {
		font-size: ${props => props.theme.FONT.SIZE.MD};

		& + &::before {
			margin-right: 0.5rem;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		font-size: ${props => props.theme.FONT.SIZE.SM};

		& + &::before {
			margin-right: 0.5rem;
		}
	}
`;
