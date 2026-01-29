// @styles/pages/Album/Album.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@styles/common/SectionTitle.style';

export const MainContainer = styled.main`
	max-width: 800px;
	margin: 0 auto;
	padding: 100px 20px;
`;

export const ContentSection = styled.section`
	margin-top: 5rem;
`;

export const Description = styled.div`
	margin-top: 1rem;
	margin-bottom: -2rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};

	line-height: 1.5;
	white-space: pre-wrap;
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
