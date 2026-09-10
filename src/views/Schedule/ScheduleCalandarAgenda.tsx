'use client';

// @/pages/Schedule/ScheduleCalandarAgenda

import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { SCHEDULE_LABEL_MAP } from '@/const/schedule';
import Placeholder from '@/components/Placeholder';
import { Schedule } from '@/types/schedule';
import { FormatDate } from '@/utils/date';
import { BADGE_LABEL } from '@/components/BadgeList';
import { typeBadge, ADULT_BADGE } from '@/const/component-classes';
import {
	SCA_AGENDA_SECTION,
	SCA_AGENDA_HEADER,
	SCA_AGENDA_LIST,
	scaAgendaItem,
	SCA_ITEM_CONTENT_GROUP,
	SCA_CONTENT_TEXT,
	SCA_TIME_TAG,
} from './schedule-classes';

interface AgendaProps {
	selectedDate: Date;
	schedules: Record<string, Schedule[]>;
}

const ScheduleCalandarAgenda = ({ selectedDate, schedules }: AgendaProps) => {
	const router = useRouter();
	const dateStr = FormatDate(selectedDate);
	const dayEvents = schedules[dateStr] || [];

	const handleItemClick = (id?: string) => {
		if (id) {
			router.push(`/schedule/${id}`);
		}
	};

	return (
		<div className={SCA_AGENDA_SECTION}>
			<div className={SCA_AGENDA_HEADER}>{format(selectedDate, 'yyyy년 MM월 d일')} 일정</div>

			{dayEvents.length > 0 ? (
				<div className={SCA_AGENDA_LIST}>
					{dayEvents.map(event => (
						<div
							key={event.id}
							className={scaAgendaItem(event.type)}
							onClick={() => handleItemClick(event.id)}
							role="button"
							tabIndex={0}>
							<div className={SCA_ITEM_CONTENT_GROUP}>
								<span className={typeBadge(event.type)}>{SCHEDULE_LABEL_MAP[event.type]}</span>
								{event.ageLimit && <span className={ADULT_BADGE}>{BADGE_LABEL.ADULT}</span>}
								<span className={SCA_CONTENT_TEXT}>{event.content}</span>
							</div>

							{event.time && <div className={SCA_TIME_TAG}>{event.time}</div>}
						</div>
					))}
				</div>
			) : (
				<Placeholder message="등록된 일정이 없습니다." />
			)}
		</div>
	);
};

export default ScheduleCalandarAgenda;
