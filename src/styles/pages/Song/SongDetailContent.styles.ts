// @/styles/pages/Song/SongDetail.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import * as L from '@/styles/common/Layout.style';

export * from '@/styles/common/VideoWrapper.style';
export { PrimaryButton } from '@/styles/components/Buttons.style';

export const ContentSection = styled(L.ContentSection)`
	margin-top: 0.5rem;
`;

export const ContentHeader = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 0.3rem;
`;

export const TabGroup = styled.div`
	display: flex;
	gap: 1rem;
	margin: 1rem 0;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 0.8rem;
	}
`;

export const TabButton = styled.button<{ $isActive: boolean }>`
	position: relative;
	background: none;
	border: none;
	padding: 0;
	cursor: pointer;
	transition: color 0.2s ease;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => (props.$isActive ? props.theme.COLOR.GRAY700 : props.theme.COLOR.GRAY300)};

	&:hover {
		color: ${props => !props.$isActive && props.theme.COLOR.GRAY700};
		opacity: ${props => !props.$isActive && 0.8};
	}

	&::after {
		content: '';
		opacity: ${props => (props.$isActive ? 1 : 0)};
		position: absolute;
		width: 100%;
		height: 2px;
		left: 0;
		bottom: -4px;
		background-color: ${props => props.theme.COLOR.GRAY700};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.MD};
	}
`;

export const ChordSubHeader = styled.div`
	display: flex;
	flex-direction: column;
	padding-bottom: 1rem;
	gap: 1rem;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY100};
`;

export const VersionSelector = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1.5rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 1.2rem;
	}
`;

export const VersionChip = styled.button<{ $isActive: boolean }>`
	position: relative;
	cursor: pointer;
	white-space: nowrap;
	word-break: keep-all;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => (props.$isActive ? props.theme.COLOR.GRAY700 : props.theme.COLOR.GRAY300)};
	transition: color 0.1s ease;

	&::after {
		content: '';
		position: absolute;
		top: 2px;
		right: -8px;

		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: ${props => props.theme.COLOR.GRAY700};

		opacity: ${props => (props.$isActive ? 1 : 0)};
		transition: opacity 0.2s ease;
	}

	&:hover {
		color: ${props => !props.$isActive && props.theme.COLOR.GRAY500};
	}
`;

export const GuideWrapper = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	.guide-item {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		color: ${props => props.theme.COLOR.GRAY500};
		line-height: 1.2;
		white-space: pre-wrap;
		word-break: keep-all;

		&::before {
			content: '* ';
			color: ${props => props.theme.COLOR.PRIMARY};
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		.guide-item {
			font-size: ${props => props.theme.FONT.SIZE.XS};
		}
	}
`;

export const Content = styled.div<{ $isChord: boolean }>`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};

	line-height: ${props => (props.$isChord ? '2' : '1.8')};
	white-space: pre-wrap;
	word-break: break-all;
`;

export const StickyChordBar = styled.div`
	position: sticky;
	top: 65px;
	z-index: 10;

	padding: 1rem 1.5rem;
	margin: 1rem 0;

	background-color: ${props => props.theme.COLOR.WHITE}cc;
	backdrop-filter: blur(15px);

	border: 1px solid ${props => props.theme.COLOR.GRAY200};
	border-radius: 8px;

	.chord {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
		color: ${props => props.theme.COLOR.PRIMARY};

		letter-spacing: 0.1rem;
		white-space: pre-wrap;
		word-break: break-all;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		top: 60px;

		.chord {
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}
	}
`;
