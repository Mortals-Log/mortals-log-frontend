// @styles/pages/Schedule/Schedule.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const TrackContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const TrackItem = styled.div`
	display: flex;
	align-items: center;
	padding: 1rem 1.5rem;
	border: 1px solid ${props => props.theme.COLOR.GRAY100};
	border-radius: 10px;
	cursor: pointer;
	transition: all 0.1s ease;

	&:hover {
		border-color: ${props => props.theme.COLOR.PRIMARY};
	}
`;

export const TrackNumber = styled.span`
	width: 25px;
	margin-right: 1.5rem;
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.PRIMARY};
`;

export const TrackInfo = styled.div`
	display: flex;
	flex: 1;
	flex-direction: column;
	gap: 4px;
`;

export const TrackTitle = styled.span`
	margin-bottom: 4px;

	font-family: ${props => props.theme.FONT.SASN};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY700};
`;

export const AlbumName = styled.div`
	font-family: ${props => props.theme.FONT.SASN};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};
`;

export const LeadBadge = styled.span`
	margin-left: 10px;
	padding: 4px 6px;
	border-radius: 4px;
	background-color: ${props => props.theme.COLOR.PRIMARY};

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.TINY};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.WHITE};
	letter-spacing: 0.05em;
`;
