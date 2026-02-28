// @/styles/pages/About/AboutTitle.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export { ContentSection } from '@/styles/common/Layout.style';

export const Title = styled.div`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.DISPLAY};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.GRAY600};

	line-height: 0.9;
	letter-spacing: -0.05em;
	text-align: left;
	text-transform: uppercase;
	margin-bottom: 2.5rem;

	span {
		display: inline-block;
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	.bottom-row {
		display: flex;
		align-items: flex-end;
		gap: 20px;
	}

	.subtitle-column {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding-bottom: 0.2em;
	}

	small {
		font-family: ${props => props.theme.FONT.SERIF};
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY400};

		text-transform: none;
		letter-spacing: -0.02em;
		line-height: 1.2;
		white-space: nowrap;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		margin-bottom: 1.5rem;

		.bottom-row {
			align-items: flex-start;
			flex-wrap: wrap;
			gap: 12px;
		}

		.subtitle-column {
			padding-bottom: 0;
			margin-top: 12px;
		}

		small {
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}
	}
`;

export const DescriptionBox = styled.div`
	font-family: ${props => props.theme.FONT.SANS};

	white-space: pre-line;
	word-break: keep-all;
	line-height: 1.6;

	.main-text {
		font-size: ${props => props.theme.FONT.SIZE.XL};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY700};
		margin-bottom: 0.8rem;
	}

	.highlight {
		font-family: ${props => props.theme.FONT.SERIF};
		font-size: ${props => props.theme.FONT.SIZE.MD};
		color: ${props => props.theme.COLOR.PRIMARY};
		vertical-align: middle;
		margin-left: 2px;
		margin-right: 4px;
	}

	.sub-text {
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY500};
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		.main-text {
			font-size: ${props => props.theme.FONT.SIZE.LG};
			margin-bottom: 0.5rem;
		}

		.highlight {
			font-size: ${props => props.theme.FONT.SIZE.MD};
		}

		.sub-text {
			font-size: ${props => props.theme.FONT.SIZE.SM};
			line-height: 1.3;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		.main-text {
			font-size: ${props => props.theme.FONT.SIZE.MD};
			margin-bottom: 0.5rem;
		}

		.highlight {
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}
	}
`;
