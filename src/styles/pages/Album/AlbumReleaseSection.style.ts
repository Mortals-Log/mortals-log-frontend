// @styles/pages/Album/AlbumReleaseSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@styles/pages/Album/Album.style';
export * from '@styles/common/SectionTitle.style';

export const YearSection = styled.section`
	display: flex;
	gap: 2rem;
	margin: 5rem 0rem;

	&:first-of-type {
		margin-top: 2rem;
	}

	@media (max-width: 850px) {
		flex-direction: column;
		gap: 1rem;

		margin: 3rem 0rem;
	}
`;

export const YearTitle = styled.h2`
	position: sticky;
	height: fit-content;
	top: 5rem;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.PRIMARY};
`;

export const AlbumGrid = styled.div`
	flex: 1;
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
	gap: 2.5rem 2rem;
`;

export const AlbumCard = styled.div`
	cursor: pointer;

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
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.WHITE};
		letter-spacing: 0.1rem;

		transition: transform 0.3s ease;
	}
`;

export const AlbumInfo = styled.div`
	margin-top: 1.2rem;

	.type-wrap {
		display: flex;
		gap: 8px;
		margin-bottom: 6px;

		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.PRIMARY};

		.vol {
			color: ${props => props.theme.COLOR.GRAY400};
		}
	}

	.title {
		margin-bottom: 8px;

		font-family: ${props => props.theme.FONT.SERIF};
		font-size: ${props => props.theme.FONT.SIZE.LG};
		font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
		color: ${props => props.theme.COLOR.GRAY700};
	}

	.date {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY400};
	}
`;
