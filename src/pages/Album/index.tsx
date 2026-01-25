// @src/pages/Album/index

import * as S from '@styles/pages/Album/Album.style';
import AlbumReleaseSection from '@pages/Album/AlbumReleaseSection';
import { NAME } from '@/const/contents';

const PAGE_TITLE = {
	MAIN: '앨범',
	SUB: 'ALBUM',
	DESCRIPTION: `${NAME.KOREAN}의 정규 앨범부터 싱글, 라이브까지 각 앨범의 상세 정보와 수록곡의 가사와 코드를 확인할 수 있습니다.`,
} as const;

const SECTION_TITLE = {
	YEAR: {
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

			<AlbumReleaseSection {...SECTION_TITLE.YEAR} />
		</S.MainContainer>
	);
};

export default Album;
