// @src/pages/Goods/GoodsLinkSection

import * as S from '@/styles/pages/Goods/Goods.style';

import { LINK_LIST, LINK_SHOP } from '@const/links';
import { useMemo } from 'react';

const GoodsLinkSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const shopItems = useMemo(() => LINK_LIST.find(link => link.category === 'SHOP')?.items || [], []);

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.Grid>
				{shopItems.map(item => {
					const labelInfo = LINK_SHOP[item.label as keyof typeof LINK_SHOP];

					if (!labelInfo) return null;

					return (
						<S.CardButton key={item.url} to={item.url} target="_blank" rel="noopener noreferrer">
							<span className="category">
								{item.label} - {labelInfo.CATEGORY_KR || 'CATEGORY'}
							</span>
							<strong className="item">{labelInfo.STORE || item.label}</strong>
						</S.CardButton>
					);
				})}
			</S.Grid>
		</S.ContentSection>
	);
};

export default GoodsLinkSection;
