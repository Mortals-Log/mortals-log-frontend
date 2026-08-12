'use client';

// @/views/AlbumDetail

import * as S from '@styles/pages/AlbumDetail/AlbumDetail.style';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { GET_FULL_ALBUMS } from '@const/albums';
import AlbumDetailTracks from '@/views/AlbumDetail/AlbumDetailTracks';
import AlbumDetailMetaInfo from '@/views/AlbumDetail/AlbumDetailMetaInfo';
import AlbumDetailIntro from '@/views/AlbumDetail/AlbumDetailIntro';
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
