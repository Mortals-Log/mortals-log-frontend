// @pages/Song/SongDetail

import * as S from '@styles/pages/Song/SongDetail.styles';
import { useParams } from 'react-router-dom';
import { FULL_ALBUMS } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/placeholder';
import SongDetailHeader from '@pages/Song/SongDetailHeader';
import SongDetailMeta from '@pages/Song/SongDetailMeta';
import SongDetailContent from '@pages/Song/SongDetailContent';

const SongDetail = () => {
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
