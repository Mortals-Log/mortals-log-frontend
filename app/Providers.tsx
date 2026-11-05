'use client';

import AppToaster from '@/components/AppToaster';
import GNB from '@/components/GNB';
import ScrollToTop from '@/const/ScrollToTop';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ScrollToTop />
			<GNB />
			<AppToaster />
			{children}
		</>
	);
};

export default Providers;
