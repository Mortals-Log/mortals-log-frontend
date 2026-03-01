// @/pages/Album/AlbumPromotionSection

import * as S from '@/styles/pages/Album/AlbumPromotionSection.style';

import { useMemo } from 'react';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';
import { GetAlbumPaths, GetLatestAlbum } from '@/utils/album';
import { GetTracks } from '@/utils/track';
import useImageFallback from '@/hooks/useImageFallback';
import { differenceInDays, format, parse, startOfDay } from 'date-fns';

const AlbumPromotionSection = () => {
	const handleImgError = useImageFallback();

	const promotionData = useMemo(() => {
		const album = GetLatestAlbum(FULL_ALBUMS);
		if (!album) return null;

		const today = startOfDay(new Date());
		const { key, imageSrc, detailUrl } = GetAlbumPaths(album);

		const parseDate = parse(album.releaseDate, 'yyyy.MM.dd', new Date());
		const releaseDateStr = format(parseDate, 'yyyy.MM.dd');
		const diff = differenceInDays(parseDate, today);
		const isReleased = diff <= 0;

		let dDayText = '';
		if (diff === 0) dDayText = 'D-Day';
		else if (diff > 0) dDayText = `D-${diff}`;

		const allTrackIds = GetTracks(album.tracks || []);
		const previewTracks = allTrackIds.slice(0, 3).map(id => ({
			id,
			title: MASTER_TRACKS[id as keyof typeof MASTER_TRACKS]?.title || 'Unknown Track',
		}));

		return {
			album,
			key,
			imageSrc,
			detailUrl,
			releaseDateStr,
			isReleased,
			dDayText,
			previewTracks,
			totalTrackCount: allTrackIds.length,
		};
	}, []);

	if (!promotionData) return null;

	const { album, imageSrc, detailUrl, releaseDateStr, isReleased, dDayText, previewTracks, totalTrackCount } =
		promotionData;

	return (
		<S.ContentWrapper>
			{dDayText && <S.DDayBadge>{dDayText}</S.DDayBadge>}

			<S.ImageArea>
				<S.CoverImage src={imageSrc} alt={album.title} onError={handleImgError} />
			</S.ImageArea>

			<S.InfoArea>
				<S.Tag>{isReleased ? '⊹ LATEST RELEASE ⊹' : '⊹ UPCOMING RELEASE ⊹'}</S.Tag>
				<S.Title>{album.title}</S.Title>
				<S.Info>
					{ALBUM_TYPE_LABEL[album.type as keyof typeof ALBUM_TYPE_LABEL]} • {releaseDateStr}
				</S.Info>

				<S.Description>
					{isReleased
						? `새로운 이야기가 담긴 ${album.title}을 지금 만나보세요.`
						: `${album.title}의 새로운 시작을 준비하세요.`}
				</S.Description>

				<S.TrackPreviewList>
					{!isReleased ? (
						<S.TrackItem>Coming Soon ...</S.TrackItem>
					) : previewTracks.length > 0 ? (
						<>
							{previewTracks.map((track, index) => (
								<S.TrackItem key={track.id}>
									<span className="number">{String(index + 1).padStart(2, '0')}</span>
									<span className="name">{track.title}</span>
								</S.TrackItem>
							))}

							{totalTrackCount > 3 && <S.MoreText>외 {totalTrackCount - 3}곡을 더 만나보세요.</S.MoreText>}
						</>
					) : (
						<S.TrackItem>트랙 정보가 없습니다.</S.TrackItem>
					)}
				</S.TrackPreviewList>

				<S.ViewMoreButton to={detailUrl}>{isReleased ? 'VIEW TRACKS' : 'MOVE TO PAGE'}</S.ViewMoreButton>
			</S.InfoArea>
		</S.ContentWrapper>
	);
};

export default AlbumPromotionSection;
