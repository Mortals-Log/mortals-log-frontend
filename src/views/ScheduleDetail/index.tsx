'use client';

// @/views/Schedule/ScheduleDetail

import { useParams } from 'next/navigation';
import { useMemo } from 'react';

import { ALL_SCHEDULE_LIST } from '@/utils/schedule';
import { ConcertItem } from '@/types/concert';

import { SCHEDULE_LABEL_MAP } from '@/const/schedule';
import { FULL_CONCERTS } from '@/const/concert';
import { FULL_ALBUMS } from '@/const/albums';
import { FULL_EVENTS } from '@/const/event';

import BackButton from '@/components/BackButton';
import Placeholder from '@/components/Placeholder';
import ScheduleDetailBody from '@/views/ScheduleDetail/ScheduleDetailBody';
import { SD_MAIN, SD_HEADER_SECTION, SD_CATEGORY_BADGE, sdMainTitle } from './detail-classes';

const isConcert = (data: any): data is ConcertItem =>
	data && 'content' in data && 'type' in data && ['SOLO', 'JOIN', 'TOUR', 'LISTENING'].includes(data.type);

const ScheduleDetail = () => {
	const { id } = useParams<{ id: string }>();

	const scheduleBase = useMemo(() => {
		return ALL_SCHEDULE_LIST.find(item => String(item.id) === id);
	}, [id]);

	const detailData = useMemo(() => {
		if (!scheduleBase) return null;

		const { type, content } = scheduleBase;
		const year = scheduleBase.date.split('.')[0];

		let found: any = null;

		switch (type) {
			case 'CONCERT':
				found = FULL_CONCERTS.flatMap(g => g.items).find(i => content.includes(i.content));
				break;
			case 'ALBUM':
				found =
					FULL_ALBUMS.flatMap(g => g.items).find(i => i.title === content) ||
					FULL_ALBUMS.flatMap(g => g.items).find(i => content.includes(i.title));
				break;
			case 'EVENT':
				found = FULL_EVENTS.flatMap(g => g.items).find(i => content.includes(i.content));
				break;
		}

		if (!found) return null;

		const rawDate = type === 'ALBUM' ? found.releaseDate : found.date;

		return {
			...found,
			date: rawDate && !rawDate.includes(year) ? `${year}.${rawDate}` : rawDate,
		};
	}, [scheduleBase]);

	if (!scheduleBase) {
		return (
			<main className={SD_MAIN}>
				<BackButton to="/schedule" />
				<Placeholder message="일정을 찾을 수 없습니다." />
			</main>
		);
	}

	const { type, ageLimit, content, imageUrl } = scheduleBase;

	return (
		<main className={SD_MAIN}>
			<BackButton />

			<header className={SD_HEADER_SECTION}>
				<span className={SD_CATEGORY_BADGE}>
					{ageLimit ? '미성년자 관람 불가 | ' : ''}
					{SCHEDULE_LABEL_MAP[type]}
				</span>

				<div className={sdMainTitle(ageLimit || false)}>
					{(isConcert(detailData) && detailData?.content) || content}
				</div>
			</header>

			{detailData ? (
				<ScheduleDetailBody type={type} data={detailData} imageUrl={imageUrl} />
			) : (
				<ScheduleDetailBody type={type} data={scheduleBase} />
			)}
		</main>
	);
};

export default ScheduleDetail;
