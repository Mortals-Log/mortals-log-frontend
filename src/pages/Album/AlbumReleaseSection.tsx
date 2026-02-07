// @src/pages/Album/AlbumReleaseSection

import * as S from '@styles/pages/Album/AlbumReleaseSection.style';
import { FULL_ALBUMS, ALBUM_TYPE_LABEL } from '@const/albums';
import { useState, useRef } from 'react';
import useImageFallback from '@/hooks/useImageFallback';

const AlbumReleaseSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const handleImgError = useImageFallback();

	const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
	const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

	const toggleSection = (year: string) => {
		const isCurrentOpen = openSections[year] !== false;

		setOpenSections(prev => ({
			...prev,
			[year]: !isCurrentOpen,
		}));

		setTimeout(() => {
			{
				sectionRefs.current[year]?.scrollIntoView({
					behavior: 'smooth',
					block: 'start',
				});
			}
		}, 100);
	};

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			{FULL_ALBUMS.map(({ year, items }) => {
				const isSectionOpen = openSections[year] !== false;

				return (
					<S.YearSection
						key={year}
						isOpen={isSectionOpen}
						ref={el => {
							sectionRefs.current[year] = el;
						}}>
						<S.YearWrapper isOpen={isSectionOpen}>
							<S.YearTitle>{year}</S.YearTitle>
							<S.ToggleButton onClick={() => toggleSection(year)}>
								{isSectionOpen ? '앨범 목록 접기 ↑' : '앨범 목록 펼치기 ↓'}
							</S.ToggleButton>
						</S.YearWrapper>

						{isSectionOpen && (
							<S.AlbumGrid>
								{items.map(album => {
									const key = `${album.type}_${year}_${album.fileName}`;
									const slug = album.title.replace(/\s/g, '-');
									const url = `/album/${encodeURIComponent(slug)}`;

									return (
										<S.AlbumCard key={key} to={url}>
											<S.CoverWrapper>
												<img src={`/images/albums/${key}.webp`} alt={album.title} onError={handleImgError} />
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
					</S.YearSection>
				);
			})}
		</S.ContentSection>
	);
};

export default AlbumReleaseSection;
