// @pages/Song/SongDetail

import * as S from '@styles/pages/Song/SongDetail.styles';
import { useParams, useNavigate } from 'react-router-dom';
import { MASTER_TRACKS } from '@/const/tracks';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/placeholder';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@/const/albums';
import { NAME } from '@/const/profile';
import { IconKey } from '@/types/icon';
import { ICON_CONFIG } from '@/const/icons';

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

			<S.MetaSection>
				<S.CreditList>
					<S.CreditItem>
						<S.ItemLabel>재생시간</S.ItemLabel> {formatDuration(track.duration)}
					</S.CreditItem>
					<S.CreditItem>
						<S.ItemLabel>작사</S.ItemLabel> {formatCredit(track.lyricist)}
					</S.CreditItem>
					<S.CreditItem>
						<S.ItemLabel>작곡</S.ItemLabel> {formatCredit(track.composer)}
					</S.CreditItem>
					<S.CreditItem>
						<S.ItemLabel>편곡</S.ItemLabel> {formatCredit(track.arranger)}
					</S.CreditItem>
				</S.CreditList>

				<S.StreamingSection>
					<S.ItemLabel>스트리밍</S.ItemLabel>
					{/* 앨범 streaming으로 임시 사용 */}
					{albumInfo?.streaming && (
						<S.BadgeGroup>
							{Object.entries(albumInfo.streaming).map(([label, url]) => {
								const key = label.toLowerCase().replace(/\s+/g, '') as IconKey;
								const config = ICON_CONFIG[key];
								const Icon = config?.icon;

								if (!Icon || !url) return null;

								return (
									<S.MusicBadge key={label} href={url} target="_blank" rel="noreferrer" title={config.label || label}>
										<Icon />
										<span>{label}</span>
									</S.MusicBadge>
								);
							})}
						</S.BadgeGroup>
					)}
				</S.StreamingSection>
			</S.MetaSection>
		</S.MainContainer>
	);
};

export default SongDetail;
