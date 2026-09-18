// @/pages/Profile/ProfileCareerSection

import { useMemo, useState } from 'react';
import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { EXPAND_BUTTON, ARROW_ICON } from '@/const/component-classes';
import { cn } from '@/utils/cn';
import {
	PC_TIMELINE_CONTAINER,
	PC_TIMELINE_YEAR_GROUP,
	PC_TIMELINE_ITEM_LIST,
	PC_TIMELINE_ITEM,
} from './profile-classes';
import { FULL_CAREER_HISTORY } from '@const/career';

const ProfileCareerSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const ITEM_LIMIT = 6;

	const visibleHistory = useMemo(() => {
		if (isExpanded) return FULL_CAREER_HISTORY;

		let totalCount = 0;
		return FULL_CAREER_HISTORY.reduce(
			(acc, group) => {
				if (totalCount >= ITEM_LIMIT) return acc;

				const remainingSlots = ITEM_LIMIT - totalCount;
				const slicedItems = group.items.slice(0, remainingSlots);

				if (slicedItems.length > 0) {
					acc.push({ ...group, items: slicedItems });
					totalCount += slicedItems.length;
				}
				return acc;
			},
			[] as typeof FULL_CAREER_HISTORY,
		);
	}, [isExpanded]);

	return (
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR} <span>{TITLE_EN}</span>
			</div>

			<div className={cn(PC_TIMELINE_CONTAINER, isExpanded ? 'after:opacity-0' : 'after:opacity-100')}>
				{visibleHistory.map(group => (
					<div key={group.year} className={PC_TIMELINE_YEAR_GROUP}>
						<p className="year-label">{group.year}</p>

						<div className={PC_TIMELINE_ITEM_LIST}>
							{group.items.map((item, idx) => (
								<div key={`${group.year}-${item.date}-${idx}`} className={PC_TIMELINE_ITEM}>
									<span className="date">{item.date}</span>
									<span className="content">{item.content}</span>
								</div>
							))}
						</div>
					</div>
				))}
			</div>

			<button
				className={cn(EXPAND_BUTTON, isExpanded ? 'mt-0' : 'mt-[-1.1rem]')}
				onClick={() => setIsExpanded(!isExpanded)}>
				{isExpanded ? '활동 이력 접기' : '전체 활동 이력 보기'}
				<span className={cn(ARROW_ICON, isExpanded ? 'rotate-180' : 'rotate-0')}>▼</span>
			</button>
		</section>
	);
};

export default ProfileCareerSection;
