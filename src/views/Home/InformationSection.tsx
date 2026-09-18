// @/pages/Home/Information

import { useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@/const/albums';
import { CONCERT_TYPE_LABEL, FULL_CONCERTS } from '@/const/concert';
import { GetLatestAlbum } from '@/utils/album';
import { GetUpcomingSchedules } from '@/utils/date';
import Placeholder from '@/components/Placeholder';
import { GenerateScheduleId } from '@/utils/id';
import {
	IS_INFORMATION_SECTION,
	IS_SECTION_WRAPPER,
	IS_INFO_SECTION,
	IS_EVENT_LIST,
	IS_CONTENT_CARD,
	IS_TIME_SLOT_WRAPPER,
	IS_TIME_TAG,
	IS_ACTION_LINK,
} from './home-classes';

const InformationSection = () => {
	const upcomingEvents = useMemo(() => GetUpcomingSchedules(FULL_CONCERTS), []);
	const latestAlbum = useMemo(() => GetLatestAlbum(FULL_ALBUMS), []);

	return (
		<motion.div
			className={IS_INFORMATION_SECTION}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.5, duration: 0.8 }}>
			<div className={IS_SECTION_WRAPPER}>
				<div className={IS_INFO_SECTION}>
					<span className="section-label">공연 예정</span>

					<div className={IS_EVENT_LIST}>
						{upcomingEvents.length > 0 ? (
							upcomingEvents.map(event => (
								<div className={IS_CONTENT_CARD} key={event.content}>
									<h3 className="title">{event.content}</h3>
									<p className="info-text">
										{event.location} | {event.year}.{event.date}
									</p>

									<div className={IS_TIME_SLOT_WRAPPER}>
										{event.date.includes('~')
											? event.date.split('~').map((date, idx) => (
													<div className={IS_TIME_TAG} key={`range-${date.trim()}-${idx}`}>
														<span className="part">{idx + 1}일차</span>
														{event.times?.map((time, tIdx) => (
															<span key={tIdx} className="time">
																{time}
															</span>
														))}
													</div>
												))
											: event.times?.map((time, idx) => (
													<div className={IS_TIME_TAG} key={`single-${time}-${idx}`}>
														{event.times && event.times.length > 1 && <span className="part">{idx + 1}부.</span>}
														<span className="time">{time}</span>
													</div>
												))}
									</div>

									<Link
										className={IS_ACTION_LINK}
										href={`/schedule/${GenerateScheduleId(
											'CONCERT',
											(() => {
												const firstDate = event.date.split('~')[0].trim();
												const parts = firstDate.split('.').filter(Boolean);
												const month = parts[parts.length - 2].padStart(2, '0');
												const day = parts[parts.length - 1].padStart(2, '0');
												return `${event.year}-${month}-${day}`;
											})(),
											`[${CONCERT_TYPE_LABEL[event.type]}] ${event.content}`,
										)}`}>
										일정 더보기 →
									</Link>
								</div>
							))
						) : (
							<Placeholder message="현재 예정된 공연이 없습니다." />
						)}
					</div>
				</div>

				<div className={IS_INFO_SECTION}>
					<span className="section-label">최근 발매 앨범</span>
					{latestAlbum && (
						<div className={IS_CONTENT_CARD} key={latestAlbum.title}>
							<h3 className="title">{latestAlbum.title}</h3>
							<p className="info-text">
								{ALBUM_TYPE_LABEL[latestAlbum.type]} | {latestAlbum.releaseDate}
							</p>
							<Link className={IS_ACTION_LINK} href={`album/${latestAlbum.title}`}>
								앨범 더보기 →
							</Link>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};

export default InformationSection;
