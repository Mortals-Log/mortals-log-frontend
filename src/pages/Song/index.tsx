// @src/pages/Song/index

import * as S from '@styles/pages/Song/Song.styles';
import { MASTER_TRACKS } from '@/const/tracks';
import { FULL_ALBUMS } from '@/const/albums';
import { useState } from 'react';

type SortType = 'latest' | 'release' | 'alphabet';

const Song = () => {
	const [sortType, setSortType] = useState<SortType>('latest');

	const allTracks = Object.values(MASTER_TRACKS).map(track => {
		let matchingAlbumTitle = '';
		let releaseDate = '0000.00.00';

		FULL_ALBUMS.forEach(category => {
			category.items.forEach(album => {
				const tracksData = album.tracks;
				let isMatch = false;

				if (Array.isArray(tracksData)) {
					isMatch = tracksData.some(t => {
						const pattern = t.replace('*', '');
						return t.includes('*') ? track.id.startsWith(pattern) : t === track.id;
					});
				} else if (tracksData && typeof tracksData === 'object') {
					const allVinylTracks = Object.values(tracksData).flat() as string[];
					isMatch = allVinylTracks.some(t => t === track.id);
				}

				if (isMatch) {
					matchingAlbumTitle = album.title;
					releaseDate = album.releaseDate;
				}
			});
		});

		return { ...track, albumTitle: matchingAlbumTitle, releaseDate };
	});

	const sortedTracks = [...allTracks].sort((a, b) => {
		switch (sortType) {
			case 'latest':
				return b.releaseDate.localeCompare(a.releaseDate);
			case 'release':
				return a.releaseDate.localeCompare(b.releaseDate);
			case 'alphabet':
				return a.title.localeCompare(b.title, 'ko');
			default:
				return 0;
		}
	});

	return (
		<>
			<S.SortTabGroup>
				<S.SortTabItem $isActive={sortType === 'latest'} onClick={() => setSortType('latest')}>
					최신순
				</S.SortTabItem>
				<S.SortTabItem $isActive={sortType === 'release'} onClick={() => setSortType('release')}>
					발매순
				</S.SortTabItem>
				<S.SortTabItem $isActive={sortType === 'alphabet'} onClick={() => setSortType('alphabet')}>
					가나다순
				</S.SortTabItem>
			</S.SortTabGroup>

			<S.TrackContainer>
				{sortedTracks.map((track, index) => (
					<S.TrackItem key={`${track.id}-${index}`}>
						<S.TrackNumber>{String(index + 1).padStart(2, '0')}</S.TrackNumber>
						<S.TrackInfo>
							<S.TrackTitle>
								{track.title}
								{track.version && ` ${track.version}`}
								{track.isLead && <S.LeadBadge>TITLE</S.LeadBadge>}
							</S.TrackTitle>

							<S.AlbumName>{track.albumTitle}</S.AlbumName>
						</S.TrackInfo>
					</S.TrackItem>
				))}
			</S.TrackContainer>
		</>
	);
};

export default Song;
