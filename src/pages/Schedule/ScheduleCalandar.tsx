// @pages/Schedule/ScheduleCalendar

import * as S from '@styles/pages/Schedule/ScheduleCalendar.style';
import { useCallback, useState } from 'react';
import Calendar from 'react-calendar';
import ScheduleCalandarAgenda from '@pages/Schedule/ScheduleCalandarAgenda';
import ScheduleWeekView from '@pages/Schedule/ScheduleWeekView';
import ScheduleListView from '@pages/Schedule/ScheduleListView';
import ScheduleLabel from '@pages/Schedule/ScheduleLabel';
import { CALENDAR_SCHEDULES, FormatDate } from '@utils/schedule';

const ScheduleCalendar = () => {
	const today = new Date();
	const [selectedDate, setSelectedDate] = useState<Date>(today);
	const [viewDate, setViewDate] = useState<Date>(today);
	const [viewType, setViewType] = useState<'month' | 'week' | 'list'>('month');

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
		(type: 'month' | 'week' | 'list') => {
			setViewType(type);
			if (type === 'week' || type === 'list') {
				setViewDate(selectedDate);
			}
		},
		[selectedDate],
	);

	const handleMoveDate = useCallback(
		(direction: 'prev' | 'next') => {
			setViewDate(prev => {
				const nextDate = new Date(prev);
				if (viewType === 'week') {
					nextDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
				} else {
					nextDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
				}
				return nextDate;
			});
		},
		[viewType],
	);

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
					<button className={viewType === 'list' ? 'active' : ''} onClick={() => handleChangeViewType('list')}>
						List
					</button>
				</S.ViewSwitcher>
				<S.TodayButton onClick={handleGoToday}>TODAY</S.TodayButton>
			</S.ScheduleToolbar>
			<ScheduleLabel />

			{viewType === 'month' && (
				<Calendar
					calendarType="gregory"
					onChange={val => setSelectedDate(val as Date)}
					value={selectedDate}
					activeStartDate={viewDate}
					onActiveStartDateChange={({ activeStartDate }) => setViewDate(activeStartDate as Date)}
					formatDay={(_, date) => date.getDate().toString()}
					tileContent={renderTileContent}
				/>
			)}

			{viewType === 'week' && (
				<>
					<S.ScheduleNav>
						<button onClick={() => handleMoveDate('prev')}>&lt;</button>
						<span>
							{viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
						</span>
						<button onClick={() => handleMoveDate('next')}>&gt;</button>
					</S.ScheduleNav>

					<ScheduleWeekView
						viewDate={viewDate}
						selectedDate={selectedDate}
						onSelectDate={setSelectedDate}
						schedules={CALENDAR_SCHEDULES}
					/>
				</>
			)}

			{viewType === 'list' && (
				<>
					<S.ScheduleNav>
						<button onClick={() => handleMoveDate('prev')}>&lt;</button>
						<span>
							{viewDate.getFullYear()}년 {viewDate.getMonth() + 1}월
						</span>
						<button onClick={() => handleMoveDate('next')}>&gt;</button>
					</S.ScheduleNav>

					<ScheduleListView
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
