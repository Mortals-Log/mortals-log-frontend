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

	span {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY600};
	}
`;

export const LabelList = styled.ul`
	display: flex;
	align-items: center;
	gap: 1rem;
`;

export const LabelItem = styled.li<{ eventType?: Schedule['type']; isActive: boolean }>`
	display: flex;
	align-items: center;
	gap: 6px;
	opacity: ${props => (props.isActive ? 1 : 0.3)};
	filter: ${props => (props.isActive ? 'none' : 'grayscale(100%)')};
	cursor: pointer;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => (props.eventType ? SCHEDULE_TYPE_COLORS[props.eventType].text : props.theme.COLOR.PRIMARY)};
	white-space: nowrap;

	&::before {
		content: '';
		width: 10px;
		height: 10px;
		border-radius: 2px;
		flex-shrink: 0;
		background-color: ${props =>
			props.eventType ? SCHEDULE_TYPE_COLORS[props.eventType].bg : props.theme.COLOR.PRIMARY};
	}
`;
