// @/pages/ScheduleCalendar/WeekScheduleView

import { useMemo, memo } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Schedule } from '@/types/schedule';
import { SWV_WEEK_CONTAINER, swvDayContainer, swvDayHeader, SWV_SCHEDULE_LIST, swvScheduleItem } from './calendar-classes';

interface WeekScheduleViewProps {
	viewDate: Date;
	selectedDate: Date;
	onSelectDate: (date: Date) => void;
	schedules: Record<string, Schedule[]>;
}

const ScheduleWeekView = ({ viewDate, selectedDate, onSelectDate, schedules }: WeekScheduleViewProps) => {
	const weekDays = useMemo(() => {
		const startDate = startOfWeek(viewDate, { weekStartsOn: 0 });
		return Array.from({ length: 7 }, (_, i) => addDays(startDate, i));
	}, [viewDate]);

	const today = new Date();

	return (
		<div className={SWV_WEEK_CONTAINER}>
			{weekDays.map(day => {
				const dateKey = format(day, 'yyyy-MM-dd');
				const daySchedules = schedules[dateKey] || [];
				const isToday = isSameDay(day, today);
				const isSelected = isSameDay(day, selectedDate);

				return (
					<div key={dateKey} className={swvDayContainer(isToday, isSelected)} onClick={() => onSelectDate(day)}>
						<div className={swvDayHeader(isToday, isSelected)}>
							<span className="day_name">{format(day, 'EEE', { locale: ko })}</span>
							<span className="day_number">{format(day, 'd')}</span>
						</div>

						<div className={SWV_SCHEDULE_LIST}>
							{daySchedules.map(sch => (
								<div
									key={sch.id || `${dateKey}-${sch.content}`}
									className={swvScheduleItem(sch.type, isSelected)}
									title={sch.content}>
									<span className="content">{sch.content}</span>
								</div>
							))}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default memo(ScheduleWeekView);
