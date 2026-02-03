// @components/GNB

import * as S from '@/styles/components/GNB.style';
import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, Variants } from 'framer-motion';
import { ACTIVE_NAV_ITEMS, METADATA } from '@/const/contents';
import MenuIcon from '@assets/icons/MenuIcon';
import CloseIcon from '@assets/icons/CloseIcon';
import { GetDDay, GetUpcomingSchedules } from '@utils/date';
import { FULL_CONCERTS } from '@/const/concert';

const GNB = () => {
	const location = useLocation();
	const currentPath = location.pathname;

	const checkActive = (path: string) => {
		if (path === '/') return currentPath === '/';
		return currentPath.startsWith(path);
	};

	const upcomingEvents = GetUpcomingSchedules(FULL_CONCERTS);

	const [isLogoHovered, setIsLogoHovered] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1100 : false);
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const navigate = useNavigate();

	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}
	}, [isMenuOpen]);

	useEffect(() => {
		const handleResize = () => {
			const width = window.innerWidth;
			setIsSmallScreen(width <= 1100);

			if (width > 850 && isMenuOpen) {
				setIsMenuOpen(false);
			}
		};

		handleResize();

		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [isMenuOpen]);

	const tagVariants: Variants = {
		visible: {
			opacity: 1,
			width: 'auto',
			x: 0,
			transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
		},
		hidden: {
			opacity: 0,
			width: 0,
			x: -10,
		},
	};

	const nextEvent = useMemo(() => {
		if (upcomingEvents.length === 0) return null;
		const nearestEvent = upcomingEvents[0];

		const targetDate = nearestEvent.date.split('~')[0].trim();
		const eventYear = nearestEvent.year;

		return {
			...nearestEvent,
			dDay: GetDDay(`${eventYear}.${targetDate}`),
		};
	}, [upcomingEvents]);

	const handleNavClick = (path: string) => {
		if (path.startsWith('http')) {
			window.open(path, '_blank', 'noopener,noreferrer');
		} else {
			navigate(path);
		}

		if (isMenuOpen) setIsMenuOpen(false);
	};

	return (
		<S.GNBContainer initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
			<S.Inner>
				<S.LogoGroup
					onClick={() => handleNavClick('/')}
					onMouseEnter={() => setIsLogoHovered(true)}
					onMouseLeave={() => setIsLogoHovered(false)}>
					<S.Logo className="logo">{METADATA.NAME}</S.Logo>
					<S.Tagline
						variants={tagVariants}
						initial={isSmallScreen ? 'visible' : 'hidden'}
						animate={isSmallScreen ? 'visible' : isLogoHovered ? 'visible' : 'hidden'}>
						{METADATA.DESCRIPTION}
					</S.Tagline>
				</S.LogoGroup>

				<S.NavGroup>
					{ACTIVE_NAV_ITEMS.map(item => (
						<S.NavItem key={item.id} onClick={() => handleNavClick(item.path)} $isActive={checkActive(item.path)}>
							{item.name}
						</S.NavItem>
					))}
				</S.NavGroup>

				<S.UtilGroup>
					<S.DDayContent className="pc-only">
						{nextEvent ? (
							<>
								<span className="label">{nextEvent.content}</span>
								<span className="count">{nextEvent.dDay}</span>
							</>
						) : (
							<span className="label">공연을 기다리며</span>
						)}
					</S.DDayContent>

					<S.MenuButton onClick={toggleMenu}>
						<MenuIcon isOpen={isMenuOpen} />
					</S.MenuButton>
				</S.UtilGroup>
			</S.Inner>

			<AnimatePresence>
				{isMenuOpen && (
					<>
						<S.MobileOverlay
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={toggleMenu}
						/>

						<S.MobileMenu
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
							<S.CloseButton onClick={toggleMenu} aria-label="Close Menu">
								<CloseIcon />
							</S.CloseButton>

							<S.MobileNavList>
								<S.MobileNavItem onClick={() => handleNavClick('/')} $isActive={currentPath === '/'}>
									HOME
								</S.MobileNavItem>

								{ACTIVE_NAV_ITEMS.map(item => (
									<S.MobileNavItem
										key={item.id}
										onClick={() => handleNavClick(item.path)}
										$isActive={checkActive(item.path)}>
										{item.name}
									</S.MobileNavItem>
								))}
							</S.MobileNavList>

							<S.MobileDDayFooter>
								{nextEvent ? (
									<>
										<span className="label">{nextEvent.content}</span>
										<span className="count">{nextEvent.dDay}</span>
									</>
								) : (
									<span className="label">공연을 기다리며</span>
								)}
							</S.MobileDDayFooter>
						</S.MobileMenu>
					</>
				)}
			</AnimatePresence>
		</S.GNBContainer>
	);
};

export default GNB;
