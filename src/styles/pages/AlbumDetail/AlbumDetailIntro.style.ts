// @styles/pages/Alubm/AlbumDetailIntro.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import * as L from '@/styles/common/Layout.style';

export * from '@/styles/common/ArrowIcon.style';
export { SectionTitle } from '@/styles/common/Layout.style';
export { ExpandButton } from '@/styles/components/Buttons.style';

export const ContentSection = styled(L.ContentSection)`
	margin-top: 3rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		margin-top: 2.5rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-top: 1.5rem;
	}
`;

export const IntroContainer = styled.div<{ $isExpanded: boolean }>`
	position: relative;
	padding: 1rem 1rem;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 80px;
		background: linear-gradient(to bottom, transparent, ${props => props.theme.COLOR.WHITE});
		pointer-events: none;
		opacity: ${props => (props.$isExpanded ? 0 : 1)};
		transition: opacity 0.5s ease;
	}

	.text {
		max-height: ${props => (props.$isExpanded ? '' : '300px')};

		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY600};
		line-height: 1.8;
		white-space: pre-wrap;
		word-break: keep-all;

		overflow: hidden;
		transition: max-height 0.2s ease;

		@media ${props => props.theme.WINDOW_SIZE.tablet} {
			max-height: ${props => (props.$isExpanded ? '' : '250px')};
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			max-height: ${props => (props.$isExpanded ? '' : '230px')};
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}
	}
`;
