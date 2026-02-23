// @src/pages/Song/index

import * as S from '@styles/pages/Song/Song.styles';

import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MASTER_TRACKS } from '@/const/tracks';
import { FULL_ALBUMS } from '@/const/albums';

type SortType = 'latest' | 'release' | 'alphabet';

const trackToAlbumMap = new Map();
const allMasterTrackIds = Object.keys(MASTER_TRACKS);

FULL_ALBUMS.forEach(category => {
	category.items.forEach(album => {
		const { tracks: tracksData, title, releaseDate } = album;
		const albumInfo = { albumTitle: title, releaseDate };

		if (Array.isArray(tracksData)) {
			tracksData.forEach(t => {
				if (t.includes('*')) {
					const pattern = t.replace('*', '');
					allMasterTrackIds
						.filter(id => id.startsWith(pattern))
						.forEach(id => {
							if (!trackToAlbumMap.has(id)) trackToAlbumMap.set(id, albumInfo);
						});
				} else {
					if (!trackToAlbumMap.has(t)) trackToAlbumMap.set(t, albumInfo);
				}
			});
		} else if (tracksData && typeof tracksData === 'object') {
			const allVinylTracks = Object.values(tracksData).flat() as string[];
			allVinylTracks.forEach(id => {
				if (!trackToAlbumMap.has(id)) trackToAlbumMap.set(id, albumInfo);
			});
		}
	});
});

const Song = () => {
	const navigate = useNavigate();
	const [sortType, setSortType] = useState<SortType>('latest');

	const sortedTracks = useMemo(() => {
		const allTracks = Object.values(MASTER_TRACKS).map(track => {
			const albumInfo = trackToAlbumMap.get(track.id) || {
				albumTitle: 'Unknown Album',
				releaseDate: '0000.00.00',
			};
			return { ...track, ...albumInfo };
		});

		return allTracks.sort((a, b) => {
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
	}, [sortType]);

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
					<S.TrackItem key={`${track.id}-${index}`} onClick={() => navigate(`/song/${track.id}`)}>
						<S.TrackNumber>{String(index + 1).padStart(2, '0')}</S.TrackNumber>
						<S.TrackInfo>
							<S.TrackTitle>
								<span className="title-text">
									{track.title}
									{track.version && ` (${track.version})`}
								</span>

								<S.BadgeGroup>
									{track.isLead && <S.LeadBadge>{S.BADGE_LABEL.TITLE}</S.LeadBadge>}
									{track.mvLink && <S.MVBadge>{S.BADGE_LABEL.MV}</S.MVBadge>}
									{track.chordsList && track.chordsList.length > 0 && (
										<S.ChordBadge>{S.BADGE_LABEL.CHORDS}</S.ChordBadge>
									)}
									{track.ageLimit && <S.AdultBadge>{S.BADGE_LABEL.ADULT}</S.AdultBadge>}
									{track.singing?.tj && (
										<S.SingingBadge brand="TJ">
											{S.BADGE_LABEL.TJ} {track.singing.tj}
										</S.SingingBadge>
									)}
									{track.singing?.ky && (
										<S.SingingBadge brand="KY">
											{S.BADGE_LABEL.KY} {track.singing.ky}
										</S.SingingBadge>
									)}
								</S.BadgeGroup>
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
