// @styles/pages/Schedule/ScheduleCalendar.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

import { SCHEDULE_TYPE_COLORS } from '@/const/schedule';
import { Schedule } from '@/types/schedule';

export const ScheduleToolbar = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 12px;
	margin-bottom: 0.3rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		justify-content: space-between;
		gap: 8px;
	}
`;

export const ViewSwitcher = styled.div`
	display: flex;
	background-color: ${props => props.theme.COLOR.GRAY50};
	border: 1px solid ${props => props.theme.COLOR.GRAY100};
	border-radius: 10px;

	button {
		flex: 1;
		padding: 0.5rem 1rem;

		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.XS};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY700};
		white-space: nowrap;
		word-break: keep-all;

		border: none;
		border-radius: 8px;
		cursor: pointer;
		transition: all 0.2s ease;

		&.active {
			background-color: ${props => props.theme.COLOR.PRIMARY};
			color: ${props => props.theme.COLOR.WHITE};
		}

		&:hover:not(.active) {
			color: ${props => props.theme.COLOR.PRIMARY};
		}
	}
`;

export const TodayButton = styled.button`
	padding: 0.5rem 1rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.PRIMARY};
	white-space: pre-wrap;
	word-break: keep-all;

	border: 1px solid ${props => props.theme.COLOR.PRIMARY};
	border-radius: 10px;

	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
	}

	&:active {
		transform: scale(0.95);
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 0.4rem 0.8rem;
	}
`;

export const ScheduleWrapper = styled.div<{ $viewType: string }>`
	display: block;
	margin-top: 3rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-top: 4rem;
	}

	.react-calendar {
		border: none;
		font-family: ${props => props.theme.FONT.SANS};
		background: transparent;
		line-height: 1.125em;
		margin-top: 1rem;

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			width: 100vw;
			position: relative;
			left: 50%;
			right: 50%;
			margin-left: -50vw;
			margin-right: -50vw;

			max-width: 100vw;
			overflow-x: hidden;
		}
	}

	/* 1. 요일 글자 */
	.react-calendar__month-view__weekdays {
		text-align: center;
		padding: 0.5rem 0;

		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY700};

		abbr {
			text-decoration: none;
		}

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			font-size: ${props => props.theme.FONT.SIZE.XS};
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

		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY700};

		/* 날짜 숫자 */
		abbr {
			margin-bottom: 0.5rem;
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
		background: ${props => props.theme.COLOR.GRAY50};
		color: ${props => props.theme.COLOR.PRIMARY};
		border-radius: 8px;
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

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			margin-left: 0.5rem;
		}

		button {
			min-width: 2rem;
			padding: 0.5rem 1rem;
			background: none;
			font-size: ${props => props.theme.FONT.SIZE.MD};
			font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
			color: ${props => props.theme.COLOR.GRAY700};

			&:disabled {
				background-color: none;
				color: ${props => props.theme.COLOR.GRAY300};
			}

			&:enabled:hover,
			&:enabled:focus {
				background-color: ${props => props.theme.COLOR.GRAY100};
				border-radius: 8px;
			}

			@media ${props => props.theme.WINDOW_SIZE.mobile} {
				padding: 0.3rem 0.8rem;
				font-size: ${props => props.theme.FONT.SIZE.SM};
			}
		}
	}

	${props =>
		(props.$viewType === 'week' || props.$viewType === 'list') &&
		`
        .react-calendar__viewContainer,
        .react-calendar__month-view__weekdays {
            display: none;
        }
        
		.react-calendar__navigation__label {
			pointer-events: none;
			cursor: default;
			
			&:enabled:hover,
			&:enabled:focus {
				background-color: transparent !important;
			}
		}
    `}
`;

export const ScheduleList = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 0.3rem;
`;

export const ScheduleItem = styled.div<{ $eventType: Schedule['type'] }>`
	display: block;
	width: 100%;
	min-width: 0;

	padding: 0.3rem 0.4rem;
	margin-bottom: 2px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => SCHEDULE_TYPE_COLORS[props.$eventType].text};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	background-color: ${props => SCHEDULE_TYPE_COLORS[props.$eventType].bg};

	border-radius: 4px;

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

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

		font-size: ${props => props.theme.FONT.SIZE.TINY};
		white-space: normal;
		overflow: hidden;
		text-overflow: clip;

		line-height: 1.25;
		max-height: 3em;
		padding: 0.2rem 0.3rem;

		&::before {
			display: none;
		}
	}
`;
