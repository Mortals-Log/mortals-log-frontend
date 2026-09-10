// @/pages/ScheduleCalendar/ScheduleListView

import { useMemo, memo } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import Placeholder from '@/components/Placeholder';
import { Schedule } from '@/types/schedule';
import { FormatDate } from '@/utils/date';
import { SLV_LIST_WRAPPER, slvDayContainer, slvDayHeader, SLV_SCHEDULE_LIST, slvScheduleItem } from './calendar-classes';

interface ScheduleListViewProps {
	viewDate: Date;
	selectedDate: Date;
	onSelectDate: (date: Date) => void;
	schedules: Record<string, Schedule[]>;
}

const ScheduleListView = ({ viewDate, selectedDate, onSelectDate, schedules }: ScheduleListViewProps) => {
	const daysWithEvents = useMemo(() => {
		const monthStart = startOfMonth(viewDate);
		const monthEnd = endOfMonth(viewDate);
		const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

		return daysInMonth.filter(day => {
			const dateStr = FormatDate(day);
			return schedules[dateStr] && schedules[dateStr].length > 0;
		});
	}, [viewDate, schedules]);

	const today = new Date();
	const message = `${format(viewDate, 'yyyy년 M월')}의 일정이 없습니다.`;

	return (
		<div className={SLV_LIST_WRAPPER}>
			{daysWithEvents.length === 0 ? (
				<Placeholder message={message} />
			) : (
				daysWithEvents.map(day => {
					const dateStr = FormatDate(day);
					const dayEvents = schedules[dateStr];
					const isToday = isSameDay(day, today);
					const isSelected = isSameDay(day, selectedDate);

					return (
						<div key={dateStr} className={slvDayContainer(isToday, isSelected)} onClick={() => onSelectDate(day)}>
							<div className={slvDayHeader(isToday, isSelected)}>
								<span className="day_number">{format(day, 'd')}</span>
								<span className="day_name">{format(day, 'EEE', { locale: ko })}</span>
							</div>

							<div className={SLV_SCHEDULE_LIST}>
								{dayEvents.map((event, i) => (
									<div
										key={event.id || `${dateStr}-${i}`}
										className={slvScheduleItem(event.type, isSelected)}>
										{event.content}
									</div>
								))}
							</div>
						</div>
					);
				})
			)}
		</div>
	);
};

export default memo(ScheduleListView);
