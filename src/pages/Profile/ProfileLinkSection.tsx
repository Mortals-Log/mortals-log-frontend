// @src/pages/Profile/components/ProfileLinkSection.tsx

import * as S from '@styles/pages/Profile/ProfileLinkSection.style';
import { Table } from '@components/Table';
import { LINK_LIST } from '@const/links';
import { ICON_CONFIG } from '@const/icons';
import { LinkGroup } from '@/types/links';
import { IconKey } from '@/types/icon';

export const ProfileLinkSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR} <span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.Table>
				<tbody>
					{LINK_LIST.map((group: LinkGroup) => (
						<Table
							key={group.category}
							label={group.category}
							values={[
								<S.LinkWrapper key={group.category}>
									{group.items.map(item => {
										const key = item.label.toLowerCase().replace(/\s+/g, '') as IconKey;
										const config = ICON_CONFIG[key];
										const Icon = config?.icon;

										return (
											<S.LinkButton key={item.label} href={item.url} target="_blank" rel="noreferrer">
												{Icon && <Icon width={16} height={16} />}
												{config?.label ?? item.label}
											</S.LinkButton>
										);
									})}
								</S.LinkWrapper>,
							]}
						/>
					))}
				</tbody>
			</S.Table>
		</S.ContentSection>
	);
};

export default ProfileLinkSection;
