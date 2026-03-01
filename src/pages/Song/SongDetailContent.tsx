// @/pages/Song/SongDetail

import * as S from '@/styles/pages/Song/SongDetailContent.styles';

import { useMemo, useState } from 'react';
import { LINK_PLATFORM, MUSIC_PLATFORM } from '@/const/links';
import Placeholder from '@/components/Placeholder';
import { Track } from '@/types/track';

interface SongDetailContentProps {
	track: Track;
}

const SongDetailContent = ({ track }: SongDetailContentProps) => {
	const [activeTab, setActiveTab] = useState<'lyrics' | 'chords' | 'mv'>('lyrics');
	const [activeVersionIdx, setActiveVersionIdx] = useState(0);

	const hasChords = useMemo(() => !!(track.chordsList && track.chordsList.length > 0), [track.chordsList]);

	const currentChordVersion = useMemo(
		() => (hasChords ? track.chordsList![activeVersionIdx] : null),
		[hasChords, track.chordsList, activeVersionIdx],
	);

	const isSeparated = useMemo(
		() => !!(currentChordVersion?.chordModeType === 'separated' && track.lyrics),
		[currentChordVersion, track.lyrics],
	);

	const tabs = useMemo(
		() =>
			[
				{ id: 'lyrics', label: '가사', show: !!track.lyrics },
				{ id: 'chords', label: '코드', show: hasChords },
				{ id: 'mv', label: '뮤직비디오', show: !!track.mvLink },
			].filter(tab => tab.show),
		[track.lyrics, track.mvLink, hasChords],
	);

	const guideItems = useMemo(() => {
		if (!currentChordVersion) return [];
		return [
			{ label: '튜닝', value: currentChordVersion.tuning || '정튜닝' },
			{ label: '제공', value: currentChordVersion.provider ? `${currentChordVersion.provider}님` : null },
		].filter(item => item.value);
	}, [currentChordVersion]);

	return (
		<S.ContentSection>
			<S.ContentHeader>
				<S.TabGroup>
					{tabs.map(tab => (
						<S.TabButton key={tab.id} $isActive={activeTab === tab.id} onClick={() => setActiveTab(tab.id as any)}>
							{tab.label}
						</S.TabButton>
					))}
				</S.TabGroup>

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
							{guideItems.map(item => (
								<div key={item.label} className="guide-item">
									{item.label} | {item.value}
								</div>
							))}
						</S.GuideWrapper>
					</S.ChordSubHeader>
				)}
			</S.ContentHeader>

			{activeTab === 'lyrics' &&
				(track.lyrics ? <S.Content $isChord={false}>{track.lyrics}</S.Content> : <Placeholder contentName="가사" />)}

			{activeTab === 'chords' && currentChordVersion && (
				<>
					{isSeparated && (
						<S.StickyChordBar>
							<span className="chord">{currentChordVersion.chords}</span>
						</S.StickyChordBar>
					)}
					<S.Content $isChord={!isSeparated}>{isSeparated ? track.lyrics : currentChordVersion.chords}</S.Content>
				</>
			)}

			{activeTab === 'mv' && track.mvLink && (
				<>
					<S.VideoWrapper>
						<iframe src={`${LINK_PLATFORM.YOUTUBE.EMBED_URL}${track.mvLink}`} title="YouTube MV" allowFullScreen />
					</S.VideoWrapper>
					<S.PrimaryButton
						to={`${LINK_PLATFORM.YOUTUBE.BASE_URL}${track.mvLink}`}
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
