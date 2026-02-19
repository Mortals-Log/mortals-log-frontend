// @pages/Song/SongDetail

import * as S from '@styles/pages/Song/SongDetail.styles';
import { useParams, useNavigate } from 'react-router-dom';
import { MASTER_TRACKS } from '@/const/tracks';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/placeholder';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@/const/albums';
import { NAME } from '@/const/profile';

const SongDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const track = id ? MASTER_TRACKS[id as keyof typeof MASTER_TRACKS] : null;

	const albumInfo = track
		? FULL_ALBUMS.flatMap(cat => cat.items).find(album => {
				const tracksData = album.tracks;
				if (Array.isArray(tracksData)) {
					return tracksData.some(t => {
						const pattern = t.replace('*', '');
						return track.id.startsWith(pattern);
					});
				}
				return Object.values(tracksData || {})
					.flat()
					.includes(track.id);
			})
		: null;

	const formatDuration = (duration?: string) => {
		if (!duration) return '-';

		const [min, sec] = duration.split(':');

		const formattedMin = min.padStart(2, '0');

		return `${formattedMin}:${sec}`;
	};

	const formatCredit = (externalParticipants?: string[]) => {
		const artistName = NAME.KOREAN;

		if (!externalParticipants) return artistName;

		const participants = externalParticipants.join(', ');

		return `${artistName}, ${participants}`;
	};

	if (!track) {
		return (
			<S.MainContainer>
				<BackButton to="/music" />
				<S.MainTitle>Song Not Found</S.MainTitle>

				<Placeholder message="곡을 찾을 수 없습니다." />
			</S.MainContainer>
		);
	}

	return (
		<S.MainContainer>
			<BackButton />

			<S.HeaderSection>
				<S.SubTitle>
					{track.isLead && <S.LeadBadge>TITLE</S.LeadBadge>}
					{track.ageLimit && <S.AdultBadge>🔞 미성년자 청취불가</S.AdultBadge>}
					{track.enTitle}
				</S.SubTitle>
				<S.MainTitle>{track.title} </S.MainTitle>
				<S.Description>
					<span className="type">
						{ALBUM_TYPE_LABEL[albumInfo?.type || '']} {albumInfo?.type == 'LP' && `${albumInfo?.volume}집`}
					</span>
					<span className="title" onClick={() => navigate(`/album/${albumInfo?.title}`)}>
						{albumInfo?.title}
					</span>
				</S.Description>
			</S.HeaderSection>

			<S.CreditList>
				<div className="item">
					<span>재생시간</span> {formatDuration(track.duration)}
				</div>
				<div className="item">
					<span>작사</span> {formatCredit(track.lyricist)}
				</div>
				<div className="item">
					<span>작곡</span> {formatCredit(track.composer)}
				</div>
				<div className="item">
					<span>편곡</span> {formatCredit(track.arranger)}
				</div>
			</S.CreditList>
		</S.MainContainer>
	);
};

export default SongDetail;
