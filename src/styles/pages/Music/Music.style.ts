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

export const TabList = styled.nav`
	display: flex;
	justify-content: space-between;
	align-items: center;

	padding: 1.5rem 0;
	margin: 0;

	background-color: ${props => props.theme.COLOR.WHITE}cc;
	backdrop-filter: blur(15px);
	-webkit-backdrop-filter: blur(15px);
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY100}44;
`;

export const TabGroup = styled.ul`
	display: flex;
	gap: 0;
	margin: 0;
	padding: 0 3px;

	list-style: none;
	overflow-x: auto;
	white-space: nowrap;

	&::-webkit-scrollbar {
		display: none;
	}
	-ms-overflow-style: none;
	scrollbar-width: none;
`;

export const TabItem = styled.li<{ $isActive: boolean }>`
	position: relative;
	cursor: pointer;
	white-space: nowrap;
	margin-right: 1.5rem;
	transition: color 0.3s ease;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => (props.$isActive ? props.theme.COLOR.PRIMARY : props.theme.COLOR.GRAY400)};

	&::after {
		content: '';
		position: absolute;
		top: 0;
		right: -6px;

		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: ${props => props.theme.COLOR.PRIMARY};
		opacity: ${props => (props.$isActive ? 1 : 0)};
		transition: opacity 0.3s ease;
	}

	&:last-child {
		margin-right: 1rem;
	}

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
	}
`;
