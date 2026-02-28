// @components/Schedule/UpcomingBanner.tsx

import * as S from '@/styles/pages/Schedule/ScheduleUpcommingBanner.style';

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { addDays, differenceInDays, format, isWithinInterval, parseISO, startOfDay } from 'date-fns';
import { CALENDAR_SCHEDULES } from '@/utils/schedule';
import { SCHEDULE_LABEL_MAP } from '@/const/schedule';

const ScheduleUpcommingBacnner = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const navigate = useNavigate();
	const today = startOfDay(new Date());
	const limitDay = addDays(today, 7);

	const handleItemClick = (id?: string) => {
		if (id) {
			navigate(`/schedule/${id}`);
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
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR} <span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.SliderContainer>
				{upcomingEvents.map((event, idx) => (
					<S.BannerItem key={idx} $eventType={event.type} $dDay={event.diff} onClick={() => handleItemClick(event.id)}>
						<div className="info">
							<span className="dDay">{event.dDayLabel}</span>
							<span className="date">{format(parseISO(event.date), 'MM.dd')}</span>
							<span className="type">{SCHEDULE_LABEL_MAP[event.type]}</span>
							<p className="content">{event.content}</p>
						</div>
					</S.BannerItem>
				))}
			</S.SliderContainer>
		</S.ContentSection>
	);
};

export default ScheduleUpcommingBacnner;
