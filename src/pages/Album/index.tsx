// @src/pages/Album/index

import AlbumReleaseSection from '@pages/Album/AlbumReleaseSection';
import AlbumTypeSection from '@pages/Album/AlbumTypeSection';

const SECTION_TITLE = {
	TYPE: {
		TITLE_KR: '타입별로 보기',
		TITLE_EN: 'Sort by Type',
	},
	RELEASE: {
		TITLE_KR: '발매순으로 보기',
		TITLE_EN: 'Sort by Release',
	},
} as const;

const Album = () => {
	return (
		<>
			<AlbumTypeSection {...SECTION_TITLE.TYPE} />
			<AlbumReleaseSection {...SECTION_TITLE.RELEASE} />
		</>
	);
};

export default Album;
