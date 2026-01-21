// @styles/components/table.style.ts

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const ValueItem = styled.div`
	padding: 16px 20px;

	b {
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	}
`;

export const RowSeparator = styled.hr`
	width: 100%;
	border: none;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY200};
	margin: 0;
`;
