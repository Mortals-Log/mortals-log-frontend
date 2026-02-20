// @styles/pages/Song/SongDetailMeta.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@styles/components/MusicBadge.style';

export const MetaSection = styled.section`
	display: flex;
	flex-direction: column;
	gap: 1rem;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY200};
	padding: 1rem 0rem;

	@media (max-width: 850px) {
		padding-bottom: 0rem;
	}
`;

export const CreditList = styled.div`
	display: flex;
	align-items: flex-start;
	flex-wrap: wrap;
	gap: 1.5rem;
`;

export const ItemLabel = styled.div`
	display: block;
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};
	margin-bottom: 0.5rem;
`;

export const CreditItem = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
	letter-spacing: 0.05rem;
`;

export const StreamingSection = styled.div`
	display: block;
`;

export const SingingWrapper = styled.div`
	display: flex;
	gap: 0.5rem;
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
`;
