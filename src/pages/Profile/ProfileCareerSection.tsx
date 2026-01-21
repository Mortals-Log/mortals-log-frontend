// @src/pages/Profile/CareerTimelineSection.tsx

import * as S from '@styles/pages/Profile.style';
import { CAREER_HISTORY } from '@const/contents';
import { useState } from 'react';
import { ExpandButton } from '@/styles/components/buttons.style';

const ProfileCareerSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const ITEM_LIMIT = 6;

	const getVisibleHistory = () => {
		if (isExpanded) return CAREER_HISTORY;

		let count = 0;
		const filtered: typeof CAREER_HISTORY = [];

		for (const group of CAREER_HISTORY) {
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
				<span style={{ marginLeft: '20px', fontSize: '0.8rem' }}>
					* 현재 주요 활동은 정규 앨범, EP, 단독 콘서트만 확인할 수 있습니다.
				</span>
			</S.SectionTitle>
			<S.TimelineContainer $isExpanded={isExpanded}>
				{visibleHistory.map(group => (
					<S.TimelineYearGroup key={group.year}>
						<S.TimelineYearLabel>{group.year}</S.TimelineYearLabel>

						<S.TimelineItemList>
							{group.items.map(item => (
								<S.TimelineItem>
									<S.TimelineMarker />

									<S.TimelineContent>
										<S.TimelineDate>{item.date}</S.TimelineDate>
										<S.TimelineText>{item.content}</S.TimelineText>
									</S.TimelineContent>
								</S.TimelineItem>
							))}
						</S.TimelineItemList>
					</S.TimelineYearGroup>
				))}
			</S.TimelineContainer>

			<ExpandButton $isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
				{isExpanded ? '활동 이력 접기' : '전체 활동 이력 보기'}
				<S.ArrowIcon $isExpanded={isExpanded}>▼</S.ArrowIcon>
			</ExpandButton>
		</S.ContentSection>
	);
};

export default ProfileCareerSection;
