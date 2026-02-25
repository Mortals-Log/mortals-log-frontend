// @pages/Schedule/ScheduleDetailBody.tsx

import * as S from '@/styles/pages/ScheduleDetail/ScheduleDetail.style';

import { ConcertItem } from '@/types/concert';
import { Album } from '@/types/album';
import { EventItem } from '@/types/event';
import { Schedule } from '@/types/schedule';

import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { LINK_LIST, LINK_PLATFORM, LINK_SHOP, SNS_PLATFORM } from '@/const/links';
import useImageFallback from '@/hooks/useImageFallback';
import handleCopy from '@/hooks/handlecopy';
import { GetAlbumPaths } from '@/utils/album';
import { GetDay } from '@/utils/date';
import { EVENT_TYPE_LABEL } from '@/const/event';

type DetailData = ConcertItem | Album | EventItem | Schedule;

interface ScheduleDetailBodyProps {
	type: Schedule['type'];
	data: DetailData;
	imageUrl?: string;
	content?: string;
}

const ScheduleDetailBody = ({ type, data, imageUrl }: ScheduleDetailBodyProps) => {
	const handleImgError = useImageFallback();

	const renderTopMedia = () => {
		let videoUrl = '';

		if (type === 'BIRTHDAY') videoUrl = 'https://www.youtube.com/embed/wHe8ntDlOco';
		if (type === 'ANNIVERSARY') videoUrl = 'https://www.youtube.com/embed/K9aIiynSPU4';
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
						<S.InfoTitle>Date & time</S.InfoTitle>
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
							<S.InfoTitle>LINE UP</S.InfoTitle>
							<S.LineUpWrapper>
								{concert.lineUp.map((artist, idx) => (
									<S.LineUpItem key={idx}>{artist}</S.LineUpItem>
								))}
							</S.LineUpWrapper>
						</S.InfoGroup>
					)}

					{concert.price && (
						<S.InfoGroup>
							<S.InfoTitle>TICKET</S.InfoTitle>
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

					{concert.reservationLink && (
						<S.PrimaryButton to={concert.reservationLink} target="_blank" rel="noopener noreferrer">
							티켓 예매하러 가기
						</S.PrimaryButton>
					)}
				</>
			);
		}

		if (type === 'ALBUM' && 'releaseDate' in data) {
			const album = data as Album;
			const { detailUrl } = GetAlbumPaths(album);

			return (
				<>
					<S.InfoGroup>
						<S.InfoTitle>TYPE</S.InfoTitle>
						<S.InfoItem>{ALBUM_TYPE_LABEL[album.type]}</S.InfoItem>
					</S.InfoGroup>

					<S.InfoGroup>
						<S.InfoTitle>Release Date</S.InfoTitle>
						<S.InfoItem>
							{album.releaseDate} ({GetDay(album.releaseDate)})
						</S.InfoItem>
					</S.InfoGroup>

					<S.InfoGroup>
						<S.InfoTitle>ABOUT ALBUM</S.InfoTitle>
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
						<S.InfoTitle>DATE</S.InfoTitle>
						<S.InfoItem>
							{event.date} ({GetDay(event.date)})
						</S.InfoItem>
					</S.InfoGroup>

					<S.InfoGroup>
						<S.InfoTitle>HOST</S.InfoTitle>
						<S.InfoItem>{event.host}</S.InfoItem>
					</S.InfoGroup>

					<S.InfoGroup>
						<S.InfoTitle>PLATFORM</S.InfoTitle>
						<S.InfoItem>{event.platform}</S.InfoItem>
					</S.InfoGroup>

					<S.InfoGroup>
						<S.InfoTitle>TYPE</S.InfoTitle>
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
						<S.InfoTitle>DATE</S.InfoTitle>
						<S.InfoItem>
							{sche.date} ({GetDay(sche.date)})
						</S.InfoItem>
					</S.InfoGroup>
					{sche.message && (
						<S.InfoGroup>
							<S.InfoTitle>MESSAGE</S.InfoTitle>
							<S.InfoItem>{sche.message}</S.InfoItem>
						</S.InfoGroup>
					)}

					{sche.hashtags && (
						<S.InfoGroup>
							<S.InfoTitle>HASHTAGS</S.InfoTitle>
							<S.TagWrapper>
								{sche.hashtags.map(tag => (
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
							<S.PrimaryButton to={instagramUrl} target="_blank" rel="noopener noreferrer">
								{sche.content} 축하하러 가기
							</S.PrimaryButton>
						</S.InfoGroup>
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
	const albumPaths = type === 'ALBUM' ? GetAlbumPaths(data as Album) : null;
	const finalImgSrc = type === 'ALBUM' ? albumPaths?.imageSrc : imageUrl;

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
