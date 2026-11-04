import type { Metadata } from 'next';
import Admin from '@pages/Admin';

export const metadata: Metadata = {
	title: 'Mortals Log | Admin',
	robots: { index: false, follow: false },
};

const Page = () => <Admin />;

export default Page;
