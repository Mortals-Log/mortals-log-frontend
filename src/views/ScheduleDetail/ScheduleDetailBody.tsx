// @/pages/Schedule/ScheduleDetailBody

import { useMemo } from 'react';
import Link from 'next/link';
import { ConcertItem } from '@/types/concert';
import { Album } from '@/types/album';
import { EventItem } from '@/types/event';
import { Schedule } from '@/types/schedule';

import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { EVENT_TYPE_LABEL } from '@/const/event';
import { LINK_LIST, LINK_PLATFORM, ETC_PLATFORM, LINK_SHOP, SNS_PLATFORM } from '@/const/links';
import useImageFallback from '@/hooks/useImageFallback';
import handleCopy from '@/hooks/handlecopy';
import { GetAlbumPaths } from '@/utils/album';
import { GetDay } from '@/utils/date';
import { LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { PRIMARY_BUTTON, MORE_BUTTON, VIDEO_WRAPPER } from '@/const/component-classes';
import {
	SDB_MAIN_SECTION,
	SDB_IMAGE_WRAPPER,
	SDB_CONTENT_SECTION,
	SDB_INFO_GROUP,
	SDB_INFO_TITLE,
	SDB_INFO_ITEM,
	SDB_LINEUP_WRAPPER,
	SDB_LINEUP_ITEM,
	SDB_MAP_SECTION,
	SDB_MAP_FRAME_WRAPPER,
	SDB_HASHTAG_WRAPPER,
	SDB_HASHTAG,
	SDB_COPY_ANNOTATION,
} from './detail-classes';

type DetailData = ConcertItem | Album | EventItem | Schedule;

interface ScheduleDetailBodyProps {
	type: Schedule['type'];
	data: DetailData;
	imageUrl?: string;
	content?: string;
}

type InfoTitleLabel =
	| 'TYPE'
	| 'DATE'
	| 'DATE & TIME'
	| 'RELEASE DATE'
	| 'ABOUT ALBUM'
	| 'LINE UP'
	| 'LOCATION'
	| 'TICKET'
	| 'HOST'
	| 'PLATFORM'
	| 'MESSAGE'
	| 'HASHTAGS'
	| (string & {});

interface InfoTitleProps {
	label: InfoTitleLabel;
}

const InfoTitle = ({ label }: InfoTitleProps) => {
	return <div className={SDB_INFO_TITLE}>{label.toUpperCase()}</div>;
};

const ScheduleDetailBody = ({ type, data, imageUrl }: ScheduleDetailBodyProps) => {
	const handleImgError = useImageFallback();

	const renderTopMedia = () => {
		let videoUrl = '';

		if (type === 'BIRTHDAY') videoUrl = 'https://www.youtube.com/embed/wHe8ntDlOco';
		if (type === 'ANNIVERSARY') {
			videoUrl = 'https://www.youtube.com/embed/K9aIiynSPU4';

			const sche = data as Schedule;
			if (sche.specialLink?.url.includes('youtu.be') || sche.specialLink?.url.includes('youtube.com')) {
				const videoId = sche.specialLink.url.split('/').pop()?.replace('watch?v=', '');
				if (videoId) {
					videoUrl = `https://www.youtube.com/embed/${videoId}`;
				}
			}
		}
		if (type === 'EVENT' && 'platform' in data) {
			const platformInfo = Object.values(LINK_PLATFORM).find(p => p.NAME === data.platform);
			videoUrl = platformInfo?.EMBED_URL && data.link ? `${platformInfo.EMBED_URL}${data.link}` : '';
		}

		if (!videoUrl) return null;
		return (
			<div className={VIDEO_WRAPPER}>
				<iframe src={videoUrl} allowFullScreen />
			</div>
		);
	};

	const renderInfoGroups = () => {
		if (type === 'CONCERT') {
			const concert = data as ConcertItem;
			const year = concert.date.split('.')[0];
			const cleanDate = concert.date.replace(`${year}.`, '').trim();

			const now = new Date();
			const concertStart = cleanDate.split('~')[0].trim();
			const [concertMonth, concertDay] = concertStart.split('.').map(Number);
			const concertDate = new Date(Number(year), concertMonth - 1, concertDay, 0, 0, 0);

			const getFullTicketingDate = (t: NonNullable<ConcertItem['ticketing']>[number]) => {
				if (!t.ticketingDate) return null;
				const [ty, tm, td] = t.ticketingDate.split('.').map(Number);
				const [th, tmin] = (t.ticketingTime || '00:00').split(':').map(Number);
				return new Date(ty, tm - 1, td, th, tmin, 0);
			};

			// 공연 날짜가 지났거나, 다음 회차가 이미 시작해 이 회차의 기간이 끝난 티켓팅은 숨긴다.
			const visibleTicketing = (concert.ticketing ?? []).filter((t, index, arr) => {
				if (now >= concertDate) return false;
				const nextRoundStart = arr[index + 1] ? getFullTicketingDate(arr[index + 1]) : null;
				return !(nextRoundStart && now >= nextRoundStart);
			});

			return (
				<>
					{concert.performanceDates?.length ? (
						<>
							<div className={SDB_INFO_GROUP}>
								<InfoTitle label="PERIOD" />
								<div className={SDB_INFO_ITEM}>
									{year}.{cleanDate.replace('~', ' ~ ')}
								</div>
							</div>

							<div className={SDB_INFO_GROUP}>
								<InfoTitle label="DATE & TIME" />
								{concert.performanceDates.map((date, idx) => (
									<div className={SDB_INFO_ITEM} key={`perf-${idx}`}>
										{year}.{date} ({GetDay(date, year)})
										{concert.times?.map((time, tIdx) => (
											<span key={tIdx} className="time">
												{time}
											</span>
										))}
									</div>
								))}
							</div>
						</>
					) : (
						<div className={SDB_INFO_GROUP}>
							<InfoTitle label="DATE & TIME" />
							{cleanDate.includes('~')
								? cleanDate.split('~').map((date, idx) => (
										<div className={SDB_INFO_ITEM} key={`range-${idx}`}>
											<span className="part">{idx + 1}일차.</span>
											{year}.{date.trim()} ({GetDay(date, year)})
											{concert.times?.map((time, tIdx) => (
												<span key={tIdx} className="time">
													{time}
												</span>
											))}
										</div>
									))
								: concert.times?.map((time, idx) => (
										<div className={SDB_INFO_ITEM} key={`single-${idx}`}>
											{concert.times && concert.times.length > 1 && <span className="part">{idx + 1}부.</span>}
											{year}.{cleanDate} ({GetDay(cleanDate, year)})<span className="time">{time}</span>
										</div>
									))}
						</div>
					)}

					{concert.lineUp && (
						<div className={SDB_INFO_GROUP}>
							<InfoTitle label="LINE UP" />
							<div className={SDB_LINEUP_WRAPPER}>
								{concert.lineUp.map((artist, idx) => (
									<div className={SDB_LINEUP_ITEM} key={idx}>
										{artist}
									</div>
								))}
							</div>
						</div>
					)}

					{concert.location && (
						<div className={SDB_INFO_GROUP}>
							<InfoTitle label="LOCATION" />
							<div className={SDB_INFO_ITEM}>{concert.location}</div>
						</div>
					)}

					{concert.performanceLocation && (
						<div className={SDB_INFO_GROUP}>
							<InfoTitle label="STAGE" />
							<div className={SDB_INFO_ITEM}>{concert.performanceLocation}</div>
						</div>
					)}

					{concert.price && (
						<div className={SDB_INFO_GROUP}>
							<InfoTitle label="TICKET" />
							<div className={SDB_INFO_ITEM}>
								일반: {concert.price.regular}
								{concert.price.regular.includes('원') ? '' : '원'}
							</div>
							{Object.entries(concert.price).map(([key, value]) => {
								if (key === 'regular' || !value) return null;
								const labels: Record<string, string> = {
									onSpot: '현장 판매',
									army: '군인 할인',
									student: '학생 할인',
									alien: '외계인 할인',
									early: '얼리버드',
								};
								return (
									<div className={SDB_INFO_ITEM} key={key}>
										{labels[key] || key}: {value}
										{value.includes('원') ? '' : '원'}
									</div>
								);
							})}
						</div>
					)}

					{concert.ticketing && concert.ticketing.length > 0 ? (
						visibleTicketing.map(t => {
							const index = concert.ticketing?.indexOf(t) ?? 0;
							const { ticketingDate, ticketingTime, ticketingLink, label, soldOut } = t;
							const roundCount = concert.ticketing?.length ?? 0;
							// 회차 구분용 라벨: label(예: 얼리버드/일반)이 있으면 그걸, 없으면 순서대로 n차.
							const roundLabel = label || (roundCount > 1 ? `${index + 1}차` : '');

							// 이 시점의 항목은 공연 종료·다음 회차 시작으로 이미 걸러진 상태다(visibleTicketing).
							const isTicketingOpen = now >= (getFullTicketingDate(t) ?? new Date(NaN));

							const linktreeLink = LINK_LIST.find(cat => cat.category === 'ETC')?.items.find(
								item => item.label === ETC_PLATFORM.LINK_TREE,
							)?.url;

							return (
								<div className={SDB_INFO_GROUP} key={`${ticketingDate}-${index}`}>
									{ticketingDate && (
										<>
											<InfoTitle
												label={label ? `TICKETING - ${label}` : roundLabel ? `TICKETING ${roundLabel}` : 'TICKETING'}
											/>
											<div className={SDB_INFO_ITEM}>
												{ticketingDate} ({GetDay(ticketingDate)})
												{ticketingTime && <span className="time"> {ticketingTime}</span>}
											</div>
										</>
									)}

									{soldOut ? (
										<div className={SDB_INFO_ITEM}>
											<span className="info">매진되었습니다.</span>
										</div>
									) : !isTicketingOpen ? (
										<div className={SDB_INFO_ITEM}>
											<span className="info">티켓팅 오픈 전입니다.</span>
										</div>
									) : ticketingLink ? (
										<Link href={ticketingLink} target="_blank" rel="noopener noreferrer" className={PRIMARY_BUTTON}>
											{roundLabel ? `${roundLabel} ` : ''}티켓 예매하러 가기
										</Link>
									) : (
										<>
											<div className={SDB_INFO_ITEM}>
												<span className="info">티켓팅 사이트가 아직 등록되지 않았습니다.</span>
											</div>
											{linktreeLink && (
												<Link href={linktreeLink} target="_blank" rel="noopener noreferrer" className={MORE_BUTTON}>
													링크트리에서 확인하기
												</Link>
											)}
										</>
									)}
								</div>
							);
						})
					) : (
						<div className={SDB_INFO_GROUP}>
							<InfoTitle label="TICKETING" />
							<div className={SDB_INFO_ITEM}>
								<span className="info">아직 티켓팅 일정이 공지되지 않았습니다.</span>
							</div>
						</div>
					)}
				</>
			);
		}

		if (type === 'ALBUM' && 'releaseDate' in data) {
			const album = data as Album;
			const { detailUrl } = GetAlbumPaths(album);

			return (
				<>
					<div className={SDB_INFO_GROUP}>
						<InfoTitle label="TYPE" />
						<div className={SDB_INFO_ITEM}>{ALBUM_TYPE_LABEL[album.type]}</div>
					</div>

					<div className={SDB_INFO_GROUP}>
						<InfoTitle label="RELEASE DATE" />
						<div className={SDB_INFO_ITEM}>
							{album.releaseDate} ({GetDay(album.releaseDate)})
						</div>
					</div>

					<div className={SDB_INFO_GROUP}>
						<InfoTitle label="ABOUT ALBUM" />
						<Link href={detailUrl} target="_blank" rel="noopener noreferrer" className={MORE_BUTTON}>
							{ALBUM_TYPE_LABEL[album.type]} 정보 더보기
						</Link>
					</div>

					{album.store && (
						<>
							{typeof album.store === 'string' ? (
								<Link href={album.store} target="_blank" rel="noopener noreferrer" className={PRIMARY_BUTTON}>
									{ALBUM_TYPE_LABEL[album.type]}구매하기
								</Link>
							) : (
								Object.entries(album.store).map(([key, url]) => {
									const detail = LINK_SHOP[key];

									return (
										<Link key={key} href={url} target="_blank" rel="noopener noreferrer" className={PRIMARY_BUTTON}>
											{detail ? (
												<>
													{ALBUM_TYPE_LABEL[album.type]} 구매하기 - {detail.STORE}
												</>
											) : (
												<>{key}</>
											)}
										</Link>
									);
								})
							)}
						</>
					)}
				</>
			);
		}

		if (type === 'EVENT') {
			const event = data as EventItem;
			const platformInfo = Object.values(LINK_PLATFORM).find(p => p.NAME === event.platform);
			const linkUrl = platformInfo ? `${platformInfo.BASE_URL}${event.link}` : event.link;

			return (
				<>
					<div className={SDB_INFO_GROUP}>
						<InfoTitle label="DATE" />
						<div className={SDB_INFO_ITEM}>
							{event.date} ({GetDay(event.date)})
						</div>
					</div>

					<div className={SDB_INFO_GROUP}>
						<InfoTitle label="HOST" />
						<div className={SDB_INFO_ITEM}>{event.host}</div>
					</div>

					<div className={SDB_INFO_GROUP}>
						<InfoTitle label="PLATFORM" />
						<div className={SDB_INFO_ITEM}>{event.platform}</div>
					</div>

					<div className={SDB_INFO_GROUP}>
						<InfoTitle label="TYPE" />
						<div className={SDB_INFO_ITEM}>{EVENT_TYPE_LABEL[event.type]}</div>
					</div>

					{linkUrl && (
						<Link href={linkUrl} target="_blank" rel="noopener noreferrer" className={PRIMARY_BUTTON}>
							{event.platform ? event.platform : event.host}로 보러가기
						</Link>
					)}
				</>
			);
		}

		if (['BIRTHDAY', 'ANNIVERSARY'].includes(type)) {
			const sche = data as Schedule;
			const instagramUrl = LINK_LIST.find(links => links.category === 'SNS')?.items.find(
				item => item.label === SNS_PLATFORM.INSTAGRAM,
			)?.url;

			return (
				<>
					<div className={SDB_INFO_GROUP}>
						<InfoTitle label="DATE" />
						<div className={SDB_INFO_ITEM}>
							{sche.date} ({GetDay(sche.date)})
						</div>
					</div>
					{sche.message && (
						<div className={SDB_INFO_GROUP}>
							<InfoTitle label="MESSAGE" />
							<div className={SDB_INFO_ITEM}>{sche.message}</div>
						</div>
					)}

					{sche.hashtags && (
						<div className={SDB_INFO_GROUP}>
							<InfoTitle label="HASHTAGS" />
							<div className={SDB_HASHTAG_WRAPPER}>
								{sche.hashtags.map(tag => (
									<button className={SDB_HASHTAG} key={tag} onClick={() => handleCopy(tag)}>
										{tag}
									</button>
								))}
							</div>
							<div className={SDB_COPY_ANNOTATION}>* 태그를 클릭하면 복사됩니다.</div>
						</div>
					)}

					{instagramUrl && !sche.specialLink && (
						<Link href={instagramUrl} target="_blank" rel="noopener noreferrer" className={PRIMARY_BUTTON}>
							{sche.content}
						</Link>
					)}

					{sche.fileUrl && (
						<Link href={sche.fileUrl.url} target="_blank" download className={PRIMARY_BUTTON}>
							{sche.fileUrl.label}
						</Link>
					)}
				</>
			);
		}

		return null;
	};

	const renderBottomMap = () => {
		if (type !== 'CONCERT' || !data) return null;

		const concertData = data as ConcertItem;
		const location = concertData.location;
		if (!location || location === '미정') return null;

		// 스테이지(공연 장소)가 따로 있으면 검색어에 함께 넣어 더 정확한 위치를 보여준다.
		const mapQuery = concertData.performanceLocation ? `${location} ${concertData.performanceLocation}` : location;
		const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

		return (
			<section className={SDB_MAP_SECTION}>
				<div className={LAYOUT_SECTION_TITLE}>
					공연장 오시는 길<span>Directions to the concert hall</span>
				</div>
				<div className={SDB_MAP_FRAME_WRAPPER}>
					<iframe title="공연장 지도" src={mapUrl} loading="lazy" />
				</div>
			</section>
		);
	};

	const hasImage = type === 'CONCERT' || type === 'ALBUM';
	const finalImgSrc = useMemo(() => {
		if (type === 'ALBUM' && 'title' in data) {
			return GetAlbumPaths(data as Album).imageSrc;
		}
		return imageUrl;
	}, [type, data, imageUrl]);

	return (
		<>
			{renderTopMedia()}

			<div className={SDB_MAIN_SECTION}>
				{hasImage && finalImgSrc && (
					<div className={SDB_IMAGE_WRAPPER}>
						<img src={finalImgSrc} onError={handleImgError} />
					</div>
				)}

				<div className={SDB_CONTENT_SECTION}>{renderInfoGroups()}</div>
			</div>

			{renderBottomMap()}
		</>
	);
};

export default ScheduleDetailBody;
