// @pages/Schedule/ScheduleDetail.tsx

import * as S from '@styles/pages/Schedule/ScheduleDetail.style';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { format, parse, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ALL_SCHEDULE_LIST } from '@/utils/schedule';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/placeholder';
import { SCHEDULE_LABEL_MAP } from '@/const/schedule';

const ScheduleDetail = () => {
	const { id } = useParams<{ id: string }>();

	const scheduleData = useMemo(() => {
		return ALL_SCHEDULE_LIST.find(item => String(item.id) === id);
	}, [id]);

	const formattedDate = useMemo(() => {
		if (!scheduleData?.date) return '-';
		const date = parse(scheduleData.date, 'yyyy.MM.dd', new Date());

		return isValid(date) ? format(date, 'yyyy.MM.dd (eee)', { locale: ko }) : scheduleData.date;
	}, [scheduleData]);

	if (!scheduleData) {
		return (
			<S.MainContainer>
				<BackButton to="/schedule" />
				<Placeholder message="일정을 찾을 수 없습니다." />
			</S.MainContainer>
		);
	}

	return (
		<S.MainContainer>
			<BackButton />

			<S.HeaderSection>
				<S.CategoryBadge $type={scheduleData.type}>
					{SCHEDULE_LABEL_MAP[scheduleData.type as keyof typeof SCHEDULE_LABEL_MAP]}
				</S.CategoryBadge>

				<S.MainTitle>{scheduleData.content}</S.MainTitle>

				<S.DateInfo>
					{formattedDate}
					{scheduleData.time && <span className="time">{scheduleData.time}</span>}
				</S.DateInfo>
			</S.HeaderSection>
		</S.MainContainer>
	);
};

export default ScheduleDetail;
