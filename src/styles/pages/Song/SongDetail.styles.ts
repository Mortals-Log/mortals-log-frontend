// @styles/pages/Song/SongDetail.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { LeadBadge as BaseLeadBadge } from '@styles/components/LeadBadge.style';
import { AdultBadge as BaseAdultBadge } from '@styles/components/AdultBadge.style';

export * from '@styles/common/SectionTitle.style';

export const LeadBadge = styled(BaseLeadBadge)`
	margin-left: 0px;
	margin-right: 5px;
`;

export const AdultBadge = styled(BaseAdultBadge)`
	margin-left: 0px;
	margin-right: 5px;
`;

export const MainContainer = styled.main`
	max-width: 800px;
	margin: 0 auto;
	padding: 100px 20px;
`;

export const HeaderSection = styled.section`
	margin-top: 0.5rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY200};
`;

export const ContentSection = styled.section`
	margin-top: 5rem;
`;

export const MainTitle = styled.h2`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.BLACK};
	margin-top: 0.5rem;
`;

export const SubTitle = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.PRIMARY};
	text-transform: uppercase;
`;

export const Description = styled.div`
	margin-top: 1rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};

	line-height: 1.5;
	white-space: pre-wrap;

	.type {
		&::after {
			content: ' | ';
			color: ${props => props.theme.COLOR.PRIMARY};
		}
	}

	.title {
		cursor: pointer;

		:hover {
			text-decoration: underline;
		}
	}
`;

export const CreditList = styled.div`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	padding-top: 1rem;
	gap: 1.5rem;

	.item {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY700};
		letter-spacing: 0.05rem;

		span {
			display: block;
			font-size: ${props => props.theme.FONT.SIZE.SM};
			font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
			color: ${props => props.theme.COLOR.GRAY500};
			margin-bottom: 0.3rem;
		}
	}
`;
