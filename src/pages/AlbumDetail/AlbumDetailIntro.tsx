// @pages/Album/AlbumDetailInfo.tsx

import * as S from '@styles/pages/AlbumDetail/AlbumDetailIntro.style';
import { useMemo, useState } from 'react';
import { Album } from '@/types/album';
import Placeholder from '@/components/Placeholder';

interface AlbumDetailIntroProps {
	TITLE_KR: string;
	TITLE_EN: string;
	albumData: Album | undefined;
}

const AlbumDetailIntro = ({ TITLE_KR, TITLE_EN, albumData }: AlbumDetailIntroProps) => {
	const [isExpanded, setIsExpanded] = useState(false);

	const albumIntro = useMemo(() => {
		return albumData?.intro || '';
	}, [albumData?.intro]);

	if (!albumIntro) {
		return (
			<S.ContentSection>
				<S.SectionTitle>
					{TITLE_KR}
					<span>{TITLE_EN}</span>
				</S.SectionTitle>

				<Placeholder contentName={TITLE_KR} />
			</S.ContentSection>
		);
	}

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.IntroContainer $isExpanded={isExpanded}>
				<div className="text">{albumIntro}</div>
			</S.IntroContainer>

			<S.ExpandButton $isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
				{isExpanded ? '접기' : '상세 정보 펼쳐보기'}
				<S.ArrowIcon $isExpanded={isExpanded}>▼</S.ArrowIcon>
			</S.ExpandButton>
		</S.ContentSection>
	);
};

export default AlbumDetailIntro;
