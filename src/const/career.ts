// @const/career.ts

/* eslint-disable storybook/default-exports */

import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@const/albums';
import { FULL_CONCERTS, CONCERT_TYPE_LABEL } from '@const/concert';

export const GET_FULL_HISTORY = () => {
	const historyMap: Record<string, any[]> = {};

	FULL_CONCERTS.forEach(group => {
		if (!historyMap[group.year]) historyMap[group.year] = [];

		group.items.forEach(item => {
			historyMap[group.year].push({
				date: item.date.split('~')[0].trim(),
				displayDate: item.date,
				content: `${CONCERT_TYPE_LABEL[item.type]} [${item.content}]`,
				fullDate: `${group.year}.${item.date.split('~')[0].trim()}`,
			});
		});
	});

	FULL_ALBUMS.forEach(group => {
		if (!historyMap[group.year]) historyMap[group.year] = [];

		group.items.forEach(item => {
			const dateParts = item.releaseDate.split('.');
			const date = `${dateParts[1]}.${dateParts[2]}`;

			historyMap[group.year].push({
				date: date,
				displayDate: date,
				content: `${ALBUM_TYPE_LABEL[item.type]} [${item.title}] 발매`,
				fullDate: item.releaseDate,
			});
		});
	});

	return Object.keys(historyMap)
		.sort((a, b) => Number(b) - Number(a))
		.map(year => ({
			year,
			items: historyMap[year].sort((a, b) => {
				const valA = Number(a.fullDate.replace(/[^0-9]/g, ''));
				const valB = Number(b.fullDate.replace(/[^0-9]/g, ''));
				return valB - valA;
			}),
		}));
};

export const FULL_CAREER_HISTORY = GET_FULL_HISTORY();
