// @/pages/Goods/GoodsGuideSection

import Link from 'next/link';
import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { GOODS_GUIDE_SECTION, GOODS_GUIDE_ITEM, GOODS_LINK_BUTTON } from './goods-classes';
import { FAN_GOODS_GUIDE } from '@/const/goods';

const GoodsGuideSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const { GOODS_MADE_TITLE, GOODS_MADE_RULES, CONTACT_TITLE, CONTACT_CHANNELS } = FAN_GOODS_GUIDE;

	return (
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</div>

			<section className={GOODS_GUIDE_SECTION}>
				<p className="title">{GOODS_MADE_TITLE}</p>
				{GOODS_MADE_RULES.map((rule, index) => (
					<li key={index} className={GOODS_GUIDE_ITEM}>
						{rule}
					</li>
				))}
			</section>

			<section className={GOODS_GUIDE_SECTION}>
				<p className="title">{CONTACT_TITLE}</p>
				{CONTACT_CHANNELS.map(channel => {
					const Icon = channel.icon;

					return (
						<Link
							key={channel.label}
							href={channel.url}
							target="_blank"
							rel="noopener noreferrer"
							className={GOODS_LINK_BUTTON}>
							{Icon && <Icon width={16} height={16} />}
							{channel.label}
						</Link>
					);
				})}
			</section>
		</section>
	);
};

export default GoodsGuideSection;
