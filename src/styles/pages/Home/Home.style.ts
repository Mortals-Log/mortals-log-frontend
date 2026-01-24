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

	@media (max-width: 860px) {
		min-height: 50vh;
	}
`;

export const SectionWrapper = styled.section`
	display: flex;
	position: relative;
	width: 100%;
	max-width: 1200px;
	padding: 100px 60px;

	align-items: center;
	justify-content: center;
`;

export const Description = styled.span`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.PRIMARY};

	letter-spacing: 0.4em;
	text-transform: uppercase;
	display: block;
	margin-bottom: 1rem;
`;

export const MainTitle = styled.h1`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.DISPLAY};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.BLACK};

	margin: 0;
	letter-spacing: -0.02em;
`;

export const SubTitleContainer = styled(motion.div)`
	overflow: hidden;
	white-space: nowrap;
	margin: 1.5rem 0rem;
`;

export const SubTitleWrapper = styled.div`
	display: inline-flex;
	align-items: center;
	gap: 0.8rem;
`;

export const SubTitle = styled.span`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY600};
`;
