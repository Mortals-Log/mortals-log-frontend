// @/pages/Song/SongDetail

import * as S from '@styles/pages/Song/SongDetail.styles';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { FULL_ALBUMS } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';
import { METADATA } from '@/const/contents';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/Placeholder';
import SongDetailHeader from '@/pages/Song/SongDetailHeader';
import SongDetailMeta from '@/pages/Song/SongDetailMeta';
import SongDetailContent from '@/pages/Song/SongDetailContent';

const SongDetail = () => {
	const { id } = useParams<{ id: string }>();

	const { track, albumInfo } = useMemo(() => {
		const currentTrack = id ? MASTER_TRACKS[id as keyof typeof MASTER_TRACKS] : null;
		if (!currentTrack) return { track: null, albumInfo: null };

		const foundAlbum = FULL_ALBUMS.flatMap(cat => cat.items).find(album => {
			const tracksData = album.tracks;

			const flatTracks = Array.isArray(tracksData) ? tracksData : Object.values(tracksData || {}).flat();

			return (flatTracks as string[]).some(t => {
				const pattern = t.replace('*', '');
				return currentTrack.id.startsWith(pattern);
			});
		});

		const albumMeta = foundAlbum;

		return { track: currentTrack, albumInfo: albumMeta };
	}, [id]);

	useEffect(() => {
		if (track?.title) {
			document.title = `${track.title}`;
		}
		return () => {
			document.title = METADATA.NAME;
		};
	}, [track]);

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

			<SongDetailHeader track={track} albumInfo={albumInfo} />
			<SongDetailMeta track={track} albumInfo={albumInfo} />
			<SongDetailContent track={track} />
		</S.MainContainer>
	);
};

export default SongDetail;
