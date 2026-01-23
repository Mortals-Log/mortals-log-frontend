// @styles/components/buttons.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

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
