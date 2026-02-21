// @pages/Song/SongDetail

import * as S from '@styles/pages/Song/SongDetailHeader.styles';
import { useNavigate } from 'react-router-dom';
import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';
import { Track } from '@/types/track';
import { Album } from '@/types/album';

interface SongDetailHeaderProps {
	track: Track;
	albumInfo: Album | null | undefined;
}

const SongDetailHeader = ({ track, albumInfo }: SongDetailHeaderProps) => {
	const navigate = useNavigate();

	return (
		<S.HeaderSection>
			<S.SubTitle>
				{track.isLead && <S.LeadBadge>TITLE</S.LeadBadge>}
				{track.ageLimit && <S.AdultBadge>🔞 미성년자 청취불가</S.AdultBadge>}
				{track.enTitle}
				{track.version && ` (${track.version})`}
			</S.SubTitle>

			<S.MainTitle>
				{track.title} {track.version && `(${track.version})`}
			</S.MainTitle>

			<S.Description>
				<span className="type">
					{ALBUM_TYPE_LABEL[albumInfo?.type || '']} {albumInfo?.type == 'LP' && `${albumInfo?.volume}집`}
				</span>
				<span className="title" onClick={() => navigate(`/album/${albumInfo?.title}`)}>
					{albumInfo?.title}
				</span>
				{track.originalTrackIds && (
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
