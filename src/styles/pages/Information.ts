/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const InformationContainer = styled(motion.div)`
	margin-top: 4rem;
	width: 100%;
	max-width: 1000px;
	padding: 0 2rem;
`;

export const SectionWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 5rem;

	@media (max-width: 768px) {
		grid-template-columns: 1fr;
		gap: 3rem;
	}
`;

export const InfoSection = styled.div`
	.section-label {
		color: ${props => props.theme.COLOR.PRIMARY};
		font-size: 0.8rem;
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
	border-left: 1px solid ${props => props.theme.COLOR.PRIMARY};
	padding-left: 1.5rem;
	text-align: left;

	.title {
		font-size: 1.4rem;
		font-weight: 700;
		margin: 0 0 0.5rem 0;
	}
	.info-text {
		font-size: 0.9rem;
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
		font-size: 0.6rem;
		font-weight: 800;
		color: ${props => props.theme.COLOR.PRIMARY};
		margin-bottom: 0.1rem;
		text-transform: uppercase;
	}
	.time {
		font-size: 1rem;
		font-weight: 400;
	}
`;

export const LinkButton = styled(motion.button)`
	margin: 1rem 0rem;
	background: transparent;
	border: 1px solid ${props => props.theme.COLOR.BLACK};
	color: ${props => props.theme.COLOR.BLACK};
	padding: 0.6rem 1.5rem;
	font-size: 0.75rem;
	letter-spacing: 0.2em;
	cursor: pointer;
	font-weight: 600;

	&:hover {
		background: ${props => props.theme.COLOR.PRIMARY};
		color: ${props => props.theme.COLOR.WHITE};
		border-color: ${props => props.theme.COLOR.PRIMARY};
	}
`;
