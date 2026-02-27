// @styles/componenets/Selector.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const Selector = styled.nav`
	display: none;

	@media ${props => props.theme.WINDOW_SIZE.mobile}, ${props => props.theme.WINDOW_SIZE.tablet} {
		display: flex;
		position: sticky;
		z-index: 10;
		top: 60px;
		padding: 0.8rem 0;
		margin: 0;

		background-color: ${props => props.theme.COLOR.WHITE}cc;
		backdrop-filter: blur(15px);
		-webkit-backdrop-filter: blur(15px);
		border-bottom: 1px solid ${props => props.theme.COLOR.GRAY100}44;
	}
`;

export const SelectorItem = styled.select`
	display: none;

	@media ${props => props.theme.WINDOW_SIZE.mobile}, ${props => props.theme.WINDOW_SIZE.tablet} {
		display: block;
		padding: 6px 30px 6px 12px;

		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-family: ${props => props.theme.FONT.SANS};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.PRIMARY};

		border: 1px solid ${props => props.theme.COLOR.PRIMARY}33;
		border-radius: 10px;
		background-color: transparent;

		appearance: none;
		background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23${props =>
			props.theme.COLOR.PRIMARY.replace(
				'#',
				'',
			)}' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
		background-repeat: no-repeat;
		background-position: right 10px center;
		background-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;
