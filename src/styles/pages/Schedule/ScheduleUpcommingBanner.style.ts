// @/styles/pages/Schedule/ScheduleUpcommingBanner

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { Schedule } from '@/types/schedule';
import { SCHEDULE_TYPE_COLORS } from '@/const/schedule';

export { ContentSection, SectionTitle } from '@styles/common/Layout.style';

export const SliderContainer = styled.div`
	display: flex;
	overflow-x: auto;
	gap: 12px;
	margin-top: 1rem;

	scroll-snap-type: x mandatory;
	scroll-behavior: smooth;
	-webkit-overflow-scrolling: touch;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const BannerItem = styled.div<{ $eventType: Schedule['type']; $dDay: number }>`
	display: flex;
	position: relative;
	width: 18rem;
	min-height: 6rem;
	padding: 1.5rem 1rem;

	align-items: center;
	scroll-snap-align: start;
	flex-shrink: 0;

	border-radius: 8px;
	border: 1.3px solid ${props => (props.$dDay == 0 ? props.theme.COLOR.PRIMARY : props.theme.COLOR.GRAY100)};
	transition: all 0.15s ease-in-out;
	cursor: pointer;

	font-family: ${props => props.theme.FONT.SANS};

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		width: 15rem;
		min-height: 5rem;
		padding: 1.4rem 0.8rem;
	}

	.info {
		.dDay {
			font-size: ${props => props.theme.FONT.SIZE.MD};
			font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
			color: ${props => props.theme.COLOR.PRIMARY};

			@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
				font-size: ${props => props.theme.FONT.SIZE.SM};
			}
		}
		.date {
			margin-left: 0.5rem;
			text-transform: uppercase;
			font-size: ${props => props.theme.FONT.SIZE.SM};
			font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
			color: ${props => props.theme.COLOR.GRAY600};
		}
		.type {
			margin-left: 0.5rem;
			font-size: ${props => props.theme.FONT.SIZE.XS};
			font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
			color: ${props => props.theme.COLOR.GRAY500};
		}
		.content {
			font-size: ${props => props.theme.FONT.SIZE.SM};
			font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
			color: ${props => props.theme.COLOR.GRAY700};
			margin-top: 0.3rem;
			gap: 2px;
			line-height: 1.4;
			letter-spacing: -0.01em;
		}
	}

	&:hover {
		border: 1.3px solid ${props => SCHEDULE_TYPE_COLORS[props.$eventType].text + '33'};
		background-color: ${props => SCHEDULE_TYPE_COLORS[props.$eventType].bg + '66'};
	}
`;
