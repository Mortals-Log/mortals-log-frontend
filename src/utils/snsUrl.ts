// @/utils/snsUrl

/* eslint-disable storybook/default-exports */

import { LINK_PLATFORM } from '@const/links';

const GetPlatformConfig = (plat: string) => {
	return Object.values(LINK_PLATFORM).find(p => p.NAME.toLowerCase() === plat.toLowerCase());
};

export const GetSnsUrl = (plat: string, id: string | undefined): string | null => {
	if (!id || id.trim() === '') return null;
	const config = GetPlatformConfig(plat);
	return config ? `${config.BASE_URL}${id}` : null;
};

export const GetSnsLabel = (plat: string | undefined, acc: string | undefined, title: string): string => {
	if (!plat) {
		return acc ? `${acc} - ${title}` : title;
	}

	const platformName = plat.charAt(0).toUpperCase() + plat.slice(1).toLowerCase();
	if (!acc) return `${platformName} - ${title}`;
	return `${platformName}@${acc} - ${title}`;
};
