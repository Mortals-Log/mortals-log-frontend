// @pages/Schedule/ScheduleDetailBirthday.tsx

import * as S from '@styles/pages/Schedule/ScheduleDetail.style';
import { GetDay } from '@/utils/date';
import { Schedule } from '@/types/schedule';
import handleCopy from '@/hooks/handlecopy';
import { LINK_LIST, SNS_PLATFORM } from '@/const/links';

interface AnniversaryProps {
	schedule: Schedule;
}

const ScheduleDetailAnniversary = ({ schedule }: AnniversaryProps) => {
	const instagramUrl = LINK_LIST.find(links => links.category === 'SNS')?.items.find(
		item => item.label === SNS_PLATFORM.INSTAGRAM,
	)?.url;

	// todo: song 데이터들을 추가 후 불러오는 방식으로 수정 필요
	const videoUrl =
		schedule.type === 'BIRTHDAY'
			? 'https://www.youtube.com/embed/wHe8ntDlOco?si=q8jBY6HVplU9kTye' // 생일 축하 노래
			: 'https://www.youtube.com/embed/K9aIiynSPU4?si=Hk2joxHVnKDnis3C'; // 데뷔곡 (굴다리)
	return (
		<>
			<S.VideoWrapper>
				<iframe
					src={videoUrl}
					title={schedule.type === 'BIRTHDAY' ? 'Birthday Song' : 'Debut Song'}
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
					allowFullScreen
				/>
			</S.VideoWrapper>

			<S.MainSection>
				<S.ContentSection>
					<S.InfoGroup>
						<S.InfoTitle>DATE</S.InfoTitle>
						<S.InfoItem>
							{schedule.date} ({GetDay(schedule.date)})
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
									<S.HashTag key={tag} onClick={() => handleCopy(tag)}>
										{tag}
									</S.HashTag>
								))}
							</S.TagWrapper>
							<span>* 태그를 클릭하면 복사됩니다.</span>
						</S.InfoGroup>
					)}

					{instagramUrl && (
						<S.InfoGroup>
							<S.PrimaryButton href={instagramUrl} target="_blank" rel="noopener noreferrer">
								{schedule.content} 축하하러 가기
							</S.PrimaryButton>
						</S.InfoGroup>
					)}
				</S.ContentSection>
			</S.MainSection>
		</>
	);
};

export default ScheduleDetailAnniversary;
