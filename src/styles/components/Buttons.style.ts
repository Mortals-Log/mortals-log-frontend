// @styles/components/Buttons.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const disabledStyle = css`
	opacity: 0.5;
	cursor: not-allowed;
	pointer-events: none;
	filter: grayscale(1);

	&:hover {
		transform: none !important;
		color: inherit !important;
	}
`;

export const ExpandButton = styled.button<{ $isExpanded: boolean }>`
	display: flex;
	position: relative;
	width: 100%;
	align-items: center;
	justify-content: center;

	z-index: 10;
	padding: 1rem 1.5rem;
	margin-top: ${props => (props.$isExpanded ? '0rem' : '-1.1rem')};
	gap: 8px;

	background-color: transparent;
	border: 1px solid ${props => props.theme.COLOR.PRIMARY};
	border-radius: 10px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY700};
	cursor: pointer;

	transition: all 0.2s ease;

	&:hover {
		background-color: ${props => props.theme.COLOR.PRIMARY};
		border-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
	}

	&:active {
		background-color: ${props => props.theme.COLOR.PRIMARY};
		transform: scale(0.98);
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		padding: 1rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 12px;
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;

export const MoreButton = styled(Link)`
	display: flex;
	width: 100%;
	align-items: center;
	justify-content: center;

	gap: 8px;
	margin-top: 1rem;
	padding: 1rem 1.5rem;

	text-decoration: none;
	background-color: transparent;
	border: 1px solid ${props => props.theme.COLOR.PRIMARY};
	border-radius: 10px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY700};
	cursor: pointer;

	transition: all 0.2s ease;

	&:hover {
		background-color: ${props => props.theme.COLOR.PRIMARY};
		border-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
	}

	&:active {
		transform: scale(0.98);
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		padding: 1rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 12px;
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;

export const SourceLink = styled(Link)<{ $disabled?: boolean }>`
	display: inline-block;
	width: 80%;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY400};

	text-decoration: none;
	transition: all 0.3s ease;

	&::before {
		content: 'REF. ';
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		letter-spacing: 0.5px;
	}

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
		transform: translateX(3px);
	}

	.disabled {
		${disabledStyle}
	}

	${props => props.$disabled && disabledStyle}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		width: 100%;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		width: 100%;
	}
`;

export const LinkButton = styled(Link)`
	display: inline-flex;
	align-items: center;
	gap: 8px;
	padding: 0.8rem 1rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};

	background: ${props => props.theme.COLOR.WHITE};
	border: 1px solid ${props => props.theme.COLOR.GRAY200};
	border-radius: 5px;

	text-decoration: none;
	transition: all 0.2s ease;

	svg {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}

	&:hover {
		background: ${props => props.theme.COLOR.PRIMARY};
		border-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
		transform: translateY(-1px);
	}

	&:active {
		transform: scale(0.98);
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		padding: 0.7rem 0.9rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};

		&:hover {
			transform: none;
		}

		svg {
			width: 14px;
			height: 14px;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 0.7rem 0.9rem;
		font-size: ${props => props.theme.FONT.SIZE.XS};

		&:hover {
			transform: none;
		}

		svg {
			width: 14px;
			height: 14px;
		}
	}
`;

export const ViewMoreButton = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: fit-content;

	background-color: ${props => props.theme.COLOR.BLACK};
	padding: 1rem 1.5rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.WHITE};

	border: none;
	cursor: pointer;
	border-radius: 10px;
	transition: all 0.3s;

	&::after {
		content: '|';
		margin-left: 2px;
		color: ${props => props.theme.COLOR.WHITE};
		animation: ${blink} 1s step-end infinite;
	}

	&:hover {
		background-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
	}

	&:active {
		transform: scale(0.98);
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 0.8rem 1.4rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};

		&::after {
			margin-left: 4px;
		}
	}
`;

export const CardButton = styled(Link)`
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 2.5rem 1.5rem;

	background: ${props => props.theme.COLOR.WHITE};
	border: 1px solid ${props => props.theme.COLOR.GRAY200};
	border-radius: 10px;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.WHITE};
	text-decoration: none;

	overflow: hidden;
	cursor: pointer;

	&:hover {
		border-color: ${props => props.theme.COLOR.PRIMARY};
	}

	&:active {
		border-color: ${props => props.theme.COLOR.PRIMARY};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 2rem 1.5rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;

export const BackButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	padding: 4px 0;
	margin-bottom: 1.2rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY400};

	transition: color 0.2s ease;
	&::before {
		content: '←';
		margin-right: 6px;
	}

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	&:active {
		transform: scale(0.98);
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-bottom: 0.5rem;
		font-size: ${props => props.theme.FONT.SIZE.XS};
	}
`;

export const ToggleButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	white-space: nowrap;
	margin-left: 1rem;

	font-size: ${props => props.theme.FONT.SIZE.XS};
	color: ${props => props.theme.COLOR.GRAY400};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};

	.text-desktop {
		display: inline;
		margin-right: 4px;
	}

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	&:active {
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		display: none;
	}
`;

export const PrimaryButton = styled(Link)`
	display: block;
	width: 100%;
	max-width: 400px;
	margin: 20px auto 0;
	padding: 1.5rem;

	background-color: ${props => props.theme.COLOR.BLACK};
	border-radius: 8px;

	text-align: center;
	text-decoration: none;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.WHITE};

	transition: all 0.2s ease;

	&:hover {
		background-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
	}
`;
