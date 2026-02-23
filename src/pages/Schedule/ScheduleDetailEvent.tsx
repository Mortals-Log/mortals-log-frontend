// @pages/Schedule/ScheduleDetailConcert.tsx

import * as S from '@styles/pages/Schedule/ScheduleDetail.style';
import { EventItem } from '@/types/event';
import { LINK_PLATFORM } from '@/const/links';
import { EVENT_TYPE_LABEL } from '@/const/event';
import { GetDay } from '@/utils/date';

interface ScheduleEtcConcertProps {
	schedule: EventItem;
}

const ScheduleDetailEvent = ({ schedule }: ScheduleEtcConcertProps) => {
	const platformInfo = Object.values(LINK_PLATFORM).find(p => p.NAME === schedule.platform);
	const linkUrl = platformInfo ? `${platformInfo.BASE_URL}${schedule.link}` : schedule.link;
	const embedUrl = platformInfo?.EMBED_URL && schedule.link ? `${platformInfo.EMBED_URL}${schedule.link}` : null;

	return (
		<>
			{embedUrl && (
				<S.VideoWrapper>
					<iframe
						src={embedUrl}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"></iframe>
				</S.VideoWrapper>
			)}

			<S.MainSection>
				<S.ContentSection>
					{schedule.date && (
						<S.InfoGroup>
							<S.InfoTitle>DATE</S.InfoTitle>
							<S.InfoItem>
								{schedule.date} ({GetDay(schedule.date)})
							</S.InfoItem>
						</S.InfoGroup>
					)}

					{schedule.host && (
						<S.InfoGroup>
							<S.InfoTitle>HOST</S.InfoTitle>
							<S.InfoItem>{schedule.host}</S.InfoItem>
						</S.InfoGroup>
					)}

					{schedule.platform && (
						<S.InfoGroup>
							<S.InfoTitle>PLATFORM</S.InfoTitle>
							<S.InfoItem>{schedule.platform}</S.InfoItem>
						</S.InfoGroup>
					)}

					{schedule.type && (
						<S.InfoGroup>
							<S.InfoTitle>TYPE</S.InfoTitle>
							<S.InfoItem>{EVENT_TYPE_LABEL[schedule.type]}</S.InfoItem>
						</S.InfoGroup>
					)}

					{schedule.link && linkUrl && (
						<S.InfoGroup>
							<S.InfoTitle>WATCH / LISTEN</S.InfoTitle>
							<S.PrimaryButton to={linkUrl} target="_blank" rel="noopener noreferrer">
								{schedule.platform ? schedule.platform : schedule.host}로 보러가기
							</S.PrimaryButton>
						</S.InfoGroup>
					)}
				</S.ContentSection>
			</S.MainSection>
		</>
	);
};

export default ScheduleDetailEvent;
