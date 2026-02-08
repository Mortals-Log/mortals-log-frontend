// @styles/pages/Schedule/ScheduleDetail.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@styles/pages/Schedule/Schedule.style';

export const HeaderSection = styled.header`
	margin-bottom: 48px;
	border-bottom: 1px solid ${({ theme }) => theme.COLOR.border || '#eee'};
	padding-bottom: 32px;
`;

export const CategoryBadge = styled.span<{ $type?: string }>`
	display: inline-block;
	margin-bottom: 0.5rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.PRIMARY};
`;

export const MainTitle = styled.h2`
	margin-bottom: 8px;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRA700};

	line-height: 1.5;
	white-space: pre-wrap;
	word-break: keep-all;
`;

export const DateInfo = styled.div`
	display: flex;
	align-items: center;
	gap: 12px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY600};

	.time {
		display: flex;
		align-items: center;

		&::before {
			content: '';
			display: inline-block;
			width: 1.2px;
			height: ${props => props.theme.FONT.SIZE.MD};
			background: ${props => props.theme.COLOR.GRAY400};
			margin-right: 12px;
		}
	}
`;
