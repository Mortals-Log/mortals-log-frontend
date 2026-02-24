// @styles/pages/Album/AlbumTypeSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
export { ContentSection, SectionTitle } from '@/styles/common/Layout.style';
export * from '@/styles/components/AlbumCard.style';

import * as B from '@/styles/components/Buttons.style';

export const ToggleButton = styled(B.ToggleButton)`
	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		display: none;
	}
`;

export const TabList = styled.nav`
	display: flex;
	position: sticky;
	z-index: 10;
	top: 60px;
	justify-content: space-between;
	align-items: flex-start;
	padding: 1.2rem 0;
	margin: 0;

	background-color: ${props => props.theme.COLOR.WHITE}cc;
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY100}44;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 0.8rem 0;
	}
`;

export const TabGroup = styled.ul`
	display: flex;
	flex: 1;
	flex-wrap: wrap;
	gap: 0;
	margin: 0;
	padding: 0 3px;
	gap: 1.5rem;

	list-style: none;
	overflow-x: auto;
	white-space: nowrap;

	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::after {
		content: '';
		padding-right: 1.5rem;
	}

	&.tab-menu {
		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			display: none;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 1rem 1.2rem;
		padding: 0 5px;
	}
`;

export const MobileTabSelect = styled.div`
	display: none;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		display: block;
		position: relative;
		width: 130px;

		&::after {
			content: '▼';
			position: absolute;
			top: 50%;
			right: 0.5rem;
			transform: translateY(-50%);

			font-family: ${props => props.theme.FONT.SANS};
			font-size: ${props => props.theme.FONT.SIZE.TINY};
			font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
			color: ${props => props.theme.COLOR.GRAY400};

			pointer-events: none;
		}
	}
`;

export const MobileSelectItem = styled.select`
	width: 100%;
	padding: 0.6rem 1rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY700};

	border: 1px solid ${props => props.theme.COLOR.GRAY200};
	border-radius: 4px;
	background-color: ${props => props.theme.COLOR.WHITE};

	appearance: none;
	outline: none;
	cursor: pointer;
`;

export const TabItem = styled.li<{ $isActive: boolean }>`
	position: relative;
	cursor: pointer;
	white-space: nowrap;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => (props.$isActive ? props.theme.COLOR.PRIMARY : props.theme.COLOR.GRAY300)};

	transition: color 0.2s ease;

	&::after {
		content: '';
		position: absolute;
		top: 0;
		right: -8px;
		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: ${props => props.theme.COLOR.PRIMARY};
		opacity: ${props => (props.$isActive ? 1 : 0)};
		transform: scale(${props => (props.$isActive ? 1 : 0)});
		transition: all 0.2s ease;
	}

	&:hover {
		color: ${props => !props.$isActive && props.theme.COLOR.PRIMARY};
		opacity: ${props => !props.$isActive && 0.8};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;
