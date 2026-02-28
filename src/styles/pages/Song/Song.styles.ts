// @/styles/pages/Schedule/Schedule.style

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

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		gap: 1.2rem;
		padding: 0 1.2rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 1rem;
		padding: 0 1rem;
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
`;

export const TrackSection = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		gap: 0.4rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 0.3rem;
	}
`;
