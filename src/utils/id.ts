// @utils/id.ts

/* eslint-disable storybook/default-exports */

export const GenerateTargetId = (type: string, year: string | number, date: string) => {
	const startDate = date.split('~')[0].trim();

	const digits = startDate.replace(/[^0-9]/g, '');

	const monthDay = digits.slice(-4);

	return `${type}_${year}${monthDay}`;
};

export const GenerateScheduleId = (type: string, date: string, content: string) => {
	const cleanDate = date.replace(/[^0-9]/g, '');
	const idSource = `${type}-${cleanDate}-${content.replace(/\s/g, '')}`;

	return btoa(encodeURIComponent(idSource)).replace(/[=/+]/g, '').slice(0, 20);
};
