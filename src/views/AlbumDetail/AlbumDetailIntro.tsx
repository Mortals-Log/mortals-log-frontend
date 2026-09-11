// @/pages/Album/AlbumDetailInfo.tsx

import { useMemo, useState } from 'react';
import { Album } from '@/types/album';
import Placeholder from '@/components/Placeholder';
import { LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { EXPAND_BUTTON, ARROW_ICON } from '@/const/component-classes';
import { cn } from '@/utils/cn';
import { ADI_CONTENT_SECTION, adiIntroContainer } from './album-detail-classes';

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
			<section className={ADI_CONTENT_SECTION}>
				<div className={LAYOUT_SECTION_TITLE}>
					{TITLE_KR}
					<span>{TITLE_EN}</span>
				</div>

				<Placeholder contentName={TITLE_KR} />
			</section>
		);
	}

	return (
		<section className={ADI_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</div>

			<div className={adiIntroContainer(isExpanded)}>
				<div className="text">{albumIntro}</div>
			</div>

			<button
				className={cn(EXPAND_BUTTON, isExpanded ? 'mt-0' : 'mt-[-1.1rem]')}
				onClick={() => setIsExpanded(!isExpanded)}>
				{isExpanded ? '접기' : '상세 정보 펼쳐보기'}
				<span className={cn(ARROW_ICON, isExpanded ? 'rotate-180' : 'rotate-0')}>▼</span>
			</button>
		</section>
	);
};

export default AlbumDetailIntro;
