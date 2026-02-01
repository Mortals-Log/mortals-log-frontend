// @styles/components/AlbumCard.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { MainContainer as BaseContainer } from '@styles/pages/Album/Album.style';

export * from '@styles/pages/Album/Album.style';
export * from '@styles/components/Buttons.style';

export const MainContainer = styled(BaseContainer)`
	margin-top: -0.5rem;
`;

export const Placeholder = styled.div`
	margin-top: 5rem;
	text-align: center;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY300};
`;
