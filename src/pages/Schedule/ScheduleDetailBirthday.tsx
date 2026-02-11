// @pages/Schedule/ScheduleDetailBirthday.tsx

import * as S from '@styles/pages/Schedule/ScheduleDetail.style';
import { GetDay } from '@/utils/schedule';
import { Schedule } from '@/types/schedule';

interface BirthdayProps {
	schedule: Schedule;
}

const ScheduleDetailBirthday = ({ schedule }: BirthdayProps) => {
	const year = schedule.date.split('.')[0];
	const cleanDate = schedule.date.replace(`${year}.`, '').trim();

	// todo: song 데이터들을 추가 후 '생일축하해'를 불러오는 방식으로 수정 필요
	const birthdaySong = 'https://www.youtube.com/embed/wHe8ntDlOco?si=q8jBY6HVplU9kTye';

	return (
		<>
			<S.VideoWrapper>
				<iframe
					src={birthdaySong}
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

					{schedule.message && (
						<S.InfoGroup>
							<S.InfoTitle>MESSAGE</S.InfoTitle>
							<S.InfoItem>{schedule.message}</S.InfoItem>
						</S.InfoGroup>
					)}

					{schedule.hashtags && (
						<S.InfoGroup>
							<S.InfoTitle>HASHTAGS</S.InfoTitle>

							<S.TagWrapper>
								{schedule.hashtags.map(tag => (
									<S.HashTag key={tag} onClick={() => navigator.clipboard.writeText(tag)}>
										{tag}
									</S.HashTag>
								))}
							</S.TagWrapper>

							<span>* 태그를 클릭하면 복사됩니다.</span>
						</S.InfoGroup>
					)}
				</S.ContentSection>
			</S.MainSection>
		</>
	);
};

export default ScheduleDetailBirthday;
