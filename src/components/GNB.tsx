import * as S from '@styles/components/GNB.style';
import { Variants } from 'motion';
import { useMemo, useState } from 'react';
import { DUMMY_SCHEDULE } from '@const/constant';
import { GetDDay } from '@utils/date';

const GNB = () => {
	const [isLogoHovered, setIsLogoHovered] = useState(false);
	const isSmallScreen = typeof window !== 'undefined' && window.innerWidth <= 1100;

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

	const menuItems = [
		{ name: 'PROFILE', path: '#profile' },
		{ name: 'ALBUM', path: '#album' },
		{ name: 'SCHEDULE', path: '#schedule' },
		{ name: 'GOODS', path: '#goods' },
		{ name: 'ABOUT', path: '#about' },
		// { name: 'PHOTOS', path: '#photos' },
	];

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

	return (
		<S.GNBContainer initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
			<S.Inner>
				<S.LogoGroup onMouseEnter={() => setIsLogoHovered(true)} onMouseLeave={() => setIsLogoHovered(false)}>
					<S.Logo>MORTALS LOG</S.Logo>
					<S.Tagline
						variants={tagVariants}
						initial={isSmallScreen ? 'visible' : 'hidden'}
						animate={isSmallScreen ? 'visible' : isLogoHovered ? 'visible' : 'hidden'}>
						필멸자들을 위한 비공식 팬페이지
					</S.Tagline>
				</S.LogoGroup>

				<S.NavList>
					{menuItems.map(item => (
						<S.NavItem key={item.name} whileHover={{ y: -2 }}>
							{item.name}
						</S.NavItem>
					))}
				</S.NavList>

				<S.DDayGroup>
					{nextEvent ? (
						<>
							<span className="label">{nextEvent.title}</span>
							<span className="count">{nextEvent.dDay}</span>
						</>
					) : (
						<>
							{/* todo: 음악 추천 혹은 스트리밍으로 연결하는 기능을 추가하면 좋을듯함 */}
							<span className="label">공연을 기다리며</span>
						</>
					)}
				</S.DDayGroup>
			</S.Inner>
		</S.GNBContainer>
	);
};

export default GNB;
