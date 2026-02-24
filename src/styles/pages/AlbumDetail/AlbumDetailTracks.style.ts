// @styles/pates/Album/AlbumDetailTracks.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@/styles/components/Badge.style';
export * from '@/styles/common/Layout.style';

export const SideGroup = styled.div`
	padding-top: 1.5rem;
`;

export const SideTitle = styled.div`
	padding-bottom: 1.2rem;
	border-bottom: 2px solid ${props => props.theme.COLOR.GRAY100};

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY600};
	letter-spacing: 0.1em;
	text-transform: uppercase;
`;

export const TrackWrapper = styled.div`
	display: flex;
	align-items: center;
	padding: 1.5rem 1rem;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY100};
	transition: background 0.2s ease;
	align-items: baseline;
	cursor: pointer;

	&:hover {
		background-color: ${props => props.theme.COLOR.GRAY50};
	}

	&:last-child {
		border-bottom: none;
	}
`;

export const TrackNumber = styled.div`
	width: 30px;
	flex-shrink: 0;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};
`;

export const TrackTitle = styled.div<{ $isLead: boolean }>`
	display: flex;
	align-items: center;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => (props.$isLead ? props.theme.FONT.WEIGHT.MEDIUM : props.theme.FONT.WEIGHT.REGULAR)};
	color: ${props => props.theme.COLOR.GRAY700};
`;
