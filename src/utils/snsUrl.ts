// @utils/snsUrl.ts

/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import { SNS_PLATFORMS } from '@const/contents';

const GetPlatformConfig = (plat: string) => {
	return Object.values(SNS_PLATFORMS).find(p => p.NAME.toLowerCase() === plat.toLowerCase());
};

export const GetSnsUrl = (plat: string, id: string | undefined): string | null => {
	if (!id || id.trim() === '') return null;
	const config = GetPlatformConfig(plat);
	return config ? `${config.BASE_URL}${id}` : null;
};

export const GetSnsLabel = (plat: string, acc: string | undefined, title: string): string => {
	const platformName = plat.charAt(0).toUpperCase() + plat.slice(1).toLowerCase();
	if (!acc) return `${platformName} - ${title}`;
	return `${platformName}@${acc} - ${title}`;
};
