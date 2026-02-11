// @pages/Schedule/ScheduleDetailConcert.tsx

import * as S from '@styles/pages/Schedule/ScheduleDetail.style';
import { EventItem } from '@/types/event';
import { LINK_PLATFORM } from '@/const/links';
import { EVENT_TYPE_LABEL } from '@/const/event';

interface ScheduleEtcConcertProps {
	event: EventItem;
}

const ScheduleDetailEvent = ({ event }: ScheduleEtcConcertProps) => {
	const platformInfo = Object.values(LINK_PLATFORM).find(p => p.NAME === event.platform);
	const linkUrl = platformInfo ? `${platformInfo.BASE_URL}${event.link}` : event.link;
	const embedUrl = platformInfo?.EMBED_URL && event.embed ? `${platformInfo.EMBED_URL}${event.embed}` : null;

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
					{event.host && (
						<S.InfoGroup>
							<S.InfoTitle>HOST</S.InfoTitle>
							<S.InfoItem>{event.host}</S.InfoItem>
						</S.InfoGroup>
					)}

					{event.type && (
						<S.InfoGroup>
							<S.InfoTitle>TYPE</S.InfoTitle>
							<S.InfoItem>{EVENT_TYPE_LABEL[event.type]}</S.InfoItem>
						</S.InfoGroup>
					)}

					{event.date && (
						<S.InfoGroup>
							<S.InfoTitle>DATE</S.InfoTitle>
							<S.InfoItem>{event.date}</S.InfoItem>
						</S.InfoGroup>
					)}

					{event.link && linkUrl && (
						<S.InfoGroup>
							<S.InfoTitle>WATCH / LISTEN</S.InfoTitle>
							<S.PrimaryButton href={linkUrl} target="_blank" rel="noopener noreferrer">
								{event.platform}로 보러가기
							</S.PrimaryButton>
						</S.InfoGroup>
					)}
				</S.ContentSection>
			</S.MainSection>
		</>
	);
};

export default ScheduleDetailEvent;
