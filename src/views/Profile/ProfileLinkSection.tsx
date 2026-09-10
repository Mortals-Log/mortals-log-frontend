// @/pages/Profile/ProfileLinkSection

import Link from 'next/link';
import { Table } from '@/components/Table';
import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { TABLE_WRAPPER, LINK_BUTTON } from '@/const/component-classes';
import { LINK_LIST } from '@/const/links';
import { ICON_CONFIG } from '@/const/icons';
import { LinkGroup } from '@/types/links';
import { IconKey } from '@/types/icon';

export const ProfileLinkSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	return (
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR} <span>{TITLE_EN}</span>
			</div>

			<table className={TABLE_WRAPPER}>
				<tbody>
					{LINK_LIST.map((group: LinkGroup) => (
						<Table
							key={group.category}
							label={group.category}
							values={[
								<div className="flex flex-wrap gap-2" key={group.category}>
									{group.items.map(item => {
										const key = item.label.toLowerCase().replace(/\s+/g, '') as IconKey;
										const config = ICON_CONFIG[key];
										const Icon = config?.icon;

										return (
											<Link key={item.label} href={item.url} target="_blank" rel="noreferrer" className={LINK_BUTTON}>
												{Icon && <Icon width={16} height={16} />}
												{config?.label ?? item.label}
											</Link>
										);
									})}
								</div>,
							]}
						/>
					))}
				</tbody>
			</table>
		</section>
	);
};

export default ProfileLinkSection;
