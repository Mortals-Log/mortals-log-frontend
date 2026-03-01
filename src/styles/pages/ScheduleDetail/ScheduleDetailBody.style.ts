// @/styles/pages/Schedule/ScheduleDetailBody.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export { SectionTitle } from '@styles/common/Layout.style';

export { PrimaryButton, MoreButton } from '@styles/components/Buttons.style';
export * from '@styles/common/VideoWrapper.style';

export const MainSection = styled.div`
	display: flex;
	align-items: center;
	gap: 3rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		flex-direction: column;
	}
`;

export const ImageWrapper = styled.div`
	flex: 0 0 400px;
	overflow: hidden;
	margin: 0 auto;
	padding: 0.5rem;
	border-radius: 10px;
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

	img {
		width: 100%;
		height: 100%;
		object-fit: fit;
		display: block;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		flex: 1;
		max-width: 400px;
	}
`;

export const ContentSection = styled.div`
	flex: 1;
	display: flex;
	flex-direction: column;
	gap: 2.5rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		gap: 2rem;
	}
`;

export const InfoGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.8rem;
	align-items: center;
`;

export const InfoTitle = styled.div`
	margin: 0;
	letter-spacing: 0.1em;
	text-transform: uppercase;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.PRIMARY};

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
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
			content: '|';
			display: inline-block;
			color: ${props => props.theme.COLOR.GRAY400};
			margin-right: 12px;
		}
	}

	.info {
		font-family: ${props => props.theme.FONT.SERIF};
		font-size: ${props => props.theme.FONT.SIZE.XS};

		&::before {
			content: '*';
			color: ${props => props.theme.COLOR.PRIMARY};
			margin-right: 4px;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		gap: 8px;

		.part {
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}

		.time {
			&::before {
				margin-right: 8px;
			}
		}
	}
`;

export const LineUpWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	gap: 0.5rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 0.3rem;
	}
`;

export const LineUpItem = styled.div`
	padding: 0.8rem 1rem;
	border: 1px solid ${props => props.theme.COLOR.PRIMARY + '77'};
	border-radius: 20px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 0.5rem 0.8rem;
	}
`;

export const MapSection = styled.section`
	display: flex;
	flex-direction: column;
	width: 100%;
	margin-top: 4rem;
	padding-top: 2rem;
	gap: 1rem;
	border-top: 1px solid ${props => props.theme.COLOR.GRAY200};

	${props => props.theme.WINDOW_SIZE.tablet}, @media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-top: 2rem;
		padding-top: 1rem;
	}
`;

export const MapFrameWrapper = styled.div`
	width: 100%;
	height: 400px;
	border-radius: 10px;
	overflow: hidden;
	filter: grayscale(0.2);
	box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

	iframe {
		width: 100%;
		height: 100%;
		border: none;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		height: 350px;
		border-radius: 4px;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		height: 300px;
	}
`;

export const HashTagWrapper = styled.div`
	display: flex;
	flex-wrap: wrap;
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
	transition: all 0.2s ease;

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		padding: 0.3rem;
	}
`;

export const CopyAnnotation = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY500};

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;
