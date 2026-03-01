// @/hooks/useTrackNavigation.ts

import { useNavigate } from 'react-router-dom';
import { Track } from '@/types/track';

export const UseTrackNavigation = () => {
	const navigate = useNavigate();

	const handleItemClick = (track: Track) => {
		if (!track) return;

		let slug = track.title;

		if (track.id.startsWith('TRK_LV')) {
			const hasLiveTag = track.version?.toLowerCase().includes('live');

			if (!hasLiveTag) {
				slug = `${track.title}_Live`;
			} else if (track.version) {
				slug = `${track.title}_${track.version}`;
			}
		} else if (track.version) {
			slug = `${track.title}_${track.version}`;
		}

		navigate(`/song/${encodeURIComponent(slug)}`);
	};

	const handleKeyDown = (e: React.KeyboardEvent, track: Track) => {
		if (e.key === 'Enter') handleItemClick(track);
	};

	return { handleItemClick, handleKeyDown };
};

export default UseTrackNavigation;
