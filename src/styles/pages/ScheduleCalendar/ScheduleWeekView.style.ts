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

export const WeekContainer = styled.div`
	]width: 100%;
	display: grid;
	grid-template-columns: repeat(7, minmax(0, 1fr));
	overflow: hidden;
	background-color: transparent;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
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
	flex-direction: column;
	min-width: 0;
	min-height: 300px;

	background-color: ${props =>
		props.$isSelected ? props.theme.COLOR.PRIMARY : props.$isToday ? props.theme.COLOR.GRAY50 : 'transparent'};
	border-radius: 8px;

	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background-color: ${props => !props.$isSelected && props.theme.COLOR.GRAY100};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		min-height: 180px;
		border-radius: 4px;
	}
`;

export const DayHeader = styled.div<DayContainerProps>`
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 8px 4px;
	gap: 2px;

	font-family: ${props => props.theme.FONT.SANS};

	.day_name {
		font-size: ${props => props.theme.FONT.SIZE.XS};
		color: ${props => (props.$isSelected ? props.theme.COLOR.WHITE + 'CC' : props.theme.COLOR.GRAY400)};
		margin-bottom: 4px;
	}

	.day_number {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props =>
			props.$isSelected
				? props.theme.COLOR.WHITE
				: props.$isToday
					? props.theme.COLOR.PRIMARY
					: props.theme.COLOR.GRAY700};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		.day_name {
			font-size: ${props => props.theme.FONT.SIZE.TINY};
		}

		.day_number {
			font-size: ${props => props.theme.FONT.SIZE.XS};
		}
	}
`;

export const ScheduleList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 4px;
	padding: 4px;
	overflow: hidden;
`;

export const ScheduleItem = styled.div<ItemProps>`
	position: relative;
	display: block;
	width: 100%;
	min-width: 0;

	padding: 0.3rem 0.4rem;
	margin-bottom: 2px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => (props.$isSelected ? props.theme.COLOR.WHITE : SCHEDULE_TYPE_COLORS[props.$eventType].text)};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	background-color: ${props =>
		props.$isSelected ? 'rgba(255, 255, 255, 0.2)' : SCHEDULE_TYPE_COLORS[props.$eventType].bg};
	border-radius: 4px;

	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical;
	line-height: 1.25;
	max-height: 3.2rem;

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

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			display: none;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		line-height: 1.5;
		max-height: 3rem;
		padding: 0.2rem 0.3rem;

		font-size: ${props => props.theme.FONT.SIZE.TINY};

		white-space: normal;
		overflow: hidden;
		text-overflow: clip;
	}
`;
