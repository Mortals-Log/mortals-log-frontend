// @styles/pages/Song/SongDetailMeta.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@/styles/components/Badge.style';

export const MetaSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY200};
	padding: 1rem 0rem;
`;

export const CreditList = styled.div`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 1.5rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		gap: 1.3rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 1.2rem;
	}
`;

export const ItemLabel = styled.div`
	display: block;
	flex-direction: column;
	min-width: fit-content;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};
	margin-bottom: 0.5rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;

export const CreditItem = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
	letter-spacing: 0.05rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;

export const StreamingSection = styled.div`
	display: block;
`;

export const SingingWrapper = styled.div`
	display: flex;
	gap: 0.5rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 0.3rem;
	}
`;

export const SingingBadge = styled.div<{ brand: 'TJ' | 'KY' }>`
	display: flex;
	align-items: center;
	border: 0.5px solid ${props => props.theme.COLOR.GRAY200};
	border-radius: 4px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	color: ${props => props.theme.COLOR.GRAY700};

	.brand {
		padding: 0.2rem 0.5rem;
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		background-color: ${props => props.theme.COLOR[props.brand]};
		color: ${props => props.theme.COLOR.WHITE};
		border-radius: 4px 0px 0px 4px;
	}

	.number {
		padding: 0.2rem 0.4rem;
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY700};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;
