// @/hooks/handlecopy.ts

import toast from 'react-hot-toast';
import * as S from '@styles/components/Toast.style';

const handleCopy = (tag: string) => {
	navigator.clipboard.writeText(tag).then(() => {
		toast.success('복사 완료!', S.TOAST_OPTION);
	});
};

export default handleCopy;
