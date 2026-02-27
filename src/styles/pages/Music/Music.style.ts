// @styles/pages/Music/Music.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import * as L from '@/styles/common/Layout.style';

export { MainTitle, SubTitle, Description } from '@/styles/common/Layout.style';

export const MainContainer = styled(L.MainContainer)`
	max-width: 800px;
	margin: 0 auto;
	padding: 100px 20px;
`;

export const TabGroup = styled.ul`
	display: flex;
	width: 100%;
	align-items: center;
	margin: 5rem 0 2rem 0;

	list-style: none;
	overflow-x: auto;
	white-space: nowrap;

	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		margin: 4rem 0 1.5rem 0;
		padding-bottom: 4px;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin: 4rem 0 1.5rem 0;
		padding-bottom: 4px;
	}
`;

export const TabItem = styled.li<{ $isActive: boolean }>`
	flex: 1;
	display: flex;
	position: releative;
	min-width: fit-content;
	justify-content: center;
	align-items: center;
	padding: 1rem;

	cursor: pointer;
	white-space: nowrap;
	transition: color 0.3s ease;

	border-top: 1.5px solid ${props => props.theme.COLOR.GRAY100};
	border-bottom: 2px solid ${props => (props.$isActive ? props.theme.COLOR.PRIMARY : props.theme.COLOR.GRAY400)};
	border-radius: 15px 15px 0 0;
	background-color: ${props => (props.$isActive ? props.theme.COLOR.WHITE : props.theme.COLOR.GRAY100)};

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => (props.$isActive ? props.theme.COLOR.PRIMARY : props.theme.COLOR.GRAY400)};

	&:hover {
		text-decoration: underline;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		font-size: ${props => props.theme.FONT.SIZE.SM};

		&:hover {
			text-decoration: none;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 0.8rem 1rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};

		&:hover {
			text-decoration: none;
		}
	}
`;
