// @/utils/meta

/* eslint-disable storybook/default-exports */

export const UpdateMetaTags = (
	title: string,
	description: string,
	image?: string,
	type: 'website' | 'music.song' | 'music.album' = 'website',
) => {
	document.title = title;

	const defaultImg = '/images/default.webp';
	const finalImage = image || defaultImg;

	const metaTags = [
		{ property: 'og:title', content: title },
		{ property: 'og:description', content: description },
		{ property: 'og:image', content: finalImage },
		{ property: 'og:type', content: type },
		{ name: 'twitter:card', content: 'summary_large_image' },
	];

	metaTags.forEach(({ property, name, content }) => {
		let tag = property
			? document.querySelector(`meta[property="${property}"]`)
			: document.querySelector(`meta[name="${name}"]`);

		if (!tag) {
			tag = document.createElement('meta');
			if (property) tag.setAttribute('property', property);
			if (name) tag.setAttribute('name', name);
			document.head.appendChild(tag);
		}
		tag.setAttribute('content', content || '');
	});
};
