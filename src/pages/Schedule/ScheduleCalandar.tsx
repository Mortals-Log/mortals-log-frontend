// @pages/Schedule/ScheduleCalendar

import * as S from '@styles/pages/Schedule/ScheduleCalendar.style';
import { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import ScheduleCalandarAgenda from '@pages/Schedule/ScheduleCalandarAgenda';
import { CALENDAR_SCHEDULES, FormatDate } from '@utils/schedule';
import { Schedule, SCHEDULE_TYPE_COLORS } from '@/types/schedule';

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
			<S.CalendarToolbarContainer>
				<S.LabelContainer>
					<S.LabelList>
						{(Object.keys(SCHEDULE_TYPE_COLORS) as Schedule['type'][]).map(eventType => {
							const labelMap = {
								ALBUM: '앨범',
								CONCERT: '공연/음악감상회',
								ANNIVERSARY: '기념일',
								BIRTHDAY: '생일',
								EVENT: '이벤트',
							};

							return (
								<S.LabelItem eventType={eventType} key={eventType}>
									<S.LabelBadge eventType={eventType} />
									{labelMap[eventType]}
								</S.LabelItem>
							);
						})}
					</S.LabelList>
				</S.LabelContainer>

				<S.TodayButton onClick={handleGoToday}>TODAY</S.TodayButton>
			</S.CalendarToolbarContainer>

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
