// @/styles/pages/Home/ProfileSection

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import * as L from '@/styles/common/Layout.style';

export { ViewMoreButton } from '@/styles/components/Buttons.style';
import * as B from '@/styles/components/Buttons.style';

const fadeInBlur = keyframes`
  from { opacity: 0; filter: blur(10px); transform: translateY(10px); }
  to { opacity: 1; filter: blur(0); transform: translateY(0); }
`;

export const ProfileSection = styled(L.ContentSection)`
	display: flex;
	position: relative;
	justify-content: center;
	margin: 0 auto;
	margin-top: 6rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		margin-top: 5rem;
	}
`;

export const ModifierLink = styled(B.SourceLink)`
	width: auto;
	opacity: 0;
	margin-bottom: 8px;

	white-space: normal;
	overflow: visible;
	text-overflow: clip;

	@media ${props => props.theme.WINDOW_SIZE.laptop} {
		margin-bottom: 4px;
	}
`;

export const BackgroundText = styled.div`
	position: absolute;
	top: 50%;
	left: 60%;
	transform: translate(-50%, -50%) rotate(-25deg);

	font-family: ${props => props.theme.FONT.SANS};
	font-size: 11vw;
	font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
	color: ${props => props.theme.COLOR.PRIMARY};
	opacity: 0.05;

	line-height: 0.9;
	text-align: center;

	z-index: 0;
	user-select: none;
	pointer-events: none;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		font-size: 25vw;
		top: 55%;
		left: 30%;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: 30vw;
		top: 55%;
		left: 30%;
	}
`;

export const SectionWrapper = styled.div`
	display: flex;
	position: relative;
	width: 100%;
	margin: 0 auto;

	align-items: center;
	justify-content: center;
	gap: 4rem;

	@media ${props => props.theme.WINDOW_SIZE.laptop} {
		gap: 3rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		flex-direction: column;
		gap: 2rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		flex-direction: column;
		gap: 1.5rem;
	}
`;

export const ImageSection = styled.div`
	position: relative;
	flex: 0 0 340px;
	width: 100%;

	@media ${props => props.theme.WINDOW_SIZE.laptop} {
		flex: 0 0 290px;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		flex: none;
		max-width: 280px;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		max-width: 250px;
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

	@media ${props => props.theme.WINDOW_SIZE.laptop} {
		top: -20px;
		padding: 15px 8px;
		font-size: 1.5rem;
		letter-spacing: 0.4rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		top: -15px;
		right: -10px;
		font-size: 1.4rem;
		letter-spacing: 0.4rem;
	}
`;

export const TextSection = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		width: 100%;
		align-items: center;
		text-align: center;
	}
`;

export const ModifierContainer = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-start;

	width: 400px;
	min-height: 80px;
	margin-bottom: 4px;

	will-change: transform, opacity, filter;

	&:hover {
		a {
			opacity: 1;
		}
		p {
			animation-play-state: paused;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		display: none;
	}
`;

export const ModifierText = styled.p`
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	overflow: hidden;

	line-height: 1.4;
	margin: 0;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
	color: ${props => props.theme.COLOR.GRAY600};

	text-align: left;
	word-break: keep-all;

	animation: ${fadeInBlur} 0.8s ease-out;

	@media ${props => props.theme.WINDOW_SIZE.laptop} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	}
`;

export const NameSection = styled.div`
	display: flex;
	align-items: baseline;
	margin-bottom: 1.2rem;
	gap: 0.6rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		align-items: flex-start;
		flex-direction: column;
		margin-bottom: 0.5rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		align-items: center;
		margin-bottom: 1.5rem;
		gap: 0.4rem;
	}
`;

export const ArtistName = styled.div`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
	color: ${props => props.theme.COLOR.BLACK};

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		font-size: ${props => props.theme.FONT.SIZE.XL};
	}
`;

export const JobBadge = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY400};
	letter-spacing: 0.1rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;

export const ProfileDescription = styled.div`
	display: block;
	align-items: flex-start;
	margin-bottom: 2rem;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY600};

	text-align: start;
	white-space: pre-wrap;
	word-break: keep-all;
	line-height: 1.8;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		margin-bottom: 1.5rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
		text-align: center;
		line-height: 1.6;
	}
`;
