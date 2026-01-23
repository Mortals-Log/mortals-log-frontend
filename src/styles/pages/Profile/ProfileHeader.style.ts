// @styles/pages/Profile.style.ts

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const ProfileHeader = styled.section`
	display: flex;
	gap: 40px;
	align-items: flex-end;
	margin-bottom: 60px;

	@media (max-width: 800px) {
		flex-direction: column;
		align-items: center;
		text-align: center;
	}
`;
