// @pages/Song/SongDetail

import * as S from '@styles/pages/Song/SongDetail.styles';
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IconKey } from '@/types/icon';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@/const/albums';
import { NAME } from '@/const/profile';
import { ICON_CONFIG } from '@/const/icons';
import { MASTER_TRACKS } from '@/const/tracks';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/placeholder';
import { LINK_PLATFORM, MUSIC_PLATFORM } from '@/const/links';

const SongDetail = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState<'lyrics' | 'chords' | 'mv'>('lyrics');
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

					{track.singing && (
						<S.CreditItem>
							<S.ItemLabel>노래방</S.ItemLabel>
							<S.SingingWrapper>
								{track.singing.tj && (
									<S.SingingBadge brand="TJ">
										<span className="brand">TJ</span>
										<span className="number">{track.singing.tj}</span>
									</S.SingingBadge>
								)}
								{track.singing.ky && (
									<S.SingingBadge brand="KY">
										<span className="brand">KY</span>
										<span className="number">{track.singing.ky}</span>
									</S.SingingBadge>
								)}
							</S.SingingWrapper>
						</S.CreditItem>
					)}
				</S.CreditList>

				{/* 앨범 streaming으로 임시 사용 */}
				{albumInfo?.streaming && (
					<S.StreamingSection>
						<S.ItemLabel>스트리밍</S.ItemLabel>
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
					</S.StreamingSection>
				)}
			</S.MetaSection>

			<S.ContentSection>
				<S.ContentHeader>
					{track.lyrics && (track.chords || track.mvLink) ? (
						<S.TabGroup>
							<S.TabButton isActive={activeTab === 'lyrics'} onClick={() => setActiveTab('lyrics')}>
								가사
							</S.TabButton>

							{track.chords && (
								<S.TabButton isActive={activeTab === 'chords'} onClick={() => setActiveTab('chords')}>
									코드
								</S.TabButton>
							)}

							{track.mvLink && (
								<S.TabButton isActive={activeTab === 'mv'} onClick={() => setActiveTab('mv')}>
									뮤직비디오
								</S.TabButton>
							)}
						</S.TabGroup>
					) : (
						<S.ContentTitle>가사</S.ContentTitle>
					)}

					{activeTab === 'chords' && (track.tuning || track.provider) && (
						<S.GuideWrapper>
							{track.tuning ? (
								<div className="guide-item">튜닝 | {track.tuning}</div>
							) : (
								<div className="guide-item">튜닝 | 정튜닝</div>
							)}
							{track.provider && <div className="guide-item">제공 | {track.provider}님</div>}
						</S.GuideWrapper>
					)}
				</S.ContentHeader>

				{activeTab === 'lyrics' &&
					(track.lyrics ? <S.Content isChord={false}>{track.lyrics}</S.Content> : <Placeholder contentName="가사" />)}

				{activeTab === 'chords' && <S.Content isChord={true}>{track.chords}</S.Content>}

				{activeTab === 'mv' && track.mvLink && (
					<>
						<S.VideoWrapper>
							<iframe src={`${LINK_PLATFORM.YOUTUBE.EMBED_URL}${track.mvLink}`} allowFullScreen />
						</S.VideoWrapper>

						<S.PrimaryButton
							href={`${LINK_PLATFORM.YOUTUBE.BASE_URL}${track.mvLink}`}
							target="_blank"
							rel="noopener noreferrer">
							{MUSIC_PLATFORM.YOUTUBE}로 보러가기
						</S.PrimaryButton>
					</>
				)}
			</S.ContentSection>
		</S.MainContainer>
	);
};

export default SongDetail;
