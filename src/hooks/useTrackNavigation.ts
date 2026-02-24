// @/hooks/useTrackNavigation.ts

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const UseTrackNavigation = () => {
	const navigate = useNavigate();

	const handleItemClick = useCallback(
		(id: string) => {
			navigate(`/song/${id}`);
		},
		[navigate],
	);

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent, id: string) => {
			if (e.key === 'Enter') {
				navigate(`/song/${id}`);
			}
		},
		[navigate],
	);

	return { handleItemClick, handleKeyDown };
};

export default UseTrackNavigation;
