// @/hooks/handlecopy.ts

import toast from 'react-hot-toast';
import { TOAST_OPTION } from '@/const/toast';

const handleCopy = (tag: string) => {
	navigator.clipboard.writeText(tag).then(() => {
		toast.success('복사 완료!', TOAST_OPTION);
	});
};

export default handleCopy;
