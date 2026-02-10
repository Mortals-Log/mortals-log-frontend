// @types/profile

/* eslint-disable storybook/default-exports */

import { Links } from './links';

export interface Citation {
	content: string;
	platform: string;
	account: string;
	contentTitle: string;
	postId: string;
}

export interface Profile {
	id: string;
	name: string;
	enName: string;
	hanjaName: string;

	mainImage: string;
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
