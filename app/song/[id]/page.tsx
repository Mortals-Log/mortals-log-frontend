import type { Metadata } from 'next';
import { FULL_ALBUMS } from '@const/albums';
import { MASTER_TRACKS } from '@const/tracks';
import { GetAlbumPaths } from '@utils/album';
import { IsTrackMatch, GetTrackSlug } from '@utils/track';
import { METADATA } from '@const/contents';
import SongDetail from '@pages/Song/SongDetail';

export const generateStaticParams = () => {
	return Object.values(MASTER_TRACKS).map(track => ({
		id: GetTrackSlug(track),
	}));
};

const findTrackAndAlbum = (id: string) => {
	const track = Object.values(MASTER_TRACKS).find(t => IsTrackMatch(t, id));
	if (!track) return { track: null, albumInfo: null };

	const albumInfo = FULL_ALBUMS.flatMap(cat => cat.items).find(album => {
		const tracksData = album.tracks;
		const flatTracks = Array.isArray(tracksData) ? tracksData : Object.values(tracksData || {}).flat();

		return (flatTracks as string[]).some(t => {
			const pattern = t.replace('*', '');
			return track.id.startsWith(pattern);
		});
	});

	return { track, albumInfo: albumInfo || null };
};

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
	const { id } = await params;
	const { track, albumInfo } = findTrackAndAlbum(id);

	if (!track) {
		return { title: METADATA.NAME, description: METADATA.DESCRIPTION };
	}

	const image = albumInfo ? GetAlbumPaths(albumInfo).imageSrc : undefined;

	return {
		title: `${METADATA.NAME} | ${track.title}`,
		description: `${track.title} 곡의 정보를 확인하세요.`,
		openGraph: { images: image ? [image] : undefined, type: 'music.song' },
	};
};

const Page = () => <SongDetail />;

export default Page;
