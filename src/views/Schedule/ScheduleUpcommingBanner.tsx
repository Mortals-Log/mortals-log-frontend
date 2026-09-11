'use client';

// @/pages/Schedule/ScheduleUpcomingBanner

import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { addDays, differenceInDays, format, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import { CALENDAR_SCHEDULES } from '@/utils/schedule';
import { SCHEDULE_LABEL_MAP } from '@/const/schedule';
import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { SUB_SLIDER_CONTAINER, subBannerItem } from './schedule-classes';

const ScheduleUpcommingBacnner = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const router = useRouter();
	const today = startOfDay(new Date());
	const limitDay = addDays(today, 7);

	const handleItemClick = (id?: string) => {
		if (id) {
			router.push(`/schedule/${id}`);
		}
	};

	const upcomingEvents = useMemo(() => {
		return Object.entries(CALENDAR_SCHEDULES)
			.filter(([dateStr]) => {
				const date = parseISO(dateStr);
				return isWithinInterval(date, { start: today, end: limitDay });
			})
			.flatMap(([dateStr, events]) =>
				events.map(event => {
					const eventDate = parseISO(dateStr);
					const diff = differenceInDays(eventDate, today);
					const dDayLabel = `D-${diff === 0 ? 'DAY' : diff}`;

					return { ...event, date: dateStr, dDayLabel, diff };
				}),
			)
			.sort((a, b) => a.date.localeCompare(b.date));
	}, [today, limitDay]);

	if (upcomingEvents.length === 0) return null;

	return (
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR} <span>{TITLE_EN}</span>
			</div>

			<div className={SUB_SLIDER_CONTAINER}>
				{upcomingEvents.map((event, idx) => (
					<div key={idx} className={subBannerItem(event.type, event.diff)} onClick={() => handleItemClick(event.id)}>
						<div className="info">
							<span className="dDay">{event.dDayLabel}</span>
							<span className="date">{format(parseISO(event.date), 'MM.dd')}</span>
							<span className="type">{SCHEDULE_LABEL_MAP[event.type]}</span>
							<p className="content">{event.content}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default ScheduleUpcommingBacnner;
