// @/hooks/admin/useTableRows
// 관리자 테이블의 행 목록을 불러온다. reload() 를 부르면 다시 불러오고, 그동안 이전 목록을 유지한다.

import { useCallback, useEffect, useState } from 'react';
import { fetchTableRows } from '@/apis/admin/table-rows';
import type { TableConfig } from '@/views/Admin/admin-tables';
import type { TableRow } from '@/views/Admin/form-codec';

interface LoadResult {
	requestKey: string;
	rows: TableRow[];
	errorMessage: string | null;
}

export const useTableRows = (config: TableConfig) => {
	const [reloadCount, setReloadCount] = useState(0);
	const [result, setResult] = useState<LoadResult | null>(null);
	const requestKey = `${config.table}:${reloadCount}`;

	useEffect(() => {
		let isCancelled = false;
		fetchTableRows(config)
			.then(rows => ({ rows, errorMessage: null }))
			.catch((error: unknown) => ({
				rows: [],
				errorMessage: error instanceof Error ? error.message : '목록을 불러오지 못했습니다.',
			}))
			.then(next => {
				if (!isCancelled) setResult({ requestKey, ...next });
			});
		return () => {
			isCancelled = true;
		};
	}, [config, requestKey]);

	const reload = useCallback(() => setReloadCount(count => count + 1), []);

	return {
		rows: result?.rows ?? [],
		errorMessage: result?.errorMessage ?? null,
		isLoading: result?.requestKey !== requestKey,
		reload,
	};
};
