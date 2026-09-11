// @/pages/Goods/GoodsLinkSection

import { useMemo } from 'react';
import Link from 'next/link';
import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { GOODS_GRID, GOODS_CARD_BUTTON } from './goods-classes';
import { LINK_LIST, LINK_SHOP } from '@const/links';

const GoodsLinkSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const shopItems = useMemo(() => LINK_LIST.find(link => link.category === 'SHOP')?.items || [], []);

	return (
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</div>

			<div className={GOODS_GRID}>
				{shopItems.map(item => {
					const labelInfo = LINK_SHOP[item.label as keyof typeof LINK_SHOP];

					if (!labelInfo) return null;

					return (
						<Link
							key={item.url}
							href={item.url}
							target="_blank"
							rel="noopener noreferrer"
							className={GOODS_CARD_BUTTON}>
							<span className="category">
								{item.label} - {labelInfo.CATEGORY_KR || 'CATEGORY'}
							</span>
							<strong className="item">{labelInfo.STORE || item.label}</strong>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default GoodsLinkSection;
