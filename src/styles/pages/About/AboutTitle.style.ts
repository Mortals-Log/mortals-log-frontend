// @styles/pages/About/AboutTitle.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const ContentSection = styled.section`
	display: flex;
	width: 100%;
	flex-direction: column;
	justify-content: start;
	padding: 3rem 6rem;

	@media (max-width: 1200px) {
		padding: 3rem;
	}

	@media (max-width: 850px) {
		padding: 1rem;
	}
`;

export const Title = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.DISPLAY};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.GRAY600};

	line-height: 0.9;
	letter-spacing: -0.05em;
	text-align: left;
	margin-bottom: 1.5rem;
	text-transform: uppercase;

	.bottom-row {
		display: flex;
		align-items: flex-end;
		gap: 20px;
	}

	span {
		display: inline-block;
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	.subtitle-column {
		display: flex;
		flex-direction: column;
		gap: 2px;
		padding-bottom: 0.1em;
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
`;

export const DescriptionBox = styled.div`
	font-family: ${props => props.theme.FONT.SANS};

	white-space: pre-line;
	word-break: keep-all;
	line-height: 1.5;

	.main-text {
		font-size: ${props => props.theme.FONT.SIZE.XL};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY800};

		margin-bottom: 1.5rem;

		.highlight {
			font-size: ${props => props.theme.FONT.SIZE.MD};
			color: ${props => props.theme.COLOR.PRIMARY};
		}
	}

	.sub-text {
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY500};
	}
`;
