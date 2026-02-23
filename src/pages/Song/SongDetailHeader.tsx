// @pages/Song/SongDetail

import * as S from '@styles/pages/Song/SongDetailHeader.styles';
import { useNavigate } from 'react-router-dom';
import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';
import { Track } from '@/types/track';
import { Album } from '@/types/album';
import { BADGE_LABEL } from '@/components/BadgeList';

interface SongDetailHeaderProps {
	track: Track;
	albumInfo: Album | null | undefined;
}
const SongDetailHeader = ({ track, albumInfo }: SongDetailHeaderProps) => {
	const navigate = useNavigate();

	const albumType = albumInfo?.type ? ALBUM_TYPE_LABEL[albumInfo.type as keyof typeof ALBUM_TYPE_LABEL] : '';
	const isLP = albumInfo?.type === 'LP';

	const handleAlbumClick = () => {
		if (albumInfo?.title && albumInfo.title !== 'Unknown Album') {
			navigate(`/album/${albumInfo.title}`);
		}
	};

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
				{(albumType || isLP) && (
					<span className="type">
						{albumType}
						{isLP && albumInfo?.volume && `${albumInfo.volume}집`}
					</span>
				)}

				<span className="album" onClick={handleAlbumClick}>
					{albumInfo?.title}
				</span>

				{track.originalTrackIds && track.originalTrackIds.length > 0 && (
					<S.OriginalLinkGroup>
						{track.originalTrackIds.map(id => {
							const originalTrack = MASTER_TRACKS[id as keyof typeof MASTER_TRACKS];
							const displayTitle = originalTrack ? originalTrack.title : id;

							return (
								<S.OriginalLink key={id} onClick={() => navigate(`/song/${id}`)}>
									원곡보기 #{displayTitle}
								</S.OriginalLink>
							);
						})}
					</S.OriginalLinkGroup>
				)}
			</S.Description>
		</S.HeaderSection>
	);
};

export default SongDetailHeader;
