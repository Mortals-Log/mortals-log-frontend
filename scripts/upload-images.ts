// scripts/upload-images
// public/images 의 앨범 커버·콘서트 포스터를 Supabase Storage(버킷 images)에 올리고, DB 의 경로 컬럼을 채운다.
//
//   pnpm tsx scripts/upload-images.ts           계획만 출력 (업로드·수정 없음)
//   pnpm tsx scripts/upload-images.ts --apply   업로드 + DB 경로 갱신 (다시 실행해도 안전: 같은 경로는 덮어쓴다)
//
// 필요한 환경변수(.env.local): NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
// 올리는 경로는 앱이 지금 계산하는 파일명(GetAlbumPaths / GetConcertPaths)을 그대로 쓴다.
// 비공개 행도 처리해야 하므로 RLS 를 우회하는 service_role 키로 읽는다. 키는 커밋하지 않는다.

import { existsSync, readFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { mapAlbumRow, mapConcertRow, STORAGE_BUCKET } from '@/apis/content/mappers';
import type { AlbumRow, ConcertRow } from '@/types/content-row';
import { GetAlbumPaths } from '@/utils/album';
import { GetConcertPaths } from '@/utils/concert';

const PUBLIC_DIR = join(process.cwd(), 'public');
const CACHE_SECONDS = '31536000'; // 1년. 같은 경로의 이미지를 바꿀 때는 파일명을 바꾸는 것을 권장한다.

interface UploadItem {
	table: 'albums' | 'concerts';
	pathColumn: 'cover_image_path' | 'poster_image_path';
	id: string | number;
	label: string;
	localPath: string;
	objectPath: string;
}

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

const readRows = async <Row>(supabase: SupabaseClient, table: string): Promise<Row[]> => {
	const { data, error } = await supabase.from(table).select('*').order('id');
	if (error) throw new Error(`${table} 조회 실패: ${error.message}`);
	return (data ?? []) as Row[];
};

// 이미지 파일명이 없는 앨범(기본 이미지를 쓰는 경우)은 올릴 것이 없다.
const planAlbumUploads = (rows: AlbumRow[]): UploadItem[] =>
	rows
		.filter(row => row.image_key)
		.map(row => {
			const { imageSrc } = GetAlbumPaths(mapAlbumRow(row, [], []));
			return {
				table: 'albums' as const,
				pathColumn: 'cover_image_path' as const,
				id: row.id,
				label: `앨범 ${row.id} ${row.title}`,
				localPath: join(PUBLIC_DIR, imageSrc),
				objectPath: `albums/${basename(imageSrc)}`,
			};
		});

const planConcertUploads = (rows: (ConcertRow & { id: number })[]): UploadItem[] =>
	rows.map(row => {
		const { imageSrc } = GetConcertPaths(mapConcertRow(row), row.start_date.slice(0, 4));
		return {
			table: 'concerts' as const,
			pathColumn: 'poster_image_path' as const,
			id: row.id,
			label: `콘서트 ${row.start_date} ${row.title}`,
			localPath: join(PUBLIC_DIR, imageSrc),
			objectPath: `concerts/${basename(imageSrc)}`,
		};
	});

const upload = async (supabase: SupabaseClient, item: UploadItem) => {
	const { error: uploadError } = await supabase.storage
		.from(STORAGE_BUCKET)
		.upload(item.objectPath, readFileSync(item.localPath), {
			contentType: 'image/webp',
			cacheControl: CACHE_SECONDS,
			upsert: true,
		});
	if (uploadError) throw new Error(`${item.label} 업로드 실패: ${uploadError.message}`);

	const { error: updateError } = await supabase
		.from(item.table)
		.update({ [item.pathColumn]: item.objectPath })
		.eq('id', item.id);
	if (updateError) throw new Error(`${item.label} 경로 저장 실패: ${updateError.message}`);
};

const main = async () => {
	loadLocalEnv();
	const supabaseUrl = getRequiredEnv('NEXT_PUBLIC_SUPABASE_URL');
	const supabase = createClient(supabaseUrl, getRequiredEnv('SUPABASE_SERVICE_ROLE_KEY'), {
		auth: { persistSession: false, autoRefreshToken: false },
	});
	console.info(`대상: ${new URL(supabaseUrl).host} / 버킷: ${STORAGE_BUCKET}`);

	const { error: bucketError } = await supabase.storage.getBucket(STORAGE_BUCKET);
	if (bucketError) {
		throw new Error(
			`버킷 ${STORAGE_BUCKET} 를 찾을 수 없습니다 (${bucketError.message}). Storage 마이그레이션을 먼저 적용하세요.`,
		);
	}

	const plan = [
		...planAlbumUploads(await readRows<AlbumRow>(supabase, 'albums')),
		...planConcertUploads(await readRows<ConcertRow & { id: number }>(supabase, 'concerts')),
	];
	const uploadable = plan.filter(item => existsSync(item.localPath));
	const missing = plan.filter(item => !existsSync(item.localPath));

	console.info(`업로드 대상 ${uploadable.length}개 / 파일 없음 ${missing.length}개`);
	missing.forEach(item =>
		console.warn(`  파일 없음, 건너뜀: ${item.label} -> ${item.localPath.replace(process.cwd(), '.')}`),
	);

	if (!process.argv.includes('--apply')) {
		uploadable.forEach(item => console.info(`  [계획] ${item.objectPath}  <-  ${item.label}`));
		console.info('dry-run 입니다. 실제로 올리려면 --apply 를 붙이세요.');
		return;
	}

	for (const item of uploadable) {
		await upload(supabase, item);
		console.info(`  올림: ${item.objectPath}`);
	}
	console.info(`완료: ${uploadable.length}개 업로드, DB 경로 갱신`);
};

main().catch((error: unknown) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
