// @pages/Song/SongDetail

import * as S from '@styles/pages/Song/SongDetail.styles';
import { useParams } from 'react-router-dom';
import { MASTER_TRACKS } from '@/const/tracks';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/placeholder';

const SongDetail = () => {
	const { id } = useParams<{ id: string }>();

	const track = id ? MASTER_TRACKS[id as keyof typeof MASTER_TRACKS] : null;

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
			<S.MainTitle>{track.title}</S.MainTitle>
		</S.MainContainer>
	);
};

export default SongDetail;
