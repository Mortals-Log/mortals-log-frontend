'use client';

import { ThemeProvider } from '@emotion/react';
import { Toaster } from 'react-hot-toast';
import { Theme } from '@/styles/themes';
import GlobalStyle from '@/styles/GlobalStyles';
import GNB from '@/components/GNB';
import ScrollToTop from '@/const/ScrollToTop';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyle />
			<ScrollToTop />
			<GNB />
			<Toaster position="bottom-center" reverseOrder={false} />
			{children}
		</ThemeProvider>
	);
};

export default Providers;
