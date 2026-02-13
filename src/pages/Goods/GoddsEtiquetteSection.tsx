// @src/pages/Goods/GoodsEtiquetteSection

import * as S from '@styles/pages/Goods/GoodsGuideSection.style';
import { FAN_GOODS_GUIDE } from '@/const/goods';

const GoodsGuideSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
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
				<S.GuideTitle>{GOODS_CAUTION_TITLE}</S.GuideTitle>
				<S.GuideList>
					{GOODS_CAUTION_RULES.map((rule, index) => (
						<S.GuideItem key={index}>{rule}</S.GuideItem>
					))}
				</S.GuideList>
			</S.GuideSection>

			<S.GuideSection>
				<S.GuideTitle>{GOODS_ETIQUETTE_TITLE}</S.GuideTitle>
				<S.GuideList>
					{GOODS_ETIQUETTE_RULES.map((rule, index) => (
						<S.GuideItem key={index}>{rule}</S.GuideItem>
					))}
				</S.GuideList>
			</S.GuideSection>
		</S.ContentSection>
	);
};

export default GoodsGuideSection;
