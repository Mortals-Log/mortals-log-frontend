// @/apis/admin/table-rows
// 관리자 화면의 테이블 조회·추가·수정. 로그인한 관리자 세션으로 요청하므로 쓰기 권한은 RLS(public.is_admin())가 정한다.

import { getSupabaseBrowserClient } from '@/lib/supabase-browser';
import type { TableConfig } from '@/views/Admin/admin-tables';
import type { TableRow } from '@/views/Admin/form-codec';

export const fetchTableRows = async (
	config: Pick<TableConfig, 'table' | 'label' | 'orderBy'>,
	columns = '*',
): Promise<TableRow[]> => {
	let query = getSupabaseBrowserClient().from(config.table).select(columns);
	for (const { column, ascending = true } of config.orderBy) query = query.order(column, { ascending });

	const { data, error } = await query;
	if (error) throw new Error(`${config.label} 목록을 불러오지 못했습니다: ${error.message}`);
	return (data ?? []) as unknown as TableRow[];
};

/** 한 번의 요청으로 여러 행을 넣는다 (한 요청은 DB 에서 하나의 트랜잭션이라 전부 들어가거나 전부 실패한다). */
export const insertTableRows = async (config: TableConfig, rows: TableRow[]): Promise<void> => {
	const { data, error } = await getSupabaseBrowserClient().from(config.table).insert(rows).select();
	if (error) throw new Error(`저장하지 못했습니다: ${error.message}`);
	if (data?.length !== rows.length) throw new Error('저장되지 않았습니다. 관리자 권한을 확인하십시오.');
};

export const insertTableRow = (config: TableConfig, values: TableRow): Promise<void> =>
	insertTableRows(config, [values]);

const FOREIGN_KEY_MESSAGE =
	'다른 데이터가 이 항목을 참조하고 있어 삭제할 수 없습니다. 다른 곡의 원곡으로 쓰이고 있다면 그 곡의 원곡 설정을 먼저 바꾸십시오.';

/** 행 하나를 지운다. 지워진 행이 없으면(권한 없음 등) 오류로 알린다. 등록 도중 실패했을 때 되돌리는 용도로도 쓴다. */
export const deleteTableRow = async (config: TableConfig, row: TableRow): Promise<void> => {
	const keyValues = Object.fromEntries(config.keys.map(key => [key, row[key]]));
	const { data, error } = await getSupabaseBrowserClient().from(config.table).delete().match(keyValues).select();
	if (error) {
		if (error.code === '23503') throw new Error(FOREIGN_KEY_MESSAGE, { cause: error });
		throw new Error(`삭제하지 못했습니다: ${error.message}`);
	}
	if (!data?.length) throw new Error('삭제되지 않았습니다. 이미 지워졌거나 관리자 권한이 없습니다.');
};

/**
 * 곡의 원곡 목록을 폼에서 고른 대로 맞춘다 (고른 순서가 표시 순서). 빠진 원곡은 지우고, 나머지는 덮어쓴다.
 * 곡 저장과 별도 요청이라, 실패하면 곡은 저장됐지만 원곡 관계만 이전 상태로 남을 수 있다.
 */
export const replaceTrackOrigins = async (trackId: string, originalTrackIds: string[]): Promise<void> => {
	const client = getSupabaseBrowserClient();
	const uniqueIds = [...new Set(originalTrackIds)];
	if (uniqueIds.includes(trackId)) throw new Error('자기 자신을 원곡으로 고를 수 없습니다.');

	const { data: existing, error: readError } = await client
		.from('track_origins')
		.select('original_track_id')
		.eq('track_id', trackId);
	if (readError) throw new Error(`원곡 관계를 불러오지 못했습니다: ${readError.message}`);

	const removedIds = (existing ?? [])
		.map(row => String(row.original_track_id))
		.filter(originalId => !uniqueIds.includes(originalId));
	if (removedIds.length > 0) {
		const { error } = await client
			.from('track_origins')
			.delete()
			.eq('track_id', trackId)
			.in('original_track_id', removedIds);
		if (error) throw new Error(`원곡 관계를 지우지 못했습니다: ${error.message}`);
	}

	if (uniqueIds.length === 0) return;
	const rows = uniqueIds.map((originalId, index) => ({
		track_id: trackId,
		original_track_id: originalId,
		sort_order: index + 1,
	}));
	const { data, error } = await client
		.from('track_origins')
		.upsert(rows, { onConflict: 'track_id,original_track_id' })
		.select();
	if (error) throw new Error(`원곡 관계를 저장하지 못했습니다: ${error.message}`);
	if (data?.length !== rows.length) throw new Error('원곡 관계가 저장되지 않았습니다. 관리자 권한을 확인하십시오.');
};

export const updateTableRow = async (config: TableConfig, row: TableRow, values: TableRow): Promise<void> => {
	const keyValues = Object.fromEntries(config.keys.map(key => [key, row[key]]));
	const { data, error } = await getSupabaseBrowserClient().from(config.table).update(values).match(keyValues).select();
	if (error) throw new Error(`저장하지 못했습니다: ${error.message}`);
	// RLS 가 막은 수정은 오류 없이 0건으로 끝나므로 따로 확인한다.
	if (!data?.length) throw new Error('수정되지 않았습니다. 관리자 권한을 확인하십시오.');
};
