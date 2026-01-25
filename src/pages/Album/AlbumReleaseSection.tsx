// @src/pages/Album/AlbumReleaseSection

import * as S from '@styles/pages/Album/AlbumReleaseSection.style';
import { FULL_ALBUMS, ALBUM_TYPE_LABEL } from '@const/albums';

const AlbumReleaseSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			{FULL_ALBUMS.map(({ year, items }) => (
				<S.YearSection key={year}>
					<S.YearTitle>{year}</S.YearTitle>

					<S.AlbumGrid>
						{items.map(album => {
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
				</S.YearSection>
			))}
		</S.ContentSection>
	);
};

export default AlbumReleaseSection;
