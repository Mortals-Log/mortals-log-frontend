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

export const ContentSection = styled.section`
	margin-top: 2rem;
`;

export const ContentHeader = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
`;

export const ContentTitle = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
`;

export const TabGroup = styled.div`
	display: flex;
	gap: 1.5rem;
	margin: 1rem 0;
`;

export const TabButton = styled.button<{ isActive: boolean }>`
	position: relative;
	border: none;
	padding: 0;
	cursor: pointer;
	transition: color 0.2s ease;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => (props.isActive ? props.theme.COLOR.GRAY700 : props.theme.COLOR.GRAY300)};

	&:hover {
		color: ${props => props.theme.COLOR.GRAY700};
	}

	&::after {
		content: '';
		display: ${props => (props.isActive ? 'block' : 'none')};
		position: absolute;
		width: 100%;
		height: 2px;
		left: 0;
		bottom: -4px;
		background-color: ${props => props.theme.COLOR.GRAY700};
	}
`;

export const GuideWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 0.5rem;

	.guide-item {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		color: ${props => props.theme.COLOR.GRAY500};
		line-height: 1.2;
		white-space: nowrap;

		&::before {
			content: '* ';
			color: ${props => props.theme.COLOR.PRIMARY};
		}
	}
`;

export const Content = styled.div<{ isActive: boolean }>`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
	line-height: ${props => (props.isActive ? '2' : '1.8')};
	white-space: pre-wrap;
	word-break: break-all;
`;
