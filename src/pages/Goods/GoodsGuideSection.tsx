// @/pages/Goods/GoodsGuideSection

import * as S from '@/styles/pages/Goods/Goods.style';

import { FAN_GOODS_GUIDE } from '@/const/goods';

const GoodsGuideSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const { GOODS_MADE_TITLE, GOODS_MADE_RULES, CONTACT_TITLE, CONTACT_CHANNELS } = FAN_GOODS_GUIDE;

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.GuideSection>
				<p className="title">{GOODS_MADE_TITLE}</p>
				{GOODS_MADE_RULES.map((rule, index) => (
					<S.GuideItem key={index}>{rule}</S.GuideItem>
				))}
			</S.GuideSection>

			<S.GuideSection>
				<p className="title">{CONTACT_TITLE}</p>
				{CONTACT_CHANNELS.map(channel => {
					const Icon = channel.icon;

					return (
						<S.LinkButton key={channel.label} to={channel.url} target="_blank" rel="noopener noreferrer">
							{Icon && <Icon width={16} height={16} />}
							{channel.label}
						</S.LinkButton>
					);
				})}
			</S.GuideSection>
		</S.ContentSection>
	);
};

export default GoodsGuideSection;
