// @styles/pages/Album/AlbumReleaseSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@styles/pages/Album/Album.style';
export * from '@styles/common/SectionTitle.style';
export * from '@styles/components/AlbumCard.style';

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
