// @/pages/Schedule/ScheduleDetailBody

import * as S from '@/styles/pages/ScheduleDetail/ScheduleDetailBody.style';

import { useMemo } from 'react';
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
	return <S.InfoTitle>{label.toUpperCase()}</S.InfoTitle>;
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
			<S.VideoWrapper>
				<iframe src={videoUrl} allowFullScreen />
			</S.VideoWrapper>
		);
	};

	const renderInfoGroups = () => {
		if (type === 'CONCERT') {
			const concert = data as ConcertItem;
			const year = concert.date.split('.')[0];
			const cleanDate = concert.date.replace(`${year}.`, '').trim();

			return (
				<>
					<S.InfoGroup>
						<InfoTitle label="DATE & TIME" />
						{cleanDate.includes('~')
							? cleanDate.split('~').map((date, idx) => (
									<S.InfoItem key={`range-${idx}`}>
										<span className="part">{idx + 1}일차.</span>
										{year}.{date.trim()} ({GetDay(date, year)})
										{concert.times?.map((time, tIdx) => (
											<span key={tIdx} className="time">
												{time}
											</span>
										))}
									</S.InfoItem>
								))
							: concert.times?.map((time, idx) => (
									<S.InfoItem key={`single-${idx}`}>
										{concert.times && concert.times.length > 1 && <span className="part">{idx + 1}부.</span>}
										{year}.{cleanDate} ({GetDay(cleanDate, year)})<span className="time">{time}</span>
									</S.InfoItem>
								))}
					</S.InfoGroup>

					{concert.lineUp && (
						<S.InfoGroup>
							<InfoTitle label="LINE UP" />
							<S.LineUpWrapper>
								{concert.lineUp.map((artist, idx) => (
									<S.LineUpItem key={idx}>{artist}</S.LineUpItem>
								))}
							</S.LineUpWrapper>
						</S.InfoGroup>
					)}

					{concert.location && (
						<S.InfoGroup>
							<InfoTitle label="LOCATION" />
							<S.InfoItem>{concert.location}</S.InfoItem>
						</S.InfoGroup>
					)}

					{concert.price && (
						<S.InfoGroup>
							<InfoTitle label="TICKET" />
							<S.InfoItem>일반: {concert.price.regular}원</S.InfoItem>
							{Object.entries(concert.price).map(([key, value]) => {
								if (key === 'regular' || !value) return null;
								const labels: Record<string, string> = {
									onSpot: '현장 판매',
									army: '군인 할인',
									student: '학생 할인',
									alien: '외계인 할인',
								};
								return (
									<S.InfoItem key={key}>
										{labels[key] || key}: {value}원
									</S.InfoItem>
								);
							})}
						</S.InfoGroup>
					)}

					{concert.ticketing &&
						concert.ticketing.map((t, index) => {
							const now = new Date();
							const { ticketingDate, ticketingTime, ticketingLink } = t;

							const concertStart = cleanDate.split('~')[0].trim();
							const [cMonth, cDay] = concertStart.split('.').map(Number);
							const concertDate = new Date(Number(year), cMonth - 1, cDay, 0, 0, 0);

							const tParts = ticketingDate?.split('.').map(Number) || [];
							const [tHour, tMin] = (ticketingTime || '00:00').split(':').map(Number);
							const fullTicketingDate = new Date(tParts[0], tParts[1] - 1, tParts[2], tHour, tMin, 0);

							const isBeforeConcert = now < concertDate;
							const isTicketingOpen = now >= fullTicketingDate;

							const linktreeLink = LINK_LIST.find(cat => cat.category === 'ETC')?.items.find(
								item => item.label === ETC_PLATFORM.LINK_TREE,
							)?.url;
							const finalTicketingLink = ticketingLink || linktreeLink;

							return (
								<S.InfoGroup key={`${ticketingDate}-${index}`}>
									{ticketingDate && (
										<>
											<InfoTitle
												label={(concert.ticketing?.length ?? 0) > 1 ? `TICKETING ${index + 1}차` : 'TICKETING'}
											/>
											<S.InfoItem>
												{ticketingDate} ({GetDay(ticketingDate)})
												{ticketingTime && <span className="time"> {ticketingTime}</span>}
											</S.InfoItem>
										</>
									)}

									{!isBeforeConcert ? (
										<S.InfoItem>
											<span className="info">공연이 종료되었습니다.</span>
										</S.InfoItem>
									) : !isTicketingOpen ? (
										<S.InfoItem>
											<span className="info">티켓팅 오픈 전입니다.</span>
										</S.InfoItem>
									) : (
										finalTicketingLink && (
											<>
												<S.PrimaryButton to={finalTicketingLink} target="_blank" rel="noopener noreferrer">
													{(concert.ticketing?.length ?? 0) > 1
														? `${index + 1}차 티켓 예매하러 가기`
														: '티켓 예매하러 가기'}
												</S.PrimaryButton>
												{!ticketingLink && finalTicketingLink === linktreeLink && (
													<S.InfoItem>
														<span className="info">링크트리의 구글폼에서 예매해주세요.</span>
													</S.InfoItem>
												)}
											</>
										)
									)}
								</S.InfoGroup>
							);
						})}
				</>
			);
		}

		if (type === 'ALBUM' && 'releaseDate' in data) {
			const album = data as Album;
			const { detailUrl } = GetAlbumPaths(album);

			return (
				<>
					<S.InfoGroup>
						<InfoTitle label="TYPE" />
						<S.InfoItem>{ALBUM_TYPE_LABEL[album.type]}</S.InfoItem>
					</S.InfoGroup>

					<S.InfoGroup>
						<InfoTitle label="RELEASE DATE" />
						<S.InfoItem>
							{album.releaseDate} ({GetDay(album.releaseDate)})
						</S.InfoItem>
					</S.InfoGroup>

					<S.InfoGroup>
						<InfoTitle label="ABOUT ALBUM" />
						<S.MoreButton to={detailUrl} target="_blank" rel="noopener noreferrer">
							{ALBUM_TYPE_LABEL[album.type]} 정보 더보기
						</S.MoreButton>
					</S.InfoGroup>

					{album.store && (
						<>
							{typeof album.store === 'string' ? (
								<S.PrimaryButton to={album.store} target="_blank" rel="noopener noreferrer">
									{ALBUM_TYPE_LABEL[album.type]}구매하기
								</S.PrimaryButton>
							) : (
								Object.entries(album.store).map(([key, url]) => {
									const detail = LINK_SHOP[key];

									return (
										<S.PrimaryButton key={key} to={url} target="_blank" rel="noopener noreferrer">
											{detail ? (
												<>
													{ALBUM_TYPE_LABEL[album.type]} 구매하기 - {detail.STORE}
												</>
											) : (
												<>{key}</>
											)}
										</S.PrimaryButton>
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
					<S.InfoGroup>
						<InfoTitle label="DATE" />
						<S.InfoItem>
							{event.date} ({GetDay(event.date)})
						</S.InfoItem>
					</S.InfoGroup>

					<S.InfoGroup>
						<InfoTitle label="HOST" />
						<S.InfoItem>{event.host}</S.InfoItem>
					</S.InfoGroup>

					<S.InfoGroup>
						<InfoTitle label="PLATFORM" />
						<S.InfoItem>{event.platform}</S.InfoItem>
					</S.InfoGroup>

					<S.InfoGroup>
						<InfoTitle label="TYPE" />
						<S.InfoItem>{EVENT_TYPE_LABEL[event.type]}</S.InfoItem>
					</S.InfoGroup>

					{linkUrl && (
						<S.PrimaryButton to={linkUrl} target="_blank" rel="noopener noreferrer">
							{event.platform ? event.platform : event.host}로 보러가기
						</S.PrimaryButton>
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
					<S.InfoGroup>
						<InfoTitle label="DATE" />
						<S.InfoItem>
							{sche.date} ({GetDay(sche.date)})
						</S.InfoItem>
					</S.InfoGroup>
					{sche.message && (
						<S.InfoGroup>
							<InfoTitle label="MESSAGE" />
							<S.InfoItem>{sche.message}</S.InfoItem>
						</S.InfoGroup>
					)}

					{sche.hashtags && (
						<S.InfoGroup>
							<InfoTitle label="HASHTAGS" />
							<S.HashTagWrapper>
								{sche.hashtags.map(tag => (
									<S.HashTag key={tag} onClick={() => handleCopy(tag)}>
										{tag}
									</S.HashTag>
								))}
							</S.HashTagWrapper>
							<S.CopyAnnotation>* 태그를 클릭하면 복사됩니다.</S.CopyAnnotation>
						</S.InfoGroup>
					)}

					{instagramUrl && !sche.specialLink && (
						<S.PrimaryButton to={instagramUrl} target="_blank" rel="noopener noreferrer">
							{sche.content}
						</S.PrimaryButton>
					)}

					{sche.fileUrl && (
						<S.PrimaryButton to={sche.fileUrl.url} target="_blank" download>
							{sche.fileUrl.label}
						</S.PrimaryButton>
					)}
				</>
			);
		}

		return null;
	};

	const renderBottomMap = () => {
		if (type !== 'CONCERT' || !data) return null;

		const location = (data as ConcertItem).location;
		if (!location || location === '미정') return null;

		const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

		return (
			<S.MapSection>
				<S.SectionTitle>
					공연장 오시는 길<span>Directions to the concert hall</span>
				</S.SectionTitle>
				<S.MapFrameWrapper>
					<iframe title="공연장 지도" src={mapUrl} loading="lazy" />
				</S.MapFrameWrapper>
			</S.MapSection>
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

			<S.MainSection>
				{hasImage && finalImgSrc && (
					<S.ImageWrapper>
						<img src={finalImgSrc} onError={handleImgError} />
					</S.ImageWrapper>
				)}

				<S.ContentSection>{renderInfoGroups()}</S.ContentSection>
			</S.MainSection>

			{renderBottomMap()}
		</>
	);
};

export default ScheduleDetailBody;
