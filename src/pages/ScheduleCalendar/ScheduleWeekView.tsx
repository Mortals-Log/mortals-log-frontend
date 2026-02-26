// @/pages/ScheduleCalendar/WeekScheduleView

import * as S from '@/styles/pages/ScheduleCalendar/ScheduleWeekView.style';
import { useMemo, memo } from 'react';
import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { ko } from 'date-fns/locale';
import { Schedule } from '@/types/schedule';

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
		<S.WeekContainer>
			{weekDays.map(day => {
				const dateKey = format(day, 'yyyy-MM-dd');
				const daySchedules = schedules[dateKey] || [];
				const isToday = isSameDay(day, today);
				const isSelected = isSameDay(day, selectedDate);

				return (
					<S.DayContainer key={dateKey} $isToday={isToday} $isSelected={isSelected} onClick={() => onSelectDate(day)}>
						<S.DayHeader $isToday={isToday} $isSelected={isSelected}>
							<span className="day_name">{format(day, 'EEE', { locale: ko })}</span>
							<span className="day_number">{format(day, 'd')}</span>
						</S.DayHeader>

						<S.ScheduleList>
							{daySchedules.map(sch => (
								<S.ScheduleItem
									key={sch.id || `${dateKey}-${sch.content}`}
									$eventType={sch.type}
									$isSelected={isSelected}
									title={sch.content}>
									<span className="content">{sch.content}</span>
								</S.ScheduleItem>
							))}
						</S.ScheduleList>
					</S.DayContainer>
				);
			})}
		</S.WeekContainer>
	);
};

export default memo(ScheduleWeekView);
