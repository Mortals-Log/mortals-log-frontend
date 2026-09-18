// @/pages/AlbumDetail/AlbumDetailTracks.tsx

import { useMemo } from 'react';
import { differenceInDays, parse, startOfDay } from 'date-fns';
import { MASTER_TRACKS } from '@/const/tracks';
import Placeholder from '@/components/Placeholder';
import TrackRow from '@/components/TrackRow';
import { Album } from '@/types/album';
import { GetTracks } from '@/utils/track';
import UseTrackNavigation from '@/hooks/useTrackNavigation';
import { LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { ADT_CONTENT_SECTION, ADT_SIDE_TITLE } from './album-detail-classes';

const AlbumDetailTracks = ({
	TITLE_KR,
	TITLE_EN,
	albumData,
}: {
	TITLE_KR: string;
	TITLE_EN: string;
	albumData: Album | undefined;
}) => {
	const { handleItemClick, handleKeyDown } = UseTrackNavigation();

	const rawTracks = albumData?.tracks || [];
	const trackIds = GetTracks(rawTracks);
	const isVinyl = !Array.isArray(rawTracks);

	const isReleased = useMemo(() => {
		if (!albumData?.releaseDate) return true;
		const releaseDate = parse(albumData.releaseDate, 'yyyy.MM.dd', new Date());
		return differenceInDays(releaseDate, startOfDay(new Date())) <= 0;
	}, [albumData]);

	const hasTracks = useMemo(() => {
		if (!albumData?.tracks) return false;

		if (Array.isArray(albumData.tracks)) {
			return albumData.tracks.length > 0;
		}

		return Object.keys(albumData.tracks).length > 0;
	}, [albumData]);

	return (
		<section className={ADT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR}
				<span>
					{TITLE_EN} ({trackIds.length})
				</span>
			</div>

			{!isReleased ? (
				<Placeholder message="트랙리스트는 발매일에 공개됩니다." />
			) : hasTracks ? (
				<>
					{isVinyl
						? Object.entries(rawTracks as Record<string, string[]>).map(([sideName, tracks]) => (
								<>
									<div className={ADT_SIDE_TITLE}>{sideName}</div>
									{GetTracks(tracks).map(trackId => {
										const track = MASTER_TRACKS[trackId];
										if (!track) return null;

										const trackIndex = trackIds.indexOf(trackId);
										return (
											<TrackRow
												key={trackId}
												track={track}
												index={trackIndex}
												onClick={() => handleItemClick(track)}
												onKeyDown={e => handleKeyDown(e, track)}
												variant="album"
											/>
										);
									})}
								</>
							))
						: trackIds.map((trackId, index) => {
								const track = MASTER_TRACKS[trackId];
								if (!track) return null;

								return (
									<TrackRow
										key={track.id}
										track={track}
										index={index}
										onClick={() => handleItemClick(track)}
										onKeyDown={e => handleKeyDown(e, track)}
										variant="album"
									/>
								);
							})}
				</>
			) : (
				<Placeholder contentName={TITLE_KR} />
			)}
		</section>
	);
};

export default AlbumDetailTracks;
