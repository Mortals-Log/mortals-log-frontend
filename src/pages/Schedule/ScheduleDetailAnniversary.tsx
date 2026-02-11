// @pages/Schedule/ScheduleDetailBirthday.tsx

import * as S from '@styles/pages/Schedule/ScheduleDetail.style';
import { GetDay } from '@/utils/schedule';
import { Schedule } from '@/types/schedule';

interface AnniversaryProps {
	schedule: Schedule;
}

const ScheduleDetailAnniversary = ({ schedule }: AnniversaryProps) => {
	const year = schedule.date.split('.')[0];
	const cleanDate = schedule.date.replace(`${year}.`, '').trim();

	// todo: song 데이터들을 추가 후 '굴다리 EP'를 불러오는 방식으로 수정 필요
	const debutSong = 'https://www.youtube.com/embed/K9aIiynSPU4?si=Hk2joxHVnKDnis3C';

	return (
		<>
			<S.VideoWrapper>
				<iframe
					src={debutSong}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
			</S.VideoWrapper>

			<S.MainSection>
				<S.ContentSection>
					<S.InfoGroup>
						<S.InfoTitle>DATE</S.InfoTitle>
						<S.InfoItem>
							{schedule.date} ({GetDay(year, cleanDate)})
						</S.InfoItem>
					</S.InfoGroup>
				</S.ContentSection>
			</S.MainSection>
		</>
	);
};

export default ScheduleDetailAnniversary;
