// @utils/concert.ts

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

const getDay = (year: string, dateStr: string) => {
	const days = ['일', '월', '화', '수', '목', '금', '토'];
	const [month, day] = dateStr.split('.').map(Number);
	return days[new Date(Number(year), month - 1, day).getDay()];
};

export const GenerateSchedules = (dateRange: string, year: string, times: string[]) => {
	const dateParts = dateRange.split('~').map(d => d.trim());

	if (dateParts.length === 1) {
		return times.map((time, idx) => ({
			part: times.length > 1 ? `${idx + 1}부` : '',
			time,
		}));
	}

	return dateParts.flatMap(dateStr => {
		const dayOfWeek = getDay(year, dateStr);

		return times.map((time, idx) => ({
			part: times.length > 1 ? `${dateStr}(${dayOfWeek}) ${idx + 1}부` : `${dateStr}(${dayOfWeek})`,
			time,
		}));
	});
};
