// @pages/Album/AlbumDetailTracks.tsx

import * as S from '@styles/pages/Album/AlbumDetailTracks.style';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MASTER_TRACKS } from '@/const/tracks';
import { Album } from '@/types/album';
import { GetTracks } from '@/utils/track';
import Placeholder from '@/components/placeholder';
import { differenceInDays, parse, startOfDay } from 'date-fns';

const AlbumDetailTracks = ({
	TITLE_KR,
	TITLE_EN,
	albumData,
}: {
	TITLE_KR: string;
	TITLE_EN: string;
	albumData: Album | undefined;
}) => {
	const navigate = useNavigate();

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
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>
					{TITLE_EN} ({trackIds.length})
				</span>
			</S.SectionTitle>
			{!isReleased ? (
				<Placeholder message="트랙리스트는 발매일에 공개됩니다." />
			) : hasTracks ? (
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
											<S.TrackWrapper key={trackId} onClick={() => navigate(`/song/${track.id}`)}>
												<S.TrackNumber>{String(trackIndex).padStart(2, '0')}</S.TrackNumber>
												<S.TrackTitle $isLead={track.isLead || false}>
													{track.title} {track.version && track.version}
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
									<S.TrackWrapper key={trackId} onClick={() => navigate(`/song/${track.id}`)}>
										<S.TrackNumber>{String(index + 1).padStart(2, '0')}</S.TrackNumber>
										<S.TrackTitle $isLead={track.isLead || false}>
											{track.title} {track.version && `(${track.version})`}
											{track.isLead && <S.LeadBadge>TITLE</S.LeadBadge>}
											{track.ageLimit && <S.AdultBadge>🔞 미성년자 청취불가</S.AdultBadge>}
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
