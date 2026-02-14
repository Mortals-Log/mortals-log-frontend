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

export const TabGroup = styled.ul`
	display: flex;
	width: 100%;
	align-items: center;
	margin: 5rem 0 2rem 0;

	list-style: none;
	overflow-x: auto;
	white-space: nowrap;
`;

export const TabItem = styled.li<{ $isActive: boolean }>`
	flex: 1;
	display: flex;
	position: releative;
	justify-content: center;
	align-items: center;
	padding: 1rem;

	cursor: pointer;
	white-space: nowrap;
	transition: color 0.3s ease;

	border-top: 1.5px solid ${props => props.theme.COLOR.GRAY100};
	border-bottom: 2px solid ${props => (props.$isActive ? props.theme.COLOR.PRIMARY : props.theme.COLOR.GRAY400)};
	border-radius: 15px 15px 0 0;
	background-color: ${props => (props.$isActive ? props.theme.COLOR.WHITE : props.theme.COLOR.GRAY100)};

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => (props.$isActive ? props.theme.COLOR.PRIMARY : props.theme.COLOR.GRAY400)};

	&:hover {
		text-decoration: underline;
	}
`;
