// @styles/pages/Album/AlbumPromotionSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ViewMoreButton } from '@/styles/components/Buttons.style';

export * from '@styles/pages/Album/Album.style';

export const ContentWrapper = styled.div`
	position: relative;
	display: flex;
	z-index: 2;
	align-items: center;

	width: 100%;
	max-width: 1200px;

	gap: 3rem;
	padding: 2rem;

	@media (max-width: 850px) {
		flex-direction: column;
		text-align: center;
		gap: 1.5rem;
	}
`;

export const ImageArea = styled.div`
	flex: 1;
	display: flex;

	@media (max-width: 850px) {
		justify-content: center;
		width: 100%;
	}
`;

export const CoverImage = styled.img`
	width: 100%;
	max-width: 450px;
	aspect-ratio: 1/1;
	object-fit: cover;

	border-radius: 10px;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`;

export const InfoArea = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	@media (max-width: 850px) {
		align-items: center;
	}
`;

export const Tag = styled.span`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.LIGHT};
	color: ${props => props.theme.COLOR.PRIMARY};
	letter-spacing: 1px;
`;

export const Title = styled.h2`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.PRIMARY};
	margin-top: 0.7rem;
	margin-bottom: 1rem;
`;

export const Info = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};
	margin-bottom: 1rem;
`;

export const Description = styled.p`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};

	line-height: 1.2;
	word-break: keep-all;

	@media (max-width: 850px) {
		text-align: center;
	}
`;

export const TrackPreviewList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	gap: 0.8rem;
	margin: 1.2rem 0 2rem 0;
	padding: 0;
`;

export const TrackItem = styled.li`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	color: ${props => props.theme.COLOR.PRIMARY};

	.number {
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	}

	.name {
		letter-spacing: 0.05rem;
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	}
`;

export const MoreText = styled.span`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};

	margin-top: 0.2rem;
	padding-left: 1.6rem;
`;

export const PromotionLinkButton = styled(ViewMoreButton.withComponent(Link))`
	display: inline-block;
	text-decoration: none;
	border-radius: 10px;

	&::after {
		content: '→';
		animation: none;
	}
`;

export const DDayBadge = styled.div`
	position: absolute;
	top: 1rem;
	left: 1rem;
	padding: 0.8rem;
	border-radius: 10px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
	background: ${props => props.theme.COLOR.PRIMARY};

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.WHITE};
`;
