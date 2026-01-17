/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import { Schedule } from '@/types/schedule';

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

export const FormatDateWithDay = (dateString: string) => {
	const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
	const date = new Date(dateString.replace(/\./g, '-'));
	if (isNaN(date.getTime())) return dateString;

	const mm = String(date.getMonth() + 1).padStart(2, '0');
	const dd = String(date.getDate()).padStart(2, '0');
	const day = days[date.getDay()];

	return `${date.getFullYear()}.${mm}.${dd} (${day})`;
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
