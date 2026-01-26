// @styles/pages/Album/AlbumTypeSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@styles/pages/Album/Album.style';
export * from '@styles/common/SectionTitle.style';
export * from '@styles/components/AlbumCard.style';

export const TabList = styled.ul`
	display: flex;
	position: sticky;
	overflow-x: auto;
	top: 50px;

	z-index: 10;
	gap: 2rem;
	padding: 1.5rem 0;
	margin: 0;

	list-style: none;

	background-color: ${props => props.theme.COLOR.WHITE}cc;
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY100}44;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const TabItem = styled.li<{ $isActive: boolean }>`
	position: relative;
	cursor: pointer;
	white-space: nowrap;
	transition: color 0.3s ease;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => (props.$isActive ? props.theme.COLOR.PRIMARY : props.theme.COLOR.GRAY400)};

	&::after {
		content: '';
		position: absolute;
		top: -2px;
		right: -8px;
		width: 3.5px;
		height: 3.5px;
		border-radius: 50%;
		background-color: ${props => props.theme.COLOR.PRIMARY};

		opacity: ${props => (props.$isActive ? 1 : 0)};
		transition: opacity 0.3s ease;
	}

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
	}
`;

export const AlbumGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
	gap: 3.5rem 2rem;

	@media (max-width: 850px) {
		grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
	}
`;
