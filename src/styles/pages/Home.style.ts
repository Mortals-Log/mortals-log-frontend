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
	background: url('assets/noise.svg');
	opacity: 0.8;
	pointer-events: none;
`;

export const HeroSection = styled(motion.section)`
	text-align: center;
	z-index: 10;
`;

export const Description = styled.span`
	font-family: ${({ theme }) => theme.FONT.SERIF};
	font-size: ${({ theme }) => theme.FONT.SIZE.SM};
	font-weight: ${({ theme }) => theme.FONT.WEIGHT.REGULAR};

	color: ${props => props.theme.COLOR.PRIMARY};
	letter-spacing: 0.4em;
	text-transform: uppercase;
	display: block;
	margin-bottom: 1rem;
`;

export const MainTitle = styled.h1`
	font-family: ${({ theme }) => theme.FONT.SERIF};
	font-size: ${({ theme }) => theme.FONT.SIZE.DISPLAY};
	font-weight: ${({ theme }) => theme.FONT.WEIGHT.SEMIBOLD};

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
	font-family: ${({ theme }) => theme.FONT.SERIF};
	font-size: ${({ theme }) => theme.FONT.SIZE.LG};
	font-weight: ${({ theme }) => theme.FONT.WEIGHT.REGULAR};
`;

export const VerticalBar = styled.span`
	color: ${props => props.theme.COLOR.PRIMARY};
`;
