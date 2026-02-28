// @/styles/pages/Profile/ProfileCareerSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
export { ContentSection, SectionTitle } from '@/styles/common/Layout.style';

export { ExpandButton } from '@/styles/components/Buttons.style';
export { ArrowIcon } from '@/styles/common/ArrowIcon.style';

export const TimelineContainer = styled.div<{ $isExpanded: boolean }>`
	position: relative;
	padding: 2rem 1rem 0rem 1rem;

	&::after {
		content: '';
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100px;
		background: linear-gradient(to bottom, transparent, ${props => props.theme.COLOR.WHITE});
		pointer-events: none;
		opacity: ${props => (props.$isExpanded ? 0 : 1)};
		transition: opacity 0.3s ease;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		padding: 1.5rem 0.8rem 0rem 0.8rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 1.5rem 0.5rem 0rem 0.5rem;

		&::after {
			height: 80px;
		}
	}
`;

export const TimelineYearGroup = styled.div`
	margin-bottom: 2rem;

	.year-label {
		display: flex;
		position: relative;
		align-items: center;

		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.XL};
		font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
		color: ${props => props.theme.COLOR.GRAY700};

		margin-bottom: 1rem;
		gap: 1rem;

		&::before {
			content: '';
			width: 12px;
			height: 12px;
			border-radius: 50%;
			background: ${props => props.theme.COLOR.PRIMARY};

			@media ${props => props.theme.WINDOW_SIZE.tablet} {
				width: 8px;
				height: 8px;
			}

			@media ${props => props.theme.WINDOW_SIZE.mobile} {
				width: 8px;
				height: 8px;
			}
		}

		@media ${props => props.theme.WINDOW_SIZE.tablet} {
			margin-bottom: 0;
			gap: 0.8rem;
			font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
		}

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			gap: 0.5rem;
		}
	}
`;

export const TimelineItemList = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 1rem;
`;

export const TimelineItem = styled.div`
	position: relative;
	display: flex;
	align-items: flex-start;
	gap: 0.8rem;
	padding: 0.7rem 1rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	color: ${props => props.theme.COLOR.GRAY600};

	line-height: 1.5;
	word-break: keep-all;
	transition: transform 0.2s ease;

	&::before {
		content: '';
		width: 6px;
		height: 6px;
		border-radius: 50%;
		margin-top: 0.55rem;
		flex-shrink: 0;
		background: ${props => props.theme.COLOR.GRAY400};
	}

	.date {
		min-width: 50px;
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
		flex-shrink: 0;
	}

	.content {
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		gap: 0.8rem;
		padding: 0.5rem 1rem;

		&::before {
			margin-top: 0.5rem;
		}

		.date {
			min-width: 42px;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 0.75rem;
		padding: 0.5rem 0.2rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};

		&::before {
			width: 4px;
			height: 4px;
			margin-top: 0.5rem;
		}
	}
`;
