//@styles/pages/Home/Home.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export { VerticalBar } from '@/styles/common/VerticalBar.style';

export const MainContainer = styled.main`
	display: flex;
	flex-direction: column;
	width: 100%;
	max-width: 1200px;
	min-height: calc(100vh - 60px);
	align-items: center;
	padding: 100px 60px 30px 60px;
	margin: 0 auto;

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

export const SectionWrapper = styled.section`
	display: flex;
	position: relative;
	width: 100%;
	max-width: 1200px;
	padding: 100px 60px;

	align-items: center;
	justify-content: center;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		flex-direction: column;
		padding: 5rem 1rem;
		gap: 1rem;
	}
`;

export const Description = styled.span`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.PRIMARY};

	letter-spacing: 0.4em;
	text-transform: uppercase;
	word-break: keep-all;
	display: block;
	margin-bottom: 1rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
		letter-spacing: 0.2em;
		margin-bottom: 0.5rem;
		text-align: center;
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
	white-space: nowrap;
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

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
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

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;
