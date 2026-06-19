// @/pages/AlbumDetail

import * as S from '@styles/pages/AlbumDetail/AlbumDetail.style';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useSyncExternalStore } from 'react';
import { Album_Store } from '@const/albums';
import AlbumDetailTracks from '@/pages/AlbumDetail/AlbumDetailTracks';
import AlbumDetailMetaInfo from '@/pages/AlbumDetail/AlbumDetailMetaInfo';
import AlbumDetailIntro from '@/pages/AlbumDetail/AlbumDetailIntro';
import { METADATA } from '@/const/contents';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/Placeholder';
import { GetAlbumPaths, IsAlbumMatch } from '@/utils/album';
import { UpdateMetaTags } from '@/utils/meta';

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
	const { id } = useParams<{ id: string }>();

	const albumsSnapshot = useSyncExternalStore(Album_Store.subscribe, Album_Store.getSnapshot);

	const albumData = useMemo(() => {
		if (!id || !albumsSnapshot) return null;

		const allAlbumsFlat = albumsSnapshot.flatMap(group => group.items);

		return allAlbumsFlat.find(album => IsAlbumMatch(album, id));
	}, [id, albumsSnapshot]);

	useEffect(() => {
		if (!albumData) {
			UpdateMetaTags(METADATA.NAME, METADATA.DESCRIPTION, undefined, 'website');
			return;
		}

		const { imageSrc } = GetAlbumPaths(albumData);
		const pageTitle = `${METADATA.NAME} | ${albumData.title}`;
		const description = `${albumData.title} 앨범의 수록곡과 소개 정보를 확인하세요.`;

		UpdateMetaTags(pageTitle, description, imageSrc, 'music.album');

		return () => {
			UpdateMetaTags(METADATA.NAME, METADATA.DESCRIPTION, undefined, 'website');
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
