// @src/pages/Goods/GoodsLinkSection

import * as S from '@styles/pages/Goods/GoodsLinkSection.style';
import { LINKS } from '@const/contents';

interface LinkDetail {
	CATEGORY_KR: string;
	STORE: string;
}

const LINK_CONTENT: Record<string, LinkDetail> = {
	CD: {
		CATEGORY_KR: '앨범',
		STORE: '김밥레코즈',
	},
	LP: {
		CATEGORY_KR: 'LP(바이닐)',
		STORE: '레이블 이릴레반트',
	},
	Goods: {
		CATEGORY_KR: '천진우 공식 굿즈샵',
		STORE: '마플샵',
	},
};

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
					const label = LINK_CONTENT[item.label];

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
