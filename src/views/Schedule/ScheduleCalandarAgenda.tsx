'use client';

// @/pages/Schedule/ScheduleCalandarAgenda

import * as S from '@/styles/pages/Schedule/ScheduleCalandarAgenda.style';

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { SCHEDULE_LABEL_MAP } from '@/const/schedule';
import Placeholder from '@/components/Placeholder';
import { Schedule } from '@/types/schedule';
import { FormatDate } from '@/utils/date';
import { BADGE_LABEL } from '@/components/BadgeList';

interface AgendaProps {
	selectedDate: Date;
	schedules: Record<string, Schedule[]>;
}

const ScheduleCalandarAgenda = ({ selectedDate, schedules }: AgendaProps) => {
	const router = useRouter();
	const dateStr = FormatDate(selectedDate);
	const dayEvents = schedules[dateStr] || [];

	const handleItemClick = (id?: string) => {
		if (id) {
			router.push(`/schedule/${id}`);
		}
	};

	return (
		<S.AgendaSection>
			<S.AgendaHeader>{format(selectedDate, 'yyyy년 MM월 d일')} 일정</S.AgendaHeader>

			{dayEvents.length > 0 ? (
				<S.AgendaList>
					{dayEvents.map(event => (
						<S.AgendaItem
							key={event.id}
							$eventType={event.type}
							onClick={() => handleItemClick(event.id)}
							role="button"
							tabIndex={0}>
							<S.ItemContentGroup>
								<S.TypeBadge $eventType={event.type}>{SCHEDULE_LABEL_MAP[event.type]}</S.TypeBadge>
								{event.ageLimit && <S.AdultBadge>{BADGE_LABEL.ADULT}</S.AdultBadge>}
								<S.ContentText>{event.content}</S.ContentText>
							</S.ItemContentGroup>

							{event.time && <S.TimeTag>{event.time}</S.TimeTag>}
						</S.AgendaItem>
					))}
				</S.AgendaList>
			) : (
				<Placeholder message="등록된 일정이 없습니다." />
			)}
		</S.AgendaSection>
	);
};

export default ScheduleCalandarAgenda;
