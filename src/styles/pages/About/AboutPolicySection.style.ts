// @AboutPolicySection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
export * from '@styles/common/SectionTitle.style';
export * from '@styles/pages/About/About.style';
export * from '@styles/components/Table.style';

export const PolicyItem = styled.div`
	display: flex;
	gap: 40px;
	border-top: 1px solid ${props => props.theme.COLOR.GRAY200};
	padding: 1rem 0;
	justify-content: center;
	align-items: center;

	.label {
		min-width: 150px;
		font-size: 0.9rem;
		font-weight: 700;
		color: ${props => props.theme.COLOR.PRIMARY};
		letter-spacing: 0.05em;
		text-align: center;
	}

	.content {
		font-size: 1rem;
		line-height: 1.7;
		color: ${props => props.theme.COLOR.GRAY600};
		word-break: keep-all;
	}

	@media (max-width: 768px) {
		flex-direction: column;
		gap: 12px;

		.label {
			min-width: auto;
		}
	}
`;
