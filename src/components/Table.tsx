// @component/Table

/* eslint-disable storybook/default-exports */

import { JSX } from 'react';
import * as S from '@/styles/components/Table.style';

interface TableProps {
	label: string;
	values: (string | number | JSX.Element)[];
}

export const Table = ({ label, values }: TableProps) => (
	<tr>
		<th>{label}</th>
		<td>
			{values.map((v, idx) => (
				<div key={idx}>
					<S.ValueItem>{v}</S.ValueItem>
					{idx < values.length - 1 && <S.RowSeparator />}
				</div>
			))}
		</td>
	</tr>
);
