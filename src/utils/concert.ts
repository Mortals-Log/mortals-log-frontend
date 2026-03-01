// @/utils/concert

/* eslint-disable storybook/default-exports */

import { ConcertItem } from '@/types/concert';
import { GetSlug } from '@utils/urlSlug';

const GetConcertImageKey = (concert: ConcertItem, year: string) => {
	const startDate = concert.date.split('~')[0].trim();
	const cleanMD = startDate.replace(/\./g, '');

	return `${concert.type}_${year}${cleanMD}`;
};

export const GetConcertPaths = (concert: ConcertItem, year: string) => {
	const key = GetConcertImageKey(concert, year);
	const slug = GetSlug(concert.content);
	const fileName = concert.fileName || key || '/images/default.webp';

	return {
		key,
		imageSrc: `/images/concerts/${fileName}.webp`,
		detailUrl: `/concert/${slug}`,
	};
};
