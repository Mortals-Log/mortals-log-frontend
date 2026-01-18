/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

import { Links } from './links';

export type Citation = [text: string, source: string, url: string];

export interface Profile {
	id: string;
	name: string;
	enName: string;
	hanjaName: string;
	mainImage: string;

	modifier: Citation[];
	description: Citation;

	birth: [day: string, location: string];
	nationality: string;
	education: string;
	mbti: string;
	bloodType: string;
	debut: [day: string, album: string];

	job: string[];
	alias: string[];
	fandom: string;
	officialLinks: Links;
}
