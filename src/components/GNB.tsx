'use client';

// @/components/GNB

import * as S from '@/styles/components/GNB.style';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { startOfDay, parseISO, isAfter, isSameDay, differenceInDays } from 'date-fns';
import { AnimatePresence, Variants } from 'framer-motion';
import { ACTIVE_NAV_ITEMS, METADATA } from '@/const/contents';
import MenuIcon from '@/assets/icons/MenuIcon';
import CloseIcon from '@/assets/icons/CloseIcon';
import { CalendarSchedules } from '@/types/schedule';
import { CALENDAR_SCHEDULES } from '@/utils/schedule';

const getNextEvent = (schedules: CalendarSchedules) => {
	const today = startOfDay(new Date());
	const sortedDates = Object.keys(schedules).sort();

	for (const dateStr of sortedDates) {
		const eventDate = parseISO(dateStr);

		if (isAfter(eventDate, today) || isSameDay(eventDate, today)) {
			const diff = differenceInDays(eventDate, today);

			if (diff <= 30) {
				const firstEvent = schedules[dateStr][0];
				if (firstEvent) {
					return {
						...firstEvent,
						date: dateStr,
						dDay: diff === 0 ? 'D-DAY' : `D-${diff}`,
					};
				}
			} else {
				break;
			}
		}
	}
	return null;
};

const GNB = () => {
	const router = useRouter();
	const currentPath = usePathname();

	const [isLogoHovered, setIsLogoHovered] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isSmallScreen, setIsSmallScreen] = useState(typeof window !== 'undefined' ? window.innerWidth <= 1100 : false);
	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

	const nextEvent = useMemo(() => getNextEvent(CALENDAR_SCHEDULES), []);

	const checkActive = (path: string) => {
		if (path === '/') return currentPath === '/';

		if (path === '/music') {
			return currentPath.startsWith('/music') || currentPath.startsWith('/album') || currentPath.startsWith('/song');
		}

		return currentPath.startsWith(path);
	};

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
			setIsSmallScreen(width <= 1023);

			if (width > 1023 && isMenuOpen) {
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

	const handleNavClick = (path: string) => {
		if (path.startsWith('http')) {
			window.open(path, '_blank', 'noopener,noreferrer');
		} else {
			router.push(path);
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
					{nextEvent && (
						<S.DDayContent href={`/schedule/${nextEvent.id}`} className="pc-only">
							<span className="label">{nextEvent.content}</span>
							<span className="count">{nextEvent.dDay}</span>
						</S.DDayContent>
					)}

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

							{nextEvent && (
								<S.MobileDDayFooter href={`/schedule/${nextEvent.id}`}>
									<span className="label">{nextEvent.content}</span>
									<span className="count">{nextEvent.dDay}</span>
								</S.MobileDDayFooter>
							)}
						</S.MobileMenu>
					</>
				)}
			</AnimatePresence>
		</S.GNBContainer>
	);
};

export default GNB;
