/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import { Schedule } from '@/types/schedule';

const MS_PER_DAY = 1000 * 60 * 60 * 24;

export const GetDDay = (targetDate: string): string | null => {
	const now = new Date();
	const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

	const normalizedDate = targetDate.replace(/\. /g, '-').replace(/\./g, '-');
	const target = new Date(normalizedDate);

	if (isNaN(target.getTime())) return null;

	const targetTime = new Date(target.getFullYear(), target.getMonth(), target.getDate()).getTime();

	const diff = targetTime - today;
	const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

	if (diffDays === 0) {
		return 'D-DAY';
	} else if (diffDays > 0) {
		return `D-${String(diffDays).padStart(2, '0')}`;
	} else {
		return null;
	}
};

export const GetUpcomingSchedules = (schedules: Schedule[]): Schedule[] => {
	const today = new Date();
	today.setHours(0, 0, 0, 0);
	const todayTime = today.getTime();

	return [...schedules]
		.filter(event => {
			const eventDateStr = event.date.split(' ~ ')[0].replace(/\. /g, '-').replace(/\./g, '-');
			const eventTime = new Date(eventDateStr).getTime();

			return eventTime >= todayTime;
		})
		.sort((a, b) => {
			const dateA = new Date(a.date.split(' ~ ')[0].replace(/\. /g, '-').replace(/\./g, '-')).getTime();
			const dateB = new Date(b.date.split(' ~ ')[0].replace(/\. /g, '-').replace(/\./g, '-')).getTime();

			return dateA - dateB;
		});
};

export const ParseDate = (dateStr: string) => {
	const [year, month, day] = dateStr.split('.').map(Number);
	return new Date(year, month - 1, day);
};

export const CalculateKorAge = (birth: Date) => {
	const today = new Date();
	return today.getFullYear() - birth.getFullYear() + 1;
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

	return endDate.getFullYear() - startDate.getFullYear();
};

export const CalculateElapsedDays = (dateStr: string) => {
	const startDate = ParseDate(dateStr);
	const endDate = new Date();

	startDate.setHours(0, 0, 0, 0);
	endDate.setHours(0, 0, 0, 0);

	const diffTime = endDate.getTime() - startDate.getTime();

	return Math.floor(diffTime / MS_PER_DAY) + 1;
};
