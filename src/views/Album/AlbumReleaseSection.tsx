// @/pages/Album/AlbumReleaseSection

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@/const/albums';
import AlbumYearGroup from '@pages/Album/AlbumYearGroup';
import useImageFallback from '@/hooks/useImageFallback';
import { GetAlbumPaths } from '@/utils/album';
import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { ALBUM_GRID, ALBUM_CARD, ALBUM_COVER_WRAPPER, ALBUM_OVERLAY, ALBUM_INFO } from '@/const/component-classes';
import { AR_MOBILE_SECTION } from './album-classes';

const AlbumReleaseSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const handleImgError = useImageFallback();

	const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
	const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

	const [selectedYear, setSelectedYear] = useState<string>(FULL_ALBUMS[0].year);
	const filteredAlbums = FULL_ALBUMS.find(item => item.year === selectedYear);

	const handleYearChange = useCallback((year: string) => {
		setSelectedYear(year);
	}, []);

	const toggleSection = useCallback((year: string) => {
		setOpenSections(prev => {
			const nextState = {
				...prev,
				[year]: !(prev[year] !== false),
			};

			const isOpening = prev[year] === false;
			if (isOpening) {
				sectionRefs.current[year]?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}

			return nextState;
		});
	}, []);

	return (
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</div>

			<nav className="selector-nav">
				<select className="selector-item" value={selectedYear} onChange={e => handleYearChange(e.target.value)}>
					{FULL_ALBUMS.map(({ year }) => (
						<option key={year} value={year}>
							{year}년
						</option>
					))}
				</select>
			</nav>

			<section className={AR_MOBILE_SECTION}>
				{filteredAlbums && (
					<div className={ALBUM_GRID}>
						{filteredAlbums.items.map(album => {
							const { key, imageSrc, detailUrl } = GetAlbumPaths(album);
							return (
								<Link key={key} href={detailUrl} className={ALBUM_CARD}>
									<div className={ALBUM_COVER_WRAPPER}>
										<img src={imageSrc} alt={album.title} loading="lazy" onError={handleImgError} />
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
				)}
			</section>

			{FULL_ALBUMS.map(({ year, items }) => (
				<AlbumYearGroup
					key={year}
					year={year}
					items={items}
					isOpen={openSections[year] !== false}
					onToggle={toggleSection}
					handleImgError={handleImgError}
					registerRef={el => (sectionRefs.current[year] = el)}
				/>
			))}
		</section>
	);
};

export default AlbumReleaseSection;
