// @styles/components/LeadBadge.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const LeadBadge = styled.span`
	margin-left: 10px;
	padding: 4px 6px;
	border-radius: 4px;

	background-color: ${props => props.theme.COLOR.PRIMARY};

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.TINY};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.WHITE};
	letter-spacing: 0.05em;
`;

export const GuitarBadge = styled(LeadBadge)`
	margin-left: 5px;
	background-color: ${props => props.theme.COLOR.GRAY700};
`;

export const SingingBadge = styled(LeadBadge)<{ brand: 'TJ' | 'KY' }>`
	margin-left: 5px;
	background-color: ${props => props.theme.COLOR[props.brand]};
`;
