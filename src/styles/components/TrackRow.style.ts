// @styles/components/TrackRow.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

// 공통
export const TrackInfo = styled.div`
	display: flex;
	min-width: 0;
	flex: 1;
	flex-direction: column;
	gap: 4px;

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 1px;
	}
`;

export const AlbumName = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};

	white-space: pre-wrap;
	word-break: keep-all;

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;

// 곡 목록
export const SongItem = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: all 0.2s ease;

	padding: 1rem 1.5rem;
	border: 1px solid ${props => props.theme.COLOR.GRAY100};
	border-radius: 10px;

	&:hover {
		border-color: ${props => props.theme.COLOR.PRIMARY};
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 0.8rem 1rem;
	}
`;

export const SongNumber = styled.span`
	flex-shrink: 0;
	text-align: center;
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};

	width: 25px;
	margin-right: 1.5rem;
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	color: ${props => props.theme.COLOR.PRIMARY};

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		margin-right: 1.2rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-right: 1rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;

export const SongTitle = styled.div<{ $isLead?: boolean }>`
	display: flex;
	gap: 0.5rem;
	margin-bottom: 4px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => (props.$isLead ? props.theme.FONT.WEIGHT.MEDIUM : props.theme.FONT.WEIGHT.REGULAR)};
	color: ${props => props.theme.COLOR.GRAY700};
	flex-wrap: wrap;
	word-break: keep-all;
	line-height: 1.4;

	.title-text {
		white-space: pre-wrap;
		word-break: keep-all;
	}
`;

// 앨범 트랙
export const AlbumItem = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: all 0.2s ease;

	padding: 1.5rem 1rem;
	align-items: baseline;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY100};

	&:last-child {
		border-bottom: none;
	}

	&:hover {
		background-color: ${props => props.theme.COLOR.GRAY50};
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 1.2rem 1rem;
	}
`;

export const AlbumNumber = styled.span`
	flex-shrink: 0;
	text-align: center;
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};

	width: 30px;
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	color: ${props => props.theme.COLOR.GRAY500};

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;

export const AlbumTitle = styled.div<{ $isLead?: boolean }>`
	display: flex;
	flex-wrap: wrap;
	word-break: keep-all;
	gap: 0.5rem;
	line-height: 1.4;

	font-family: ${props => props.theme.FONT.SANS};
	font-weight: ${props => (props.$isLead ? props.theme.FONT.WEIGHT.MEDIUM : props.theme.FONT.WEIGHT.REGULAR)};
	color: ${props => props.theme.COLOR.GRAY700};

	font-size: ${props => props.theme.FONT.SIZE.MD};

	@media ${props => props.theme.WINDOW_SIZE.tablet}, ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;

export const STYLES = {
	song: {
		TrackItem: SongItem,
		TrackNumber: SongNumber,
		TrackTitle: SongTitle,
	},
	album: {
		TrackItem: AlbumItem,
		TrackNumber: AlbumNumber,
		TrackTitle: AlbumTitle,
	},
} as const;
