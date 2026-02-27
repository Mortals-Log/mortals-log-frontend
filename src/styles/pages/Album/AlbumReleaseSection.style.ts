// @styles/pages/Album/AlbumReleaseSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export { ContentSection, SectionTitle } from '@/styles/common/Layout.style';
export { ToggleButton } from '@/styles/components/Buttons.style';
export * from '@/styles/components/AlbumCard.style';
export * from '@/styles/components/Selector.style';

export const AlbumMobileSection = styled.section`
	display: none;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		display: block;
		scroll-margin-top: 4rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		display: block;
		scroll-margin-top: 4rem;
	}
`;

export const YearSection = styled.section<{ isOpen: boolean }>`
	display: flex;
	gap: 2rem;
	margin: ${props => (props.isOpen ? '3rem 0' : '1.5rem 0')};
	scroll-margin-top: 4rem;

	&:first-of-type {
		margin-top: 1rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		display: none;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		display: none;
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
`;

export const YearTitle = styled.h2`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.PRIMARY};
`;
