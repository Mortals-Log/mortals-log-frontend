//@styles/pages/Goods/GoodsGuideSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@styles/pages/Goods/Goods.style';
export * from '@/styles/components/Buttons.style';
export * from '@styles/common/SectionTitle.style';

export const GuideSection = styled.section`
	padding: 2rem;
	margin: 2rem 0;
	background-color: ${props => props.theme.COLOR.GRAY100};
	border-radius: 10px;
	border: 1px dashed ${props => props.theme.COLOR.GRAY300};
`;

export const GuideTitle = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
	color: ${props => props.theme.COLOR.BLACK};
`;

export const GuideList = styled.ul`
	list-style: none;
	padding: 0;
	margin-top: 2rem;
`;

export const GuideItem = styled.li`
	display: flex;
	margin-bottom: 0.8rem;
	line-height: 1.8;
	gap: 10px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY800};

	&::before {
		content: '•';
		line-height: 1.8;
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
		color: ${props => props.theme.COLOR.PRIMARY};
	}
`;

export const ButtonGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 10px;
	margin-top: 2rem;
`;
