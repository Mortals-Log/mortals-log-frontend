//@styles/pages/Home/InformationSection.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const InformationContainer = styled(motion.div)`
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
	padding: 0 24px;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 0 16px;
	}
`;

export const SectionWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 5rem;

	@media (max-width: 1200px) {
		gap: 2rem;
	}

	@media (max-width: 850px) {
		grid-template-columns: 1fr;
		gap: 3rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 1rem;
		padding: 0;
	}
`;

export const InfoSection = styled.div`
	padding-top: 2rem;

	.section-label {
		font-family: ${props => props.theme.FONT.SERIF};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.PRIMARY};

		letter-spacing: 0.2rem;
		display: block;
		margin-bottom: 1.5rem;

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			margin-bottom: 1rem;
			letter-spacing: 0.15rem;
		}
	}
`;

export const EventList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.5rem;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		width: 100%;
		gap: 1.5rem;
	}
`;

export const ContentCard = styled.div`
	border-left: 1.5px solid ${props => props.theme.COLOR.PRIMARY};
	padding: 0.5rem 1.5rem;
	text-align: left;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		padding: 0.3rem 1rem;
	}

	.title {
		font-family: ${props => props.theme.FONT.SERIF};
		font-size: ${props => props.theme.FONT.SIZE.LG};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.BLACK};
		margin: 0 0 0.5rem 0;

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			font-size: ${props => props.theme.FONT.SIZE.MD};
		}
	}

	.info-text {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.LIGHT};
		color: ${props => props.theme.COLOR.GRAY600};

		opacity: 0.7;
		margin: 0;

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			font-size: ${props => props.theme.FONT.SIZE.SM};
		}
	}
`;

export const TimeSlotWrapper = styled.div`
	display: flex;
	justify-content: flex-start;
	gap: 0.6rem;
	margin-top: 1rem;
	flex-wrap: wrap;

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 0.4rem;
	}
`;

export const TimeTag = styled.div`
	border: 1px solid ${props => props.theme.COLOR.BLACK};
	padding: 0.4rem 0.8rem;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	min-width: 70px;

	.part {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.TINY};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.PRIMARY};

		margin-bottom: 0.1rem;
		text-transform: uppercase;
	}

	.time {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY600};

		@media ${props => props.theme.WINDOW_SIZE.mobile} {
			font-size: ${props => props.theme.FONT.SIZE.XS};
		}
	}
`;

export const ActionLink = styled(Link)`
	display: flex;
	justify-content: flex-end;
	margin-top: 1rem;
	cursor: pointer;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.LIGHT};
	color: ${props => props.theme.COLOR.GRAY700};
	text-decoration: none;

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		margin-top: 0.8rem;
		font-size: ${props => props.theme.FONT.SIZE.SM};
	}
`;
