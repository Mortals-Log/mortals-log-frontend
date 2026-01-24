// @styles/common/SectionTitle.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const SectionTitle = styled.h3`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.H3};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};

	border-bottom: 2px solid ${props => props.theme.COLOR.PRIMARY};
	padding-bottom: 1rem;
	letter-spacing: 2px;

	span {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY500};

		text-transform: uppercase;
		letter-spacing: 1.5px;
	}
`;
