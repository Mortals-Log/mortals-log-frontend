// @pages/Schedule/ScheduleCalendar

import * as S from '@styles/pages/Schedule/ScheduleCalendar.style';
import { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import ScheduleCalandarAgenda from '@pages/Schedule/ScheduleCalandarAgenda';
import ScheduleWeekView from '@pages/Schedule/ScheduleWeekView';
import ScheduleLabel from '@pages/Schedule/ScheduleLabel';
import { CALENDAR_SCHEDULES, FormatDate } from '@utils/schedule';

const ScheduleCalendar = () => {
	const today = new Date();
	const [selectedDate, setSelectedDate] = useState<Date>(today);
	const [viewDate, setViewDate] = useState<Date>(today);
	const [viewType, setViewType] = useState<'month' | 'week'>('month');

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
			<S.ScheduleList>
				{dayEvents.map((event, i) => (
					<S.ScheduleItem key={i} eventType={event.type}>
						{event.content}
					</S.ScheduleItem>
				))}
			</S.ScheduleList>
		);
	}, []);

	const handleChangeViewType = useCallback(
		(type: 'month' | 'week') => {
			setViewType(type);

			if (type === 'week') {
				setViewDate(selectedDate);
			}
		},
		[selectedDate],
	);

	const handleMoveWeek = useCallback((direction: 'prev' | 'next') => {
		setViewDate(prev => {
			const nextDate = new Date(prev);
			nextDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
			return nextDate;
		});
	}, []);

	return (
		<S.ScheduleWrapper>
			<S.ScheduleToolbar>
				<S.ViewSwitcher>
					<button className={viewType === 'month' ? 'active' : ''} onClick={() => handleChangeViewType('month')}>
						Month
					</button>
					<button className={viewType === 'week' ? 'active' : ''} onClick={() => handleChangeViewType('week')}>
						Week
					</button>
				</S.ViewSwitcher>
				<S.TodayButton onClick={handleGoToday}>TODAY</S.TodayButton>
			</S.ScheduleToolbar>
			<ScheduleLabel />

			{viewType === 'month' ? (
				<Calendar
					calendarType="gregory"
					onChange={val => setSelectedDate(val as Date)}
					value={selectedDate}
					activeStartDate={viewDate}
					onActiveStartDateChange={({ activeStartDate }) => setViewDate(activeStartDate as Date)}
					formatDay={(_, date) => date.getDate().toString()}
					tileContent={renderTileContent}
				/>
			) : (
				<>
					<S.WeekNav>
						<button onClick={() => handleMoveWeek('prev')}>&lt;</button>
						<span>
							{viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
						</span>
						<button onClick={() => handleMoveWeek('next')}>&gt;</button>
					</S.WeekNav>

					<ScheduleWeekView
						viewDate={viewDate}
						selectedDate={selectedDate}
						onSelectDate={setSelectedDate}
						schedules={CALENDAR_SCHEDULES}
					/>
				</>
			)}

			<ScheduleCalandarAgenda selectedDate={selectedDate} />
		</S.ScheduleWrapper>
	);
};

export default ScheduleCalendar;
