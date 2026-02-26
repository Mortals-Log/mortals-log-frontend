// @styles/pages/About/AboutInquirySection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
export { ContentSection, SectionTitle } from '@/styles/common/Layout.style';

export const ButtonGrid = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 1fr 1fr;
	margin-top: 2rem;
	gap: 1rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		grid-template-columns: 1fr;
		gap: 1rem;
		margin-top: 1.5rem;
	}
`;

export const InquiryButtn = styled(Link)`
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

	&:active {
		transform: scale(0.98);
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 1.5rem;

		strong {
			font-size: ${props => props.theme.FONT.SIZE.MD};
		}
	}
`;
