'use client';

// @/views/Album

import AlbumPromotionSection from '@/views/Album/AlbumPromotionSection';
import AlbumReleaseSection from '@/views/Album/AlbumReleaseSection';
import AlbumTypeSection from '@/views/Album/AlbumTypeSection';

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
			<AlbumPromotionSection />

			<AlbumTypeSection {...SECTION_TITLE.TYPE} />
			<AlbumReleaseSection {...SECTION_TITLE.RELEASE} />
		</>
	);
};

export default Album;
