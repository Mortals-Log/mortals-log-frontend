// @/styles/pages/Song/SongDetailHeader.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@/styles/components/Badge.style';
export { SubTitle } from '@/styles/common/Layout.style';

import * as B from '@/styles/components/Badge.style';
import * as L from '@/styles/common/Layout.style';

export const BadgeGroup = styled(B.BadgeGroup)`
	display: inline-flex;
	margin-right: 0.3rem;
	margin-bottom: 0;
`;

export const MainTitle = styled(L.MainTitle)`
	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-top: 0;
	}
`;

export const HeaderSection = styled.section`
	margin-top: 0.5rem;
	padding-bottom: 0.8rem;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY200};

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding-bottom: 0.5rem;
	}
`;

export const OriginalLinkGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.3rem;
	margin-top: 0.5rem;
`;

export const OriginalLink = styled.button`
	display: inline;
	padding: 0.4rem 0.6rem;

	background: ${props => props.theme.COLOR.GRAY50};
	border: 1px solid ${props => props.theme.COLOR.GRAY300};
	border-radius: 4px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};

	cursor: pointer;
	transition: all 0.2s ease;

	&:hover {
		background: ${props => props.theme.COLOR.PRIMARY};
		border-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;

export const Description = styled.div`
	margin-top: 0.5rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};

	line-height: 1.6;
	white-space: pre-wrap;

	.type {
		&::after {
			content: '|';
			margin: 0 0.2rem;
			color: ${props => props.theme.COLOR.PRIMARY};
			opacity: 0.6;
		}
	}

	.album {
		cursor: pointer;
		transition: color 0.2s ease;

		&:hover {
			color: ${props => props.theme.COLOR.PRIMARY};
			text-decoration: underline;
			text-underline-offset: 2px;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;
