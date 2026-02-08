// @utils/urlSlug
/* eslint-disable storybook/default-exports */

export const GetSlug = (text: string): string => {
	return encodeURIComponent(
		text
			.toLowerCase()
			.replace(/\s+/g, '-')
			.replace(/[^\wㄱ-ㅎ가-힣-]/g, ''),
	);
};
