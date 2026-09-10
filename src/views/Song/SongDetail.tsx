'use client';

// @/views/Song/SongDetail

import { useMemo } from 'react';
import { useParams } from 'next/navigation';
import { FULL_ALBUMS } from '@/const/albums';
import { MASTER_TRACKS } from '@/const/tracks';
import BackButton from '@/components/BackButton';
import Placeholder from '@/components/Placeholder';
import SongDetailHeader from '@/views/Song/SongDetailHeader';
import SongDetailMeta from '@/views/Song/SongDetailMeta';
import SongDetailContent from '@/views/Song/SongDetailContent';
import { IsTrackMatch } from '@/utils/track';
import { LAYOUT_MAIN, LAYOUT_MAIN_TITLE } from '@/const/layout-classes';

const SongDetail = () => {
	const { id } = useParams<{ id: string }>();

	const { track, albumInfo } = useMemo(() => {
		if (!id) return { track: null, albumInfo: null };

		const currentTrack = Object.values(MASTER_TRACKS).find(t => IsTrackMatch(t, id));
		if (!currentTrack) return { track: null, albumInfo: null };

		const foundAlbum = FULL_ALBUMS.flatMap(cat => cat.items).find(album => {
			const tracksData = album.tracks;
			const flatTracks = Array.isArray(tracksData) ? tracksData : Object.values(tracksData || {}).flat();

			return (flatTracks as string[]).some(t => {
				const pattern = t.replace('*', '');
				return currentTrack.id.startsWith(pattern);
			});
		});

		return { track: currentTrack, albumInfo: foundAlbum || null };
	}, [id]);

	if (!track) {
		return (
			<main className={LAYOUT_MAIN}>
				<BackButton to="/music" />
				<div className={LAYOUT_MAIN_TITLE}>Song Not Found</div>

				<Placeholder message="곡을 찾을 수 없습니다." />
			</main>
		);
	}

	return (
		<main className={LAYOUT_MAIN}>
			<BackButton />

			<SongDetailHeader track={track} albumInfo={albumInfo} />
			<SongDetailMeta track={track} albumInfo={albumInfo} />
			<SongDetailContent track={track} />
		</main>
	);
};

export default SongDetail;
