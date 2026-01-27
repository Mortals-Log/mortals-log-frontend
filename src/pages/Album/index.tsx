// @src/pages/Album/index

import * as S from '@styles/pages/Album/Album.style';
import { NAME } from '@/const/contents';
import AlbumReleaseSection from '@pages/Album/AlbumReleaseSection';
import AlbumTypeSection from '@pages/Album/AlbumTypeSection';
import AlbumPromotionSection from './AlbumPromotionSection';

const PAGE_TITLE = {
	MAIN: '앨범',
	SUB: 'ALBUM',
	DESCRIPTION: `${NAME.KOREAN}의 정규 앨범부터 싱글, 라이브까지 각 앨범의 상세 정보와 수록곡의 가사와 코드를 확인할 수 있습니다.`,
} as const;

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
		<S.MainContainer>
			<S.SubTitle>{PAGE_TITLE.SUB}</S.SubTitle>
			<S.MainTitle>{PAGE_TITLE.MAIN}</S.MainTitle>

			<S.Description>{PAGE_TITLE.DESCRIPTION}</S.Description>

			<AlbumPromotionSection />
			<AlbumTypeSection {...SECTION_TITLE.TYPE} />
			<AlbumReleaseSection {...SECTION_TITLE.RELEASE} />
		</S.MainContainer>
	);
};

export default Album;
