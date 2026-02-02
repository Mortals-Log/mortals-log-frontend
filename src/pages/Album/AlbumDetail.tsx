// @src/pages/Album/AlbumDetail

import * as S from '@styles/pages/Album/AlbumDetail.style';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_FULL_ALBUMS } from '@const/albums';
import AlbumDetailTracks from './AlbumDetailTracks';
import AlbumDetailMetaInfo from './AlbumDetailMetaInfo';
import { useMemo } from 'react';

const SECTION_TITLE = {
	TRACKS: {
		TITLE_KR: '수록곡',
		TITLE_EN: 'Tracks',
	},
} as const;

const AlbumDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const albumData = useMemo(() => {
		if (!id) return null;

		const decodedSlug = decodeURIComponent(id);
		const slugWithSpaces = decodedSlug.replace(/-/g, ' ').toLowerCase();

		return GET_FULL_ALBUMS()
			.flatMap(group => group.items)
			.find(album => album.title.toLowerCase() === slugWithSpaces);
	}, [id]);

	const hasTracks = useMemo(() => {
		if (!albumData?.tracks) return false;

		if (Array.isArray(albumData.tracks)) {
			return albumData.tracks.length > 0;
		}

		return Object.keys(albumData.tracks).length > 0;
	}, [albumData]);

	if (!albumData) {
		return (
			<S.MainContainer>
				<S.BackButton onClick={() => navigate('/album')}>GO TO ALBUM LIST</S.BackButton>
				<S.MainTitle>Album Not Found</S.MainTitle>

				<S.Placeholder>
					<p>앨범을 찾을 수 없습니다.</p>
				</S.Placeholder>
			</S.MainContainer>
		);
	}

	return (
		<S.MainContainer>
			<S.BackButton onClick={() => navigate(-1)}>BACK TO PAGE</S.BackButton>

			<AlbumDetailMetaInfo album={albumData} />

			{hasTracks ? (
				<AlbumDetailTracks {...SECTION_TITLE.TRACKS} albumData={albumData} />
			) : (
				<S.Placeholder>수록곡 리스트와 가사 등의 정보가 업데이트될 예정입니다.</S.Placeholder>
			)}
		</S.MainContainer>
	);
};

export default AlbumDetail;
