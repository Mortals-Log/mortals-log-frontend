// @styles/pages/Song/SongDetail.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export * from '@styles/common/VideoWrapper.style';
export { PrimaryButton } from '@styles/components/Buttons.style';

export const ContentSection = styled.section`
	margin-top: 2rem;
`;

export const ContentHeader = styled.div`
	display: flex;
	flex-direction: column;
	margin-bottom: 1rem;
`;

export const ContentTitle = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
`;

export const TabGroup = styled.div`
	display: flex;
	gap: 1.5rem;
	margin: 1rem 0;
`;

export const TabButton = styled.button<{ isActive: boolean }>`
	position: relative;
	border: none;
	padding: 0;
	cursor: pointer;
	transition: color 0.2s ease;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.LG};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => (props.isActive ? props.theme.COLOR.GRAY700 : props.theme.COLOR.GRAY300)};

	&:hover {
		color: ${props => props.theme.COLOR.GRAY700};
	}

	&::after {
		content: '';
		display: ${props => (props.isActive ? 'block' : 'none')};
		position: absolute;
		width: 100%;
		height: 2px;
		left: 0;
		bottom: -4px;
		background-color: ${props => props.theme.COLOR.GRAY700};
	}
`;

export const GuideWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	gap: 0.5rem;

	.guide-item {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		color: ${props => props.theme.COLOR.GRAY500};
		line-height: 1.2;
		white-space: nowrap;

		&::before {
			content: '* ';
			color: ${props => props.theme.COLOR.PRIMARY};
		}
	}
`;

export const Content = styled.div<{ isChord: boolean }>`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
	line-height: ${props => (props.isChord ? '2' : '1.8')};
	white-space: pre-wrap;
	word-break: break-all;
`;
