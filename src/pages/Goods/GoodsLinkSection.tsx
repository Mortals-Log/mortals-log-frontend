// @src/pages/Goods/GoodsLinkSection

import * as S from '@styles/pages/Goods/GoodsLinkSection.style';
import { LINKS } from '@const/links';
import { SHOP_LINK_CONTENT } from '@/const/links';

const GoodsLinkSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const shopItems = LINKS.find(link => link.category === 'SHOP')?.items || [];

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.Grid>
				{shopItems.map(item => {
					const label = SHOP_LINK_CONTENT[item.label];

					return (
						<S.CardButton key={item.label} href={item.url} target="_blank" rel="noopener noreferrer">
							<S.CategoryLabel>
								{item.label} - {label.CATEGORY_KR ?? item.label}
							</S.CategoryLabel>
							<S.ItemLabel>{label.STORE ?? item.label}</S.ItemLabel>
						</S.CardButton>
					);
				})}
			</S.Grid>
		</S.ContentSection>
	);
};

export default GoodsLinkSection;
