// @styles/pages/Song/SongDetailHeader.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

import { LeadBadge as BaseLeadBadge } from '@styles/components/LeadBadge.style';
import { AdultBadge as BaseAdultBadge } from '@styles/components/AdultBadge.style';

export { MainTitle } from '@styles/pages/Song/SongDetail.styles';
export const LeadBadge = styled(BaseLeadBadge)`
	margin-left: 0px;
	margin-right: 5px;
`;

export const AdultBadge = styled(BaseAdultBadge)`
	margin-left: 0px;
	margin-right: 5px;
`;

export const HeaderSection = styled.section`
	margin-top: 0.5rem;
	padding-bottom: 1rem;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY200};
`;

export const SubTitle = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.PRIMARY};
	text-transform: uppercase;
`;

export const OriginalLinkGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-top: 0.8rem;
	margin-bottom: 0.4rem;
`;

export const OriginalLink = styled.button`
	display: inline;
	padding: 0.4rem 0.8rem;

	background: ${props => props.theme.COLOR.GRAY50};
	border: 1px solid ${props => props.theme.COLOR.GRAY300};
	border-radius: 4px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};

	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: ${props => props.theme.COLOR.PRIMARY};
		border-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
	}
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
