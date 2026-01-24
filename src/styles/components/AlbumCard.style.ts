// @styles/components/AlbumCard.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const AlbumCard = styled.div`
	display: flex;
	flex-direction: column;
	flex: 0 0 180px;
	scroll-snap-align: start;
	cursor: pointer;
	margin-bottom: 8px;

	&:hover img {
		transform: scale(1.05);
	}
`;

export const AlbumCover = styled.div`
	width: 100%;
	aspect-ratio: 1 / 1;
	overflow: hidden;
	border-radius: 10px;
	background-color: ${props => props.theme.COLOR.WHITE};
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
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
