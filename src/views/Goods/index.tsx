// @/views/Goods
'use client';

import * as S from '@/styles/pages/Goods/Goods.style';

import GoodsLinkSection from '@/views/Goods/GoodsLinkSection';
import GoodsGuideSection from '@/views/Goods/GoodsGuideSection';
import GoodsEtiquetteSection from '@/views/Goods/GoodsEtiquetteSection';
import { FAN_GOODS_GUIDE } from '@/const/goods';

const PAGE_TITLE = {
	MAIN: '굿즈 구매 및 제작 설명',
	SUB: 'GOODS & GUIDE',
} as const;

const SECTION_TITLE = {
	LINK: {
		TITLE_KR: '공식 굿즈',
		TITLE_EN: 'Official Goods',
	},
	GUIDE: {
		TITLE_KR: '굿즈 제작 안내',
		TITLE_EN: 'Fan Goods Guide',
	},
	ETIQUETTE: {
		TITLE_KR: '나눔 및 수령 에티켓',
		TITLE_EN: 'Fan Etiquette',
	},
} as const;

const { DESCRIPTION } = FAN_GOODS_GUIDE;

const Goods = () => {
	return (
		<S.MainContainer>
			<S.SubTitle>{PAGE_TITLE.SUB}</S.SubTitle>
			<S.MainTitle>{PAGE_TITLE.MAIN}</S.MainTitle>

			<S.Description>{DESCRIPTION}</S.Description>

			<GoodsLinkSection {...SECTION_TITLE.LINK} />
			<GoodsGuideSection {...SECTION_TITLE.GUIDE} />
			<GoodsEtiquetteSection {...SECTION_TITLE.ETIQUETTE} />
		</S.MainContainer>
	);
};

export default Goods;
