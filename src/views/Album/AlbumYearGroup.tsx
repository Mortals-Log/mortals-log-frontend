// @/pages/Album/AlbumYearGroup

import { memo } from 'react';
import Link from 'next/link';
import { GetAlbumPaths } from '@/utils/album';
import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { Album } from '@/types/album';
import {
	ALBUM_GRID,
	ALBUM_CARD,
	ALBUM_COVER_WRAPPER,
	ALBUM_OVERLAY,
	ALBUM_INFO,
	TOGGLE_BUTTON,
} from '@/const/component-classes';
import { arYearSection, arYearWrapper, AR_YEAR_TITLE } from './album-classes';

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
		<section className={arYearSection(isOpen)} ref={registerRef}>
			<div className={arYearWrapper(isOpen)}>
				<h2 className={AR_YEAR_TITLE}>{year}</h2>
				<button className={TOGGLE_BUTTON} onClick={() => onToggle(year)}>
					{isOpen ? '접기 ↑' : '펼치기 ↓'}
				</button>
			</div>

			{isOpen && (
				<div className={ALBUM_GRID}>
					{items.map(album => {
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
	);
});

export default AlbumYearGroup;
