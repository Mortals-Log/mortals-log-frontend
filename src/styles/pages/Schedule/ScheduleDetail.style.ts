// @styles/pages/Schedule/ScheduleDetail.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@styles/pages/Schedule/Schedule.style';
export * from '@styles/components/Buttons.style';

export const HeaderSection = styled.header`
	margin-bottom: 48px;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY200};
	padding-bottom: 2rem;
`;

export const CategoryBadge = styled.span`
	display: inline-block;
	margin-bottom: 0.5rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.PRIMARY};
`;

export const MainTitle = styled.h2<{ ageLimit: boolean }>`
	margin-bottom: 8px;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H2};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRA700};

	line-height: 1.5;
	white-space: pre-wrap;
	word-break: keep-all;

	&::before {
		content: ${props => (props.ageLimit ? '"🔞"' : '""')};
	}
`;

export const MainSection = styled.div`
	display: flex;
	gap: 60px;
	align-items: center;

	@media (max-width: 850px) {
		flex-direction: column;
		align-items: center;
		gap: 40px;
	}
`;

export const ImageWrapper = styled.div`
	flex: 0 0 400px;
	overflow: hidden;
	margin: 0 auto;
	padding: 10px;
	border-radius: 10px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

	img {
		width: 100%;
		height: 100%;
		object-fit: fit;
		display: block;
	}

	@media (max-width: 850px) {
		flex: 1;
		max-width: 400px;
	}
`;

export const ContentSection = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	padding: 0 1rem;
	gap: 2.5rem;
`;

export const InfoGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: center;

	span {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY500};
	}
`;

export const InfoTitle = styled.div`
	margin: 0;
	letter-spacing: 0.1em;
	text-transform: uppercase;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.PRIMARY};
`;

export const LineUpWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.5rem;
`;

export const ArtistTag = styled.span`
	padding: 0.8rem 1rem;
	border: 1px solid ${props => props.theme.COLOR.PRIMARY + '77'};
	border-radius: 20px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
`;

export const InfoItem = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
	gap: 12px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};

	.part {
		font-family: ${props => props.theme.FONT.SERIF};
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	.time {
		display: flex;
		align-items: center;

		&::before {
			content: '';
			display: inline-block;
			width: 1px;
			height: ${props => props.theme.FONT.SIZE.MD};
			background: ${props => props.theme.COLOR.GRAY400};
			margin-right: 12px;
		}
	}
`;

export const MapSection = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding-top: 2rem;
	margin-top: 4rem;
	border-top: 1px solid ${props => props.theme.COLOR.GRAY200};
	gap: 2rem;
`;

export const MapFrameWrapper = styled.div`
	width: 100%;
	height: 400px;
	border-radius: 12px;
	overflow: hidden;
	filter: grayscale(0.2);
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}

	@media (max-width: 850px) {
		height: 300px;
	}
`;

export const VideoWrapper = styled.div`
	position: relative;
	overflow: hidden;
	width: 100%;
	max-width: 800px;
	aspect-ratio: 16 / 9;
	margin-bottom: 4rem;
	border-radius: 10px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

	iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		border: 0;
	}

	@media (max-width: 850px) {
		margin-bottom: 2rem;
	}
`;

export const TagWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 4px;
	align-items: center;
	justify-content: center;
	text-align: center;
`;

export const HashTag = styled.button`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY700};

	padding: 0.5rem;
	cursor: pointer;
	transition: all 0.2s;

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
	}
`;
