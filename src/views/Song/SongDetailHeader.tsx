'use client';

// @/pages/Song/SongDetailHeader

import * as S from '@/styles/pages/Song/SongDetailHeader.styles';

import { useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';
import { Track } from '@/types/track';
import { Album } from '@/types/album';
import { BADGE_LABEL } from '@/components/BadgeList';

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
		<S.HeaderSection>
			<S.SubTitle>
				<S.BadgeGroup>
					{track.isLead && <S.LeadBadge>{BADGE_LABEL.TITLE}</S.LeadBadge>}
					{track.ageLimit && <S.AdultBadge>{BADGE_LABEL.ADULT}</S.AdultBadge>}
				</S.BadgeGroup>
				{track.enTitle}
				{track.version && ` (${track.version})`}
			</S.SubTitle>

			<S.MainTitle>
				{track.title} {track.version && `(${track.version})`}
			</S.MainTitle>

			<S.Description>
				{albumLabel && <span className="type">{albumLabel}</span>}

				<span className="album" onClick={handleAlbumClick}>
					{albumInfo?.title || 'Unknown Album'}
				</span>

				{originalTracks.length > 0 && (
					<S.OriginalLinkGroup>
						{originalTracks.map(({ id, displayTitle }) => (
							<S.OriginalLink key={id} onClick={() => handleSongClick(id)}>
								원곡보기 #{displayTitle}
							</S.OriginalLink>
						))}
					</S.OriginalLinkGroup>
				)}
			</S.Description>
		</S.HeaderSection>
	);
};

export default SongDetailHeader;
