/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const GNBContainer = styled(motion.nav)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 60px;
	z-index: 1000;
	border-bottom: 1px solid ${props => props.theme.COLOR.GRAY200};
	background-color: transparent;
	backdrop-filter: blur(10px);
`;

export const Inner = styled.div`
	position: relative;
	max-width: 1600px;
	height: 100%;
	margin: 0 auto;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 2rem;
`;

export const LogoGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 1rem;
	z-index: 10;
	position: relative;
	width: fit-content;
`;

export const Logo = styled.div`
	font-size: 1rem;
	font-weight: 900;
	letter-spacing: -0.05em;
	color: ${props => props.theme.COLOR.BLACK};
`;

export const Tagline = styled(motion.div)`
	display: flex;
	align-items: center;
	font-size: 0.65rem;
	font-weight: 700;
	color: ${props => props.theme.COLOR.GRAY500};
	white-space: nowrap;
	background-color: transparent;

	@media (max-width: 1100px) {
		position: absolute;
		bottom: 100%;
		left: 0;
		opacity: 1 !important;
		width: auto !important;
		height: auto !important;
		transform: translateY(-2px) !important;
		font-size: 0.6rem;
	}
`;

export const NavGroup = styled.ul`
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);

	display: flex;
	gap: 3rem;
	list-style: none;
	z-index: 5;

	@media (max-width: 1200px) {
		gap: 1.5rem;
	}

	@media (max-width: 850px) {
		display: none;
	}
`;

export const NavItem = styled(motion.a)`
	font-size: 0.75rem;
	font-weight: 700;
	letter-spacing: 0.15em;
	cursor: pointer;
	color: ${props => props.theme.COLOR.BLACK};
	text-decoration: none;

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
	}
`;

export const UtilGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 0.8rem;
	z-index: 10;
`;

export const DDayContent = styled.div`
	display: flex;
	align-items: center;
	gap: 0.8rem;

	@media (max-width: 850px) {
		display: none;
	}
`;

export const MobileNavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
	list-style: none;
`;

export const MobileOverlay = styled(motion.div)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	background-color: rgba(0, 0, 0, 0.1);
	z-index: 1500;
`;

export const MobileMenu = styled(motion.div)`
	position: fixed;
	top: 0;
	right: 0;
	width: 70%;
	max-width: 320px;
	height: 100vh;
	background-color: ${props => props.theme.COLOR.WHITE};
	padding: 100px 2.5rem;
	z-index: 2000;
	display: flex;
	flex-direction: column;
`;

export const MobileNavItem = styled.li`
	font-size: 1.2rem;
	font-weight: 800;
	letter-spacing: 0.1em;
	color: ${props => props.theme.COLOR.BLACK};
	cursor: pointer;
	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	&:active {
		color: ${props => props.theme.COLOR.PRIMARY};
	}
`;

export const MenuButton = styled.button`
	display: none;
	background: none;
	border: none;
	cursor: pointer;
	padding: 10px;
	position: relative;

	@media (max-width: 850px) {
		display: block;
	}
`;

export const CloseButton = styled.button`
	position: absolute;
	top: 20px;
	right: 2rem;
	width: 32px;
	height: 32px;
	background: none;
	border: none;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	transition: transform 0.2s ease;

	&:hover {
		transform: scale(1.1);
	}

	&:active {
		transform: scale(0.9);
	}
`;
