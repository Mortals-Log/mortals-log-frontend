// @src/pages/Goods/GoodsGuideSection

import * as S from '@styles/pages/Goods/GoodsGuideSection.style';
import { FAN_GOODS_GUIDE } from '@/const/goods';

const GoodsGuideSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const { RULES_TITLE, rules, CONTACT_TITLE, CONTACT_CHANNELS } = FAN_GOODS_GUIDE;

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.GuideSection>
				<S.GuideTitle>{RULES_TITLE}</S.GuideTitle>
				<S.GuideList>
					{rules.map((rule, index) => (
						<S.GuideItem key={index}>{rule}</S.GuideItem>
					))}
				</S.GuideList>
			</S.GuideSection>

			<S.GuideSection>
				<S.GuideTitle>{CONTACT_TITLE}</S.GuideTitle>
				<S.ButtonGroup>
					{CONTACT_CHANNELS.map(channel => {
						const Icon = channel.icon;

						return (
							<S.LinkButton key={channel.label} href={channel.url} target="_blank" rel="noopener noreferrer">
								{Icon && <Icon width={16} height={16} />}
								{channel.label}
							</S.LinkButton>
						);
					})}
				</S.ButtonGroup>
			</S.GuideSection>
		</S.ContentSection>
	);
};

export default GoodsGuideSection;
