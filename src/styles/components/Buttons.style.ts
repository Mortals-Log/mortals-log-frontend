// @styles/components/Buttons.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const BaseButton = styled.button`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	padding: 14px;

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
		border: 1px solid ${props => props.theme.COLOR.PRIMARY};
		background-color: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
	}
`;

export const ExpandButton = styled(BaseButton)<{ $isExpanded: boolean }>`
	margin-top: ${({ $isExpanded }) => ($isExpanded ? '0rem' : '-1.1rem')};
	position: relative;
	z-index: 10;
`;

export const MoreButton = styled(BaseButton.withComponent(Link))`
	margin-top: 10px;
	text-decoration: none;
`;

export const ActionButton = styled(motion.button)`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.BLACK};

	margin: 1rem 0rem;
	background: transparent;
	border: 1px solid ${props => props.theme.COLOR.BLACK};
	padding: 0.6rem 1.5rem;
	letter-spacing: 0.2em;
	cursor: pointer;

	&:hover {
		background: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
		border-color: ${props => props.theme.COLOR.PRIMARY};
	}
`;

export const LinkButton = styled.a`
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
`;

export const ViewMoreButton = styled.button`
	width: fit-content;
	background-color: ${props => props.theme.COLOR.BLACK};
	padding: 1rem 1.5rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.WHITE};

	border: none;
	cursor: pointer;
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

	@media (max-width: 850px) {
		padding: 0.9rem 1.5rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;

export const CardButton = styled(motion.a)`
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
`;

export const BackButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	margin-bottom: 1.2rem;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY400};

	:before {
		content: '← ';
	}
	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
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

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
	}
`;
