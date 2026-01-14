import * as S from '@styles/pages/Information';
import { DUMMY_SCHEDULE, DUMMY_ALBUM } from '@const/constant';

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
						{DUMMY_SCHEDULE.map(event => (
							<S.ContentCard key={event.id}>
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
						))}
					</S.EventList>
				</S.InfoSection>

				<S.InfoSection>
					<span className="section-label">최근 앨범</span>
					<S.ContentCard>
						<h3 className="title">{DUMMY_ALBUM.title}</h3>
						<div className="details">
							<p className="info-text">
								{DUMMY_ALBUM.type} | {DUMMY_ALBUM.releaseDate}
							</p>
							<S.LinkButton whileHover={{ scale: 1.05 }}>앨범 구매</S.LinkButton>
							<S.LinkButton whileHover={{ scale: 1.05 }}>뮤직 비디오</S.LinkButton>
						</div>
					</S.ContentCard>
				</S.InfoSection>
			</S.SectionWrapper>
		</S.InformationContainer>
	);
};

export default Information;
