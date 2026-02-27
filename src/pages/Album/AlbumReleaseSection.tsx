// @src/pages/Album/AlbumReleaseSection

import * as S from '@styles/pages/Album/AlbumReleaseSection.style';

import { useState, useRef, useCallback } from 'react';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@/const/albums';
import AlbumYearGroup from '@pages/Album/AlbumYearGroup';
import useImageFallback from '@/hooks/useImageFallback';
import { GetAlbumPaths } from '@/utils/album';

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
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.Selector>
				<S.SelectorItem value={selectedYear} onChange={e => handleYearChange(e.target.value)}>
					{FULL_ALBUMS.map(({ year }) => (
						<option key={year} value={year}>
							{year}년
						</option>
					))}
				</S.SelectorItem>
			</S.Selector>

			<S.AlbumMobileSection>
				{filteredAlbums && (
					<S.AlbumGrid>
						{filteredAlbums.items.map(album => {
							const { key, imageSrc, detailUrl } = GetAlbumPaths(album);
							return (
								<S.AlbumCard key={key} to={detailUrl}>
									<S.CoverWrapper>
										<img src={imageSrc} alt={album.title} loading="lazy" onError={handleImgError} />
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
			</S.AlbumMobileSection>

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
		</S.ContentSection>
	);
};

export default AlbumReleaseSection;
