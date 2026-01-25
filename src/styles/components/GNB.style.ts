// @styles/componenets/GNB.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const GNBContainer = styled(motion.nav)`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 60px;
	z-index: 9999;
	background-color: transparent;
	backdrop-filter: blur(30px);
`;

export const Inner = styled.div`
	position: relative;
	max-width: 1200px;
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
	cursor: pointer;

	&:hover {
		.logo {
			color: ${props => props.theme.COLOR.PRIMARY};
		}
	}
`;

export const Logo = styled.div`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => props.theme.COLOR.BLACK};

	letter-spacing: -0.05em;
	transition: opacity 0.2s ease;
`;

export const Tagline = styled(motion.div)`
	display: flex;
	align-items: center;

	font-family: ${props => props.theme.FONT.SANS};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	color: ${props => props.theme.COLOR.GRAY500};

	white-space: nowrap;
	background-color: transparent;

	@media (max-width: 1200px) {
		position: absolute;
		bottom: 100%;
		left: 0;
		opacity: 1 !important;
		width: auto !important;
		height: auto !important;
		transform: translateY(-2px) !important;

		font-size: ${props => props.theme.FONT.SIZE.TINY};
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

export const NavItem = styled(motion.li)<{ $isActive?: boolean }>`
	position: relative;
	width: fit-content;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.XS};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};

	letter-spacing: 0.15em;
	cursor: pointer;
	color: ${props => (props.$isActive ? props.theme.COLOR.PRIMARY : props.theme.COLOR.BLACK)};
	text-decoration: none;

	${props =>
		props.$isActive &&
		`
        &::after {
			content: '';
            position: absolute;
            width: 3px;
            height: 3px;
            border-radius: 50%;
            background-color: ${props.theme.COLOR.PRIMARY};
        }
    `}

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

	font-size: ${props => props.theme.FONT.SIZE.SM};

	.label {
		font-family: ${props => props.theme.FONT.SERIF};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY500};
	}
	.count {
		font-family: ${props => props.theme.FONT.SANS};
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
		color: ${props => props.theme.COLOR.PRIMARY};
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
	gap: 2rem;
`;

export const MobileNavItem = styled.li<{ $isActive?: boolean }>`
	position: relative;
	width: fit-content;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};

	letter-spacing: 0.1em;
	color: ${props => (props.$isActive ? props.theme.COLOR.PRIMARY : props.theme.COLOR.BLACK)};
	cursor: pointer;

	${props =>
		props.$isActive &&
		`
        &::after {
			content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background-color: ${props.theme.COLOR.PRIMARY};
        }
    `}

	&:hover {
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	&:active {
		color: ${props => props.theme.COLOR.PRIMARY};
	}
`;

export const MobileDDayFooter = styled.div`
	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};

	margin-top: auto;
	padding-top: 1rem;
	border-top: 1px solid ${props => props.theme.COLOR.GRAY200};
	display: flex;
	flex-direction: column;
	gap: 0.5rem;

	.label {
		font-size: ${props => props.theme.FONT.SIZE.XS};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY500};
	}
	.count {
		font-size: ${props => props.theme.FONT.SIZE.XL};
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
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
