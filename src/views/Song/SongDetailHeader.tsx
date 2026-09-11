'use client';

// @/pages/Song/SongDetailHeader

import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';
import { Track } from '@/types/track';
import { Album } from '@/types/album';
import { BADGE_LABEL } from '@/components/BadgeList';
import { LAYOUT_SUB_TITLE } from '@/const/layout-classes';
import { LEAD_BADGE, ADULT_BADGE } from '@/const/component-classes';
import {
	SDH_BADGE_GROUP,
	SDH_MAIN_TITLE,
	SDH_HEADER_SECTION,
	SDH_ORIGINAL_LINK_GROUP,
	SDH_ORIGINAL_LINK,
	SDH_DESCRIPTION,
} from './song-detail-classes';

interface SongDetailHeaderProps {
	track: Track;
	albumInfo: Album | any;
}

const SongDetailHeader = ({ track, albumInfo }: SongDetailHeaderProps) => {
	const router = useRouter();

	const albumLabel = useMemo(() => {
		if (!albumInfo?.type) return '';
		const type = ALBUM_TYPE_LABEL[albumInfo.type as keyof typeof ALBUM_TYPE_LABEL] || '';
		const volume = albumInfo.type === 'LP' && albumInfo.volume ? `${albumInfo.volume}집` : '';
		return `${type}${volume}`;
	}, [albumInfo?.type, albumInfo?.volume]);

	const originalTracks = useMemo(() => {
		if (!track.originalTrackIds || track.originalTrackIds.length === 0) return [];

		return track.originalTrackIds.map(id => {
			const originalTrack = MASTER_TRACKS[id as keyof typeof MASTER_TRACKS];
			return {
				id,
				displayTitle: originalTrack ? originalTrack.title : id,
			};
		});
	}, [track.originalTrackIds]);

	const handleAlbumClick = useCallback(() => {
		if (albumInfo?.title && albumInfo.title !== 'Unknown Album') {
			router.push(`/album/${encodeURIComponent(albumInfo.title)}`);
		}
	}, [router, albumInfo]);

	const handleSongClick = useCallback(
		(id: string) => {
			router.push(`/song/${id}`);
		},
		[router],
	);

	return (
		<section className={SDH_HEADER_SECTION}>
			<span className={LAYOUT_SUB_TITLE}>
				<span className={SDH_BADGE_GROUP}>
					{track.isLead && <span className={LEAD_BADGE}>{BADGE_LABEL.TITLE}</span>}
					{track.ageLimit && <span className={ADULT_BADGE}>{BADGE_LABEL.ADULT}</span>}
				</span>
				{track.enTitle}
				{track.version && ` (${track.version})`}
			</span>

			<div className={SDH_MAIN_TITLE}>
				{track.title} {track.version && `(${track.version})`}
			</div>

			<div className={SDH_DESCRIPTION}>
				{albumLabel && <span className="type">{albumLabel}</span>}

				<span className="album" onClick={handleAlbumClick}>
					{albumInfo?.title || 'Unknown Album'}
				</span>

				{originalTracks.length > 0 && (
					<div className={SDH_ORIGINAL_LINK_GROUP}>
						{originalTracks.map(({ id, displayTitle }) => (
							<button key={id} className={SDH_ORIGINAL_LINK} onClick={() => handleSongClick(id)}>
								원곡보기 #{displayTitle}
							</button>
						))}
					</div>
				)}
			</div>
		</section>
	);
};

export default SongDetailHeader;
