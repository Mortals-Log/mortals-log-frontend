// @/styles/pages/ScheduleCalendar/ScheduleLabel.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { SCHEDULE_TYPE_COLORS } from '@/const/schedule';
import { Schedule } from '@/types/schedule';

interface ItemProps {
	$isActive: boolean;
	$eventType?: Schedule['type'];
}

export const LabelContainer = styled.div`
	display: flex;
	width: fit-content;
	align-items: center;

	padding: 0.5rem 1rem;
	margin-top: 0.5rem;
	margin-left: auto;
	gap: 12px;

	background-color: ${props => props.theme.COLOR.WHITE};
	border: 1px solid ${props => props.theme.COLOR.GRAY100};
	border-radius: 10px;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		width: 100%;
		flex-wrap: wrap;
		justify-content: flex-start;
		margin-left: 0;
		padding: 0.8rem;
	}
`;

export const FilterTitle = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY600};
	white-space: pre-wrap;
`;

export const LabelList = styled.ul`
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: 1rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 0.8rem 1rem;
	}
`;

export const LabelItem = styled.li<ItemProps>`
	display: flex;
	align-items: center;
	gap: 6px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
	color: ${props => (props.$eventType ? SCHEDULE_TYPE_COLORS[props.$eventType].text : props.theme.COLOR.PRIMARY)};

	opacity: ${props => (props.$isActive ? 1 : 0.4)};
	filter: ${props => (props.$isActive ? 'none' : 'grayscale(100%)')};
	white-space: nowrap;

	cursor: pointer;
	transition: all 0.2s ease;

	&::before {
		content: '';
		width: 12px;
		height: 12px;
		border-radius: 4px;
		flex-shrink: 0;
		background-color: ${props =>
			props.$eventType ? SCHEDULE_TYPE_COLORS[props.$eventType].bg : props.theme.COLOR.PRIMARY};
		border: 1px solid rgba(0, 0, 0, 0.05);
	}

	&:active {
		transform: scale(0.95);
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	}
`;
