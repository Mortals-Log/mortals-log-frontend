// @styles/pages/About/AboutInquirySection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
export * from '@styles/common/SectionTitle.style';
export * from '@styles/pages/About/About.style';
export * from '@styles/components/Table.style';
export * from '@styles/components/Buttons.style';

export const ButtonGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-top: 2rem;
	gap: 1rem;

	@media (max-width: 850px) {
		grid-template-columns: 1fr;
	}
`;

export const InquiryCard = styled.a`
	display: flex;
	text-decoration: none;
	padding: 2rem;

	flex-direction: column;
	align-items: center;
	justify-content: center;

	background-color: ${props => props.theme.COLOR.GRAY50};
	border: 1px solid ${props => props.theme.COLOR.GRAY200};
	border-radius: 10px;

	font-family: ${props => props.theme.FONT.SANS};

	strong {
		font-size: ${props => props.theme.FONT.SIZE.LG};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.PRIMARY};
		margin-bottom: 0.5rem;
	}

	span {
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.GRAY500};
	}

	&:hover {
		border-color: ${props => props.theme.COLOR.PRIMARY};
		background-color: ${props => props.theme.COLOR.PRIMARY};

		strong {
			color: ${props => props.theme.COLOR.WHITE};
		}

		span {
			color: ${props => props.theme.COLOR.GRAY300};
		}
	}
`;
