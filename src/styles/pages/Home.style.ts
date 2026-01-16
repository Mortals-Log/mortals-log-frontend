/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const MainContainer = styled.main`
	position: relative;
	width: 100%;
	min-height: 100vh;
	background-color: ${props => props.theme.COLOR.WHITE};
	display: flex;
	align-items: center;
	justify-content: center;
	overflow-x: hidden;
	padding: 100px 0;
`;

export const BackgroundNoise = styled.div`
	position: absolute;
	inset: 0;
	background: url('https://grainy-gradients.vercel.app/noise.svg');
	opacity: 0.8;
	pointer-events: none;
`;

export const HeroSection = styled(motion.section)`
	text-align: center;
	z-index: 10;
`;

export const Description = styled.span`
	color: ${props => props.theme.COLOR.PRIMARY};
	font-size: 0.9rem;
	letter-spacing: 0.4em;
	text-transform: uppercase;
	display: block;
	margin-bottom: 1rem;
`;

export const MainTitle = styled.h1`
	font-size: clamp(3.5rem, 12vw, 9rem);
	font-weight: 900;
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
	font-size: 1.1rem;
	font-weight: 200;
`;

export const VerticalBar = styled.span`
	color: ${props => props.theme.COLOR.PRIMARY};
`;

export const ScrollIndicator = styled.div`
	position: absolute;
	bottom: 2rem;
	left: 50%;
	transform: translateX(-50%);
	text-align: center;

	p {
		font-size: 0.7rem;
		letter-spacing: 0.3em;
		color: ${props => props.theme.COLOR.GRAY600};
		margin-bottom: 1rem;
	}

	.line {
		width: 1px;
		height: 50px;
		background: linear-gradient(to bottom, ${props => props.theme.COLOR.PRIMARY}, transparent);
		margin: 0 auto;
	}

	@media (max-width: 768px) {
		display: none;
	}
`;
