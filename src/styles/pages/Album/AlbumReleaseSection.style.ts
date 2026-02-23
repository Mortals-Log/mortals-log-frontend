// @styles/pages/Album/AlbumReleaseSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export { ContentSection, SectionTitle } from '@/styles/common/Layout.style';
export * from '@/styles/components/AlbumCard.style';
export { ToggleButton } from '@/styles/components/Buttons.style';

export const YearSection = styled.section<{ isOpen: boolean }>`
	display: flex;
	gap: 2rem;
	margin: ${props => (props.isOpen ? '3rem 0' : '1.5rem 0')};
	scroll-margin-top: 4rem;

	&:first-of-type {
		margin-top: 2rem;
	}

	@media (max-width: 850px) {
		flex-direction: column;
		gap: 1rem;
		margin: ${props => (props.isOpen ? '0.5rem  0' : '0')};
	}
`;

export const YearWrapper = styled.div<{ isOpen: boolean }>`
	position: sticky;
	display: flex;
	width: ${props => (props.isOpen ? '' : '100%')};

	height: fit-content;
	top: 5rem;
	z-index: 10;

	justify-content: center;
	align-items: center;
	flex-direction: ${props => (props.isOpen ? 'column' : 'row')};
	gap: ${props => (props.isOpen ? '1rem' : '')};

	@media (max-width: 850px) {
		top: 50px;
		width: 100%;
		z-index: 10;
		padding: ${props => (props.isOpen ? '1.2rem;' : '1rem')};
		flex-direction: row;

		background-color: ${props => props.theme.COLOR.WHITE}cc;
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
		border-bottom: 1px solid ${props => props.theme.COLOR.GRAY100}44;
	}
`;

export const YearTitle = styled.h2`
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
