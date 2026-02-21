// @styles/components/MusicBadge.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const BadgeGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
	margin-bottom: 1rem;

	@media (max-width: 850px) {
		gap: 0.8rem;
		margin-bottom: 2rem;
	}
`;

export const MusicBadge = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 32px;
	height: 32px;

	color: ${props => props.theme.COLOR.GRAY700};
	background: ${props => props.theme.COLOR.WHITE};
	border: 1px solid ${props => props.theme.COLOR.GRAY200};
	border-radius: 8px;

	transition: all 0.3s ease-in-out;

	svg {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	span {
		display: none;

		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: currentColor;
	}

	@media (max-width: 850px) {
		width: fit-content;
		height: 2.8rem;
		padding: 1rem;

		span {
			display: inline;
			margin-left: 0.5rem;
		}
	}

	&:hover {
		background: ${props => props.theme.COLOR.PRIMARY};
		border-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
		transform: translateY(-1px);
	}
`;
