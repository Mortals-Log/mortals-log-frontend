// @styles/components/AdultBadge.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const AdultBadge = styled.span`
	flex-shrink: 0;
	padding: 1px 5px;

	border: 1px solid ${props => props.theme.COLOR.PRIMARY};
	border-radius: 4px;
	background-color: ${props => props.theme.COLOR.PRIMARY + '33'};

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.PRIMARY};
`;
