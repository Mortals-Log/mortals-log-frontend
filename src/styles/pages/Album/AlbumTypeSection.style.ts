// @styles/pages/Album/AlbumTypeSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@styles/pages/Album/Album.style';
export * from '@styles/common/SectionTitle.style';
export * from '@styles/components/AlbumCard.style';
export { ToggleButton } from '@styles/components/Buttons.style';

export const AlbumGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	gap: 3.5rem 2rem;

	@media (max-width: 850px) {
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	}
`;

export const Placeholder = styled.div`
	margin-top: 2rem;
	text-align: center;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY300};
`;
