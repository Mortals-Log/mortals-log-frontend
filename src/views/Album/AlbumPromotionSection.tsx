// @/pages/Album/AlbumPromotionSection

import Link from 'next/link';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';
import { GetAlbumPaths, GetLatestAlbum } from '@/utils/album';
import { GetTracks } from '@/utils/track';
import useImageFallback from '@/hooks/useImageFallback';
import { differenceInDays, format, parse, startOfDay } from 'date-fns';
import {
	AP_CONTENT_WRAPPER,
	AP_IMAGE_AREA,
	AP_COVER_IMAGE,
	AP_INFO_AREA,
	AP_TAG,
	AP_TITLE,
	AP_INFO,
	AP_DESCRIPTION,
	AP_TRACK_PREVIEW_LIST,
	AP_TRACK_ITEM,
	AP_MORE_TEXT,
	AP_VIEW_MORE_LINK,
	AP_DDAY_BADGE,
} from './album-classes';

const AlbumPromotionSection = () => {
	const handleImgError = useImageFallback();

	const promotionData = (() => {
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
	})();

	if (!promotionData) return null;

	const { album, imageSrc, detailUrl, releaseDateStr, isReleased, dDayText, previewTracks, totalTrackCount } =
		promotionData;

	return (
		<div className={AP_CONTENT_WRAPPER}>
			{dDayText && <div className={AP_DDAY_BADGE}>{dDayText}</div>}

			<div className={AP_IMAGE_AREA}>
				<img className={AP_COVER_IMAGE} src={imageSrc} alt={album.title} onError={handleImgError} />
			</div>

			<div className={AP_INFO_AREA}>
				<div className={AP_TAG}>{isReleased ? '⊹ LATEST RELEASE ⊹' : '⊹ UPCOMING RELEASE ⊹'}</div>
				<div className={AP_TITLE}>{album.title}</div>
				<div className={AP_INFO}>
					{ALBUM_TYPE_LABEL[album.type as keyof typeof ALBUM_TYPE_LABEL]} • {releaseDateStr}
				</div>

				<div className={AP_DESCRIPTION}>
					{isReleased
						? `새로운 이야기가 담긴 ${album.title}을 지금 만나보세요.`
						: `${album.title}의 새로운 시작을 준비하세요.`}
				</div>

				<ul className={AP_TRACK_PREVIEW_LIST}>
					{!isReleased ? (
						<li className={AP_TRACK_ITEM}>Coming Soon ...</li>
					) : previewTracks.length > 0 ? (
						<>
							{previewTracks.map((track, index) => (
								<li className={AP_TRACK_ITEM} key={track.id}>
									<span className="number">{String(index + 1).padStart(2, '0')}</span>
									<span className="name">{track.title}</span>
								</li>
							))}

							{totalTrackCount > 3 && <span className={AP_MORE_TEXT}>외 {totalTrackCount - 3}곡을 더 만나보세요.</span>}
						</>
					) : (
						<li className={AP_TRACK_ITEM}>트랙 정보가 없습니다.</li>
					)}
				</ul>

				<Link href={detailUrl} className={AP_VIEW_MORE_LINK}>
					{isReleased ? 'VIEW TRACKS' : 'MOVE TO PAGE'}
				</Link>
			</div>
		</div>
	);
};

export default AlbumPromotionSection;
