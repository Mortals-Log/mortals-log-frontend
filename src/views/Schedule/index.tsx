// @/views/Schedule
'use client';

import * as S from '@/styles/pages/Schedule/Schedule.style';

import { NAME } from '@/const/profile';
import ScheduleUpcommingBacnner from '@/views/Schedule/ScheduleUpcommingBanner';
import ScheduleCalendar from '@/views/ScheduleCalendar';

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
		<S.MainContainer>
			<S.SubTitle>{PAGE_TITLE.SUB}</S.SubTitle>
			<S.MainTitle>{PAGE_TITLE.MAIN}</S.MainTitle>

			<S.Description>{PAGE_TITLE.DESCRIPTION}</S.Description>

			<ScheduleUpcommingBacnner {...SECTION_TITLE.UPCOMMING} />

			<ScheduleCalendar />
		</S.MainContainer>
	);
};
export default Schedule;
