// @hooks/useImageFallback.ts

import { useCallback } from 'react';

const useImageFallback = (fallbackSrc: string = '/images/default.webp') => {
	const handleImgError = useCallback(
		(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
			const target = e.currentTarget;
			if (target.src !== window.location.origin + fallbackSrc) {
				target.src = fallbackSrc;
			}
		},
		[fallbackSrc],
	);

	return handleImgError;
};

export default useImageFallback;
