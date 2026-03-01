// @/pages/Goods/GoodsEttiquetteSection

import * as S from '@/styles/pages/Goods/Goods.style';

import { FAN_GOODS_GUIDE } from '@/const/goods';

const GoodsEttiquetteSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const {
		GOODS_ETIQUETTE_SLOGAN,
		GOODS_CAUTION_TITLE,
		GOODS_CAUTION_RULES,
		GOODS_ETIQUETTE_TITLE,
		GOODS_ETIQUETTE_RULES,
	} = FAN_GOODS_GUIDE;

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.GuideSlogan>{GOODS_ETIQUETTE_SLOGAN}</S.GuideSlogan>

			<S.GuideSection>
				<p className="title">{GOODS_CAUTION_TITLE}</p>
				{GOODS_CAUTION_RULES.map((rule, index) => (
					<S.GuideItem key={index}>{rule}</S.GuideItem>
				))}
			</S.GuideSection>

			<S.GuideSection>
				<p className="title">{GOODS_ETIQUETTE_TITLE}</p>
				{GOODS_ETIQUETTE_RULES.map((rule, index) => (
					<S.GuideItem key={index}>{rule}</S.GuideItem>
				))}
			</S.GuideSection>
		</S.ContentSection>
	);
};

export default GoodsEttiquetteSection;
