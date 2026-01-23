// @styles/pages/Profile.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const SliderContainer = styled.div`
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

export const Slider = styled.div`
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
