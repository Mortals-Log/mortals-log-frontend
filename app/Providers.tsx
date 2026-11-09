'use client';

import AppToaster from '@/components/AppToaster';
import GNB from '@/components/GNB';
import ScrollToTop from '@/const/ScrollToTop';
import { useAuthLinkRedirect } from '@/hooks/admin/useAuthLinkRedirect';

const Providers = ({ children }: { children: React.ReactNode }) => {
	useAuthLinkRedirect();

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
