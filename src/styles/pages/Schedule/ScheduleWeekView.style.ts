// @styles/pages/Schedule/ScheduleCalendar.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { Schedule, SCHEDULE_TYPE_COLORS } from '@/types/schedule';

export const WeekContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(7, minmax(0, 1fr));
	border-radius: 12px;
	overflow: hidden;
	margin-top: 10px;
	background-color: transparent;
`;

export const DayContainer = styled.div<{ isToday: boolean; isSelected: boolean }>`
	display: flex;
	flex-direction: column;
	min-width: 0;
	min-height: 300px;

	background-color: ${props =>
		props.isSelected ? props.theme.COLOR.PRIMARY : props.isToday ? props.theme.COLOR.GRAY50 : 'transparent'};
	border-radius: 10px;
	cursor: pointer;
`;

export const DayHeader = styled.div<{ isToday: boolean; isSelected: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 12px;
	gap: 4px;

	.day_name {
		font-size: 10px;
		color: ${props => props.theme.COLOR.GRAY400};
		text-transform: uppercase;
	}

	.day_number {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props =>
			props.isSelected
				? props.theme.COLOR.WHITE
				: props.isToday
					? props.theme.COLOR.PRIMARY
					: props.theme.COLOR.GRAY700};
	}
`;

export const ScheduleList = styled.div`
	padding: 8px;
	display: flex;
	flex-direction: column;
	gap: 4px;
`;

export const ScheduleItem = styled.div<{ eventType: Schedule['type'] }>`
	display: block;
	width: 100%;
	min-width: 0;

	padding: 0.3rem 0.4rem;
	border-radius: 4px;
	margin-bottom: 2px;

	background-color: ${props => SCHEDULE_TYPE_COLORS[props.eventType].bg};
	color: ${props => SCHEDULE_TYPE_COLORS[props.eventType].text};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	&::before {
		content: '';
		display: inline-block;

		width: 4px;
		height: 4px;
		margin-right: 4px;
		flex-shrink: 0;

		background-color: currentColor;
		border-radius: 50%;
		vertical-align: middle;
		margin-top: -2px;
	}
`;
