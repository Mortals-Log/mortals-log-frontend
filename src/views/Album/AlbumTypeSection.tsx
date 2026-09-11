// @/pages/Album/AlbumTypeSection

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Placeholder from '@/components/Placeholder';
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
import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import {
	ALBUM_GRID,
	ALBUM_CARD,
	ALBUM_COVER_WRAPPER,
	ALBUM_OVERLAY,
	ALBUM_INFO,
	TOGGLE_BUTTON,
} from '@/const/component-classes';
import { AT_TAB_LIST, AT_TAB_GROUP, atTabItem } from './album-classes';

const TABS = ['ALL', ...Object.keys(ALBUM_TYPE_LABEL)];

const AlbumTypeSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const handleImgError = useImageFallback();

	const [activeTab, setActiveTab] = useState('ALL');
	const [isOpen, setIsOpen] = useState(true);

	const sectionRef = useRef<HTMLElement>(null);
	const isFirstRender = useRef(true);

	const albumDataMap = useMemo(() => {
		return {
			ALL: GET_FULL_ALBUMS().flatMap(group => group.items),
			LP: GET_LP_ALBUMS,
			EP: GET_EP_ALBUMS,
			SP: GET_SP_ALBUMS,
			LV: GET_LV_ALBUMS,
			VN: GET_VN_ALBUMS,
		};
	}, []);

	const filteredData = useMemo(() => {
		return albumDataMap[activeTab as keyof typeof albumDataMap] || [];
	}, [activeTab, albumDataMap]);

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
		<section className={LAYOUT_CONTENT_SECTION} ref={sectionRef}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</div>

			<nav className="selector-nav">
				<select className="selector-item" value={activeTab} onChange={e => handleTabClick(e.target.value)}>
					{TABS.map(tab => (
						<option key={tab} value={tab}>
							{tab === 'ALL' ? '전체 보기' : ALBUM_TYPE_LABEL[tab]}
						</option>
					))}
				</select>
			</nav>

			<nav className={AT_TAB_LIST}>
				<ul className={AT_TAB_GROUP}>
					{TABS.map(tab => (
						<li key={tab} className={atTabItem(activeTab === tab)} onClick={() => handleTabClick(tab)}>
							{tab === 'ALL' ? '전체' : ALBUM_TYPE_LABEL[tab]}
						</li>
					))}
				</ul>

				<button className={TOGGLE_BUTTON} onClick={() => setIsOpen(!isOpen)}>
					{isOpen ? '앨범 목록 접기 ↑' : '앨범 목록 펼치기 ↓'}
				</button>
			</nav>

			{isOpen ? (
				<div className={ALBUM_GRID}>
					{filteredData?.map((album: any) => {
						const { key, imageSrc, detailUrl } = GetAlbumPaths(album);

						return (
							<Link key={key} href={detailUrl} className={ALBUM_CARD}>
								<div className={ALBUM_COVER_WRAPPER}>
									<img src={imageSrc} alt={album.title} onError={handleImgError} />
									<div className={`overlay ${ALBUM_OVERLAY}`}>
										<span>VIEW TRACKS →</span>
									</div>
								</div>

								<div className={ALBUM_INFO}>
									<div className="type-wrap">
										<span className="type">{ALBUM_TYPE_LABEL[album.type]}</span>
										{album.volume && <span className="vol">정규 {album.volume}집</span>}
									</div>
									<h3 className="title">{album.title}</h3>
									<span className="date">{album.releaseDate}</span>
								</div>
							</Link>
						);
					})}
				</div>
			) : (
				<Placeholder message="타입별 앨범 보기가 닫혀있습니다." />
			)}
		</section>
	);
};

export default AlbumTypeSection;
