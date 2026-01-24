// @styles/components/Table.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	font-family: ${props => props.theme.FONT.SANS};

	tr {
		border-bottom: 1px solid ${props => props.theme.COLOR.GRAY300};
	}

	th {
		font-size: ${props => props.theme.FONT.SIZE.MD};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		text-align: center;
		vertical-align: middle;
		padding: 16px 10px;
	}

	td {
		padding: 0;
		line-height: 1.5;
		vertical-align: middle;
	}

	@media (max-width: 480px) {
		th,
		td {
			display: block;
			width: 100%;
		}
	}
`;

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
