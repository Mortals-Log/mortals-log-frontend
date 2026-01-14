import * as S from '@styles/components/GNB.style';
import { Variants } from 'motion';
import { useState } from 'react';

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
					<span className="label">NEXT LIVE</span>
					<span className="count">D-03</span>
				</S.DDayGroup>
			</S.Inner>
		</S.GNBContainer>
	);
};

export default GNB;
