// @utils/schedule

/* eslint-disable storybook/default-exports */

import { CalendarSchedules, Schedule } from '@/types/schedule';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@const/albums';
import { CONCERT_TYPE_LABEL, FULL_CONCERTS } from '@const/concert';
import { EVENT_TYPE_LABEL, FULL_EVENTS } from '@const/event';
import { PROFILE } from '@const/profile';

export const FormatDate = (date: Date) =>
	`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const GET_CALENDAR_SCHEDULES = (): CalendarSchedules => {
	const schedules: CalendarSchedules = {};

	const addSchedule = (dateKey: string, data: Omit<Schedule, 'id' | 'date'>) => {
		const key = dateKey.replace(/\s/g, '');

		if (!schedules[key]) schedules[key] = [];
		const idSource = `${data.type}-${key}-${data.content}`;

		const schedule: Schedule = {
			...data,
			date: dateKey.replace(/-/g, '.'),
			id: btoa(encodeURIComponent(idSource)).replace(/[=/+]/g, '').slice(0, 20),
		};

		schedules[key].push(schedule);
	};

	// 1. 앨범
	FULL_ALBUMS.forEach(group =>
		group.items.forEach(item => {
			const formattedDate = item.releaseDate.replace(/\./g, '-');
			const albumTag = `[${ALBUM_TYPE_LABEL[item.type]}${item.type === 'LP' && item.volume ? ` ${item.volume}집` : ''}]`;
			addSchedule(formattedDate, {
				type: 'ALBUM',
				content: `${albumTag} ${item.title} 발매`,
			});
		}),
	);

	// 2. 콘서트
	FULL_CONCERTS.forEach(group =>
		group.items.forEach(item => {
			const [startMD, endMD] = item.date.split('~').map(d => d.trim());

			const startDate = new Date(`${group.year}-${startMD.replace(/\./g, '-')}`);
			const endDate = endMD ? new Date(`${group.year}-${endMD.replace(/\./g, '-')}`) : new Date(startDate);

			for (let curr = new Date(startDate); curr.getTime() <= endDate.getTime(); curr.setDate(curr.getDate() + 1)) {
				const dateKey = FormatDate(curr);
				const baseContent = `[${CONCERT_TYPE_LABEL[item.type]}] ${item.content}`;
				const isPeriod = !!endMD;

				if (item.times && item.times.length > 1) {
					item.times.forEach((time, index) =>
						addSchedule(dateKey, {
							type: 'CONCERT',
							content: `${baseContent} - ${index + 1}부`,
							time: time,
							isPeriod: isPeriod,
						}),
					);
				} else {
					addSchedule(dateKey, {
						type: 'CONCERT',
						content: `${baseContent}`,
						time: item.times ? item.times[0] : null,
						isPeriod: isPeriod,
					});
				}
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
				link: item.link,
			});
		}),
	);

	// 4. 기념일
	const dayMilestones = [100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000];

	const debutDate = new Date(PROFILE.debut[0].replace(/\./g, '-'));
	const birthDate = new Date(PROFILE.birth[0].replace(/\./g, '-'));

	const debutYear = debutDate.getFullYear();

	const debutMD = FormatDate(debutDate).slice(5);
	const birthMD = FormatDate(birthDate).slice(5);

	for (let year = debutDate.getFullYear(); year <= debutYear + 10; year++) {
		addSchedule(`${year}-${debutMD}`, {
			type: 'ANNIVERSARY',
			content:
				year === debutDate.getFullYear()
					? `🎉 데뷔 - ${PROFILE.debut[1]}`
					: `🎉 데뷔 ${year - debutDate.getFullYear()}주년`,
		});
		addSchedule(`${year}-${birthMD}`, {
			type: 'BIRTHDAY',
			content: `🎂 ${PROFILE.name}님 생일`,
		});
	}

	dayMilestones.forEach(days => {
		const milestoneDate = new Date(debutDate);
		milestoneDate.setDate(debutDate.getDate() + (days - 1));

		const dateKey = FormatDate(milestoneDate);

		addSchedule(dateKey, {
			type: 'ANNIVERSARY',
			content: `🎉 데뷔 ${days}일`,
		});
	});

	return schedules;
};

export const CALENDAR_SCHEDULES = GET_CALENDAR_SCHEDULES();
export const ALL_SCHEDULE_LIST = Object.values(CALENDAR_SCHEDULES).flat();
