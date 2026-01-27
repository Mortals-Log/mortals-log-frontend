// @pages/Album/AlbumPromotionSection

import * as S from '@styles/pages/Album/AlbumPromotionSection.style';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@const/albums';
import { GetLatestAlbum } from '@/utils/album';

const album = GetLatestAlbum(FULL_ALBUMS);

const AlbumPromotionSection = () => {
	if (!album) return null;
	const year = album.releaseDate.split('.')[0];
	const key = `${album.type}_${year}_${album.fileName}`;
	const slug = album.title.replace(/\s/g, '-');
	const previewTracks = album.tracks?.slice(0, 3) || [];

	return (
		<S.ContentSection>
			<S.ContentWrapper>
				<S.ImageArea>
					<S.CoverImage src={`/images/albums/${key}.webp`} alt={album.title} />
				</S.ImageArea>

				<S.InfoArea>
					<S.Tag>⊹ LATEST RELEASE ⊹</S.Tag>
					<S.Title>{album.title}</S.Title>
					<S.Info>
						{ALBUM_TYPE_LABEL[album.type]} • {album.releaseDate}
					</S.Info>
					<S.Description>새로운 이야기가 담긴 {album.title}을 지금 만나보세요.</S.Description>

					{previewTracks.length > 0 && (
						<S.TrackPreviewList>
							{previewTracks.map((track, index) => (
								<S.TrackItem key={index}>
									<span className="number">{String(index + 1).padStart(2, '0')}</span>
									<span className="name">{track}</span>
								</S.TrackItem>
							))}
							{album.tracks && album.tracks.length > previewTracks.length && (
								<S.MoreText>외 {album.tracks.length - previewTracks.length}곡을 만나보세요.</S.MoreText>
							)}{' '}
						</S.TrackPreviewList>
					)}

					<S.PromotionLinkButton to={`/album/${encodeURIComponent(slug)}`}>VIEW TRACKS</S.PromotionLinkButton>
				</S.InfoArea>
			</S.ContentWrapper>
		</S.ContentSection>
	);
};

export default AlbumPromotionSection;
