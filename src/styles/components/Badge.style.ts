// @styles/components/LeadBadge.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const BadgeGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.3rem;
	margin-bottom: 1rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 0.2rem;
		margin-bottom: 1rem;
	}
`;

const BaseBadge = styled.span`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	padding: 4px 6px;
	border-radius: 4px;
	flex-shrink: 0;
	white-space: nowrap;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.TINY};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	letter-spacing: 0.02em;
`;

export const LeadBadge = styled(BaseBadge)`
	background-color: ${props => props.theme.COLOR.PRIMARY};
	color: ${props => props.theme.COLOR.WHITE};
`;

export const AdultBadge = styled(BaseBadge)`
	border: 1px solid ${props => props.theme.COLOR.PRIMARY};
	background-color: ${props => props.theme.COLOR.PRIMARY + '33'};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	color: ${props => props.theme.COLOR.PRIMARY};
`;

export const ChordBadge = styled(LeadBadge)`
	background-color: ${props => props.theme.COLOR.GRAY700};
`;

export const SingingBadge = styled(LeadBadge)<{ brand: 'TJ' | 'KY' }>`
	background-color: ${props => props.theme.COLOR[props.brand]};
`;

export const MVBadge = styled(LeadBadge)`
	background-color: ${props => props.theme.COLOR.YELLOW600};
	color: ${props => props.theme.COLOR.GRAY700};
`;

export const MusicBadge = styled.a`
	display: flex;
	align-items: center;
	justify-content: center;

	width: 36px;
	height: 36px;

	color: ${props => props.theme.COLOR.GRAY700};
	background: ${props => props.theme.COLOR.WHITE};
	border: 1px solid ${props => props.theme.COLOR.GRAY200};
	border-radius: 8px;

	transition: all 0.3s ease-in-out;

	svg {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
	}

	span {
		display: none;

		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: currentColor;
	}

	&:hover {
		background: ${props => props.theme.COLOR.PRIMARY};
		border-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
	}

	&:active {
		background: ${props => props.theme.COLOR.PRIMARY};
		border-color: ${props => props.theme.COLOR.PRIMARY};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		width: fit-content;
		height: 2.8rem;
		padding: 1rem;

		span {
			display: inline;
			margin-left: 0.5rem;
		}
	}
`;
