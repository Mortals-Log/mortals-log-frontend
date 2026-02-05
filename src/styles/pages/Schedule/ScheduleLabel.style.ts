// @styles/pages/Schedule/ScheduleLabel.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { SCHEDULE_TYPE_COLORS } from '@/const/schedule';
import { Schedule } from '@/types/schedule';

export const LabelContainer = styled.div`
	display: flex;
	width: fit-content;
	align-items: center;
	padding: 0.5rem 1rem;
	margin-top: 0.5rem;
	margin-left: auto;

	gap: 12px;
	flex-wrap: wrap;

	background-color: ${props => props.theme.COLOR.WHITE};
	border: 1px solid ${props => props.theme.COLOR.GRAY100};
	border-radius: 10px;
`;

export const LabelList = styled.ul`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

export const LabelItem = styled.li<{ eventType: Schedule['type'] }>`
	display: flex;
	align-items: center;
	gap: 6px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => SCHEDULE_TYPE_COLORS[props.eventType].text};
	white-space: nowrap;
`;

export const LabelBadge = styled.div<{ eventType: Schedule['type'] }>`
	width: 10px;
	height: 10px;
	border-radius: 2px;
	flex-shrink: 0;
	background-color: ${props => SCHEDULE_TYPE_COLORS[props.eventType].bg};
`;
