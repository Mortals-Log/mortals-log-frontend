// @styles/pages/Schedule/ScheduleCalendar.style

/* eslint-disable storybook/default-exports */

import { SCHEDULE_TYPE_COLORS, Schedule } from '@/types/schedule';
import styled from '@emotion/styled';

export * from '@styles/pages/Schedule/Schedule.style';

export const ScheduleWrapper = styled.div`
	display: block;
	margin-top: 3.5rem;

	.react-calendar {
		width: 100%;
		border: none;
		font-family: ${props => props.theme.FONT.SANS};
		background: transparent;
		line-height: 1.125em;
	}

	/* 1. 요일 글자 */
	.react-calendar__month-view__weekdays {
		text-align: center;
		text-transform: uppercase;
		padding: 0.5rem 0;
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY700};

		abbr {
			text-decoration: none;
		}
	}

	/* 2. 날짜 타일 및 숫자 */
	.react-calendar__tile {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;

		height: auto;
		min-height: 130px;
		padding: 0.3rem;
		color: ${props => props.theme.COLOR.GRAY700};

		/* 날짜 숫자 */
		abbr {
			margin-bottom: 0.3rem;
			font-size: ${props => props.theme.FONT.SIZE.SM};
			font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		}

		/* 호버 시 배경색 */
		&:enabled:hover,
		&:enabled:focus {
			background-color: ${props => props.theme.COLOR.GRAY100};
			border-radius: 8px;
		}
	}

	/* 3. 오늘 날짜 */
	.react-calendar__tile--now {
		border-radius: 8px;
		background: ${props => props.theme.COLOR.GRAY50};
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	/* 4. 선택된 날짜 */
	.react-calendar__tile--active {
		background: ${props => props.theme.COLOR.PRIMARY} !important;
		color: ${props => props.theme.COLOR.WHITE} !important;
		border-radius: 8px;
	}

	/* 5. 이전/다음 달로 넘어가서 해당 달이 아닌 날짜 */
	.react-calendar__month-view__days__day--neighboringMonth {
		color: ${props => props.theme.COLOR.GRAY300};
	}

	/* 네비게이션 버튼 ( < 2026년 2월 > ) */
	.react-calendar__navigation {
		margin-bottom: 1rem;

		button {
			color: ${props => props.theme.COLOR.GRAY700};
			min-width: 3rem;
			background: none;
			font-size: ${props => props.theme.FONT.SIZE.LG};
			font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};

			&:disabled {
				background-color: none;
				color: ${props => props.theme.COLOR.GRAY300};
			}

			&:enabled:hover,
			&:enabled:focus {
				background-color: ${props => props.theme.COLOR.GRAY100};
				border-radius: 8px;
			}
		}
	}
`;

export const ScheduleList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 0.3rem;
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

	.react-calendar__tile--active & {
		background-color: rgba(255, 255, 255, 0.2);
		color: ${props => props.theme.COLOR.WHITE};
	}
`;

export const ScheduleToolbar = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 20px;
	margin-bottom: 0.3rem;
`;

export const TodayButton = styled.button`
	padding: 0.5rem 1rem;

	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};

	color: ${props => props.theme.COLOR.PRIMARY};
	border: 1px solid ${props => props.theme.COLOR.PRIMARY};
	border-radius: 10px;

	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		background-color: ${props => props.theme.COLOR.PRIMARY};
		border: 1px solid ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
	}

	&:active {
		transform: scale(0.95);
	}
`;

export const ViewSwitcher = styled.div`
	display: flex;
	padding: 2px;
	gap: 2px;
	border: 1px solid ${props => props.theme.COLOR.GRAY100};
	border-radius: 10px;

	button {
		padding: 4px 12px;
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.XS};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY700};
		border-radius: 4px;
		transition: all 0.2s;

		&.active {
			background-color: ${props => props.theme.COLOR.PRIMARY};
			color: ${props => props.theme.COLOR.WHITE};
		}

		&:hover:not(.active) {
			color: ${props => props.theme.COLOR.GRAY600};
		}
	}
`;

export const ScheduleNav = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;
	margin-right: auto;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};

	button {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 28px;
		height: 28px;
		border-radius: 50%;

		color: ${props => props.theme.COLOR.GRAY700};

		transition: all 0.2s ease;

		&:hover {
			background-color: ${props => props.theme.COLOR.GRAY100};
		}

		&:active {
			transform: scale(0.9);
		}
	}

	span {
		min-width: 85px;
		text-align: center;
		color: ${props => props.theme.COLOR.GRAY700};
	}
`;
