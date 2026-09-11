import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import { NAME } from '@const/profile';
import Song from '@pages/Song';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | Song`,
	description: `${NAME.KOREAN}의 모든 수록곡을 최신순, 발매순, 가나다순으로 확인할 수 있습니다.`,
};

const Page = () => <Song />;

export default Page;
