// @styles/components/TimeTable.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const TimelineContainer = styled.div<{ $isExpanded: boolean }>`
	position: relative;
	padding: 2rem 1rem 0rem 1rem;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100px;
		background: linear-gradient(to bottom, transparent, ${props => props.theme.COLOR.WHITE});
		pointer-events: none;
		opacity: ${({ $isExpanded }) => ($isExpanded ? 0 : 1)};
		transition: opacity 0.3s ease;
	}
`;

export const TimelineYearGroup = styled.div`
	margin-bottom: 2rem;
`;

export const TimelineYearLabel = styled.h3`
	display: flex;
	position: relative;
	align-items: center;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.H3};
	font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
	color: ${props => props.theme.COLOR.GRAY700};

	margin-bottom: 1rem;
	gap: 1rem;

	&::before {
		content: '';
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: ${props => props.theme.COLOR.PRIMARY};
	}
`;

export const TimelineItemList = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
`;

export const TimelineItem = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	padding: 1rem;

	gap: 1rem;
	transition: transform 0.2s ease;
`;

export const TimelineMarker = styled.div`
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: ${props => props.theme.COLOR.GRAY400};
`;

export const TimelineContent = styled.div`
	display: flex;
	gap: 1rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	color: ${props => props.theme.COLOR.GRAY600};
`;

export const TimelineDate = styled.span`
	min-width: 50px;
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
`;

export const TimelineText = styled.span`
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
`;
