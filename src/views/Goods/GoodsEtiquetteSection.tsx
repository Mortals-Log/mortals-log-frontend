// @/pages/Goods/GoodsEttiquetteSection

import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { GOODS_GUIDE_SECTION, GOODS_GUIDE_ITEM, GOODS_GUIDE_SLOGAN } from './goods-classes';
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
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</div>

			<div className={GOODS_GUIDE_SLOGAN}>{GOODS_ETIQUETTE_SLOGAN}</div>

			<section className={GOODS_GUIDE_SECTION}>
				<p className="title">{GOODS_CAUTION_TITLE}</p>
				{GOODS_CAUTION_RULES.map((rule, index) => (
					<li key={index} className={GOODS_GUIDE_ITEM}>
						{rule}
					</li>
				))}
			</section>

			<section className={GOODS_GUIDE_SECTION}>
				<p className="title">{GOODS_ETIQUETTE_TITLE}</p>
				{GOODS_ETIQUETTE_RULES.map((rule, index) => (
					<li key={index} className={GOODS_GUIDE_ITEM}>
						{rule}
					</li>
				))}
			</section>
		</section>
	);
};

export default GoodsEttiquetteSection;
