// @src/pages/Schedule/index

import * as S from '@styles/pages/Schedule/Schedule.style';
import ScheduleCalendar from './ScheduleCalandar';
import { NAME } from '@/const/profile';

const PAGE_TITLE = {
	MAIN: '일정',
	SUB: 'SCHEDULE',
	DESCRIPTION: `${NAME.KOREAN}의 공연, 앨범 발매, 인터뷰 등 주요 일정을 한눈에 확인하실 수 있습니다.`,
} as const;

const Schedule = () => {
	return (
		<S.MainContainer>
			<S.SubTitle>{PAGE_TITLE.SUB}</S.SubTitle>
			<S.MainTitle>{PAGE_TITLE.MAIN}</S.MainTitle>

			<S.Description>{PAGE_TITLE.DESCRIPTION}</S.Description>

			<ScheduleCalendar />
		</S.MainContainer>
	);
};
export default Schedule;
