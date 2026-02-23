// @styles/common/ArrowIcon.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const ArrowIcon = styled.span<{ $isExpanded: boolean }>`
	display: inline-block;
	transition: transform 0.3s ease;
	transform: ${({ $isExpanded }) => ($isExpanded ? 'rotate(180deg)' : 'rotate(0deg)')};
	font-size: ${props => props.theme.FONT.SIZE.XS};
`;
