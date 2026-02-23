// @styles/pages/Schedule/Schedule.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const SortTabGroup = styled.ul`
	display: flex;
	list-style: none;
	justify-content: flex-end;
	align-items: center;
	gap: 1.25rem;
	margin-bottom: 1rem;
	padding: 0 1.5rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 1rem;
		padding: 0 1rem;
		margin-bottom: 1rem;
	}
`;

export const SortTabItem = styled.li<{ $isActive: boolean }>`
	position: relative;
	cursor: pointer;
	padding: 4px 0;
	transition: all 0.2s ease;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => (props.$isActive ? props.theme.FONT.WEIGHT.SEMIBOLD : props.theme.FONT.WEIGHT.MEDIUM)};
	color: ${props => (props.$isActive ? props.theme.COLOR.PRIMARY : props.theme.COLOR.GRAY500)};

	&::after {
		content: '';
		position: absolute;
		top: 0;
		right: -6px;

		width: 4px;
		height: 4px;
		border-radius: 50%;
		background-color: ${props => props.theme.COLOR.PRIMARY};

		opacity: ${props => (props.$isActive ? 1 : 0)};
		transform: scale(${props => (props.$isActive ? 1 : 0)});
		transition: opacity 0.2s ease;
	}

	&:hover {
		color: ${props => !props.$isActive && props.theme.COLOR.PRIMARY};
		opacity: ${props => !props.$isActive && 0.8};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;

export const TrackContainer = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 0.3rem;
	}
`;

export const TrackItem = styled.div`
	display: flex;
	align-items: center;
	padding: 1rem 1.5rem;
	border: 1px solid ${props => props.theme.COLOR.GRAY100};
	border-radius: 10px;
	cursor: pointer;
	transition: all 0.1s ease;

	&:hover {
		border-color: ${props => props.theme.COLOR.PRIMARY};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 0.8rem 1rem;

		&:hover {
			border-color: none;
		}
	}
`;

export const TrackNumber = styled.span`
	width: 25px;
	flex-shrink: 0;
	text-align: center;
	margin-right: 1.5rem;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.PRIMARY};

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		margin-right: 1rem;
	}
`;

export const TrackInfo = styled.div`
	display: flex;
	min-width: 0;
	flex: 1;
	flex-direction: column;
	gap: 4px;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 1px;
	}
`;

export const TrackTitle = styled.div`
	display: flex;
	flex-wrap: wrap;
	margin-bottom: 4px;
	line-height: 1.4;
	gap: 0.5rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY700};

	.title-text {
		white-space: pre-wrap;
		word-break: keep-all;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 0.3rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;

export const AlbumName = styled.div`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY500};

	white-space: pre-wrap;
	word-break: keep-all;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;
