// @styles/pages/Profile/ProfileDiscographySection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import * as L from '@styles/common/Layout.style';
import { Link } from 'react-router-dom';

export * from '@/styles/components/Buttons.style';
export * from '@styles/common/ExternalIcon.style';

export const ContentSection = styled(L.ContentSection)``;
export const SectionTitle = styled(L.SectionTitle)``;

// Slider
export const SliderContainer = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	margin-top: 20px;
	padding: 1rem 0;
`;

export const Slider = styled.div`
	display: flex;
	overflow-x: auto;
	gap: 20px;

	&::-webkit-scrollbar {
		display: none;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		display: grid;
		width: 100%;
		grid-template-columns: repeat(2, 1fr);
		gap: 2rem;
		overflow-x: visible;
	}
`;

export const SliderNavButton = styled.button<{ $direction: 'left' | 'right' }>`
	position: absolute;
	top: 0;
	bottom: 0;
	${({ $direction }) => ($direction === 'left' ? 'left: 0;' : 'right: 0;')}

	width: 50px;
	height: 100%;
	z-index: 10;
	border: none;
	outline: none;
	cursor: pointer;

	background: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.4s ease;

	span {
		opacity: 0;

		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.H2};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY100};

		transition: all 0.3s ease;
		transform: ${({ $direction }) => ($direction === 'left' ? 'translateX(10px)' : 'translateX(-10px)')};
	}

	&:hover {
		background: ${({ $direction, theme }) =>
			$direction === 'left'
				? `linear-gradient(
				to right,
				${theme.COLOR.PRIMARY}C0 0%,
				${theme.COLOR.PRIMARY}00 100%
		  )`
				: `linear-gradient(
				to left,
				${theme.COLOR.PRIMARY}C0 0%,
				${theme.COLOR.PRIMARY}00 100%
		  )`};

		span {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		display: none;
	}
`;

// AlbumCard
export const AlbumCard = styled(Link)`
	display: flex;
	flex-direction: column;
	flex: 0 0 180px;
	scroll-snap-align: start;
	cursor: pointer;
	margin-bottom: 8px;

	&:hover img {
		transform: scale(1.05);
	}

	&:hover .overlay {
		opacity: 1;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		flex: none;
		width: 100%;
	}
`;

export const CoverWrapper = styled.div`
	position: relative;
	aspect-ratio: 1/1;
	overflow: hidden;

	background-color: ${props => props.theme.COLOR.WHITE};
	border-radius: 2px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.5s ease;
	}

	&:hover img {
		transform: scale(1.15);
	}
`;

export const Overlay = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;

	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	opacity: 0;
	background-color: rgba(0, 0, 0, 0.4);
	backdrop-filter: blur(4px);
	transition: opacity 0.3s ease;

	span {
		border: 1.2px solid rgba(255, 255, 255, 0.4);
		padding: 0.8rem 1.2rem;
		border-radius: 2px;

		font-family: ${props => props.theme.FONT.SERIF};
		font-size: ${props => props.theme.FONT.SIZE.TINY};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.WHITE};
		letter-spacing: 0.1rem;

		transition: transform 0.3s ease;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		display: none;
	}
`;

export const AlbumInfo = styled.div`
	margin-top: 12px;
	font-family: ${props => props.theme.FONT.SANS};

	.title {
		display: block;
		margin-bottom: 4px;

		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
		color: ${props => props.theme.COLOR.GRAY600};

		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.info {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY500};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-top: 8px;

		.title {
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}
		.info {
			font-size: ${props => props.theme.FONT.SIZE.XS};
		}
	}
`;
