// @styles/components/SourceLink

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const SourceLink = styled.a<{ $disabled?: boolean }>`
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

	${({ $disabled }) =>
		$disabled &&
		`
			opacity: 0.5;
			cursor: not-allowed;
			pointer-events: none;
			filter: grayscale(1);
		`}
`;
