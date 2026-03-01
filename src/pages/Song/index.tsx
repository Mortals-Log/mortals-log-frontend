// @/pages/Song

import * as S from '@/styles/pages/Song/Song.styles';

import { useMemo, useState } from 'react';
import TrackRow from '@/components/TrackRow';
import { MASTER_TRACKS } from '@/const/tracks';
import { GetTrackToAlbumMap } from '@/utils/track';
import UseTrackNavigation from '@/hooks/useTrackNavigation';

const trackToAlbumMap = GetTrackToAlbumMap();

type SortType = 'latest' | 'release' | 'alphabet';

const SORT_OPTIONS: { type: SortType; label: string }[] = [
	{ type: 'latest', label: '최신순' },
	{ type: 'release', label: '발매순' },
	{ type: 'alphabet', label: '가나다순' },
];

const SORT_STRATEGY = {
	latest: (a: any, b: any) => (b.releaseDate > a.releaseDate ? 1 : -1),
	release: (a: any, b: any) => (a.releaseDate > b.releaseDate ? 1 : -1),
	alphabet: (a: any, b: any) => a.title.localeCompare(b.title, 'ko'),
};

const Song = () => {
	const { handleItemClick, handleKeyDown } = UseTrackNavigation();
	const [sortType, setSortType] = useState<SortType>('latest');

	const allTracksWithAlbum = useMemo(() => {
		return Object.values(MASTER_TRACKS).map(track => ({
			...track,
			...(trackToAlbumMap.get(track.id) ?? {
				albumTitle: 'Unknown Album',
				releaseDate: '0000.00.00',
			}),
		}));
	}, []);

	const sortedTracks = useMemo(() => {
		return [...allTracksWithAlbum].sort(SORT_STRATEGY[sortType]);
	}, [allTracksWithAlbum, sortType]);

	return (
		<>
			<S.SortTabGroup role="tablist">
				{SORT_OPTIONS.map(({ type, label }) => (
					<S.SortTabItem
						key={type}
						$isActive={sortType === type}
						onClick={() => setSortType(type)}
						role="tab"
						aria-selected={sortType === type}
						tabIndex={0}>
						{label}
					</S.SortTabItem>
				))}
			</S.SortTabGroup>

			<S.TrackSection>
				{sortedTracks.map((track, index) => (
					<TrackRow key={track.id} track={track} index={index} onClick={handleItemClick} onKeyDown={handleKeyDown} />
				))}
			</S.TrackSection>
		</>
	);
};

export default Song;
