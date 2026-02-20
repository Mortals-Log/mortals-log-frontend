// @pages/Song/SongDetail

import * as S from '@styles/pages/Song/SongDetailContent.styles';
import { useState } from 'react';
import Placeholder from '@/components/placeholder';
import { LINK_PLATFORM, MUSIC_PLATFORM } from '@/const/links';
import { Track } from '@/types/track';

interface SongDetailContentProps {
	track: Track;
}

const SongDetailContent = ({ track }: SongDetailContentProps) => {
	const [activeTab, setActiveTab] = useState<'lyrics' | 'chords' | 'mv'>('lyrics');
	const { chords, tuning, provider } = track.chords || {};
	const isSeparated = track.chords?.chordModeType === 'separated' && track.lyrics && track.chords;

	return (
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

				{activeTab === 'chords' && (tuning || provider) && (
					<S.GuideWrapper>
						{tuning ? (
							<div className="guide-item">튜닝 | {tuning}</div>
						) : (
							<div className="guide-item">튜닝 | 정튜닝</div>
						)}
						{provider && <div className="guide-item">제공 | {provider}님</div>}
					</S.GuideWrapper>
				)}
			</S.ContentHeader>

			{activeTab === 'lyrics' &&
				(track.lyrics ? <S.Content isChord={false}>{track.lyrics}</S.Content> : <Placeholder contentName="가사" />)}

			{activeTab === 'chords' && (
				<>
					{isSeparated && (
						<S.StickyChordBar>
							<S.ChordText>{chords}</S.ChordText>
						</S.StickyChordBar>
					)}

					<S.Content isChord={!isSeparated}>{isSeparated ? track.lyrics : chords}</S.Content>
				</>
			)}

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
	);
};

export default SongDetailContent;
