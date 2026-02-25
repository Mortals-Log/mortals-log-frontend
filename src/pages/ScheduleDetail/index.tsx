// @pages/Schedule/ScheduleDetail.tsx

import * as S from '@/styles/pages/ScheduleDetail/ScheduleDetail.style';

import { useParams } from 'react-router-dom';
import { useMemo } from 'react';

import { ALL_SCHEDULE_LIST } from '@/utils/schedule';
import { ConcertItem } from '@/types/concert';
import { Album } from '@/types/album';
import { EventItem } from '@/types/event';

import { SCHEDULE_LABEL_MAP } from '@/const/schedule';
import { FULL_CONCERTS } from '@/const/concert';
import { FULL_ALBUMS } from '@/const/albums';
import { FULL_EVENTS } from '@/const/event';

import BackButton from '@/components/BackButton';
import Placeholder from '@/components/Placeholder';
import ScheduleDetailConcert from '@/pages/ScheduleDetail/ScheduleDetailConcert';
import ScheduleDetailAlbum from '@/pages/ScheduleDetail/ScheduleDetailAlbum';
import ScheduleDetailEvent from '@/pages/ScheduleDetail/ScheduleDetailEvent';
import ScheduleDetailAnniversary from '@/pages/ScheduleDetail/ScheduleDetailAnniversary';

const isConcert = (data: any): data is ConcertItem =>
	data && 'content' in data && 'type' in data && ['SOLO', 'JOIN', 'TOUR', 'LISTENING'].includes(data.type);
const isAlbum = (data: any): data is Album => data && 'title' in data;
const isEvent = (data: any): data is EventItem => data && !('title' in data) && 'content' in data;

const ScheduleDetail = () => {
	const { id } = useParams<{ id: string }>();

	const scheduleBase = useMemo(() => {
		return ALL_SCHEDULE_LIST.find(item => String(item.id) === id);
	}, [id]);

	const detailData = useMemo(() => {
		if (!scheduleBase) return null;

		const { type, content } = scheduleBase;

		switch (type) {
			case 'CONCERT':
				return FULL_CONCERTS.flatMap(g => g.items).find(i => content.includes(i.content));
			case 'ALBUM':
				return (
					FULL_ALBUMS.flatMap(g => g.items).find(i => i.title === content) ||
					FULL_ALBUMS.flatMap(g => g.items).find(i => content.includes(i.title))
				);
			case 'EVENT':
				return FULL_EVENTS.flatMap(g => g.items).find(i => content.includes(i.content));
			default:
				return null;
		}
	}, [scheduleBase]);

	if (!scheduleBase) {
		return (
			<S.MainContainer>
				<BackButton to="/schedule" />
				<Placeholder message="일정을 찾을 수 없습니다." />
			</S.MainContainer>
		);
	}

	const year = scheduleBase.date.split('.')[0];
	const { type, ageLimit, content, imageUrl } = scheduleBase;

	return (
		<S.MainContainer>
			<BackButton />

			<S.HeaderSection>
				<S.CategoryBadge>
					{ageLimit ? '미성년자 관람 불가 | ' : ''}
					{SCHEDULE_LABEL_MAP[type]}
				</S.CategoryBadge>

				<S.MainTitle ageLimit={ageLimit || false}>
					{(isConcert(detailData) && detailData?.content) || content}
				</S.MainTitle>
			</S.HeaderSection>

			{isConcert(detailData) && (
				<ScheduleDetailConcert
					schedule={{
						...detailData,
						date: `${year}.${detailData.date}`,
					}}
					imageUrl={imageUrl}
					content={content}
				/>
			)}

			{isAlbum(detailData) && <ScheduleDetailAlbum album={detailData} />}

			{isEvent(detailData) && <ScheduleDetailEvent schedule={{ ...detailData, date: `${year}.${detailData.date}` }} />}

			{['BIRTHDAY', 'ANNIVERSARY'].includes(type) && <ScheduleDetailAnniversary schedule={scheduleBase} />}
		</S.MainContainer>
	);
};

export default ScheduleDetail;
