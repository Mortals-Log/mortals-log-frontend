'use client';

// @/components/GNB

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { startOfDay, parseISO, isAfter, isSameDay, differenceInDays } from 'date-fns';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { ACTIVE_NAV_ITEMS, METADATA } from '@/const/contents';
import MenuIcon from '@/assets/icons/MenuIcon';
import CloseIcon from '@/assets/icons/CloseIcon';
import { CalendarSchedules } from '@/types/schedule';
import { CALENDAR_SCHEDULES } from '@/utils/schedule';
import { cn } from '@/utils/cn';

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

const navItemClass = (isActive: boolean) =>
	cn(
		'relative w-fit font-serif text-xs font-semibold tracking-[0.15em] cursor-pointer no-underline text-black hover:text-primary active:text-primary',
		isActive &&
			"text-primary after:content-[''] after:absolute after:w-[3px] after:h-[3px] after:rounded-full after:bg-primary",
	);

const mobileNavItemClass = (isActive: boolean) =>
	cn(
		'relative w-fit font-serif text-md font-semibold tracking-[0.1em] cursor-pointer text-black hover:text-primary active:text-primary max-mobile:font-medium',
		isActive &&
			"text-primary after:content-[''] after:absolute after:w-[4px] after:h-[4px] after:rounded-full after:bg-primary",
	);

const GNB = () => {
	const router = useRouter();
	const currentPath = usePathname();

	const [isLogoHovered, setIsLogoHovered] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	// SSR 시엔 window 가 없어 항상 false 로 렌더된다. 클라이언트 첫 렌더에서
	// 곧바로 실제 폭을 읽으면 서버 결과와 달라져 하이드레이션이 깨지므로,
	// 마운트 시 useEffect(handleResize) 가 보정할 때까지 false 로 고정한다.
	const [isSmallScreen, setIsSmallScreen] = useState(false);
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
		<motion.nav
			className="fixed top-0 left-0 w-full h-[60px] z-[9999] bg-transparent backdrop-blur-[30px] print:hidden"
			initial={{ y: -100 }}
			animate={{ y: 0 }}
			transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
			<div className="flex relative max-w-[1200px] h-full px-8 mx-auto items-center justify-between">
				<div
					className="group flex flex-1 items-center gap-4 z-10 relative w-fit cursor-pointer"
					onClick={() => handleNavClick('/')}
					onMouseEnter={() => setIsLogoHovered(true)}
					onMouseLeave={() => setIsLogoHovered(false)}>
					<div className="font-serif text-md font-semibold text-black tracking-[-0.05em] transition-opacity duration-200 group-hover:text-primary group-active:text-primary">
						{METADATA.NAME}
					</div>
					<motion.div
						className="flex items-center font-sans text-xs font-medium text-gray-500 whitespace-nowrap bg-transparent max-laptop:absolute max-laptop:bottom-full max-laptop:left-0 max-laptop:opacity-100! max-laptop:w-auto! max-laptop:h-auto! max-laptop:translate-y-[-2px]! max-laptop:text-tiny"
						variants={tagVariants}
						initial={isSmallScreen ? 'visible' : 'hidden'}
						animate={isSmallScreen ? 'visible' : isLogoHovered ? 'visible' : 'hidden'}>
						{METADATA.DESCRIPTION}
					</motion.div>
				</div>

				<ul className="flex flex-[2] items-center justify-center list-none gap-12 z-[5] max-laptop:gap-[1.8rem] max-laptop:mx-4 max-tablet:hidden">
					{ACTIVE_NAV_ITEMS.map(item => (
						<motion.li
							key={item.id}
							onClick={() => handleNavClick(item.path)}
							className={navItemClass(checkActive(item.path))}>
							{item.name}
						</motion.li>
					))}
				</ul>

				<div className="flex flex-1 h-full items-center justify-end shrink-0 min-w-0 gap-[0.8rem] z-10">
					{nextEvent && (
						<Link
							href={`/schedule/${nextEvent.id}`}
							className="flex h-full min-w-0 items-center ml-2 gap-2 text-sm whitespace-nowrap leading-[1.5] max-tablet:hidden">
							<span className="font-serif font-medium text-gray-500 overflow-hidden text-ellipsis">
								{nextEvent.content}
							</span>
							<span className="shrink-0 font-sans font-semibold text-primary">{nextEvent.dDay}</span>
						</Link>
					)}

					<button className="hidden relative p-[10px] cursor-pointer max-tablet:block" onClick={toggleMenu}>
						<MenuIcon isOpen={isMenuOpen} />
					</button>
				</div>
			</div>

			<AnimatePresence>
				{isMenuOpen && (
					<>
						<motion.div
							className="fixed top-0 left-0 w-full h-screen bg-black/10 z-[1500]"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							onClick={toggleMenu}
						/>

						<motion.div
							className="flex flex-col fixed w-[70%] max-w-[320px] h-screen top-0 right-0 z-[2000] bg-white py-[100px] px-10 gap-8"
							initial={{ x: '100%' }}
							animate={{ x: 0 }}
							exit={{ x: '100%' }}
							transition={{ type: 'spring', damping: 25, stiffness: 200 }}>
							<button
								className="flex absolute w-8 h-8 top-5 right-8 items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-110 active:scale-90"
								onClick={toggleMenu}
								aria-label="Close Menu">
								<CloseIcon />
							</button>

							<ul className="flex flex-col gap-10 list-none max-tablet:gap-8">
								<li onClick={() => handleNavClick('/')} className={mobileNavItemClass(currentPath === '/')}>
									HOME
								</li>

								{ACTIVE_NAV_ITEMS.map(item => (
									<li
										key={item.id}
										onClick={() => handleNavClick(item.path)}
										className={mobileNavItemClass(checkActive(item.path))}>
										{item.name}
									</li>
								))}
							</ul>

							{nextEvent && (
								<Link
									href={`/schedule/${nextEvent.id}`}
									className="flex flex-col mt-auto pt-4 gap-2 border-t border-gray-200 font-serif">
									<span className="text-xs font-medium text-gray-500">{nextEvent.content}</span>
									<span className="text-xl font-semibold text-primary">{nextEvent.dDay}</span>
								</Link>
							)}
						</motion.div>
					</>
				)}
			</AnimatePresence>
		</motion.nav>
	);
};

export default GNB;
