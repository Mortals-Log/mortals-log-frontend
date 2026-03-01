// @/utils/date

/* eslint-disable storybook/default-exports */

import { Concert, ConcertItem } from '@/types/concert';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const FormatDate = (date: Date) =>
	`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;

export const ParseDate = (dateStr: string) => {
	const [year, month, day] = dateStr.split('.').map(Number);
	return new Date(year, month - 1, day);
};

export const GetDay = (date: string, year?: string) => {
	const days = ['일', '월', '화', '수', '목', '금', '토'];

	const parts = date.split('.').map(Number);

	let y: number;
	let m: number;
	let d: number;

	if (parts.length === 3) {
		[y, m, d] = parts;
	} else {
		y = Number(year);
		[m, d] = parts;
	}

	const dateObj = new Date(y, m - 1, d);

	return days[dateObj.getDay()];
};

export const GetUpcomingSchedules = (fullConcerts: Concert[], limit?: number): (ConcertItem & { year: string })[] => {
	const now = new Date();
	const todayNum = Number(
		`${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`,
	);

	const upcoming = fullConcerts
		.flatMap(group =>
			group.items
				.map(item => {
					const startDatePart = item.date.split('~')[0].trim();
					const [m, d] = startDatePart
						.split('.')
						.filter(v => v.trim() !== '')
						.map(v => v.replace(/[^0-9]/g, ''));

					const monthDayNum = `${m.padStart(2, '0')}${d.padStart(2, '0')}`;
					const startDateNum = Number(`${group.year}${monthDayNum}`);

					return {
						...item,
						year: group.year,
						startDateNum,
					};
				})
				.filter(item => item.startDateNum >= todayNum),
		)
		.sort((a, b) => a.startDateNum - b.startDateNum);

	return limit ? upcoming.slice(0, limit) : upcoming;
};

export const CalculateKorAge = (birth: Date, targetYear?: number) => {
	const yearToCalculate = targetYear || new Date().getFullYear();

	return yearToCalculate - birth.getFullYear() + 1;
};

export const CalculateIntAge = (birth: Date) => {
	const today = new Date();
	let age = today.getFullYear() - birth.getFullYear();

	if (
		today.getMonth() < birth.getMonth() ||
		(today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate())
	) {
		age--;
	}

	return age;
};

export const CalculateElapsedYears = (dateStr: string) => {
	const startDate = ParseDate(dateStr);
	const endDate = new Date();

	let years = endDate.getFullYear() - startDate.getFullYear();

	const isBeforeAnniversary =
		endDate.getMonth() < startDate.getMonth() ||
		(endDate.getMonth() === startDate.getMonth() && endDate.getDate() < startDate.getDate());

	if (isBeforeAnniversary) {
		years--;
	}

	return years;
};

export const CalculateElapsedDays = (dateStr: string) => {
	const startDate = ParseDate(dateStr);
	const endDate = new Date();

	startDate.setHours(0, 0, 0, 0);
	endDate.setHours(0, 0, 0, 0);

	const diffTime = endDate.getTime() - startDate.getTime();

	return Math.floor(diffTime / MS_PER_DAY) + 1;
};
