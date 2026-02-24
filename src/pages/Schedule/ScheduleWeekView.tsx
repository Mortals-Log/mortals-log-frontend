// @components/Schedule/WeekScheduleView.tsx

import * as S from '@/styles/pages/Schedule/ScheduleWeekView.style';

import { format, startOfWeek, addDays, isSameDay } from 'date-fns';
import { Schedule } from '@/types/schedule';

interface WeekScheduleViewProps {
	viewDate: Date;
	selectedDate: Date;
	onSelectDate: (date: Date) => void;
	schedules: Record<string, Schedule[]>;
}

const ScheduleWeekView = ({ viewDate, selectedDate, onSelectDate, schedules }: WeekScheduleViewProps) => {
	const startDate = startOfWeek(viewDate, { weekStartsOn: 1 });
	const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startDate, i));

	return (
		<S.WeekContainer>
			{weekDays.map(day => {
				const dateKey = format(day, 'yyyy-MM-dd');
				const daySchedules = schedules[dateKey] || [];
				const isToday = isSameDay(day, new Date());
				const isSelected = isSameDay(day, selectedDate);

				return (
					<S.DayContainer key={dateKey} isToday={isToday} isSelected={isSelected} onClick={() => onSelectDate(day)}>
						<S.DayHeader isToday={isToday} isSelected={isSelected}>
							<span className="day_name">{format(day, 'EEE')}</span>
							<span className="day_number">{format(day, 'd')}</span>
						</S.DayHeader>

						<S.ScheduleList>
							{daySchedules.map((sch, idx) => (
								<S.ScheduleItem key={idx} eventType={sch.type} isSelected={isSelected} title={sch.content}>
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

export default ScheduleWeekView;
