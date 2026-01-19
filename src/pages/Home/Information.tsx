// @pages/Home/Information

import * as S from '@styles/pages/Information.style';
import { DUMMY_SCHEDULE, DUMMY_ALBUM } from '@const/dummy_data';
import { GetLatestAlbum } from '@utils/album';
import { GetUpcomingSchedules } from '@/utils/date';

const upcomingEvents = GetUpcomingSchedules(DUMMY_SCHEDULE);
const latestAlbum = GetLatestAlbum(DUMMY_ALBUM);

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
								<S.ContentCard key={event.title}>
									<h3 className="title">{event.title}</h3>
									<div className="details">
										<p className="info-text">
											{event.location} | {event.date}
										</p>
										<S.TimeSlotWrapper>
											{event.schedules.map((sched, idx) => (
												<S.TimeTag key={idx}>
													{sched.part && <span className="part">{sched.part}</span>}
													<span className="time">{sched.time}</span>
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
									{latestAlbum.type} | {latestAlbum.releaseDate}
								</p>
								<div style={{ display: 'flex', gap: '0.5rem' }}>
									<S.LinkButton whileHover={{ scale: 1.05 }}>앨범 구매</S.LinkButton>
									<S.LinkButton whileHover={{ scale: 1.05 }}>뮤직 비디오</S.LinkButton>
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
