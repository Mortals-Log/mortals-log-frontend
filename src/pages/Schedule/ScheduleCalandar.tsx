// @pages/Schedule/ScheduleCalendar

import * as S from '@styles/pages/Schedule/ScheduleCalendar.style';
import { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import ScheduleCalandarAgenda from '@pages/Schedule/ScheduleCalandarAgenda';
import { CALENDAR_SCHEDULES, FormatDate } from '@utils/schedule';

const ScheduleCalendar = () => {
	const today = new Date();
	const [selectedDate, setSelectedDate] = useState<Date>(today);
	const [viewDate, setViewDate] = useState<Date>(today);

	const handleGoToday = useCallback(() => {
		const now = new Date();
		setSelectedDate(now);
		setViewDate(now);
	}, []);

	const renderTileContent = useCallback(({ date, view }: { date: Date; view: string }) => {
		if (view !== 'month') return null;

		const dateStr = FormatDate(date);
		const dayEvents = CALENDAR_SCHEDULES[dateStr];

		if (!dayEvents) return null;

		return (
			<S.EventListContainer>
				{dayEvents.map((event, i) => (
					<S.EventItem key={i} eventType={event.type}>
						{event.content}
					</S.EventItem>
				))}
			</S.EventListContainer>
		);
	}, []);

	return (
		<S.StyledCalendarWrapper>
			<S.TodayButtonContainer>
				<S.TodayButton onClick={handleGoToday}>TODAY</S.TodayButton>
			</S.TodayButtonContainer>

			<Calendar
				calendarType="gregory"
				onChange={val => setSelectedDate(val as Date)}
				value={selectedDate}
				activeStartDate={viewDate}
				onActiveStartDateChange={({ activeStartDate }) => setViewDate(activeStartDate as Date)}
				formatDay={(_, date) => date.getDate().toString()}
				tileContent={renderTileContent}
			/>

			<ScheduleCalandarAgenda selectedDate={selectedDate} />
		</S.StyledCalendarWrapper>
	);
};

export default ScheduleCalendar;
