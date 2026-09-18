import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import { NAME } from '@const/profile';
import Music from '@pages/Music';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | Music`,
	description: `${NAME.KOREAN}의 정규 앨범부터 싱글, 라이브까지 각 앨범의 상세 정보와 수록곡을 확인할 수 있습니다.`,
};

const Page = () => <Music />;

export default Page;
