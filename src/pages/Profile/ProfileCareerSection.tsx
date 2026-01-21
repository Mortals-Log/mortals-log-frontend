// @src/pages/Profile/CareerTimelineSection.tsx

import * as S from '@styles/pages/Profile.style';
import { CAREER_HISTORY } from '@const/contents';

const ProfileCareerSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR} <span>{TITLE_EN}</span>
				<span style={{ marginLeft: '20px', fontSize: '0.8rem' }}>
					* 현재 주요 활동은 정규 앨범, EP, 단독 콘서트만 확인할 수 있습니다.
				</span>
			</S.SectionTitle>
			<S.TimelineContainer>
				{CAREER_HISTORY.map(group => (
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
		</S.ContentSection>
	);
};

export default ProfileCareerSection;
