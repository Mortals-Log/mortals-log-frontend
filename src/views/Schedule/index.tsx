'use client';

// @/views/Schedule

import { NAME } from '@/const/profile';
import ScheduleUpcommingBacnner from '@/views/Schedule/ScheduleUpcommingBanner';
import ScheduleCalendar from '@/views/ScheduleCalendar';
import { LAYOUT_MAIN, LAYOUT_MAIN_TITLE, LAYOUT_SUB_TITLE, LAYOUT_DESCRIPTION } from '@/const/layout-classes';

const PAGE_TITLE = {
	MAIN: '일정',
	SUB: 'SCHEDULE',
	DESCRIPTION: `${NAME.KOREAN}의 공연, 앨범 발매, 인터뷰 등 주요 일정을 한눈에 확인하실 수 있습니다.`,
} as const;

const SECTION_TITLE = {
	UPCOMMING: {
		TITLE_KR: '다가오는 일정',
		TITLE_EN: 'Upcomming Schedule',
	},
} as const;

const Schedule = () => {
	return (
		<main className={LAYOUT_MAIN}>
			<span className={LAYOUT_SUB_TITLE}>{PAGE_TITLE.SUB}</span>
			<div className={LAYOUT_MAIN_TITLE}>{PAGE_TITLE.MAIN}</div>

			<div className={LAYOUT_DESCRIPTION}>{PAGE_TITLE.DESCRIPTION}</div>

			<ScheduleUpcommingBacnner {...SECTION_TITLE.UPCOMMING} />

			<ScheduleCalendar />
		</main>
	);
};
export default Schedule;
