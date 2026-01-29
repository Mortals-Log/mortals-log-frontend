// @src/pages/Album/AlbumDetail

import * as S from '@styles/pages/Album/AlbumDetail.style';
import { useParams, useNavigate } from 'react-router-dom';
import { GET_FULL_ALBUMS, ALBUM_TYPE_LABEL } from '@const/albums';

const AlbumDetail = () => {
	const navigate = useNavigate();
	const { id } = useParams<{ id: string }>();
	const decodedSlug = decodeURIComponent(id || '');

	const allAlbums = GET_FULL_ALBUMS().flatMap(group => group.items);
	const albumData = allAlbums.find(album => {
		const slugWithSpaces = decodedSlug.replace(/-/g, ' ');
		return album.title === slugWithSpaces;
	});

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

			<S.TitleSection>
				<S.TypeWrap>
					<S.AlbumId>{ALBUM_TYPE_LABEL[albumData.type]}</S.AlbumId>
					{albumData.volume && <S.VolText>정규 {albumData.volume}집</S.VolText>}
				</S.TypeWrap>
				<S.MainTitle>{albumData.title}</S.MainTitle>
				<S.DateText>{albumData.releaseDate}</S.DateText>
			</S.TitleSection>

			<S.Placeholder>
				<p>수록곡 리스트와 가사 등의 정보는 데이터 준비 후 업데이트될 예정입니다.</p>
			</S.Placeholder>
		</S.MainContainer>
	);
};

export default AlbumDetail;
