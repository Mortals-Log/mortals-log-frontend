// @/utils/id

/* eslint-disable storybook/default-exports */

export const GenerateScheduleId = (type: string, date: string, content: string) => {
	const cleanDate = date.replace(/[^0-9]/g, '');

	const idSource = `${cleanDate}-${content.replace(/\s/g, '')}-${type}`;

	return btoa(encodeURIComponent(idSource)).replace(/[=/+]/g, '').slice(0, 25);
};
