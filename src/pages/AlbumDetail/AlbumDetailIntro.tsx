// @pages/Album/AlbumDetailInfo.tsx

import * as S from '@styles/pages/AlbumDetail/AlbumDetailIntro.style';
import { useState } from 'react';
import { Album } from '@/types/album';
import Placeholder from '@/components/Placeholder';

const AlbumDetailIntro = ({
	TITLE_KR,
	TITLE_EN,
	albumData,
}: {
	TITLE_KR: string;
	TITLE_EN: string;
	albumData: Album | undefined;
}) => {
	const albumIntro = albumData?.intro || '';
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			{albumIntro ? (
				<S.IntroSection>
					<S.IntroContainer $isExpanded={isExpanded}>
						<S.IntroText $isExpanded={isExpanded}>{albumIntro}</S.IntroText>
					</S.IntroContainer>

					<S.ExpandButton $isExpanded={isExpanded} onClick={() => setIsExpanded(!isExpanded)}>
						{isExpanded ? '접기' : '상세 정보 펼쳐보기'}
						<S.ArrowIcon $isExpanded={isExpanded}>▼</S.ArrowIcon>
					</S.ExpandButton>
				</S.IntroSection>
			) : (
				<Placeholder contentName={TITLE_KR} />
			)}
		</S.ContentSection>
	);
};

export default AlbumDetailIntro;
