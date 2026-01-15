/* eslint-disable react-refresh/only-export-components */
/* eslint-disable storybook/default-exports */

export interface Album {
	title: string;
	releaseDate: string;
	type: 'Regular Album' | 'EP' | 'Single' | 'Live';
	musicVideo?: string;
	store?: string;
	coverImage?: string;
}
