// @/styles/pages/Profile/ProfileDetailSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
export { ContentSection, SectionTitle } from '@/styles/common/Layout.style';

export { Table } from '@/styles/components/Table.style';

export const DebutInfo = styled.span`
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;

	.divider {
		display: inline-block;
		width: 1px;
		height: 12px;
		background-color: ${props => props.theme.COLOR.GRAY300};

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			height: 10px;
		}
	}
`;
