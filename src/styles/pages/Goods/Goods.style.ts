//@/styles/pages/Goods/Goods.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
export {
	MainContainer,
	ContentSection,
	SectionTitle,
	MainTitle,
	SubTitle,
	Description,
} from '@/styles/common/Layout.style';

import * as B from '@/styles/components/Buttons.style';

export const LinkButton = styled(B.LinkButton)`
	width: 100%;

	&:not(:last-child) {
		margin-bottom: 0.5rem;
	}
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	padding-top: 1.5rem;
	gap: 1rem;

	@media ${props => props.theme.WINDOW_SIZE.laptop} {
		grid-template-columns: repeat(2, 1fr);
		gap: 0.5rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		grid-template-columns: 1fr;
	}
`;

export const CardButton = styled(B.CardButton)`
	.category {
		display: block;
		margin-bottom: 8px;
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.TINY};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY500};
		letter-spacing: 0.1em;

		@media ${props => props.theme.WINDOW_SIZE.tablet} {
			margin-bottom: 4px;
		}
	}

	.item {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
		color: ${props => props.theme.COLOR.BLACK};

		@media ${props => props.theme.WINDOW_SIZE.tablet} {
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}
	}
`;

export const GuideSection = styled.section`
	width: 100%;
	padding: 2rem;
	margin: 2rem 0;
	background-color: ${props => props.theme.COLOR.GRAY100};
	border: 1px dashed ${props => props.theme.COLOR.GRAY300};
	border-radius: 10px;

	.title {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.LG};
		font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
		color: ${props => props.theme.COLOR.BLACK};
		white-space: pre-wrap;
		word-break: keep-all;

		margin-bottom: 2rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		padding: 1.5rem;
		margin: 1rem 0;

		.title {
			margin-bottom: 1rem;
			font-size: ${props => props.theme.FONT.SIZE.MD};
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin: 1.5rem 0;
	}
`;

export const GuideItem = styled.li`
	display: flex;
	align-items: flex-start;
	margin-bottom: 0.8rem;
	line-height: 1.8;
	gap: 10px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY700};

	white-space: pre-wrap;
	word-break: keep-all;

	&::before {
		content: '•';
		flex-shrink: 0;
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		line-height: 1.6;
		gap: 4px;
		margin-bottom: 0.6rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 8px;
	}
`;

export const GuideSlogan = styled.div`
	padding: 2rem;
	margin: 2rem 0;
	border-radius: 10px;
	border: 1px dashed ${props => props.theme.COLOR.PRIMARY};

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.GRAY700};

	text-align: center;
	line-height: 1.6;
	word-break: keep-all;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		padding: 1.5rem;
		margin: 1.2rem 0;
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin: 1rem 0;
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;
