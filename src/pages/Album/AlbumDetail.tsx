// @src/pages/Album/AlbumDetail

import * as S from '@styles/pages/Album/AlbumDetail.style';
import { useParams, useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { GET_FULL_ALBUMS } from '@const/albums';
import AlbumDetailTracks from '@pages/Album/AlbumDetailTracks';
import AlbumDetailMetaInfo from '@pages/Album//AlbumDetailMetaInfo';
import AlbumDetailIntro from '@pages/Album/AlbumDetailIntro';
import { IsAlbumMatch } from '@/utils/album';

const SECTION_TITLE = {
	TRACKS: {
		TITLE_KR: '수록곡',
		TITLE_EN: 'Tracks',
	},

	INTRO: {
		TITLE_KR: '앨범 소개',
		TITLE_EN: 'Album Introduction ',
	},
} as const;

const AlbumDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();

	const albumData = useMemo(() => {
		if (!id) return null;

		return GET_FULL_ALBUMS()
			.flatMap(group => group.items)
			.find(album => IsAlbumMatch(album, id));
	}, [id]);

	if (!albumData) {
		return (
			<S.MainContainer>
				<S.BackButton onClick={() => navigate('/album')}>GO TO ALBUM LIST</S.BackButton>
				<S.MainTitle>Album Not Found</S.MainTitle>

				<S.Placeholder>앨범을 찾을 수 없습니다.</S.Placeholder>
			</S.MainContainer>
		);
	}

	return (
		<S.MainContainer>
			<S.BackButton onClick={() => navigate(-1)}>BACK TO PAGE</S.BackButton>

			<AlbumDetailMetaInfo album={albumData} />

			<AlbumDetailTracks {...SECTION_TITLE.TRACKS} albumData={albumData} />
			<AlbumDetailIntro {...SECTION_TITLE.INTRO} albumData={albumData} />
		</S.MainContainer>
	);
};

export default AlbumDetail;
