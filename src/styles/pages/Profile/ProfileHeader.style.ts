// @styles/pages/Profile.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@styles/components/SourceLink.style';
export * from '@styles/common/VerticalBar.style';

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
