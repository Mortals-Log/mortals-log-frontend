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
	const [activeVersionIdx, setActiveVersionIdx] = useState(0);

	const hasChords = track.chordsList && track.chordsList.length > 0;
	const currentChordVersion = hasChords ? track.chordsList![activeVersionIdx] : null;

	const isSeparated = currentChordVersion?.chordModeType === 'separated' && track.lyrics;

	return (
		<S.ContentSection>
			<S.ContentHeader>
				{track.lyrics && (hasChords || track.mvLink) ? (
					<S.TabGroup>
						<S.TabButton isActive={activeTab === 'lyrics'} onClick={() => setActiveTab('lyrics')}>
							가사
						</S.TabButton>

						{hasChords && (
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

				{activeTab === 'chords' && currentChordVersion && (
					<S.ChordSubHeader>
						{track.chordsList!.length > 1 && (
							<S.VersionSelector>
								{track.chordsList!.map((_, idx) => (
									<S.VersionChip
										key={idx}
										$isActive={activeVersionIdx === idx}
										onClick={() => setActiveVersionIdx(idx)}>
										Ver.{idx + 1}
									</S.VersionChip>
								))}
							</S.VersionSelector>
						)}

						<S.GuideWrapper>
							<div className="guide-item">튜닝 | {currentChordVersion.tuning || '정튜닝'}</div>
							{currentChordVersion.provider && (
								<div className="guide-item">제공 | {currentChordVersion.provider}님</div>
							)}
						</S.GuideWrapper>
					</S.ChordSubHeader>
				)}
			</S.ContentHeader>

			{activeTab === 'lyrics' &&
				(track.lyrics ? <S.Content isChord={false}>{track.lyrics}</S.Content> : <Placeholder contentName="가사" />)}

			{activeTab === 'chords' && currentChordVersion && (
				<>
					{isSeparated && (
						<S.StickyChordBar>
							<S.ChordText>{currentChordVersion.chords}</S.ChordText>
						</S.StickyChordBar>
					)}
					<S.Content isChord={!isSeparated}>{isSeparated ? track.lyrics : currentChordVersion.chords}</S.Content>
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
