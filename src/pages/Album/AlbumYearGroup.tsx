// @/pages/Album/AlbumYearGroup

import * as S from '@styles/pages/Album/AlbumReleaseSection.style';

import { GetAlbumPaths } from '@/utils/album';
import { memo } from 'react';
import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { Album } from '@/types/album';

interface AlbumYearGroupProps {
	year: string;
	items: Album[];
	isOpen: boolean;
	onToggle: (year: string) => void;
	handleImgError: (e: React.SyntheticEvent<HTMLImageElement>) => void;
	registerRef: (el: HTMLElement | null) => void;
}

const AlbumYearGroup = memo(({ year, items, isOpen, onToggle, handleImgError, registerRef }: AlbumYearGroupProps) => {
	return (
		<S.YearSection isOpen={isOpen} ref={registerRef}>
			<S.YearWrapper isOpen={isOpen}>
				<S.YearTitle>{year}</S.YearTitle>
				<S.ToggleButton onClick={() => onToggle(year)}>{isOpen ? '접기 ↑' : '펼치기 ↓'}</S.ToggleButton>
			</S.YearWrapper>

			{isOpen && (
				<S.AlbumGrid>
					{items.map(album => {
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
									<span className="date">{album.releaseDate.replace(/-/g, '.')}</span>
								</S.AlbumInfo>
							</S.AlbumCard>
						);
					})}
				</S.AlbumGrid>
			)}
		</S.YearSection>
	);
});

export default AlbumYearGroup;
