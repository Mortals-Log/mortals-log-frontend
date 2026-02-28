// @src/pages/Album/AlbumDetail

import * as S from '@styles/pages/AlbumDetail/AlbumDetail.style';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo } from 'react';
import { ALBUM_TYPE_LABEL, GET_FULL_ALBUMS } from '@const/albums';
import AlbumDetailTracks from '@/pages/AlbumDetail/AlbumDetailTracks';
import AlbumDetailMetaInfo from '@/pages/AlbumDetail/AlbumDetailMetaInfo';
import AlbumDetailIntro from '@/pages/AlbumDetail/AlbumDetailIntro';
import { METADATA } from '@/const/contents';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/Placeholder';
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

export const ALL_ALBUMS_FLAT = GET_FULL_ALBUMS().flatMap(group => group.items);

const AlbumDetail = () => {
	const { id } = useParams<{ id: string }>();

	const albumData = useMemo(() => {
		if (!id) return null;
		return ALL_ALBUMS_FLAT.find(album => IsAlbumMatch(album, id));
	}, [id]);

	useEffect(() => {
		if (albumData?.title) {
			document.title = `${ALBUM_TYPE_LABEL[albumData.type]} | ${albumData.title}`;
		}
		return () => {
			document.title = METADATA.NAME;
		};
	}, [albumData]);

	if (!albumData) {
		return (
			<S.MainContainer>
				<BackButton to="/music" />
				<S.MainTitle>Album Not Found</S.MainTitle>

				<Placeholder message="앨범을 찾을 수 없습니다." />
			</S.MainContainer>
		);
	}

	return (
		<S.MainContainer>
			<BackButton />

			<AlbumDetailMetaInfo album={albumData} />

			<AlbumDetailTracks {...SECTION_TITLE.TRACKS} albumData={albumData} />
			<AlbumDetailIntro {...SECTION_TITLE.INTRO} albumData={albumData} />
		</S.MainContainer>
	);
};

export default AlbumDetail;
