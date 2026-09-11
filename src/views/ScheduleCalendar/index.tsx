// @/views/ScheduleCalendar

import { useCallback, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import { SCHEDULE_TYPE_COLORS } from '@/const/schedule';
import { CALENDAR_SCHEDULES } from '@utils/schedule';
import { FormatDate } from '@/utils/date';
import { Schedule } from '@/types/schedule';

import ScheduleCalandarAgenda from '@/views/Schedule/ScheduleCalandarAgenda';
import ScheduleWeekView from '@/views/ScheduleCalendar/ScheduleWeekView';
import ScheduleListView from '@/views/ScheduleCalendar/ScheduleListView';
import ScheduleLabel from '@/views/ScheduleCalendar/ScheduleLabel';
import {
	SC_TOOLBAR,
	SC_VIEW_SWITCHER,
	SC_TODAY_BUTTON,
	scWrapper,
	SC_SCHEDULE_LIST,
	scTileItem,
} from './calendar-classes';

const ALL_TYPES = Object.keys(SCHEDULE_TYPE_COLORS) as Schedule['type'][];

const ScheduleCalendar = () => {
	const today = useMemo(() => new Date(), []);
	const [selectedDate, setSelectedDate] = useState<Date>(today);
	const [viewDate, setViewDate] = useState<Date>(today);
	const [viewType, setViewType] = useState<'month' | 'week' | 'list'>('month');
	const [activeFilters, setActiveFilters] = useState<Schedule['type'][]>(ALL_TYPES);

	const filteredSchedules = useMemo(() => {
		if (activeFilters.length === 0) return {};
		if (activeFilters.length === ALL_TYPES.length) return CALENDAR_SCHEDULES;

		return Object.entries(CALENDAR_SCHEDULES).reduce(
			(acc, [date, events]) => {
				const matched = events.filter(event => activeFilters.includes(event.type));
				if (matched.length > 0) acc[date] = matched;
				return acc;
			},
			{} as Record<string, Schedule[]>,
		);
	}, [activeFilters]);

	const handleNavigate = useCallback((direction: 'next' | 'prev', unit: 'week' | 'month') => {
		setViewDate(prev => {
			const nextDate = new Date(prev);
			if (unit === 'week') {
				nextDate.setDate(prev.getDate() + (direction === 'next' ? 7 : -7));
			} else {
				nextDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
			}
			return nextDate;
		});
	}, []);

	const handleToggleFilter = useCallback((type: Schedule['type']) => {
		setActiveFilters(prev => (prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]));
	}, []);

	const handleToggleAllFilters = useCallback(() => {
		setActiveFilters(prev => (prev.length === ALL_TYPES.length ? [] : ALL_TYPES));
	}, []);

	const handleGoToday = useCallback(() => {
		setSelectedDate(today);
		setViewDate(today);
	}, [today]);

	const renderTileContent = useCallback(
		({ date, view }: { date: Date; view: string }) => {
			if (view !== 'month') return null;
			const events = filteredSchedules[FormatDate(date)];
			if (!events) return null;

			return (
				<div className={SC_SCHEDULE_LIST}>
					{events.map((event, i) => (
						<div key={`${event.id}-${i}`} className={scTileItem(event.type)}>
							{event.content}
						</div>
					))}
				</div>
			);
		},
		[filteredSchedules],
	);

	return (
		<div className={scWrapper(viewType === 'week' || viewType === 'list')}>
			<div className={SC_TOOLBAR}>
				<div className={SC_VIEW_SWITCHER}>
					{(['month', 'week', 'list'] as const).map(type => (
						<button key={type} className={viewType === type ? 'active' : ''} onClick={() => setViewType(type)}>
							{type.charAt(0).toUpperCase() + type.slice(1)}
						</button>
					))}
				</div>{' '}
				<button className={SC_TODAY_BUTTON} onClick={handleGoToday}>
					TODAY
				</button>
			</div>

			<ScheduleLabel
				activeFilters={activeFilters}
				onToggleFilter={handleToggleFilter}
				onToggleAllFilters={handleToggleAllFilters}
				totalCount={ALL_TYPES.length}
			/>

			<Calendar
				calendarType="gregory"
				locale="ko-KR"
				onChange={val => setSelectedDate(val as Date)}
				value={selectedDate}
				activeStartDate={viewDate}
				onActiveStartDateChange={({ activeStartDate }) => setViewDate(activeStartDate as Date)}
				formatDay={(_, date) => date.getDate().toString()}
				tileContent={renderTileContent}
				prevLabel={
					viewType === 'week' ? (
						<button
							onClick={e => {
								e.stopPropagation();
								handleNavigate('prev', 'week');
							}}>
							‹
						</button>
					) : undefined
				}
				nextLabel={
					viewType === 'week' ? (
						<button
							onClick={e => {
								e.stopPropagation();
								handleNavigate('next', 'week');
							}}>
							›
						</button>
					) : undefined
				}
				prev2Label={
					viewType === 'week' ? (
						<button
							onClick={e => {
								e.stopPropagation();
								handleNavigate('prev', 'month');
							}}>
							«
						</button>
					) : undefined
				}
				next2Label={
					viewType === 'week' ? (
						<button
							onClick={e => {
								e.stopPropagation();
								handleNavigate('next', 'month');
							}}>
							»
						</button>
					) : undefined
				}
			/>

			{viewType === 'week' && (
				<ScheduleWeekView
					viewDate={viewDate}
					selectedDate={selectedDate}
					onSelectDate={setSelectedDate}
					schedules={filteredSchedules}
				/>
			)}

			{viewType === 'list' && (
				<ScheduleListView
					viewDate={viewDate}
					selectedDate={selectedDate}
					onSelectDate={setSelectedDate}
					schedules={filteredSchedules}
				/>
			)}

			<ScheduleCalandarAgenda selectedDate={selectedDate} schedules={filteredSchedules} />
		</div>
	);
};

export default ScheduleCalendar;
