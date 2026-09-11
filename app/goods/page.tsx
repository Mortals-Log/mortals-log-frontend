import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import { FAN_GOODS_GUIDE } from '@const/goods';
import Goods from '@pages/Goods';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | Goods`,
	description: FAN_GOODS_GUIDE.DESCRIPTION,
};

const Page = () => <Goods />;

export default Page;
