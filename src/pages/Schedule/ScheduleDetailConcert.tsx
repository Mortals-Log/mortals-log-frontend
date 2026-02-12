// @pages/Schedule/ScheduleDetailConcert.tsx

import * as S from '@styles/pages/Schedule/ScheduleDetail.style';
import { ConcertItem } from '@/types/concert';
import { useMemo } from 'react';
import useImageFallback from '@/hooks/useImageFallback';
import { GetDay } from '@/utils/date';

interface ScheduleDetailConcertProps {
	schedule: ConcertItem;
	imageUrl?: string;
	content: string;
}

const ScheduleDetailConcert = ({ schedule, imageUrl, content }: ScheduleDetailConcertProps) => {
	const handleImgError = useImageFallback();
	const DEFAULT_IMAGE = '/images/default-poster.png';

	const year = schedule.date.split('.')[0];
	const cleanDate = schedule.date.replace(`${year}.`, '').trim();

	const mapUrl = useMemo(() => {
		if (!schedule.location || schedule.location === '미정') return null;

		return `https://maps.google.com/maps?q=${encodeURIComponent(schedule.location)}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
	}, [schedule.location]);

	return (
		<>
			{schedule.ageLimit && (
				<>
					<S.InfoGroup>
						<S.InfoTitle>CAUTION</S.InfoTitle>
						{[
							'본 공연은 성인 인증이 필요하며, 미성년자는 보호자 동반 시에도 입장이 불가합니다.',
							'현장에서 신분증 확인이 진행되오니 반드시 지참해 주세요.',
						].map(text => (
							<S.InfoItem>* {text}</S.InfoItem>
						))}
					</S.InfoGroup>
					<br />
				</>
			)}
			<S.MainSection>
				<S.ImageWrapper>
					<img src={imageUrl || DEFAULT_IMAGE} alt={content} onError={handleImgError} />
				</S.ImageWrapper>

				<S.ContentSection>
					<S.InfoGroup>
						<S.InfoTitle>Date & time</S.InfoTitle>
						{cleanDate.includes('~')
							? cleanDate.split('~').map((date, idx) => (
									<S.InfoItem key={`range-${idx}`}>
										<span className="part">{idx + 1}일차.</span>
										{year}.{date.trim()} ({GetDay(date, year)})
										{schedule.times?.map((time, tIdx) => (
											<span key={tIdx} className="time">
												{time}
											</span>
										))}
									</S.InfoItem>
								))
							: schedule.times?.map((time, idx) => (
									<S.InfoItem key={`single-${idx}`}>
										{schedule.times && schedule.times.length > 1 && <span className="part">{idx + 1}부.</span>}
										{year}.{cleanDate} ({GetDay(cleanDate, year)})<span className="time">{time}</span>
									</S.InfoItem>
								))}
					</S.InfoGroup>

					{schedule.location && (
						<S.InfoGroup>
							<S.InfoTitle>LOCATION</S.InfoTitle>
							<S.InfoItem>{schedule.location}</S.InfoItem>
						</S.InfoGroup>
					)}

					{schedule.lineUp && (
						<S.InfoGroup>
							<S.InfoTitle>LINE UP</S.InfoTitle>
							<S.LineUpWrapper>
								{schedule.lineUp.map((artist, idx) => (
									<S.ArtistTag key={idx}>{artist}</S.ArtistTag>
								))}
							</S.LineUpWrapper>
						</S.InfoGroup>
					)}

					{schedule.price && (
						<S.InfoGroup>
							<S.InfoTitle>TICKET</S.InfoTitle>
							<S.InfoItem>일반: {schedule.price.regular}원</S.InfoItem>
							{Object.entries(schedule.price).map(([key, value]) => {
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

					{schedule.reservationLink && (
						<S.PrimaryButton href={schedule.reservationLink} target="_blank" rel="noopener noreferrer">
							티켓 예매하러 가기
						</S.PrimaryButton>
					)}
				</S.ContentSection>
			</S.MainSection>
			{mapUrl && (
				<S.MapSection>
					<S.SectionTitle>
						공연장 오시는 길<span>Directions to the concert hall</span>
					</S.SectionTitle>
					<S.MapFrameWrapper>
						<iframe title="공연장 지도" src={mapUrl} />
					</S.MapFrameWrapper>
				</S.MapSection>
			)}
		</>
	);
};

export default ScheduleDetailConcert;
