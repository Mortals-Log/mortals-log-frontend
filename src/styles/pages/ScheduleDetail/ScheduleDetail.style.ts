// @styles/pages/Schedule/ScheduleDetail.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

import * as L from '@styles/common/Layout.style';
export { SubTitle, Description, SectionTitle } from '@styles/common/Layout.style';

export const MainContainer = styled(L.MainContainer)`
	padding: 100px 20px;
`;

export const HeaderSection = styled.header`
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY200};
	padding-bottom: 1rem;
	margin-bottom: 2rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding-bottom: 0.5rem;
		margin-bottom: 1rem;
	}
`;

export const CategoryBadge = styled.span`
	display: inline-block;
	margin-bottom: 0.2rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.PRIMARY};

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;

export const MainTitle = styled.div<{ $ageLimit: boolean }>`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY700};

	line-height: 1.5;
	white-space: pre-wrap;
	word-break: keep-all;

	&::before {
		content: ${props => (props.$ageLimit ? '"🔞"' : '""')};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.H3};
	}
`;
