// @styles/pages/Profile.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const MainContainer = styled.main`
	max-width: 800px;
	margin: 0 auto;
	padding: 100px 20px;
`;

export const ProfileHeader = styled.section`
	display: flex;
	gap: 40px;
	align-items: flex-end;
	margin-bottom: 60px;

	@media (max-width: 800px) {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
`;

export const MainImage = styled.img`
	width: 30%;
	min-width: 240px;
	aspect-ratio: 3/4;
	object-fit: cover;
	border-radius: 4px;
`;

export const InfoSummary = styled.div`
	flex: 1;
`;

export const NameGroup = styled.div`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY600};
	margin-bottom: 1.5rem;

	h1 {
		font-family: ${props => props.theme.FONT.SERIF};
		font-size: ${props => props.theme.FONT.SIZE.H1};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.BLACK};
		margin-bottom: 1.2rem;
	}
`;

export const Description = styled.blockquote`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
	line-height: 1.5;
	white-space: pre-wrap;

	border-left: 3px solid ${props => props.theme.COLOR.PRIMARY};
	padding-left: 1rem;
	margin: 0.8rem 0;
`;

export const ContentSection = styled.section`
	margin-top: 5rem;
`;

export const ProfileTable = styled.table`
	width: 100%;
	border-collapse: collapse;
	font-family: ${props => props.theme.FONT.SANS};

	tr {
		border-bottom: 1px solid ${props => props.theme.COLOR.GRAY300};
	}

	th {
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		text-align: center;
		vertical-align: middle;
		padding: 16px 10px;
	}

	td {
		padding: 0;
		line-height: 1.5;
		vertical-align: middle;
	}

	@media (max-width: 480px) {
		th,
		td {
			display: block;
			width: 100%;
		}
	}
`;

export const LinkWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 0.5rem;
`;

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
		opacity: ${({ $isExpanded }) => ($isExpanded ? 0 : 1)};
		transition: opacity 0.3s ease;
	}
`;

export const TimelineYearGroup = styled.div`
	margin-bottom: 2rem;
`;

export const TimelineYearLabel = styled.h3`
	display: flex;
	position: relative;
	align-items: center;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.H3};
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
	align-items: center;
	padding: 1rem;

	gap: 1rem;
	transition: transform 0.2s ease;
`;

export const TimelineMarker = styled.div`
	width: 6px;
	height: 6px;
	border-radius: 50%;
	background: ${props => props.theme.COLOR.GRAY400};
`;

export const TimelineContent = styled.div`
	display: flex;
	gap: 1rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	color: ${props => props.theme.COLOR.GRAY600};
`;

export const TimelineDate = styled.span`
	min-width: 50px;
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
`;

export const TimelineText = styled.span`
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
`;

export const ArrowIcon = styled.span<{ $isExpanded: boolean }>`
	display: inline-block;
	font-size: ${props => props.theme.FONT.SIZE.XS};
	transition: transform 0.3s ease;
	transform: ${({ $isExpanded }) => ($isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const AlbumSliderContainer = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	margin-top: 20px;
	padding: 1rem;

	&:hover button {
		opacity: 1;
	}
`;

export const AlbumSlider = styled.div`
	display: flex;
	overflow-x: auto;
	gap: 20px;

	&::-webkit-scrollbar {
		display: none;
	}
`;

export const SliderNavButton = styled.button<{ $direction: 'left' | 'right' }>`
	position: absolute;
	top: 0;
	bottom: 0;
	${({ $direction }) => ($direction === 'left' ? 'left: 0;' : 'right: 0;')}

	width: 50px;
	height: 100%;
	z-index: 10;
	border: none;
	outline: none;
	cursor: pointer;

	background: transparent;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 0.4s ease;

	span {
		opacity: 0;

		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.H2};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY100};

		transition: all 0.3s ease;
		transform: ${({ $direction }) => ($direction === 'left' ? 'translateX(10px)' : 'translateX(-10px)')};
		text-shadow: 0 0 10px ${props => props.theme.COLOR.WHITE};
	}

	&:hover {
		background: ${({ $direction, theme }) =>
			$direction === 'left'
				? `linear-gradient(
				to right,
				${theme.COLOR.PRIMARY}C0 0%,
				${theme.COLOR.PRIMARY}00 100%
		  )`
				: `linear-gradient(
				to left,
				${theme.COLOR.PRIMARY}C0 0%,
				${theme.COLOR.PRIMARY}00 100%
		  )`};

		span {
			opacity: 1;
			transform: translateX(0);
		}
	}

	@media (max-width: 800px) {
		display: none;
	}
`;

export const AlbumCard = styled.div`
	display: flex;
	flex-direction: column;
	flex: 0 0 180px;
	scroll-snap-align: start;
	cursor: pointer;
	margin-bottom: 8px;

	&:hover img {
		transform: scale(1.05);
	}
`;

export const AlbumCover = styled.div`
	width: 100%;
	aspect-ratio: 1 / 1;
	overflow: hidden;
	border-radius: 10px;
	background-color: ${props => props.theme.COLOR.WHITE};
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.3s ease;
	}
`;

export const AlbumInfo = styled.div`
	margin-top: 12px;
	font-family: ${props => props.theme.FONT.SANS};

	.title {
		display: block;
		margin-bottom: 4px;

		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
		color: ${props => props.theme.COLOR.GRAY600};
	}

	.info {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY500};
	}
`;

export const ExternalIcon = styled.span`
	font-size: 1rem;
	margin-bottom: 2px;
`;
