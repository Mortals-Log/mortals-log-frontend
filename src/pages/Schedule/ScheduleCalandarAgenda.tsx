// @pages/Schedule/ScheduleCalandarAgenda

import * as S from '@styles/pages/Schedule/ScheduleCalandarAgenda.style';

import Placeholder from '@/components/placeholder';
import { FormatDate } from '@/utils/schedule';
import { Schedule } from '@/types/schedule';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';

interface AgendaProps {
	selectedDate: Date;
	schedules: Record<string, Schedule[]>;
}

const ScheduleCalandarAgenda = ({ selectedDate, schedules }: AgendaProps) => {
	const navigate = useNavigate();
	const dateStr = FormatDate(selectedDate);
	const dayEvents = schedules[dateStr] || [];

	const handleItemClick = (id?: string) => {
		if (id) {
			navigate(`/schedule/${id}`);
		}
	};
	return (
		<S.AgendaSection>
			<S.AgendaHeader>{format(selectedDate, 'yyyy년 MM월 d일')} 일정</S.AgendaHeader>

			{dayEvents && dayEvents.length > 0 ? (
				dayEvents.map(event => (
					<S.AgendaItem key={event.id} eventType={event.type} onClick={() => handleItemClick(event.id)}>
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
