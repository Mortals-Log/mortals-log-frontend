// @styles/pages/Schedule/ScheduleCalandarAgenda.style

/* eslint-disable storybook/default-exports */

import { SCHEDULE_TYPE_COLORS, Schedule } from '@/types/schedule';
import styled from '@emotion/styled';

export * from '@styles/pages/Schedule/Schedule.style';

export const AgendaSection = styled.div`
	margin-top: 1rem;
	padding-top: 2rem;
	border-top: 1px solid ${props => props.theme.COLOR.GRAY100};
`;

export const AgendaHeader = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 1rem;
	gap: 8px;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY700};

	&::before {
		content: '';
		width: 4px;
		height: 25px;
		margin-top: 5px;
		background-color: ${props => props.theme.COLOR.PRIMARY};
		border-radius: 2px;
	}
`;

export const AgendaItem = styled.div<{ eventType: Schedule['type'] }>`
	display: flex;
	align-items: center;
	gap: 8px;
	padding: 1rem;
	margin-bottom: 0.5rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY600};

	background-color: ${props => SCHEDULE_TYPE_COLORS[props.eventType].bg};
	border-radius: 10px;
	transition: transform 0.2s;
	cursor: pointer;

	&::before {
		content: '';
		display: inline-block;
		flex-shrink: 0;
		width: 8px;
		height: 8px;
		background-color: ${props => SCHEDULE_TYPE_COLORS[props.eventType].text};
		border-radius: 50%;
		vertical-align: middle;
	}
`;
