'use client';

import { Toaster } from 'react-hot-toast';
import GNB from '@/components/GNB';
import ScrollToTop from '@/const/ScrollToTop';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<ScrollToTop />
			<GNB />
			<Toaster position="bottom-center" reverseOrder={false} />
			{children}
		</>
	);
};

export default Providers;
