// @pages/Schedule/ScheduleListView.tsx

import * as S from '@styles/pages/Schedule/ScheduleListView.style';
import { Schedule } from '@/types/schedule';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { FormatDate } from '@utils/schedule';
import Placeholder from '@/components/placeholder';

interface ScheduleListViewProps {
	viewDate: Date;
	selectedDate: Date;
	onSelectDate: (date: Date) => void;
	schedules: Record<string, Schedule[]>;
}

const ScheduleListView = ({ viewDate, selectedDate, onSelectDate, schedules }: ScheduleListViewProps) => {
	const monthStart = startOfMonth(viewDate);
	const monthEnd = endOfMonth(viewDate);
	const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

	const daysWithEvents = daysInMonth.filter(day => {
		const dateStr = FormatDate(day);
		return schedules[dateStr] && schedules[dateStr].length > 0;
	});

	const message = `${format(monthStart, 'yyyy년 M월')}의 일정이 없습니다.`;

	return (
		<S.ListWrapper>
			{daysWithEvents.length === 0 ? (
				<Placeholder message={message} />
			) : (
				daysWithEvents.map(day => {
					const dateStr = FormatDate(day);
					const dayEvents = schedules[dateStr];
					const isToday = isSameDay(day, new Date());
					const isSelected = isSameDay(day, selectedDate);

					return (
						<S.DayContainer key={dateStr} isToday={isToday} isSelected={isSelected} onClick={() => onSelectDate(day)}>
							<S.DayHeader isToday={isToday} isSelected={isSelected}>
								<span className="day_number">{format(day, 'd')}</span>
								<span className="day_name">{format(day, 'EEE')}</span>
							</S.DayHeader>

							<S.ScheduleList>
								{dayEvents.map((event, i) => (
									<S.ScheduleItem key={i} eventType={event.type} isSelected={isSelected}>
										{event.content}
									</S.ScheduleItem>
								))}
							</S.ScheduleList>
						</S.DayContainer>
					);
				})
			)}
		</S.ListWrapper>
	);
};

export default ScheduleListView;
