// @styles/pages/Schedule/ScheduleCalandarAgenda.style

/* eslint-disable storybook/default-exports */

export * from '@styles/components/Badge.style';

import styled from '@emotion/styled';
import { SCHEDULE_TYPE_COLORS } from '@/const/schedule';
import { Schedule } from '@/types/schedule';

export const AgendaSection = styled.div`
	margin-top: 1rem;
	padding-top: 1.5rem;
	border-top: 1px solid ${props => props.theme.COLOR.GRAY100};
`;

export const AgendaHeader = styled.div`
	margin-bottom: 1rem;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.MD};
	}
`;

export const AgendaList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

export const AgendaItem = styled.div<{ $eventType: Schedule['type'] }>`
	display: flex;
	align-items: center;
	padding: 1.3rem 1rem;
	border-radius: 10px;
	background: ${props => props.theme.COLOR.GRAY50};
	cursor: pointer;

	border-left: 4px solid ${props => SCHEDULE_TYPE_COLORS[props.$eventType].text};
	transition: all 0.2s ease;

	&:hover {
		background: ${props => SCHEDULE_TYPE_COLORS[props.$eventType].bg};
	}
`;

export const ItemContentGroup = styled.div`
	flex: 1;
	display: flex;
	gap: 8px;

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 4px;
	}
`;

export const ContentText = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};

	white-space: pre-wrap;
	word-break: keep-all;
	line-height: 1.6;

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		line-height: 1.4;
	}
`;

export const TimeTag = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY600};

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;
