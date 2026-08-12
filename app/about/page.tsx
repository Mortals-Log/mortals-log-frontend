import type { Metadata } from 'next';
import { METADATA } from '@/const/contents';
import About from '@/pages/About';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | About`,
	description: `${METADATA.NAME}의 저작권 정책 및 문의 정보를 확인하세요.`,
};

const Page = () => <About />;

export default Page;
