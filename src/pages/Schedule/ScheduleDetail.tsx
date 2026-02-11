// @pages/Schedule/ScheduleDetail.tsx

import * as S from '@styles/pages/Schedule/ScheduleDetail.style';
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { ALL_SCHEDULE_LIST } from '@/utils/schedule';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/placeholder';
import { SCHEDULE_LABEL_MAP } from '@/const/schedule';
import { FULL_CONCERTS } from '@/const/concert';
import { FULL_ALBUMS } from '@/const/albums';
import { FULL_EVENTS } from '@/const/event';
import ScheduleDetailConcert from '@pages/Schedule/ScheduleDetailConcert';
import ScheduleDetailAlbum from '@pages/Schedule/ScheduleDetailAlbum';
import ScheduleDetailEvent from '@pages/Schedule/ScheduleDetailEvent';
import ScheduleDetailBirthday from '@pages/Schedule/ScheduleDetailBirthday';
import ScheduleDetailAnniversary from '@pages/Schedule/ScheduleDetailAnniversary';

const ScheduleDetail = () => {
	const { id } = useParams<{ id: string }>();

	const scheduleBase = useMemo(() => {
		return ALL_SCHEDULE_LIST.find(item => String(item.id) === id);
	}, [id]);

	const concertData = useMemo(() => {
		if (!scheduleBase || scheduleBase.type !== 'CONCERT') return null;

		return FULL_CONCERTS.flatMap(g => g.items).find(i => scheduleBase.content.includes(i.content));
	}, [scheduleBase]);

	const albumData = useMemo(() => {
		if (!scheduleBase || scheduleBase.type !== 'ALBUM') return null;

		return FULL_ALBUMS.flatMap(g => g.items).find(i => scheduleBase.content.includes(i.title));
	}, [scheduleBase]);

	const eventData = useMemo(() => {
		if (!scheduleBase || scheduleBase.type !== 'EVENT') return null;

		return FULL_EVENTS.flatMap(g => g.items).find(i => scheduleBase.content.includes(i.content));
	}, [scheduleBase]);

	if (!scheduleBase)
		return (
			<S.MainContainer>
				<BackButton to="/schedule" />
				<Placeholder message="일정을 찾을 수 없습니다." />
			</S.MainContainer>
		);

	const year = scheduleBase.date.split('.')[0];

	return (
		<S.MainContainer>
			<BackButton />

			<S.HeaderSection>
				<S.CategoryBadge>
					{scheduleBase.ageLimit ? '미성년자 관람 불가 | ' : ''}
					{SCHEDULE_LABEL_MAP[scheduleBase.type]}
				</S.CategoryBadge>

				<S.MainTitle ageLimit={scheduleBase.ageLimit || false}>
					{scheduleBase.type === 'CONCERT' && concertData ? concertData.content : scheduleBase.content}
				</S.MainTitle>
			</S.HeaderSection>

			{scheduleBase.type === 'CONCERT' && concertData && (
				<ScheduleDetailConcert
					schedule={{
						...concertData,
						date: `${year}.${concertData.date}`,
						times: concertData.times,
					}}
					imageUrl={scheduleBase.imageUrl}
					content={scheduleBase.content}
				/>
			)}

			{scheduleBase.type === 'ALBUM' && albumData && <ScheduleDetailAlbum album={albumData} />}

			{scheduleBase.type === 'EVENT' && eventData && (
				<ScheduleDetailEvent event={{ ...eventData, date: `${year}.${eventData.date}` }} />
			)}

			{scheduleBase.type === 'BIRTHDAY' && <ScheduleDetailBirthday schedule={scheduleBase} />}

			{scheduleBase.type === 'ANNIVERSARY' && <ScheduleDetailAnniversary schedule={scheduleBase} />}
		</S.MainContainer>
	);
};

export default ScheduleDetail;
