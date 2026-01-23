//@styles/pages/Information.style

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const InformationContainer = styled(motion.div)`
	width: 100%;
	max-width: 1000px;
	margin: 0 auto;
	padding: 0 24px;
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
	}
`;

export const EventList = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
`;

export const ContentCard = styled.div`
	border-left: 1.5px solid ${props => props.theme.COLOR.PRIMARY};
	padding: 0.5rem 1.5rem;
	text-align: left;

	.title {
		font-family: ${props => props.theme.FONT.SERIF};
		font-size: ${props => props.theme.FONT.SIZE.LG};
		font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
		color: ${props => props.theme.COLOR.BLACK};
		margin: 0 0 0.5rem 0;
	}
	.info-text {
		font-family: ${props => props.theme.FONT.SANS};
		font-size: ${props => props.theme.FONT.SIZE.SM};
		font-weight: ${props => props.theme.FONT.WEIGHT.LIGHT};
		color: ${props => props.theme.COLOR.GRAY600};

		opacity: 0.7;
		margin: 0;
	}
`;

export const TimeSlotWrapper = styled.div`
	display: flex;
	gap: 0.6rem;
	margin-top: 1rem;
	flex-wrap: wrap;
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
	}
`;

export const LinkButton = styled(motion.button)`
	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.SM};
	font-weight: ${props => props.theme.FONT.WEIGHT.REGULAR};
	color: ${props => props.theme.COLOR.BLACK};

	margin: 1rem 0rem;
	background: transparent;
	border: 1px solid ${props => props.theme.COLOR.BLACK};
	padding: 0.6rem 1.5rem;
	letter-spacing: 0.2em;
	cursor: pointer;

	&:hover {
		background: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
		border-color: ${props => props.theme.COLOR.PRIMARY};
	}
`;
