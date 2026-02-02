// @pages/Album/AlbumDetailTracks.tsx

import * as S from '@styles/pages/Album/AlbumDetailTracks.style';
import { useMemo } from 'react';
import { MASTER_TRACKS } from '@/const/tracks';
import { Album } from '@/types/album';
import { GetTracks } from '@/utils/track';
import Placeholder from '@/components/placeholder';

const AlbumDetailTracks = ({
	TITLE_KR,
	TITLE_EN,
	albumData,
}: {
	TITLE_KR: string;
	TITLE_EN: string;
	albumData: Album | undefined;
}) => {
	const rawTracks = albumData?.tracks || [];
	const trackIds = GetTracks(rawTracks);
	const isVinyl = !Array.isArray(rawTracks);

	const hasTracks = useMemo(() => {
		if (!albumData?.tracks) return false;

		if (Array.isArray(albumData.tracks)) {
			return albumData.tracks.length > 0;
		}

		return Object.keys(albumData.tracks).length > 0;
	}, [albumData]);

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>
					{TITLE_EN} ({trackIds.length})
				</span>
			</S.SectionTitle>

			{hasTracks ? (
				<>
					{isVinyl
						? Object.entries(rawTracks as Record<string, string[]>).map(([sideName, tracks]) => (
								<S.SideGroup key={sideName}>
									<S.SideTitle>{sideName}</S.SideTitle>
									{GetTracks(tracks).map(trackId => {
										const track = MASTER_TRACKS[trackId];
										if (!track) return null;
										const trackIndex = trackIds.indexOf(trackId) + 1;

										return (
											<S.TrackWrapper key={trackId}>
												<S.TrackNumber>{String(trackIndex).padStart(2, '0')}</S.TrackNumber>
												<S.TrackTitle $isLead={track.isLead || false}>
													{track.title}
													{track.isLead && <S.LeadBadge>TITLE</S.LeadBadge>}
												</S.TrackTitle>
											</S.TrackWrapper>
										);
									})}
								</S.SideGroup>
							))
						: trackIds.map((trackId, index) => {
								const track = MASTER_TRACKS[trackId];
								if (!track) return null;

								return (
									<S.TrackWrapper key={trackId}>
										<S.TrackNumber>{String(index + 1).padStart(2, '0')}</S.TrackNumber>
										<S.TrackTitle $isLead={track.isLead || false}>
											{track.title}
											{track.isLead && <S.LeadBadge>TITLE</S.LeadBadge>}
										</S.TrackTitle>
									</S.TrackWrapper>
								);
							})}
				</>
			) : (
				<Placeholder contentName={TITLE_KR} />
			)}
		</S.ContentSection>
	);
};

export default AlbumDetailTracks;
