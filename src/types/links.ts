// @/types/links

/* eslint-disable storybook/default-exports */

export interface LinkItem {
	label: string;
	url: string;
}

export interface LinkGroup {
	category: 'SNS' | 'MUSIC' | 'SHOP' | 'ETC' | string;
	items: LinkItem[];
}

export type Links = LinkGroup[];
