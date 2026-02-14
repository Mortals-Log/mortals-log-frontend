// @src/pages/Album/AlbumTypeSection

import * as S from '@styles/pages/Album/AlbumTypeSection.style';

import { useEffect, useRef, useState } from 'react';
import useImageFallback from '@/hooks/useImageFallback';

import {
	ALBUM_TYPE_LABEL,
	GET_FULL_ALBUMS,
	GET_LP_ALBUMS,
	GET_EP_ALBUMS,
	GET_SP_ALBUMS,
	GET_LV_ALBUMS,
	GET_VN_ALBUMS,
} from '@const/albums';
import { GetAlbumPaths } from '@/utils/album';

const ALBUM_MAP: Record<string, any> = {
	LP: GET_LP_ALBUMS,
	EP: GET_EP_ALBUMS,
	SP: GET_SP_ALBUMS,
	LV: GET_LV_ALBUMS,
	VN: GET_VN_ALBUMS,
};

const AlbumTypeSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const handleImgError = useImageFallback();

	const [activeTab, setActiveTab] = useState('ALL');
	const [isOpen, setIsOpen] = useState(true);

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

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
		if (!isOpen) setIsOpen(true);
	};

	return (
		<S.ContentSection ref={sectionRef}>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.TabList>
				<S.TabGroup>
					{tabs.map(tab => (
						<S.TabItem key={tab} $isActive={activeTab === tab} onClick={() => handleTabClick(tab)}>
							{tab === 'ALL' ? '전체' : ALBUM_TYPE_LABEL[tab]}
						</S.TabItem>
					))}
				</S.TabGroup>

				<S.ToggleButton onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? '앨범 목록 접기 ↑' : '앨범 목록 펼치기 ↓'}
				</S.ToggleButton>
			</S.TabList>

			{isOpen && (
				<S.AlbumGrid>
					{filteredData?.map((album: any) => {
						const { key, imageSrc, detailUrl } = GetAlbumPaths(album);

						return (
							<S.AlbumCard key={key} to={detailUrl}>
								<S.CoverWrapper>
									<img src={imageSrc} alt={album.title} onError={handleImgError} />
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
			)}

			{!isOpen && (
				<S.Placeholder>
					<p>타입별 앨범 보기가 닫혀있습니다.</p>
				</S.Placeholder>
			)}
		</S.ContentSection>
	);
};

export default AlbumTypeSection;
