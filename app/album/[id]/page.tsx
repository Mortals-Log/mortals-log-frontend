import type { Metadata } from 'next';
import { GET_FULL_ALBUMS } from '@const/albums';
import { GetAlbumPaths, IsAlbumMatch } from '@utils/album';
import { GetSlug } from '@utils/urlSlug';
import { METADATA } from '@const/contents';
import AlbumDetail from '@pages/AlbumDetail';

const ALL_ALBUMS_FLAT = GET_FULL_ALBUMS().flatMap(group => group.items);

export const generateStaticParams = () => {
	return ALL_ALBUMS_FLAT.map(album => ({ id: GetSlug(album.title) }));
};

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
	const { id } = await params;
	const album = ALL_ALBUMS_FLAT.find(item => IsAlbumMatch(item, id));

	if (!album) {
		return { title: METADATA.NAME, description: METADATA.DESCRIPTION };
	}

	const { imageSrc } = GetAlbumPaths(album);

	return {
		title: `${METADATA.NAME} | ${album.title}`,
		description: `${album.title} 앨범의 수록곡과 소개 정보를 확인하세요.`,
		openGraph: { images: [imageSrc], type: 'music.album' },
	};
};

const Page = () => <AlbumDetail />;

export default Page;
