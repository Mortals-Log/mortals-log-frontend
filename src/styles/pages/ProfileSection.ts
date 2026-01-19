/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const fadeInBlur = keyframes`
  from { opacity: 0; filter: blur(10px); transform: translateY(10px); }
  to { opacity: 1; filter: blur(0); transform: translateY(0); }
`;

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

export const ProfileContainer = styled.section`
	width: 100%;
	max-width: 1000px;
	padding: 0 2rem;
	margin-top: 6rem;
`;

export const BackgroundText = styled.div`
	position: absolute;
	top: 65%;
	left: 65%;
	transform: translate(-50%, -50%) rotate(-25deg);

	font-family: ${({ theme }) => theme.FONT.SANS};
	font-size: 11vw;
	font-weight: 900;
	color: ${props => props.theme.COLOR.PRIMARY};
	opacity: 0.05;

	line-height: 0.9;
	text-align: center;

	z-index: -1;
	user-select: none;
	pointer-events: none;
`;

export const SectionWrapper = styled.div`
	display: flex;
	position: relative;
	gap: 5rem;
	align-items: flex-start;
`;

export const ImageSection = styled.div`
	position: relative;
	flex: 1;
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
	color: ${props => props.theme.COLOR.WHITE};

	writing-mode: vertical-rl;
	letter-spacing: 0.7rem;
`;

export const TextSection = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
`;

export const SourceLink = styled.a`
	display: inline-block;

	font-family: ${({ theme }) => theme.FONT.SANS};
	font-size: ${({ theme }) => theme.FONT.SIZE.XS};
	font-weight: ${({ theme }) => theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY400};
	text-decoration: none;

	transition: all 0.3s ease;

	&::before {
		content: 'REF. ';
		font-weight: 800;
		font-size: 0.65rem;
		font-weight: ${({ theme }) => theme.FONT.WEIGHT.MEDIUM};
		letter-spacing: 0.5px;
	}

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
		transform: translateX(3px);
	}
`;

export const ModifierContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-bottom: 0.8rem;
	gap: 0.5rem;

	a {
		opacity: 0;
	}

	&:hover {
		a {
			opacity: 1;
		}
		h3 {
			animation: paused;
		}
	}

	@media (max-width: 850px) {
		display: none;
	}
`;

export const ModifierText = styled.p`
	font-family: ${({ theme }) => theme.FONT.SERIF};
	font-size: ${({ theme }) => theme.FONT.SIZE.MD};
	font-weight: ${({ theme }) => theme.FONT.WEIGHT.BOLD};
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
	font-family: ${({ theme }) => theme.FONT.SERIF};
	font-size: ${({ theme }) => theme.FONT.SIZE.H2};
	font-weight: ${({ theme }) => theme.FONT.WEIGHT.BOLD};
	color: ${props => props.theme.COLOR.BLACK};
`;

export const JobBadge = styled.span`
	font-family: ${({ theme }) => theme.FONT.SANS};
	font-size: ${({ theme }) => theme.FONT.SIZE.MD};
	font-weight: ${({ theme }) => theme.FONT.WEIGHT.REGULAR};
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

export const Description = styled.p`
	font-family: ${({ theme }) => theme.FONT.SERIF};
	font-size: ${({ theme }) => theme.FONT.SIZE.LG};
	font-weight: ${({ theme }) => theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY600};
	text-align: start;
	white-space: pre-wrap;
	line-height: 1.8;

	@media (max-width: 850px) {
		font-size: ${({ theme }) => theme.FONT.SIZE.MD};
	}
`;

export const ViewMoreBtn = styled.button`
	width: fit-content;
	background-color: ${props => props.theme.COLOR.BLACK};
	padding: 1rem 1.5rem;

	font-family: ${({ theme }) => theme.FONT.SANS};
	font-size: ${({ theme }) => theme.FONT.SIZE.MD};
	font-weight: ${({ theme }) => theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.WHITE};

	border: none;
	cursor: pointer;
	transition: all 0.3s;

	&::after {
		content: '|';
		margin-left: 2px;
		color: ${props => props.theme.COLOR.WHITE};
		animation: ${blink} 1s step-end infinite;
	}

	&:hover {
		background-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
	}

	@media (max-width: 850px) {
		padding: 0.9rem 1.5rem;
		font-size: ${({ theme }) => theme.FONT.SIZE.SM};
	}
`;
