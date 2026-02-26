// @styles/pages/Album/AlbumPromotionSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
export { ContentSection, SectionTitle } from '@/styles/common/Layout.style';

import { Link } from 'react-router-dom';
import * as B from '@/styles/components/Buttons.style';

export const ContentWrapper = styled.div`
	position: relative;
	display: flex;
	width: 100%;
	z-index: 2;
	align-items: center;
	padding: 2rem;
	gap: 3rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		flex-direction: column;
		text-align: center;
		padding: 1rem;
		gap: 1.5rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		flex-direction: column;
		text-align: center;
		padding: 1rem;
		gap: 1.2rem;
	}
`;

export const ImageArea = styled.div`
	flex: 1;
	display: flex;
	position: relative;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		justify-content: center;
		width: 100%;
		margin-bottom: 1rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		justify-content: center;
		width: 100%;
		margin-bottom: 1rem;
	}
`;

export const CoverImage = styled.img`
	width: 100%;
	max-width: 450px;
	aspect-ratio: 1/1;
	object-fit: cover;

	border-radius: 10px;
	box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		max-width: 380px;
		box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		box-shadow: 0 10px 15px rgba(0, 0, 0, 0.2);
	}
`;

export const InfoArea = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	font-family: ${props => props.theme.FONT.SANS};
	color: ${props => props.theme.COLOR.PRIMARY};

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		align-items: center;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		align-items: center;
	}
`;

export const Tag = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.LIGHT};
	color: ${props => props.theme.COLOR.PRIMARY};
	letter-spacing: 1px;
	margin-bottom: 0.7rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		margin-bottom: 0.4rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-bottom: 0.4rem;
	}
`;

export const Title = styled.div`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.PRIMARY};
	margin-bottom: 1rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		margin-bottom: 0.5rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-bottom: 0.5rem;
	}
`;

export const Info = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};
	margin-bottom: 1rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		margin-bottom: 0.5rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		margin-bottom: 0.5rem;
	}
`;

export const Description = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};

	line-height: 1.2;
	white-space: pre-wrap;
	word-break: keep-all;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		text-align: center;
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		text-align: center;
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;

export const TrackPreviewList = styled.ul`
	display: flex;
	flex-direction: column;
	list-style: none;
	gap: 0.8rem;
	margin: 1.2rem 0 1.5rem 0;
	padding: 0;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		gap: 0.5rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 0.5rem;
	}
`;

export const TrackItem = styled.li`
	display: flex;
	align-items: center;
	gap: 0.5rem;
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	color: ${props => props.theme.COLOR.PRIMARY};

	.number {
		font-size: ${props => props.theme.FONT.SIZE.SM};
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

	margin-top: 4px;
	padding-left: 1.6rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		padding-left: 0;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
		padding-left: 0;
	}
`;

export const ViewMoreButton = styled(B.ViewMoreButton.withComponent(Link))`
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
	z-index: 10;
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

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		top: 0.1rem;
		left: 0.1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		top: 0.1rem;
		left: 0.1rem;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
	}
`;
