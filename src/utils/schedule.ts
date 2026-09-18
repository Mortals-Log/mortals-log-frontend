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

		const baseId = GenerateScheduleId(data.type, dateKey, data.content);

		const schedule: Schedule = {
			...data,
			date: dateKey.replace(/-/g, '.'),
			id: baseId,
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

			// date 범위(예: "09.05 ~ 09.06")의 모든 날짜에 캘린더 일정을 만든다
			// (페스티벌처럼 기간 중 하루만 공연해도 기간 전체가 캘린더에 노출되어야 함).
			const rangeDates: Date[] = [];
			for (let curr = new Date(startDate); curr.getTime() <= endDate.getTime(); curr.setDate(curr.getDate() + 1)) {
				rangeDates.push(new Date(curr));
			}

			// performanceDates 가 있으면(예: 금~일 페스티벌 중 하루만 공연) 실제 공연일·시간을
			// 요약 문구로 만들어, 기간 중 어느 날짜를 보더라도 언제 공연하는지 알 수 있게 한다.
			const performanceSummary = item.performanceDates?.length
				? item.performanceDates.map(md => `${md}${item.times?.length ? ` ${item.times.join(' ~ ')}` : ''}`).join(', ')
				: null;

			// 일정
			rangeDates.forEach(curr => {
				const dateKey = FormatDate(curr);

				if (performanceSummary) {
					addSchedule(dateKey, {
						type: 'CONCERT',
						content: baseContent,
						time: performanceSummary,
						imageUrl: imageSrc,
						ageLimit: item.ageLimit || false,
					});
					return;
				}

				// 시간
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
					// 단독
					addSchedule(dateKey, {
						type: 'CONCERT',
						content: baseContent,
						time: item.times ? item.times[0] : null,
						imageUrl: imageSrc,
						ageLimit: item.ageLimit || false,
					});
				}
			});

			// 티켓팅
			if (item.ticketing) {
				const ticketingList = item.ticketing;

				item.ticketing.forEach((t, idx) => {
					if (!t.ticketingDate) return;

					const tDateKey = t.ticketingDate.replace(/\./g, '-');
					// 얼리버드/일반처럼 회차별 label 이 있으면 그걸 쓰고, 없을 때만 순서대로 N부.
					const partLabel = t.label ? ` - ${t.label}` : ticketingList.length > 1 ? ` - ${idx + 1}부` : '';
					const displayContent = `[${SCHEDULE_LABEL_MAP.TICKETING}] ${item.content}${partLabel}`;

					const ticketingSchedule: Schedule = {
						type: 'TICKETING',
						content: displayContent,
						date: t.ticketingDate,
						time: t.ticketingTime,
						imageUrl: imageSrc,
						// baseContent 만 넣으면 같은 날짜에 여는 여러 회차 티켓팅(예: 이틀 공연의
						// 1일차/2일차 티켓팅이 같은 날 오픈하는 경우)이 동일 id 로 충돌한다.
						// partLabel 을 포함해 회차별로 구분한다.
						id: GenerateScheduleId('CONCERT', concertIdDate, `${baseContent}${partLabel}`),
					};

					const dateKey = tDateKey.replace(/\s/g, '');
					if (!schedules[dateKey]) schedules[dateKey] = [];
					schedules[dateKey].push(ticketingSchedule);
				});
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

		// 천일제
		if (days === 1000) {
			const key = dateKey.replace(/\s/g, '');
			if (!schedules[key]) schedules[key] = [];

			const festivalId = GenerateScheduleId('ANNIVERSARY', dateKey, '천일제-1000일-기념');

			schedules[key].push({
				id: festivalId,
				date: dateKey.replace(/-/g, '.'),
				type: 'ANNIVERSARY',
				content: `🎊 천일제: 데뷔 1000일 기념`,
				message: `천진우의 데뷔 ${days}일을 기념하는 특별한 천일제!`,
				hashtags: ['#천진우_데뷔', `#1000일제`, `#천일제`, `#데뷔_${days}일`],
				specialLink: {
					label: '천일제 팬곡 듣기',
					url: 'https://youtu.be/FAYOQTpzTtA',
				},
				fileUrl: {
					label: '천일제 기념 책자 다운로드',
					url: '/files/1000th_anniversary.pdf',
				},
			});
		}
	});

	// GenerateScheduleId 는 base64 를 25자로 잘라, 날짜·내용 앞부분이 같은 일정
	// (콘서트 1부/2부, 같은 날 여러 회차 티켓팅 등)이 동일 ID 로 충돌할 수 있다.
	// 충돌한 항목에만 접미사를 붙여 React key 와 /schedule/[id] 라우트가
	// 유일성을 갖도록 최종 보정한다.
	const seenIds = new Set<string>();

	Object.values(schedules).forEach(list =>
		list.forEach(schedule => {
			let uniqueId = schedule.id;
			let suffix = 1;

			while (seenIds.has(uniqueId)) {
				uniqueId = `${schedule.id}-${suffix}`;
				suffix += 1;
			}

			seenIds.add(uniqueId);
			schedule.id = uniqueId;
		}),
	);

	return schedules;
};

export const CALENDAR_SCHEDULES = GET_CALENDAR_SCHEDULES();
export const ALL_SCHEDULE_LIST = Object.values(CALENDAR_SCHEDULES).flat();
