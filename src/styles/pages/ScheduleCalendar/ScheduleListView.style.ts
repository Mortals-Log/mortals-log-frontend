// @styles/pages/Schedule/ScheduleListView.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { SCHEDULE_TYPE_COLORS } from '@/const/schedule';
import { Schedule } from '@/types/schedule';

interface DayContainerProps {
	$isToday: boolean;
	$isSelected: boolean;
}

interface ItemProps {
	$isSelected: boolean;
	$eventType: Schedule['type'];
}

export const ListWrapper = styled.div`
	display: flex;
	flex-direction: column;
	min-height: 13rem;
	gap: 2px;
	overflow: hidden;

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		width: 100vw;
		position: relative;
		left: 50%;
		right: 50%;
		margin-left: -50vw;
		margin-right: -50vw;

		max-width: 100vw;
		overflow-x: hidden;
		padding: 0px 4px;
	}
`;

export const DayContainer = styled.div<DayContainerProps>`
	display: flex;
	padding: 1.2rem 1rem;
	gap: 0.5rem;

	background-color: ${props =>
		props.$isSelected ? props.theme.COLOR.PRIMARY : props.$isToday ? props.theme.COLOR.GRAY50 : 'transparent'};
	border-radius: 10px;
	cursor: pointer;

	&:hover {
		background-color: ${props => !props.$isSelected && props.theme.COLOR.GRAY100};
		border-radius: 10px;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 1rem 0.8rem;
		gap: 0.5rem;
	}
`;

export const DayHeader = styled.div<DayContainerProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	min-width: 40px;

	font-family: ${props => props.theme.FONT.SANS};

	.day_number {
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props =>
			props.$isSelected
				? props.theme.COLOR.WHITE
				: props.$isToday
					? props.theme.COLOR.PRIMARY
					: props.theme.COLOR.GRAY700};
	}

	.day_name {
		font-size: ${props => props.theme.FONT.SIZE.XS};
		color: ${props => props.theme.COLOR.GRAY400};
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		min-width: 35px;

		.day_number {
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}

		.day_name {
			font-size: ${props => props.theme.FONT.SIZE.XS};
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		min-width: 30px;

		.day_number {
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}

		.day_name {
			font-size: ${props => props.theme.FONT.SIZE.TINY};
		}
	}
`;

export const ScheduleList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	overflow: hidden;
`;

export const ScheduleItem = styled.div<ItemProps>`
	display: block;
	position: relative;
	width: 100%;
	min-width: 0;

	padding: 5px 8px;
	border-radius: 4px;

	background-color: ${props => (props.$isSelected ? props.theme.COLOR.WHITE + 33 : 'transparent')};

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => (props.$isSelected ? props.theme.COLOR.WHITE : props.theme.COLOR.GRAY700)};

	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	&::before {
		content: '';
		display: inline-block;

		width: 4px;
		height: 16px;
		flex-shrink: 0;
		margin-right: 4px;
		vertical-align: middle;

		background-color: ${props =>
			props.$isSelected ? props.theme.COLOR.WHITE : SCHEDULE_TYPE_COLORS[props.$eventType].text};
		border-radius: 2px;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		&::before {
			height: 14px;
			margin-right: 6px;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};

		&::before {
			height: 12px;
		}
	}
`;
