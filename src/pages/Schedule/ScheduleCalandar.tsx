// @pages/Schedule/ScheduleCalendar

import * as S from '@styles/pages/Schedule/ScheduleCalendar.style';
import { useCallback, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import ScheduleCalandarAgenda from '@pages/Schedule/ScheduleCalandarAgenda';
import ScheduleWeekView from '@pages/Schedule/ScheduleWeekView';
import ScheduleListView from '@pages/Schedule/ScheduleListView';
import ScheduleLabel from '@pages/Schedule/ScheduleLabel';
import { CALENDAR_SCHEDULES } from '@utils/schedule';
import { FormatDate } from '@/utils/date';
import { SCHEDULE_TYPE_COLORS } from '@/const/schedule';

const ALL_TYPES = Object.keys(SCHEDULE_TYPE_COLORS);

const ScheduleCalendar = () => {
	const today = new Date();
	const [selectedDate, setSelectedDate] = useState<Date>(today);
	const [viewDate, setViewDate] = useState<Date>(today);
	const [viewType, setViewType] = useState<'month' | 'week' | 'list'>('month');
	const [activeFilters, setActiveFilters] = useState<string[]>(ALL_TYPES);

	const handleToggleAllFilters = useCallback(() => {
		setActiveFilters(prev => (prev.length === ALL_TYPES.length ? [] : [...ALL_TYPES]));
	}, []);

	const handleToggleFilter = useCallback((type: string) => {
		setActiveFilters(prev => (prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]));
	}, []);

	const filteredSchedules = useMemo(() => {
		if (activeFilters.length === 0) return {};

		const filtered: Record<string, any[]> = {};
		Object.entries(CALENDAR_SCHEDULES).forEach(([date, events]) => {
			const matchedEvents = events.filter(event => activeFilters.includes(event.type));
			if (matchedEvents.length > 0) {
				filtered[date] = matchedEvents;
			}
		});
		return filtered;
	}, [activeFilters]);

	const handleGoToday = useCallback(() => {
		const now = new Date();
		setSelectedDate(now);
		setViewDate(now);
	}, []);

	const renderTileContent = useCallback(
		({ date, view }: { date: Date; view: string }) => {
			if (view !== 'month') return null;

			const dateStr = FormatDate(date);
			const dayEvents = filteredSchedules[dateStr];

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
		},
		[filteredSchedules],
	);

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

			<ScheduleLabel
				activeFilters={activeFilters}
				onToggleFilter={handleToggleFilter}
				onToggleAllFilters={handleToggleAllFilters}
				totalCount={ALL_TYPES.length}
			/>

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
						schedules={filteredSchedules}
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
						schedules={filteredSchedules}
					/>
				</>
			)}

			<ScheduleCalandarAgenda selectedDate={selectedDate} schedules={filteredSchedules} />
		</S.ScheduleWrapper>
	);
};

export default ScheduleCalendar;
