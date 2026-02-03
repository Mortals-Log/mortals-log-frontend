// @components/placeholder.tsx

import * as S from '@styles/components/Placeholder.style';

const Placeholder = ({ contentName }: { contentName: string }) => {
	return <S.Placeholder>{contentName}은(는) 데이터 준비 후 업데이트될 예정입니다.</S.Placeholder>;
};

export default Placeholder;
