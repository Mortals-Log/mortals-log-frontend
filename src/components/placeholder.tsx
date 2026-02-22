// @components/placeholder.tsx

import * as S from '@/styles/components/Placeholder.style';

interface PlaceholderProps {
	contentName?: string;
	message?: string;
}

const Placeholder = ({ contentName, message }: PlaceholderProps) => {
	return (
		<S.Placeholder>{message ? message : `${contentName}은(는) 데이터 준비 후 업데이트될 예정입니다.`}</S.Placeholder>
	);
};

export default Placeholder;
