import type { Metadata } from 'next';
import { METADATA } from '@/const/contents';
import Providers from './Providers';

export const metadata: Metadata = {
	title: METADATA.NAME,
	description: METADATA.DESCRIPTION,
	appleWebApp: { title: 'Mortals Log' },
	manifest: '/site.webmanifest',
	icons: {
		icon: [
			{ url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
			{ url: '/favicon.svg', type: 'image/svg+xml' },
		],
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
	openGraph: {
		title: METADATA.NAME,
		description: METADATA.DESCRIPTION,
		images: ['https://mortals-log.vercel.app/images/profile/main.jpg'],
		url: 'https://mortals-log.vercel.app',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
	},
};

export const viewport = {
	width: 'device-width',
	initialScale: 1,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="kr">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
