// @styles/pages/Alubm/AlbumDetailMetaInfo

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@/styles/components/Table.style';
export { MoreButton } from '@/styles/components/Buttons.style';
export * from '@/styles/components/Badge.style';

import * as B from '@/styles/components/Badge.style';

export const BadgeGroup = styled(B.BadgeGroup)`
	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		order: 10;
		margin-top: 1rem;
	}
`;

export const ContentSection = styled.section`
	display: flex;
	gap: 3rem;
	padding: 2rem 0;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		padding: 0.5rem;
	}
`;

export const InfoWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const CoverImage = styled.img<{ $hasStore: boolean }>`
	width: 100%;
	max-width: ${props => (props.$hasStore ? '350px' : '280px')};
	aspect-ratio: 1/1;
	object-fit: cover;

	border-radius: 10px;
	box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		box-shadow: 0 15px 20px rgba(0, 0, 0, 0.1);
	}
`;

export const TypeWrap = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 0.8rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};

	.type {
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	.vol {
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY400};

		&::before {
			content: '|';
			margin-right: 8px;
			color: ${props => props.theme.COLOR.GRAY300};
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		gap: 4px;

		.vol {
			&::before {
				margin-right: 4px;
			}
		}
	}
`;

export const AlbumTitle = styled.div`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY700};
	margin-bottom: 0.3rem;
`;

export const MetaList = styled.dl`
	display: grid;
	grid-template-columns: 120px 1fr;
	row-gap: 0.8rem;
	margin: 1rem 0.5rem;
`;

export const Term = styled.dt`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};
`;

export const Description = styled.dd`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
`;
