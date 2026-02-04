// @pages/Schedule/ScheduleCalandarEvent

import * as S from '@styles/pages/Schedule/ScheduleCalandarAgenda.style';

import Placeholder from '@/components/placeholder';
import { CALENDAR_SCHEDULES, FormatDate } from '@/utils/schedule';

const ScheduleCalandarEvent = ({ selectedDate }: { selectedDate: Date }) => {
	const dateStr = FormatDate(selectedDate);
	const dayEvents = CALENDAR_SCHEDULES[dateStr];

	return (
		<S.AgendaSection>
			<S.AgendaHeader>{dateStr} 일정</S.AgendaHeader>

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

export default ScheduleCalandarEvent;
