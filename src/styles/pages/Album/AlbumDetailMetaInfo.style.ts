// @styles/pages/Alubm/AlbumDetailMetaInfo

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@/styles/components/Table.style';
export * from '@/styles/components/Buttons.style';

export const ContentSection = styled.section`
	display: flex;
	gap: 3rem;
	padding: 2rem 0;

	@media (max-width: 850px) {
		flex-direction: column;
		align-items: center;
		gap: 2rem;
		padding: 0.5rem;
	}
`;

export const CoverImage = styled.img<{ hasStore: boolean }>`
	width: 100%;
	max-width: ${props => (props.hasStore ? '350px' : '280px')};
	aspect-ratio: 1/1;
	object-fit: cover;

	border-radius: 10px;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

	@media (max-width: 850px) {
		box-shadow: 0 15px 20px rgba(0, 0, 0, 0.1);
	}
`;

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
		width: 100%;
		height: 2.8rem;

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

export const TypeWrap = styled.div`
	display: flex;
	align-items: center;
	gap: 8px;
	margin-bottom: 0.8rem;

	font-size: ${props => props.theme.FONT.SIZE.MD};
`;

export const AlbumId = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.PRIMARY};
`;

export const VolText = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY400};

	&::before {
		content: '|';
		margin-right: 8px;
		color: ${props => props.theme.COLOR.GRAY300};
	}
`;

export const InfoWrapper = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

export const MainTitle = styled.h1`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.BLACK};
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
