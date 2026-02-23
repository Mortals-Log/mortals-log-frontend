// @pages/Home/Information

import * as S from '@/styles/pages/Home/InformationSection.style';

import { useMemo } from 'react';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@/const/albums';
import { FULL_CONCERTS } from '@/const/concert';
import { GetLatestAlbum } from '@/utils/album';
import { GetUpcomingSchedules } from '@/utils/date';
import Placeholder from '@/components/placeholder';

const InformationSection = () => {
	const upcomingEvents = useMemo(() => GetUpcomingSchedules(FULL_CONCERTS), []);
	const latestAlbum = useMemo(() => GetLatestAlbum(FULL_ALBUMS), []);

	return (
		<S.InformationSection
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
									<p className="info-text">
										{event.location} | {event.date}
									</p>

									<S.TimeSlotWrapper>
										{event.date.includes('~')
											? event.date.split('~').map((date, idx) => (
													<S.TimeTag key={`range-${date.trim()}-${idx}`}>
														<span className="part">{idx + 1}일차</span>
														{event.times?.map((time, tIdx) => (
															<span key={tIdx} className="time">
																{time}
															</span>
														))}
													</S.TimeTag>
												))
											: event.times?.map((time, idx) => (
													<S.TimeTag key={`single-${time}-${idx}`}>
														{event.times && event.times.length > 1 && <span className="part">{idx + 1}부.</span>}
														<span className="time">{time}</span>
													</S.TimeTag>
												))}
									</S.TimeSlotWrapper>
								</S.ContentCard>
							))
						) : (
							<Placeholder message="현재 예정된 공연이 없습니다." />
						)}
					</S.EventList>
				</S.InfoSection>

				<S.InfoSection>
					<span className="section-label">최근 발매 앨범</span>
					{latestAlbum && (
						<S.ContentCard key={latestAlbum.title}>
							<h3 className="title">{latestAlbum.title}</h3>
							<p className="info-text">
								{ALBUM_TYPE_LABEL[latestAlbum.type]} | {latestAlbum.releaseDate}
							</p>
							<S.ActionLink to={`album/${latestAlbum.title}`}>앨범 더보기 →</S.ActionLink>
						</S.ContentCard>
					)}
				</S.InfoSection>
			</S.SectionWrapper>
		</S.InformationSection>
	);
};

export default InformationSection;
