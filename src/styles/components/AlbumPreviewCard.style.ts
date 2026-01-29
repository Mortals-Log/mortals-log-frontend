// @styles/components/AlbumPreviewCard.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

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
	}

	.info {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY500};
	}
`;
