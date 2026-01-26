// @src/pages/Album/AlbumTypeSection

import { useEffect, useRef, useState } from 'react';
import * as S from '@styles/pages/Album/AlbumTypeSection.style';
import {
	ALBUM_TYPE_LABEL,
	GET_FULL_ALBUMS,
	LP_ALBUMS,
	EP_ALBUMS,
	SP_ALBUMS,
	LV_ALBUMS,
	VN_ALBUMS,
} from '@const/albums';

const ALBUM_MAP: Record<string, any> = {
	LP: LP_ALBUMS,
	EP: EP_ALBUMS,
	SP: SP_ALBUMS,
	LV: LV_ALBUMS,
	VN: VN_ALBUMS,
};

const AlbumTypeSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const [activeTab, setActiveTab] = useState('ALL');
	const tabs = ['ALL', ...Object.keys(ALBUM_TYPE_LABEL)];

	const allAlbums = GET_FULL_ALBUMS().flatMap(group => group.items);
	const filteredData = activeTab === 'ALL' ? allAlbums : ALBUM_MAP[activeTab];

	const sectionRef = useRef<HTMLElement>(null);
	const isFirstRender = useRef(true);

	useEffect(() => {
		if (isFirstRender.current) {
			isFirstRender.current = false;
			return;
		}

		if (sectionRef.current) {
			const yOffset = -80;
			const targetY = sectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;

			if (window.pageYOffset > targetY) {
				window.scrollTo({ top: targetY, behavior: 'smooth' });
			}
		}
	}, [activeTab]);

	return (
		<S.ContentSection ref={sectionRef}>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.TabList>
				{tabs.map(tab => (
					<S.TabItem key={tab} $isActive={activeTab === tab} onClick={() => setActiveTab(tab)}>
						{tab === 'ALL' ? '전체' : ALBUM_TYPE_LABEL[tab]}
					</S.TabItem>
				))}
			</S.TabList>

			<S.AlbumGrid>
				{filteredData?.map((album: any) => {
					const year = album.releaseDate.split('.')[0];
					const key = `${album.type}_${year}_${album.fileName}`;

					return (
						<S.AlbumCard key={key}>
							<S.CoverWrapper>
								<img
									src={`/images/albums/${key}.webp`}
									alt={album.title}
									onError={e => {
										e.currentTarget.src = '/images/albums/default.webp';
									}}
								/>
								<S.Overlay className="overlay">
									<span>VIEW TRACKS →</span>
								</S.Overlay>
							</S.CoverWrapper>

							<S.AlbumInfo>
								<div className="type-wrap">
									<span className="type">{ALBUM_TYPE_LABEL[album.type]}</span>
									{album.volume && <span className="vol">정규 {album.volume}집</span>}
								</div>
								<h3 className="title">{album.title}</h3>
								<span className="date">{album.releaseDate}</span>
							</S.AlbumInfo>
						</S.AlbumCard>
					);
				})}
			</S.AlbumGrid>
		</S.ContentSection>
	);
};

export default AlbumTypeSection;
