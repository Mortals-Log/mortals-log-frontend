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
	gap: 0.5rem;
`;

export const VersionChip = styled.button<{ $isActive: boolean }>`
	position: relative;
	cursor: pointer;
	white-space: nowrap;
	margin-right: 1.5rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};

	color: ${props => props.theme.COLOR.GRAY300};

	${props =>
		props.$isActive &&
		`
			color: ${props.theme.COLOR.GRAY700};

            &::after {
                content: '';
                position: absolute;
                top: 0;
                right: -6px;

                width: 4px;
                height: 4px;
                border-radius: 50%;
                background-color: ${props.theme.COLOR.GRAY700};
                transition: opacity 0.3s ease;
            }
        
    `}
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

export const StickyChordBar = styled.div`
	position: sticky;
	top: 65px;
	z-index: 10;

	padding: 1rem 1.5rem;
	margin: 2rem 0;

	background-color: ${props => props.theme.COLOR.WHITE}cc;
	backdrop-filter: blur(15px);

	border: 1px solid ${props => props.theme.COLOR.GRAY200};
	border-radius: 8px;
`;

export const ChordText = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.PRIMARY};

	letter-spacing: 0.1rem;
	white-space: pre-wrap;
`;
