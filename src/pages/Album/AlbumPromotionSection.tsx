// @pages/Album/AlbumPromotionSection

import * as S from '@styles/pages/Album/AlbumPromotionSection.style';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@const/albums';
import { MASTER_TRACKS } from '@const/tracks';
import { GetAlbumPaths, GetLatestAlbum } from '@utils/album';
import { GetTracks } from '@utils/track';
import { differenceInDays, format, parse, startOfDay } from 'date-fns';
import useImageFallback from '@/hooks/useImageFallback';

const today = startOfDay(new Date());
const album = GetLatestAlbum(FULL_ALBUMS);

const AlbumPromotionSection = () => {
	const handleImgError = useImageFallback();
	if (!album) return null;

	const { key, imageSrc, detailUrl } = GetAlbumPaths(album);

	const allTrackIds = GetTracks(album.tracks || []);
	const previewTrackIds = allTrackIds.slice(0, 3);

	const parseDate = parse(album.releaseDate, 'yyyy.MM.dd', new Date());
	const releaseDate = format(parseDate, 'yyyy.MM.dd');
	const diff = differenceInDays(parseDate, today);
	const isReleased = diff < 0;

	return (
		<S.ContentSection>
			<S.ContentWrapper>
				{!isReleased && <S.DDayBadge>{diff === 0 ? 'D-Day' : `D-${diff}`}</S.DDayBadge>}

				<S.ImageArea>
					<S.CoverImage src={imageSrc} alt={album.title} onError={handleImgError} />
				</S.ImageArea>

				<S.InfoArea>
					<S.Tag>{isReleased ? '⊹ LATEST RELEASE ⊹' : '⊹ UPCOMING RELEASE ⊹'}</S.Tag>
					<S.Title>{album.title}</S.Title>
					<S.Info>
						{ALBUM_TYPE_LABEL[album.type]} • {releaseDate}
					</S.Info>

					<S.Description>
						{isReleased
							? `새로운 이야기가 담긴 ${album.title}을 지금 만나보세요.`
							: `${album.title}의 새로운 시작을 준비하세요.`}
					</S.Description>

					<S.TrackPreviewList>
						{isReleased ? (
							previewTrackIds.length > 0 ? (
								<>
									{previewTrackIds.map((trackId, index) => {
										const track = MASTER_TRACKS[trackId];
										return (
											<S.TrackItem key={key}>
												<span className="number">{String(index + 1).padStart(2, '0')}</span>
												<span className="name">{track?.title}</span>
											</S.TrackItem>
										);
									})}

									{allTrackIds.length > previewTrackIds.length && (
										<S.MoreText>외 {allTrackIds.length - previewTrackIds.length}곡을 만나보세요.</S.MoreText>
									)}
								</>
							) : (
								<S.TrackItem>트랙 정보가 없습니다.</S.TrackItem>
							)
						) : (
							<>
								<S.TrackItem>Coming Soon ...</S.TrackItem>
							</>
						)}
					</S.TrackPreviewList>

					<S.PromotionLinkButton to={detailUrl}>{isReleased ? 'VIEW TRACKS' : 'MOVE TO PAGE'}</S.PromotionLinkButton>
				</S.InfoArea>
			</S.ContentWrapper>
		</S.ContentSection>
	);
};

export default AlbumPromotionSection;
