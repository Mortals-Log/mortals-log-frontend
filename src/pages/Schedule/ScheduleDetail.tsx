// @pages/Schedule/ScheduleDetail.tsx

import * as S from '@styles/pages/Schedule/ScheduleDetail.style';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { format, parse, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';
import { ALL_SCHEDULE_LIST } from '@/utils/schedule';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/placeholder';
import { SCHEDULE_LABEL_MAP } from '@/const/schedule';
import useImageFallback from '@/hooks/useImageFallback';

const ScheduleDetail = () => {
	const handleImgError = useImageFallback();
	const { id } = useParams<{ id: string }>();

	const scheduleData = useMemo(() => {
		return ALL_SCHEDULE_LIST.find(item => String(item.id) === id);
	}, [id]);

	const formattedDate = useMemo(() => {
		if (!scheduleData?.date) return '-';
		const date = parse(scheduleData.date, 'yyyy.MM.dd', new Date());

		return isValid(date) ? format(date, 'yyyy.MM.dd (eee)', { locale: ko }) : scheduleData.date;
	}, [scheduleData]);

	if (!scheduleData) {
		return (
			<S.MainContainer>
				<BackButton to="/schedule" />
				<Placeholder message="일정을 찾을 수 없습니다." />
			</S.MainContainer>
		);
	}

	return (
		<S.MainContainer>
			<BackButton />
			<S.HeaderSection>
				<S.CategoryBadge>{SCHEDULE_LABEL_MAP[scheduleData.type as keyof typeof SCHEDULE_LABEL_MAP]}</S.CategoryBadge>

				<S.MainTitle>{scheduleData.content}</S.MainTitle>

				<S.DateInfo>
					{formattedDate}
					{scheduleData.time && <span className="time">{scheduleData.time}</span>}
				</S.DateInfo>
			</S.HeaderSection>

			<S.MainSection>
				{/* 1. 이미지 */}
				{scheduleData.imageUrl && (
					<S.ImageWrapper type={scheduleData.type}>
						<img src={scheduleData.imageUrl} alt={scheduleData.content} onError={handleImgError} />
					</S.ImageWrapper>
				)}

				<S.ContentSection>
					{/* 2. 라인업 */}
					{scheduleData.lineUp && (
						<S.InfoGroup>
							<S.InfoTitle>LINE UP</S.InfoTitle>

							<S.LineUpWrapper>
								{scheduleData.lineUp.flat().map((artist, index) => (
									<S.ArtistTag key={`${artist}-${index}`}>{artist}</S.ArtistTag>
								))}
							</S.LineUpWrapper>
						</S.InfoGroup>
					)}

					{/* 3. 티켓값 */}
					{scheduleData.price && (
						<S.InfoGroup>
							<S.InfoTitle>TICKET</S.InfoTitle>
							<S.PriceList>
								<S.InfoItem>일반: {scheduleData.price.regular}원</S.InfoItem>

								{Object.entries(scheduleData.price).map(([key, value]) => {
									if (key === 'regular' || !value) return null;

									const labels: Record<string, string> = {
										onSpot: '현장 판매',
										army: '군인 할인',
										student: '학생 할인',
									};
									return (
										<S.InfoItem key={key}>
											{labels[key] || key}: {value}원
										</S.InfoItem>
									);
								})}
							</S.PriceList>
						</S.InfoGroup>
					)}

					{/* 4. 장소 */}
					{scheduleData.location && (
						<S.InfoGroup>
							<S.InfoTitle>LOCATION</S.InfoTitle>

							<S.InfoItem>{scheduleData.location}</S.InfoItem>
						</S.InfoGroup>
					)}

					{/* 5. 티켓 예매링크 */}
					{scheduleData.reservationLink && (
						<S.PrimaryButton href={scheduleData.reservationLink} target="_blank">
							티켓 예매하러 가기
						</S.PrimaryButton>
					)}
				</S.ContentSection>
			</S.MainSection>
		</S.MainContainer>
	);
};

export default ScheduleDetail;
