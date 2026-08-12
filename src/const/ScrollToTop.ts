'use client';

// @/const/ScrollToTop

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
	const pathname = usePathname();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'instant',
		});
	}, [pathname]);

	return null;
};

export default ScrollToTop;
