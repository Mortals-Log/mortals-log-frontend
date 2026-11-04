// @/hooks/admin/useAlbumChildren
// 앨범 수정 화면을 열 때 그 앨범의 링크와 수록곡을 읽어 온다. albumId 가 null(새 앨범)이면 읽지 않는다.

import { useEffect, useState } from 'react';
import { fetchAlbumChildren, type AlbumChildren } from '@/apis/admin/album-bundle';

interface LoadResult {
	albumId: string;
	children: AlbumChildren | null;
	errorMessage: string | null;
}

export const useAlbumChildren = (albumId: string | null) => {
	const [result, setResult] = useState<LoadResult | null>(null);

	useEffect(() => {
		if (albumId === null) return;
		let isCancelled = false;
		fetchAlbumChildren(albumId)
			.then((children): LoadResult => ({ albumId, children, errorMessage: null }))
			.catch((error: unknown): LoadResult => ({
				albumId,
				children: null,
				errorMessage: error instanceof Error ? error.message : '앨범 정보를 불러오지 못했습니다.',
			}))
			.then(next => {
				if (!isCancelled) setResult(next);
			});
		return () => {
			isCancelled = true;
		};
	}, [albumId]);

	const isCurrent = albumId !== null && result?.albumId === albumId;
	return {
		children: isCurrent ? result.children : null,
		errorMessage: isCurrent ? result.errorMessage : null,
		isLoading: albumId !== null && !isCurrent,
	};
};
