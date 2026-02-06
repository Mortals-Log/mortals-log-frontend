// @styles/pages/Schedule/ScheduleListView.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { SCHEDULE_TYPE_COLORS } from '@/const/schedule';
import { Schedule } from '@/types/schedule';

export const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 13rem;
	gap: 2px;
	overflow: hidden;
	margin-top: 1rem;
`;

export const DayContainer = styled.div<{ isToday: boolean; isSelected: boolean }>`
	display: flex;
	padding: 1.2rem 1rem;
	gap: 1rem;
	background-color: ${props =>
		props.isSelected ? props.theme.COLOR.PRIMARY : props.isToday ? props.theme.COLOR.GRAY50 : 'transparent'};
	border-radius: 10px;
	cursor: pointer;

	&:hover {
		background-color: ${props => !props.isSelected && props.theme.COLOR.GRAY100};
		border-radius: 10px;
	}
`;

export const DayHeader = styled.div<{ isToday: boolean; isSelected: boolean }>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 3px;
	min-width: 40px;

	.day_name {
		font-size: 10px;
		color: ${props => props.theme.COLOR.GRAY400};
		text-transform: uppercase;
	}

	.day_number {
		font-size: ${props => props.theme.FONT.SIZE.LG};
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
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 1rem;
`;

export const ScheduleItem = styled.div<{ eventType: Schedule['type']; isSelected: boolean }>`
	display: flex;
	align-items: center;
	gap: 10px;

	width: fit-content;
	padding: 5px 8px;
	border-radius: 4px;

	background-color: ${props => (props.isSelected ? props.theme.COLOR.WHITE + 33 : 'transparent')};

	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => (props.isSelected ? props.theme.COLOR.WHITE : props.theme.COLOR.GRAY700)};

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	&::before {
		content: '';
		display: inline-block;
		flex-shrink: 0;

		width: 4px;
		height: 16px;
		border-radius: 2px;
		background-color: ${props =>
			props.isSelected ? props.theme.COLOR.WHITE : SCHEDULE_TYPE_COLORS[props.eventType].text};
	}
`;
