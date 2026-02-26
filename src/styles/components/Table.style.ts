// @styles/components/Table.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	white-space: nowrap;
	word-break: keep-all;

	tr {
		border-bottom: 1px solid ${props => props.theme.COLOR.GRAY300};
	}

	th {
		text-align: center;
		vertical-align: middle;
		padding: 16px 10px;
	}

	td {
		padding: 0;
		line-height: 1.5;
		vertical-align: middle;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		th {
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		tr {
			display: flex;
			flex-direction: column;
		}

		th {
			display: block;
			width: fit-content;
			border-bottom: 1px solid ${props => props.theme.COLOR.PRIMARY};

			padding-bottom: 8px;

			font-size: ${props => props.theme.FONT.SIZE.SM};
			font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
			color: ${props => props.theme.COLOR.PRIMARY};
			text-align: left;
		}

		td {
			width: 100%;
			display: block;
			padding-bottom: 8px;
		}
	}
`;

export const ValueItem = styled.div`
	padding: 16px 20px;

	font-family: ${props => props.theme.FONT.SANS};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	color: ${props => props.theme.COLOR.GRAY700};

	b {
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 12px 16px;
		font-size: ${props => props.theme.FONT.SIZE.MD};
	}
`;

export const RowSeparator = styled.hr`
	width: calc(100% - 30px);
	margin: 0 auto;
	border: none;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY300};

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		width: 100%;
	}
`;
