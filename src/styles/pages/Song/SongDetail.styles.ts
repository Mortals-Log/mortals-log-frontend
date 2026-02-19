// @styles/pages/Song/SongDetail.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { LeadBadge as BaseLeadBadge } from '@styles/components/LeadBadge.style';
import { AdultBadge as BaseAdultBadge } from '@styles/components/AdultBadge.style';

export * from '@styles/common/SectionTitle.style';
export * from '@styles/components/MusicBadge.style';

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
	margin-top: 1rem;
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

export const MetaSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY200};
	padding: 1rem 0rem;

	@media (max-width: 850px) {
		padding-bottom: 0rem;
	}
`;

export const CreditList = styled.div`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 1.5rem;
`;

export const ItemLabel = styled.div`
	display: block;
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};
	margin-bottom: 0.5rem;
`;

export const CreditItem = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
	letter-spacing: 0.05rem;
`;

export const StreamingSection = styled.div`
	display: block;
`;

export const ContentTitle = styled.div`
	display: block;
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};
	margin: 1rem 0rem;
`;

export const LyricsText = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
	line-height: 2;
	white-space: pre-wrap;
	word-break: break-all;
`;

export const ChordHeader = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 1.5rem;

	.guide-item {
		display: flex;
		align-items: center;
		gap: 0.4rem;

		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY500};
	}
`;

export const Chord = styled.pre`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
	line-height: 1.5;
	white-space: pre-wrap;
	word-break: break-all;
`;
