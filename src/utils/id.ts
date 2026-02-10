// @utils/id.ts

/* eslint-disable storybook/default-exports */

export const GenerateScheduleId = (type: string, date: string, content: string) => {
	const cleanDate = date.replace(/[^0-9]/g, '');

	const idSource = `${type}-${cleanDate}-${content.replace(/\s/g, '')}`;

	return btoa(encodeURIComponent(idSource)).replace(/[=/+]/g, '').slice(0, 20);
};
