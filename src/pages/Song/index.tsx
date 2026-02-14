// @src/pages/Song/index

import * as S from '@styles/pages/Song/Song.styles';
import { MASTER_TRACKS } from '@/const/tracks';
import { FULL_ALBUMS } from '@/const/albums';

const Song = () => {
	const allTracks = Object.values(MASTER_TRACKS).map(track => {
		let matchingAlbumTitle: string = '';

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
				}
			});
		});

		return {
			...track,
			albumTitle: matchingAlbumTitle,
		};
	});

	return (
		<S.TrackContainer>
			{allTracks.map((track, index) => (
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
	);
};

export default Song;
