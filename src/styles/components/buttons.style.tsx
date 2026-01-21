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
