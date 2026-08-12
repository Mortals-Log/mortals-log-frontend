'use client';

// @/hooks/useTrackNavigation.ts

import { useRouter } from 'next/navigation';
import { Track } from '@/types/track';
import { GetTrackSlug } from '@/utils/track';

export const UseTrackNavigation = () => {
	const router = useRouter();

	const handleItemClick = (track: Track) => {
		if (!track) return;

		router.push(`/song/${encodeURIComponent(GetTrackSlug(track))}`);
	};

	const handleKeyDown = (e: React.KeyboardEvent, track: Track) => {
		if (e.key === 'Enter') handleItemClick(track);
	};

	return { handleItemClick, handleKeyDown };
};

export default UseTrackNavigation;
