// @styles/pages/About/AboutPolicySection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
export { ContentSection, SectionTitle } from '@/styles/common/Layout.style';

export const PolicyItem = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 20px;
	padding: 1rem 0;
	border-top: 1px solid ${props => props.theme.COLOR.GRAY200};

	white-space: pre-line;
	word-break: keep-all;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};

	&:first-of-type {
		border-top: none;
	}

	.label {
		display: felx;
		flex: 0 0 120px;
		text-align: center;
		justify-content: center;

		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.PRIMARY};
		letter-spacing: 0.05em;
		text-transform: uppercase;
		padding-top: 0.2rem;

		@media ${props => props.theme.WINDOW_SIZE.tablet} {
			padding-left: 1rem;
		}

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			text-align: left;
		}
	}

	.content {
		line-height: 1.7;
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY600};

		@media ${props => props.theme.WINDOW_SIZE.tablet} {
			line-height: 1.6;
		}

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			line-height: 1.6;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		flex-direction: column;
		gap: 8px;
		padding: 0.8rem 0.3rem;

		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;
