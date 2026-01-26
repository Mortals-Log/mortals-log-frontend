// @styles/components/AlbumCard.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { MainContainer as BaseContainer } from '@styles/pages/Album/Album.style';

export * from '@styles/pages/Album/Album.style';
export * from '@styles/components/Buttons.style';

export const MainContainer = styled(BaseContainer)`
	margin-top: -0.5rem;
`;

export const TitleSection = styled.div`
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY100};
	padding-bottom: 2rem;
`;

export const TypeWrap = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 0.8rem;

	font-size: ${props => props.theme.FONT.SIZE.MD};
`;

export const AlbumId = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.PRIMARY};
`;

export const VolText = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY400};

	&::before {
		content: '|';
		margin-right: 8px;
		color: ${props => props.theme.COLOR.GRAY300};
	}
`;

export const MainTitle = styled.h1`
	margin-top: 0.5rem;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H1};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY700};
`;

export const DateText = styled.p`
	margin-top: 1rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};
`;

export const Placeholder = styled.div`
	margin-top: 5rem;
	text-align: center;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY300};
`;
