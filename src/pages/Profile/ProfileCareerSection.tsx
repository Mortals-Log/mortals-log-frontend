// @src/pages/Profile/ProfileCareerSection.tsx

import * as S from '@styles/pages/Profile';
import * as T from '@styles/components/TimeLine.style';
import { FULL_CAREER_HISTORY } from '@const/career';
import { useState } from 'react';

const ProfileCareerSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const ITEM_LIMIT = 6;

	const getVisibleHistory = () => {
		if (isExpanded) return FULL_CAREER_HISTORY;

		let count = 0;
		const filtered: typeof FULL_CAREER_HISTORY = [];

		for (const group of FULL_CAREER_HISTORY) {
			if (count >= ITEM_LIMIT) break;

			const remainingSlots = ITEM_LIMIT - count;
			const itemsToInclude = group.items.slice(0, remainingSlots);

			if (itemsToInclude.length > 0) {
				filtered.push({
					...group,
					items: itemsToInclude,
				});
				count += itemsToInclude.length;
			}
		}
		return filtered;
	};

	const visibleHistory = getVisibleHistory();

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR} <span>{TITLE_EN}</span>
			</S.SectionTitle>
			<T.TimelineContainer $isExpanded={isExpanded}>
				{visibleHistory.map(group => (
					<T.TimelineYearGroup key={group.year}>
						<T.TimelineYearLabel>{group.year}</T.TimelineYearLabel>

						<T.TimelineItemList>
							{group.items.map(item => (
								<T.TimelineItem key={`${group.year}-${item.date}-${item.content}`}>
									<T.TimelineMarker />

									<T.TimelineContent>
										<T.TimelineDate>{item.date}</T.TimelineDate>
										<T.TimelineText>{item.content}</T.TimelineText>
									</T.TimelineContent>
								</T.TimelineItem>
							))}
						</T.TimelineItemList>
					</T.TimelineYearGroup>
				))}
			</T.TimelineContainer>

			<S.ExpandButton $isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
				{isExpanded ? '활동 이력 접기' : '전체 활동 이력 보기'}
				<S.ArrowIcon $isExpanded={isExpanded}>▼</S.ArrowIcon>
			</S.ExpandButton>
		</S.ContentSection>
	);
};

export default ProfileCareerSection;
