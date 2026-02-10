// @pages/Schedule/ScheduleDetail.tsx

import * as S from '@styles/pages/Schedule/ScheduleDetail.style';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { ALL_SCHEDULE_LIST } from '@/utils/schedule';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/placeholder';
import { SCHEDULE_LABEL_MAP } from '@/const/schedule';
import { ConcertItem } from '@/types/concert';
import ScheduleDetailConcert from '@pages/Schedule/ScheduleDetailConcert';
import { FULL_CONCERTS } from '@/const/concert';

const ScheduleDetail = () => {
	const { id } = useParams<{ id: string }>();

	const scheduleBase = useMemo(() => {
		return ALL_SCHEDULE_LIST.find(item => String(item.id) === id);
	}, [id]);

	const scheduleDetail = useMemo(() => {
		if (!scheduleBase?.targetId) return null;

		if (scheduleBase.type === 'CONCERT') {
			return FULL_CONCERTS.flatMap(g => g.items).find(i => i.id === scheduleBase.targetId);
		}

		return null;
	}, [scheduleBase]);

	if (!scheduleBase)
		return (
			<S.MainContainer>
				<BackButton to="/schedule" />
				<Placeholder message="일정을 찾을 수 없습니다." />
			</S.MainContainer>
		);

	const concertData = scheduleBase.type === 'CONCERT' ? (scheduleDetail as ConcertItem) : null;

	return (
		<S.MainContainer>
			<BackButton />

			<S.HeaderSection>
				<S.CategoryBadge>
					{scheduleBase.ageLimit ? '미성년자 관람 불가 | ' : ''}
					{SCHEDULE_LABEL_MAP[scheduleBase.type]}
				</S.CategoryBadge>
				<S.MainTitle ageLimit={scheduleBase.ageLimit || false}>{scheduleBase.content}</S.MainTitle>
				<S.DateInfo>
					{scheduleBase.date}

					{concertData?.times && concertData.times.length > 0 && <span className="time">{scheduleBase.time}</span>}
				</S.DateInfo>
			</S.HeaderSection>

			{scheduleBase.type === 'CONCERT' && concertData && (
				<ScheduleDetailConcert schedule={concertData} imageUrl={scheduleBase.imageUrl} content={scheduleBase.content} />
			)}
		</S.MainContainer>
	);
};

export default ScheduleDetail;
