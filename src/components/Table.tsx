// @/component/Table

/* eslint-disable storybook/default-exports */

import { JSX } from 'react';

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
					<div className="py-4 px-5 font-sans font-normal text-md text-gray-700 [&_b]:font-semibold [&_b]:text-primary max-tablet:text-sm">
						{v}
					</div>
					{idx < values.length - 1 && (
						<hr className="w-[calc(100%-30px)] mx-auto border-0 border-b border-solid border-gray-300 max-mobile:w-full" />
					)}
				</div>
			))}
		</td>
	</tr>
);
