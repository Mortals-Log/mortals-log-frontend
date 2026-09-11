// @/pages/Song/SongDetail

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { LINK_PLATFORM, MUSIC_PLATFORM } from '@/const/links';
import Placeholder from '@/components/Placeholder';
import { Track } from '@/types/track';
import { LAYOUT_CONTENT_SECTION } from '@/const/layout-classes';
import { VIDEO_WRAPPER, PRIMARY_BUTTON } from '@/const/component-classes';
import {
	SDC_CONTENT_HEADER,
	SDC_TAB_GROUP,
	sdcTabButton,
	SDC_CHORD_SUB_HEADER,
	SDC_VERSION_SELECTOR,
	sdcVersionChip,
	SDC_GUIDE_WRAPPER,
	sdcContent,
	SDC_STICKY_CHORD_BAR,
	SDC_BUTTON_WRAPPER,
	SDC_DOWNLOAD_BUTTON,
} from './song-detail-classes';

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
				{ id: 'lyrics', label: '가사', show: true },
				{ id: 'chords', label: '코드', show: hasChords },
				{ id: 'mv', label: '뮤직비디오', show: !!track.mvLink },
			].filter(tab => tab.show),
		[track.mvLink, hasChords],
	);

	const guideItems = useMemo(() => {
		if (!currentChordVersion) return [];

		let displayTuning = currentChordVersion.tuning || '정튜닝';

		displayTuning = displayTuning
			.replace('정튜닝', '정튜닝(E-A-D-G-B-E)')
			.replace('하프다운튜닝', '하프다운튜닝(Eb-Ab-Db-Gb-Bb-Eb)')
			.replace('다운튜닝', '다운튜닝(D-G-C-F-A-D)');

		return [
			{ label: '튜닝', value: displayTuning },
			{
				label: '제공',
				value: currentChordVersion.provider ? `${currentChordVersion.provider}님` : null,
			},
		].filter(item => item.value);
	}, [currentChordVersion]);

	const handleDownloadPDF = () => {
		if (!currentChordVersion) return;
		window.print();
	};

	const handleDownloadTxt = () => {
		if (!currentChordVersion) return;

		const content = currentChordVersion.chords.replace(/ {3}/g, '　');

		const header =
			`[${track.title}]\n` +
			`튜닝 | ${currentChordVersion.tuning || '정튜닝'}\n` +
			`제공 | ${currentChordVersion.provider || 'System'}\n\n` +
			`------------------------------------------\n\n`;

		const lyrics = isSeparated && track.lyrics ? `\n\n${track.lyrics}` : '';

		const finalContent = header + content + lyrics;
		const fileName = `${track.title}_${currentChordVersion.provider}ver.txt`;

		const blob = new Blob([finalContent], { type: 'text/plain;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');

		link.href = url;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);

		URL.revokeObjectURL(url);
	};

	return (
		<section>
			<div className={SDC_CONTENT_HEADER}>
				<div className={SDC_TAB_GROUP}>
					{tabs.map(tab => (
						<button
							key={tab.id}
							className={sdcTabButton(activeTab === tab.id)}
							onClick={() => setActiveTab(tab.id as any)}>
							{tab.label}
						</button>
					))}
				</div>

				{activeTab === 'chords' && currentChordVersion && (
					<div className={SDC_CHORD_SUB_HEADER}>
						{track.chordsList!.length > 1 && (
							<div className={SDC_VERSION_SELECTOR}>
								{track.chordsList!.map((_, idx) => (
									<button
										key={idx}
										className={sdcVersionChip(activeVersionIdx === idx)}
										onClick={() => setActiveVersionIdx(idx)}>
										Ver.{idx + 1}
									</button>
								))}
							</div>
						)}

						<div className={SDC_GUIDE_WRAPPER}>
							{guideItems.map(item => (
								<div key={item.label} className="guide-item">
									{item.label} | {item.value}
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			{activeTab === 'lyrics' &&
				(track.lyrics ? <div className={sdcContent(false)}>{track.lyrics}</div> : <Placeholder contentName="가사" />)}

			{activeTab === 'chords' && currentChordVersion && (
				<>
					<div className={SDC_BUTTON_WRAPPER}>
						<span className={SDC_DOWNLOAD_BUTTON} onClick={handleDownloadPDF}>
							PDF 다운로드 💾
						</span>
						<span className={SDC_DOWNLOAD_BUTTON} onClick={handleDownloadTxt}>
							텍스트 저장 📝
						</span>
					</div>
					{isSeparated && (
						<div className={SDC_STICKY_CHORD_BAR}>
							<span className="chord">{currentChordVersion.chords}</span>
						</div>
					)}
					<div className={sdcContent(!isSeparated)}>{isSeparated ? track.lyrics : currentChordVersion.chords}</div>
				</>
			)}

			{activeTab === 'mv' && track.mvLink && (
				<>
					<div className={VIDEO_WRAPPER}>
						<iframe src={`${LINK_PLATFORM.YOUTUBE.EMBED_URL}${track.mvLink}`} title="YouTube MV" allowFullScreen />
					</div>
					<Link
						href={`${LINK_PLATFORM.YOUTUBE.BASE_URL}${track.mvLink}`}
						target="_blank"
						rel="noopener noreferrer"
						className={PRIMARY_BUTTON}>
						{MUSIC_PLATFORM.YOUTUBE}로 보러가기
					</Link>
				</>
			)}
		</section>
	);
};

export default SongDetailContent;
