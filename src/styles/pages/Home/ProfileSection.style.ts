//@styles/pages/ProfileSection.style

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

export * from '@styles/components/Buttons.style';

const fadeInBlur = keyframes`
  from { opacity: 0; filter: blur(10px); transform: translateY(10px); }
  to { opacity: 1; filter: blur(0); transform: translateY(0); }
`;

export const ProfileContainer = styled.section`
	display: flex;
	justify-content: center;
	position: relative;

	width: 100%;
	margin: 0 auto;
`;

export const BackgroundText = styled.div`
	position: absolute;
	top: 50%;
	left: 60%;
	transform: translate(-50%, -50%) rotate(-25deg);

	font-family: ${props => props.theme.FONT.SANS};
	font-size: 11vw;
	font-weight: 900;
	color: ${props => props.theme.COLOR.PRIMARY};
	opacity: 0.05;

	line-height: 0.9;
	text-align: center;

	z-index: 0;
	user-select: none;
	pointer-events: none;
`;

export const SectionWrapper = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;

	align-items: center;
	justify-content: center;
	gap: 5rem;

	@media (max-width: 1200px) {
		gap: 3rem;
	}

	@media (max-width: 850px) {
		flex-direction: column;
		gap: 2rem;
	}
`;

export const ImageSection = styled.div`
	position: relative;
	flex: 0 0 380px;
	width: 100%;

	@media (max-width: 1200px) {
		width: 100%;
		max-width: 290px;
	}

	@media (max-width: 850px) {
		width: 100%;
		max-width: 280px;
	}
`;

export const MainImage = styled.img`
	width: 100%;
	aspect-ratio: 3/4;
	object-fit: cover;
	transition: filter 0.5s ease;
`;

export const HanjaBadge = styled.div`
	position: absolute;
	top: -20px;
	right: -20px;
	background: ${props => props.theme.COLOR.BLACK};
	padding: 18px 10px;

	font-family: serif;
	font-size: 1.7rem;
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.WHITE};

	writing-mode: vertical-rl;
	letter-spacing: 0.7rem;
`;

export const TextSection = styled.div`
	display: flex;
	max-width: 550px;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

export const ModifierContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 0.8rem;
	gap: 0.5rem;
	will-change: transform, opacity, filter;

	a {
		opacity: 0;
	}

	&:hover {
		a {
			opacity: 1;
		}
		h3 {
+			animation-play-state: paused;
		}
	}

	@media (max-width: 850px) {
		display: none;
	}
`;

export const ModifierText = styled.p`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
	color: ${props => props.theme.COLOR.GRAY600};

	line-height: 1.4;
	animation: ${fadeInBlur} 0.8s ease-out;
`;

export const NameSection = styled.div`
	display: flex;
	align-items: baseline;
	margin-bottom: 3rem;
	gap: 0.8rem;

	@media (max-width: 850px) {
		align-items: flex-start;
		flex-direction: column;
		margin-bottom: 1rem;
	}
`;

export const ArtistName = styled.h2`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
	color: ${props => props.theme.COLOR.BLACK};
`;

export const JobBadge = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY400};
	letter-spacing: 0.1rem;
`;

export const DescriptionContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 4rem;
	gap: 0.8rem;

	@media (max-width: 850px) {
		gap: 0.5rem;
		margin-bottom: 1.5rem;
	}
`;

export const ProfileDescription = styled.p`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY600};
	text-align: start;
	white-space: pre-wrap;
	line-height: 1.8;

	@media (max-width: 850px) {
		font-size: ${props => props.theme.FONT.SIZE.MD};
	}
`;
