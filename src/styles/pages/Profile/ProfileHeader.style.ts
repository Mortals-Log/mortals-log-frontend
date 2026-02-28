// @/styles/pages/Profile/ProfileHeader.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';

export const ProfileHeader = styled.section`
	display: flex;
	gap: 40px;
	align-items: flex-end;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		flex-direction: column;
		align-items: center;
		text-align: center;
		gap: 20px;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 24px;
	}
`;

export const MainImage = styled.img`
	width: 30%;
	min-width: 240px;
	aspect-ratio: 3/4;
	object-fit: cover;
	border-radius: 4px;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		width: 100%;
		max-width: 280px;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		max-width: 240px;
	}
`;

export const InfoSummary = styled.div`
	flex: 1;
	width: 100%;
`;

export const NameGroup = styled.div`
	font-family: ${props => props.theme.FONT.SERIF};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	margin-bottom: 1.5rem;

	.name {
		font-size: ${props => props.theme.FONT.SIZE.H1};
		color: ${props => props.theme.COLOR.BLACK};
		margin-bottom: 1.2rem;
	}

	.sub-name {
		font-size: ${props => props.theme.FONT.SIZE.MD};
		color: ${props => props.theme.COLOR.GRAY600};
		letter-spacing: 0.05em;
		align-items: center;

		&:not(:last-child)::after {
			content: '|';
			font-weight: ${props => props.theme.FONT.WEIGHT.BOLD};
			color: ${props => props.theme.COLOR.PRIMARY};
			margin: 0 0.2rem;
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		.name {
			font-size: ${props => props.theme.FONT.SIZE.H1};
			margin-bottom: 0.5rem;
		}

		.sub-name {
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		.name {
			font-size: ${props => props.theme.FONT.SIZE.H2};
			margin-bottom: 0.8rem;
		}
	}
`;

export const Description = styled.blockquote`
	padding-left: 1rem;
	margin: 0.8rem 0;
	border-left: 2.5px solid ${props => props.theme.COLOR.PRIMARY};

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.GRAY700};
	line-height: 1.5;
	white-space: pre-wrap;
	word-break: keep-all;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		text-align: left;
		margin: 1.5rem 0;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		border-left: none;
		border-top: 1px solid ${props => props.theme.COLOR.GRAY200};
		padding-left: 0;
		padding-top: 1.5rem;
		margin: 1.5rem auto 0;
	}
`;
