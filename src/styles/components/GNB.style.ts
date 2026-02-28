// @/styles/componenets/GNB.style

/* eslint-disable storybook/default-exports */

import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

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
	flex: 1;
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

	&:active {
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

	@media ${props => props.theme.WINDOW_SIZE.laptop} {
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
	display: flex;
	flex: 2;
	align-items: center;
	justify-content: center;
	list-style: none;
	gap: 3rem;
	z-index: 5;

	@media ${props => props.theme.WINDOW_SIZE.laptop} {
		gap: 1.8rem;
		margin: 0 1rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		display: none;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
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

	&:active {
		color: ${props => props.theme.COLOR.PRIMARY};
	}
`;

export const UtilGroup = styled.div`
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: flex-end;
	flex-shrink: 0;
	min-width: 0;
	gap: 0.8rem;
	z-index: 10;
`;

export const DDayContent = styled(Link)`
	display: flex;
	min-width: 0;
	align-items: center;
	margin-left: 8px;
	gap: 0.5rem;
	font-size: ${props => props.theme.FONT.SIZE.SM};
	white-space: nowrap;

	.label {
		font-family: ${props => props.theme.FONT.SERIF};
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
		color: ${props => props.theme.COLOR.GRAY500};
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.count {
		flex-shrink: 0;
		font-family: ${props => props.theme.FONT.SANS};
		font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
		color: ${props => props.theme.COLOR.PRIMARY};
	}

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		display: none;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		display: none;
	}
`;

export const MobileNavList = styled.ul`
	display: flex;
	flex-direction: column;
	gap: 2.5rem;
	list-style: none;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		gap: 2rem;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		gap: 2rem;
	}
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
	display: flex;
	flex-direction: column;
	position: fixed;
	width: 70%;
	max-width: 320px;
	height: 100vh;
	top: 0;
	right: 0;
	z-index: 2000;
	background-color: ${props => props.theme.COLOR.WHITE};
	padding: 100px 2.5rem;
	gap: 2rem;
`;

export const MobileNavItem = styled.li<{ $isActive?: boolean }>`
	position: relative;
	width: fit-content;

	font-family: ${props => props.theme.FONT.SERIF};
	font-size: ${props => props.theme.FONT.SIZE.MD};
	font-weight: ${props => props.theme.FONT.WEIGHT.SEMIBOLD};
	color: ${props => (props.$isActive ? props.theme.COLOR.PRIMARY : props.theme.COLOR.BLACK)};
	letter-spacing: 0.1em;
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

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		font-weight: ${props => props.theme.FONT.WEIGHT.MEDIUM};
	}
`;

export const MobileDDayFooter = styled(Link)`
	display: flex;
	flex-direction: column;
	margin-top: auto;
	padding-top: 1rem;
	gap: 0.5rem;
	border-top: 1px solid ${props => props.theme.COLOR.GRAY200};

	font-family: ${props => props.theme.FONT.SERIF};

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
	position: relative;
	background: none;
	border: none;
	padding: 10px;
	cursor: pointer;

	@media ${props => props.theme.WINDOW_SIZE.tablet} {
		display: block;
	}

	@media ${props => props.theme.WINDOW_SIZE.mobile} {
		display: block;
	}
`;

export const CloseButton = styled.button`
	display: flex;
	position: absolute;
	width: 32px;
	height: 32px;
	top: 20px;
	right: 2rem;
	align-items: center;
	justify-content: center;
	background: none;
	border: none;
	cursor: pointer;

	transition: transform 0.2s ease;

	&:hover {
		transform: scale(1.1);
	}

	&:active {
		transform: scale(0.9);
	}
`;
