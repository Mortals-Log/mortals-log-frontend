// @/pages/Schedule

import * as S from '@/styles/pages/Schedule/Schedule.style';

import { useEffect } from 'react';
import { NAME } from '@/const/profile';
import ScheduleUpcommingBacnner from '@/pages/Schedule/ScheduleUpcommingBanner';
import ScheduleCalendar from '@/pages/ScheduleCalendar';
import { METADATA } from '@/const/contents';
import { UpdateMetaTags } from '@/utils/meta';

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
	useEffect(() => {
		const pageTitle = `${METADATA.NAME} | Schedule`;
		const description = PAGE_TITLE.DESCRIPTION;

		UpdateMetaTags(pageTitle, description, undefined, 'website');

		return () => {
			UpdateMetaTags(METADATA.NAME, METADATA.DESCRIPTION, undefined, 'website');
		};
	});

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
