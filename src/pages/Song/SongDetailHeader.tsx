// @pages/Song/SongDetail

import * as S from '@styles/pages/Song/SongDetailHeader.styles';
import { useNavigate } from 'react-router-dom';
import { ALBUM_TYPE_LABEL } from '@/const/albums';
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
			</S.Description>
		</S.HeaderSection>
	);
};

export default SongDetailHeader;
