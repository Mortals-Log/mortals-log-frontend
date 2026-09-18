import type { Metadata } from 'next';
import { METADATA } from '@/const/contents';
import { NAME } from '@/const/profile';
import Profile from '@/views/Profile';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | Profile`,
	description: `${NAME.KOREAN}의 프로필, 주요 활동 및 디스코그래피를 확인하세요.`,
	openGraph: {
		images: ['/images/profile/main.jpg'],
	},
};

const Page = () => <Profile />;

export default Page;
