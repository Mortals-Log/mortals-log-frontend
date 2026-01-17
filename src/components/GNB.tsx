import * as S from '@styles/components/GNB.style';
import { Variants } from 'motion';
import { useEffect, useMemo, useState } from 'react';
import { DUMMY_SCHEDULE } from '@const/dummy_data';
import { GetDDay } from '@utils/date';
import { ACTIVE_NAV_ITEMS, METADATA } from '@/const/contents';
import { AnimatePresence } from 'framer-motion';
import MenuIcon from '@assets/icons/MenuIcon';
import CloseIcon from '@assets/icons/CloseIcon';
import { useNavigate } from 'react-router-dom';

const GNB = () => {
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
		const upcoming = DUMMY_SCHEDULE.map(event => ({
			...event,
			dDay: GetDDay(event.date.split(' ~ ')[0]),
		}))
			.filter(event => event.dDay !== null)
			.sort((a, b) => {
				const dateA = new Date(a.date.replace(/\./g, '-')).getTime();
				const dateB = new Date(b.date.replace(/\./g, '-')).getTime();
				return dateA - dateB;
			});

		return upcoming[0] || null;
	}, []);

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
						<S.NavItem key={item.id} onClick={() => handleNavClick(item.path)}>
							{item.name}
						</S.NavItem>
					))}
				</S.NavGroup>

				<S.UtilGroup>
					<S.DDayContent className="pc-only">
						{nextEvent ? (
							<>
								<span className="label">{nextEvent.title}</span>
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
								<S.MobileNavItem onClick={() => handleNavClick('/')}>HOME</S.MobileNavItem>

								{ACTIVE_NAV_ITEMS.map(item => (
									<S.MobileNavItem key={item.id} onClick={() => handleNavClick(item.path)}>
										{item.name}
									</S.MobileNavItem>
								))}
							</S.MobileNavList>

							<S.MobileDDayFooter>
								{nextEvent ? (
									<>
										<span className="label">{nextEvent.title}</span>
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
