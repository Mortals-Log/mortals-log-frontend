// @styles/pages/Profile.style.ts

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const MainContainer = styled.main`
	max-width: 800px;
	margin: 0 auto;
	padding: 100px 20px;
`;

export const ProfileHeader = styled.section`
	display: flex;
	gap: 40px;
	align-items: flex-end;
	margin-bottom: 60px;

	@media (max-width: 800px) {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
`;

export const MainImage = styled.img`
	width: 30%;
	min-width: 240px;
	aspect-ratio: 3/4;
	object-fit: cover;
	border-radius: 4px;
`;

export const InfoSummary = styled.div`
	flex: 1;
`;

export const NameGroup = styled.div`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY600};
	margin-bottom: 1.5rem;

	h1 {
		font-family: ${props => props.theme.FONT.SERIF};
		font-size: ${props => props.theme.FONT.SIZE.H1};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.BLACK};
		margin-bottom: 1.2rem;
	}
`;

export const Description = styled.blockquote`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
	line-height: 1.5;
	white-space: pre-wrap;

	border-left: 3px solid ${props => props.theme.COLOR.PRIMARY};
	padding-left: 1rem;
	margin: 0.8rem 0;
`;

export const ContentSection = styled.section`
	margin-top: 5rem;
`;

export const SectionTitle = styled.h3`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H3};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};

	border-bottom: 2px solid ${props => props.theme.COLOR.PRIMARY};
	padding-bottom: 1rem;
	letter-spacing: 2px;

	span {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY500};

		text-transform: uppercase;
		letter-spacing: 1.5px;
	}
`;

export const ProfileTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	font-family: ${props => props.theme.FONT.SANS};

	tr {
		border-bottom: 1px solid ${props => props.theme.COLOR.GRAY300};
	}

	th {
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		text-align: center;
		vertical-align: middle;
		padding: 16px 10px;
	}

	td {
		padding: 0;
		line-height: 1.5;
		vertical-align: middle;
	}

	@media (max-width: 480px) {
		th,
		td {
			display: block;
			width: 100%;
		}
	}
`;

export const LinkWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
`;

export const LinkButton = styled.a`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 0.8rem 1rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};

	background: ${props => props.theme.COLOR.WHITE};
	border: 1px solid ${props => props.theme.COLOR.GRAY200};
	border-radius: 5px;

	text-decoration: none;
	transition: all 0.2s ease;

	svg {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	&:hover {
		background: ${props => props.theme.COLOR.PRIMARY};
		border-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
		transform: translateY(-1px);
	}
`;

export const TimelineContainer = styled.div`
	position: relative;
	padding: 2rem;
`;

export const TimelineYearGroup = styled.div`
	margin-bottom: 2rem;
`;

export const TimelineYearLabel = styled.h3`
	display: flex;
	position: relative;
	align-items: center;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.H3};
	font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
	color: ${props => props.theme.COLOR.GRAY700};

	margin-bottom: 1rem;
	gap: 1rem;

	&::before {
		content: '';
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: ${props => props.theme.COLOR.PRIMARY};
	}
`;

export const TimelineItemList = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
`;

export const TimelineItem = styled.div`
	position: relative;
	display: flex;
	align-items: center;
	padding: 1rem;

	gap: 1rem;
	transition: transform 0.2s ease;
`;

export const TimelineMarker = styled.div`
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: ${props => props.theme.COLOR.GRAY400};
`;

export const TimelineContent = styled.div`
	display: flex;
	gap: 1rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	color: ${props => props.theme.COLOR.GRAY600};
`;

export const TimelineDate = styled.span`
	min-width: 50px;
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
`;

export const TimelineText = styled.span`
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
`;
