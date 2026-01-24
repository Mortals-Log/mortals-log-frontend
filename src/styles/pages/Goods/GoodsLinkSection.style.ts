//@styles/pages/Goods/GoodsGuideSection.style

/* eslint-disable storybook/default-exports */

export * from '@styles/pages/Goods/Goods.style';
export * from '@/styles/components/Buttons.style';
export * from '@styles/common/SectionTitle.style';

import styled from '@emotion/styled';

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	padding-top: 2rem;
	gap: 20px;

	@media (max-width: 1200px) {
		grid-template-columns: repeat(2, 1fr);
	}

	@media (max-width: 850px) {
		grid-template-columns: 1fr;
	}
`;

export const CategoryLabel = styled.span`
	margin-bottom: 8px;
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.TINY};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY500};
	letter-spacing: 0.15em;
`;

export const ItemLabel = styled.strong`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
	color: ${props => props.theme.COLOR.BLACK};
`;
