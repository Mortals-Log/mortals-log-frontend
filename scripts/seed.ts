// scripts/seed
// src/const/fixtures 의 정적 데이터를 Supabase 에 넣는다. (새 DB 를 처음 채울 때 쓴다)
//
//   pnpm tsx scripts/seed.ts                  변환 + 무결성 검사만 (DB 접근 없음)
//   pnpm tsx scripts/seed.ts --apply          비어 있는 테이블에 삽입
//   pnpm tsx scripts/seed.ts --apply --force  기존 콘텐츠를 모두 지우고 다시 삽입
//
// 필요한 환경변수(.env.local): NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// service_role 키는 RLS 를 우회하므로 서버/스크립트에서만 쓰고 커밋하지 않는다.

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { ContentRows } from '@/types/content-row';
import { buildRows } from './seed-rows';

const CHUNK_SIZE = 50;

// 외래키 순서대로 나열: 앞쪽이 부모. 삽입은 이 순서로 한다.
const TABLE_NAMES = [
	'albums',
	'album_links',
	'tracks',
	'track_origins',
	'track_chords',
	'concerts',
	'media_appearances',
] as const;
type TableName = (typeof TABLE_NAMES)[number];
type TableCounts = Record<TableName, number>;

const getRowsByTable = (rows: ContentRows): Record<TableName, object[]> => ({
	albums: rows.albums,
	album_links: rows.albumLinks,
	tracks: rows.tracks,
	track_origins: rows.trackOrigins,
	track_chords: rows.trackChords,
	concerts: rows.concerts,
	media_appearances: rows.mediaAppearances,
});

const getExpectedCounts = (rows: ContentRows): TableCounts => {
	const rowsByTable = getRowsByTable(rows);
	return Object.fromEntries(TABLE_NAMES.map(tableName => [tableName, rowsByTable[tableName].length])) as TableCounts;
};

const formatCounts = (counts: TableCounts): string =>
	TABLE_NAMES.map(tableName => `${tableName} ${counts[tableName]}`).join(' / ');

const loadLocalEnv = () => {
	try {
		process.loadEnvFile('.env.local');
	} catch (error) {
		// 파일이 없으면 셸에 설정된 환경변수만 쓴다. 그 외의 오류는 그대로 올린다.
		if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error;
	}
};

const getRequiredEnv = (name: string): string => {
	const value = process.env[name];
	if (!value) throw new Error(`환경변수 ${name} 가 없습니다. .env.local 에 설정하세요.`);
	return value;
};

const countRemoteRows = async (supabase: SupabaseClient): Promise<TableCounts> => {
	const counts: Partial<TableCounts> = {};

	for (const tableName of TABLE_NAMES) {
		// head 요청은 응답 본문이 없어 error.message 가 비므로 HTTP 상태를 함께 보여준다.
		const { count, error, status } = await supabase.from(tableName).select('*', { count: 'exact', head: true });
		if (error) {
			const keyHint =
				status === 401 ? '\nSUPABASE_SERVICE_ROLE_KEY 가 올바른 service_role(secret) 키인지 확인하세요.' : '';
			throw new Error(`${tableName} 조회 실패 (HTTP ${status}): ${error.message}${keyHint}`);
		}
		counts[tableName] = count ?? 0;
	}

	return counts as TableCounts;
};

// [테이블, 전체 삭제용 필터 컬럼]. track_origins.original_track_id 가 on delete restrict 라서
// 곡이 지워지기 전에 원곡 관계부터 지운다. albums 를 지우면 tracks, track_chords, album_links 는 cascade 로 지워진다.
const DELETE_STEPS = [
	['track_origins', 'track_id'],
	['albums', 'id'],
	['concerts', 'id'],
	['media_appearances', 'id'],
] as const;

const deleteAllContent = async (supabase: SupabaseClient) => {
	for (const [tableName, keyColumn] of DELETE_STEPS) {
		const { error } = await supabase.from(tableName).delete().not(keyColumn, 'is', null);
		if (error) throw new Error(`${tableName} 삭제 실패: ${error.message}`);
	}
};

const insertInChunks = async (supabase: SupabaseClient, tableName: TableName, rows: object[]) => {
	for (let start = 0; start < rows.length; start += CHUNK_SIZE) {
		const { error } = await supabase.from(tableName).insert(rows.slice(start, start + CHUNK_SIZE));
		if (error) throw new Error(`${tableName} 삽입 실패 (${start}번째 행부터): ${error.message}`);
	}
	console.info(`  ${tableName}: ${rows.length}건 삽입`);
};

const main = async () => {
	const rows = buildRows();
	const expectedCounts = getExpectedCounts(rows);
	console.info(`변환 + 무결성 검사 통과: ${formatCounts(expectedCounts)}`);

	if (!process.argv.includes('--apply')) {
		console.info('dry-run 입니다. Supabase 에 반영하려면 --apply 를 붙이세요.');
		return;
	}

	loadLocalEnv();
	const supabaseUrl = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL');
	const supabase = createClient(supabaseUrl, getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY'), {
		auth: { persistSession: false, autoRefreshToken: false },
	});
	console.info(`대상: ${new URL(supabaseUrl).host}`);

	const existingCounts = await countRemoteRows(supabase);
	const hasExistingContent = TABLE_NAMES.some(tableName => existingCounts[tableName] > 0);

	if (hasExistingContent && !process.argv.includes('--force')) {
		throw new Error(
			`이미 데이터가 있어 중단합니다 (${formatCounts(existingCounts)}).\n` +
				'관리자 페이지에서 수정한 내용이 사라질 수 있습니다. 전부 교체하려면 --force 를 붙이세요.',
		);
	}

	if (hasExistingContent) {
		await deleteAllContent(supabase);
		console.info('기존 콘텐츠를 삭제했습니다.');
	}

	const rowsByTable = getRowsByTable(rows);
	for (const tableName of TABLE_NAMES) {
		await insertInChunks(supabase, tableName, rowsByTable[tableName]);
	}

	const finalCounts = await countRemoteRows(supabase);
	const mismatchedTables = TABLE_NAMES.filter(tableName => finalCounts[tableName] !== expectedCounts[tableName]);
	if (mismatchedTables.length > 0) {
		throw new Error(`삽입 후 건수가 다릅니다 (${mismatchedTables.join(', ')}): ${formatCounts(finalCounts)}`);
	}

	console.info(`완료: ${formatCounts(finalCounts)}`);
};

main().catch((error: unknown) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
