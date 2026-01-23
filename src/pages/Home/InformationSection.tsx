// @pages/Home/Information

import * as S from '@/styles/pages/Home/InformationSection.style';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@/const/albums';
import { GetLatestAlbum } from '@utils/album';
import { GetUpcomingSchedules } from '@/utils/date';
import { FULL_CONCERTS } from '@/const/concert';

const upcomingEvents = GetUpcomingSchedules(FULL_CONCERTS);
const latestAlbum = GetLatestAlbum(FULL_ALBUMS);

const Information = () => {
	return (
		<S.InformationContainer
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.5, duration: 0.8 }}>
			<S.SectionWrapper>
				<S.InfoSection>
					<span className="section-label">공연 예정</span>

					<S.EventList>
						{upcomingEvents.length > 0 ? (
							upcomingEvents.map(event => (
								<S.ContentCard key={event.content}>
									<h3 className="title">{event.content}</h3>
									<div className="details">
										<p className="info-text">
											{event.location} | {event.date}
										</p>
										<S.TimeSlotWrapper>
											{event.schedules?.map(schedule => (
												<S.TimeTag key={`${schedule.part}-${schedule.time}`}>
													{schedule.part && <span className="part">{schedule.part}</span>}
													<span className="time">{schedule.time}</span>
												</S.TimeTag>
											))}
										</S.TimeSlotWrapper>
									</div>
								</S.ContentCard>
							))
						) : (
							<p>현재 예정된 공연이 없습니다.</p>
						)}
					</S.EventList>
				</S.InfoSection>

				<S.InfoSection>
					<span className="section-label">최근 발매 앨범</span>
					{latestAlbum && (
						<S.ContentCard key={latestAlbum.title}>
							<h3 className="title">{latestAlbum.title}</h3>
							<div className="details">
								<p className="info-text">
									{ALBUM_TYPE_LABEL[latestAlbum.type]} | {latestAlbum.releaseDate}
								</p>
								<div style={{ display: 'flex', gap: '0.5rem' }}>
									<S.ActionButton whileHover={{ scale: 1.05 }}>앨범 구매</S.ActionButton>
									<S.ActionButton whileHover={{ scale: 1.05 }}>뮤직 비디오</S.ActionButton>
								</div>
							</div>
						</S.ContentCard>
					)}
				</S.InfoSection>
			</S.SectionWrapper>
		</S.InformationContainer>
	);
};

export default Information;
