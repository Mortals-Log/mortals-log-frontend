// @src/pages/Profile/ProfileCareerSection.tsx

import * as S from '@styles/pages/Profile/ProfileCareerSection.style';
import { useMemo, useState } from 'react';
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
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR} <span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.TimelineContainer $isExpanded={isExpanded}>
				{visibleHistory.map(group => (
					<S.TimelineYearGroup key={group.year}>
						<p className="year-label">{group.year}</p>

						<S.TimelineItemList>
							{group.items.map((item, idx) => (
								<S.TimelineItem key={`${group.year}-${item.date}-${idx}`}>
									<span className="date">{item.date}</span>
									<span className="content">{item.content}</span>
								</S.TimelineItem>
							))}
						</S.TimelineItemList>
					</S.TimelineYearGroup>
				))}
			</S.TimelineContainer>

			<S.ExpandButton $isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
				{isExpanded ? '활동 이력 접기' : '전체 활동 이력 보기'}
				<S.ArrowIcon $isExpanded={isExpanded}>▼</S.ArrowIcon>
			</S.ExpandButton>
		</S.ContentSection>
	);
};

export default ProfileCareerSection;
