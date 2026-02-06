// @pages/Schedule/ScheduleCalandarAgenda

import * as S from '@styles/pages/Schedule/ScheduleCalandarAgenda.style';

import Placeholder from '@/components/placeholder';
import { FormatDate } from '@/utils/schedule';
import { Schedule } from '@/types/schedule';
import { format } from 'date-fns';

interface AgendaProps {
	selectedDate: Date;
	schedules: Record<string, Schedule[]>;
}

const ScheduleCalandarAgenda = ({ selectedDate, schedules }: AgendaProps) => {
	const dateStr = FormatDate(selectedDate);
	const dayEvents = schedules[dateStr] || [];

	return (
		<S.AgendaSection>
			<S.AgendaHeader>{format(selectedDate, 'M월 d일')} 일정</S.AgendaHeader>

			{dayEvents && dayEvents.length > 0 ? (
				dayEvents.map((event, i) => (
					<S.AgendaItem key={i} eventType={event.type}>
						{event.content}
					</S.AgendaItem>
				))
			) : (
				<Placeholder message={'일정이 없습니다.'} />
			)}
		</S.AgendaSection>
	);
};

export default ScheduleCalandarAgenda;
