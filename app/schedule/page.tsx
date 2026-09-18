import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import { NAME } from '@const/profile';
import Schedule from '@pages/Schedule';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | Schedule`,
	description: `${NAME.KOREAN}의 공연, 앨범 발매, 인터뷰 등 주요 일정을 한눈에 확인하실 수 있습니다.`,
};

const Page = () => <Schedule />;

export default Page;
