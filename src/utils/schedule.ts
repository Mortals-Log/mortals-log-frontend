// @/utils/schedule

/* eslint-disable storybook/default-exports */

import { CalendarSchedules, Schedule } from '@/types/schedule';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@const/albums';
import { CONCERT_TYPE_LABEL, FULL_CONCERTS } from '@const/concert';
import { EVENT_TYPE_LABEL, FULL_EVENTS } from '@const/event';
import { PROFILE } from '@const/profile';
import { SCHEDULE_LABEL_MAP } from '@/const/schedule';
import { GetAlbumPaths } from '@utils/album';
import { GetConcertPaths } from '@utils/concert';
import { GenerateScheduleId } from '@utils/id';
import { CalculateKorAge, FormatDate } from '@utils/date';

export const GET_CALENDAR_SCHEDULES = (): CalendarSchedules => {
	const schedules: CalendarSchedules = {};

	const addSchedule = (dateKey: string, data: Omit<Schedule, 'id' | 'date'>) => {
		const key = dateKey.replace(/\s/g, '');
		if (!schedules[key]) schedules[key] = [];

		const schedule: Schedule = {
			...data,
			date: dateKey.replace(/-/g, '.'),
			id: GenerateScheduleId(data.type, dateKey, data.content),
		};

		schedules[key].push(schedule);
	};

	// 1. 앨범
	FULL_ALBUMS.forEach(group =>
		group.items.forEach(item => {
			const formattedDate = item.releaseDate.replace(/\./g, '-');
			const albumTag = `[${ALBUM_TYPE_LABEL[item.type]}${item.type === 'LP' && item.volume ? ` ${item.volume}집` : ''}]`;
			const { imageSrc } = GetAlbumPaths(item);

			addSchedule(formattedDate, {
				type: 'ALBUM',
				content: `${albumTag} ${item.title} 발매`,
				imageUrl: imageSrc,
			});
		}),
	);

	// 2. 콘서트
	FULL_CONCERTS.forEach(group =>
		group.items.forEach(item => {
			const [startMD, endMD] = item.date.split('~').map(d => d.trim());
			const { imageSrc } = GetConcertPaths(item, group.year);
			const baseContent = `[${CONCERT_TYPE_LABEL[item.type]}] ${item.content}`;

			const startDate = new Date(`${group.year}-${startMD.replace(/\./g, '-')}`);
			const endDate = endMD ? new Date(`${group.year}-${endMD.replace(/\./g, '-')}`) : new Date(startDate);
			const concertIdDate = FormatDate(startDate);

			for (let curr = new Date(startDate); curr.getTime() <= endDate.getTime(); curr.setDate(curr.getDate() + 1)) {
				const dateKey = FormatDate(curr);

				if (item.times && item.times.length > 1) {
					item.times.forEach((time, index) => {
						const displayContent = `${baseContent} - ${index + 1}부`;
						addSchedule(dateKey, {
							type: 'CONCERT',
							content: displayContent,
							time: time,
							imageUrl: imageSrc,
							ageLimit: item.ageLimit || false,
						});
					});
				} else {
					addSchedule(dateKey, {
						type: 'CONCERT',
						content: baseContent,
						time: item.times ? item.times[0] : null,
						imageUrl: imageSrc,
						ageLimit: item.ageLimit || false,
					});
				}
			}

			if (item.ticketing && item.ticketing.ticketingDate) {
				const tDateKey = item.ticketing.ticketingDate.replace(/\./g, '-');
				const displayContent = `[${SCHEDULE_LABEL_MAP.TICKETING}] ${item.content}`;

				const ticketingSchedule: Schedule = {
					type: 'TICKETING',
					content: displayContent,
					date: tDateKey.replace(/-/g, '.'),
					time: item.ticketing.ticketingTime,
					imageUrl: imageSrc,
					id: GenerateScheduleId('CONCERT', concertIdDate, baseContent),
				};

				if (!schedules[tDateKey]) schedules[tDateKey] = [];
				schedules[tDateKey].push(ticketingSchedule);
			}
		}),
	);

	// 3. 기타 이벤트
	FULL_EVENTS.forEach(group =>
		group.items.forEach(item => {
			const dateKey = `${group.year}-${item.date.replace(/\./g, '-')}`;

			addSchedule(dateKey, {
				type: 'EVENT',
				content: `[${EVENT_TYPE_LABEL[item.type]} - ${item.host}] ${item.content}`,
			});
		}),
	);

	// 4. 기념일
	const dayMilestones = [100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000];

	const [dYear, dMonth, dDay] = PROFILE.debut[0].split('.').map(Number);
	const debutDate = new Date(dYear, dMonth - 1, dDay);

	const [bYear, bMonth, bDay] = PROFILE.birth[0].split('.').map(Number);
	const birthDate = new Date(bYear, bMonth - 1, bDay);

	const debutYear = debutDate.getFullYear();

	const getMonthDay = (date: Date) =>
		`${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

	const debutMD = getMonthDay(debutDate);
	const birthMD = getMonthDay(birthDate);

	for (let year = debutDate.getFullYear(); year <= debutYear + 10; year++) {
		const nthBirthday = CalculateKorAge(birthDate, year);
		const nthDebut = year - debutDate.getFullYear();

		addSchedule(`${year}-${debutMD}`, {
			type: 'ANNIVERSARY',
			content: year === debutDate.getFullYear() ? `🎉 데뷔 - ${PROFILE.debut[1]}` : `🎉 데뷔 ${nthDebut}주년`,
			message:
				year === debutDate.getFullYear()
					? `천진우의 데뷔를 축하합니다!`
					: `천진우의 데뷔 ${nthDebut}주년을 축하합니다!`,
			hashtags:
				year === debutDate.getFullYear()
					? ['#천진우_데뷔', `#굴다리`, '#데뷔일']
					: ['#천진우_데뷔', `#굴다리`, `#데뷔_${nthDebut}주년`],
		});

		addSchedule(`${year}-${birthMD}`, {
			type: 'BIRTHDAY',
			content: `🎂 ${PROFILE.name} ${nthBirthday}번째 생일`,
			message: `천진우의 ${nthBirthday}번째 생일을 축하합니다!`,
			hashtags: [
				'#천진우_생일축하해',
				`#천진우_${nthBirthday}번째_생일`,
				'#생일존나축하하고_일단한잔해',
				'#아무쪼록_건강해라',
			],
		});
	}

	dayMilestones.forEach(days => {
		const milestoneDate = new Date(debutDate);
		milestoneDate.setDate(debutDate.getDate() + (days - 1));

		const dateKey = FormatDate(milestoneDate);

		addSchedule(dateKey, {
			type: 'ANNIVERSARY',
			content: `🎉 데뷔 ${days}일`,
			message: `천진우의 데뷔 ${days}일을 축하합니다!`,
			hashtags: ['#천진우_데뷔', `#굴다리`, `#데뷔_${days}일`],
		});
	});

	return schedules;
};

export const CALENDAR_SCHEDULES = GET_CALENDAR_SCHEDULES();
export const ALL_SCHEDULE_LIST = Object.values(CALENDAR_SCHEDULES).flat();
