// scripts/pull-content
// Supabase 의 콘텐츠를 읽어 src/generated/content.ts 스냅샷으로 저장한다. 빌드(pnpm build) 직전에 실행된다.
//
//   pnpm pull:content
//
// 필요한 환경변수(.env.local): NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
// - 공개(읽기 전용) 키만 쓴다. RLS 의 "누구나 읽기" 정책으로 충분하고 쓰기 권한은 필요 없다.
// - 환경변수가 없으면 커밋된 스냅샷을 그대로 쓰고 넘어간다.
//   단 Vercel 빌드(VERCEL=1)에서는 오래된 스냅샷이 조용히 배포되지 않도록 실패시킨다.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { createClient } from '@supabase/supabase-js';
import { fetchContentRows } from '@/apis/content/fetch-content-rows';
import { mapContentRows, type ContentData } from '@/apis/content/mappers';

const OUTPUT_PATH = resolve(process.cwd(), 'src/generated/content.ts');
const ROWS_OUTPUT_PATH = resolve(process.cwd(), 'src/generated/content-rows.json');

/** 내용이 달라졌을 때만 파일을 쓴다. 바뀌었으면 true. */
const writeIfChanged = (path: string, text: string): boolean => {
	const previous = existsSync(path) ? readFileSync(path, 'utf8') : null;
	if (previous === text) return false;
	mkdirSync(dirname(path), { recursive: true });
	writeFileSync(path, text);
	return true;
};

const loadLocalEnv = () => {
	try {
		process.loadEnvFile('.env.local');
	} catch (error) {
		// 파일이 없으면 셸/CI 에 설정된 환경변수만 쓴다. 그 외의 오류는 그대로 올린다.
		if (!(error instanceof Error && 'code' in error && error.code === 'ENOENT')) throw error;
	}
};

const renderSnapshot = (data: ContentData): string =>
	`// 자동 생성 파일입니다. 직접 수정하지 마세요.
// 원본: Supabase (관리자 페이지에서 수정). 갱신: pnpm pull:content (pnpm build 때 자동 실행)

import type { ContentData } from '@/apis/content/mappers';

export const CONTENT: ContentData = ${JSON.stringify(data, null, '\t')};
`;

const formatCounts = (data: ContentData): string =>
	[
		`albums ${data.albums.reduce((sum, group) => sum + group.items.length, 0)}`,
		`tracks ${Object.keys(data.tracks).length}`,
		`chords ${Object.keys(data.chords).length}`,
		`concerts ${data.concerts.reduce((sum, group) => sum + group.items.length, 0)}`,
		`events ${data.events.reduce((sum, group) => sum + group.items.length, 0)}`,
	].join(' / ');

const main = async () => {
	loadLocalEnv();
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

	if (!supabaseUrl || !publishableKey) {
		const message = 'NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 가 없습니다.';
		if (process.env.VERCEL) throw new Error(`${message} 오래된 스냅샷이 배포되지 않도록 빌드를 중단합니다.`);

		console.warn(`${message} 커밋된 스냅샷(src/generated/content.ts)을 그대로 사용합니다.`);
		return;
	}

	const supabase = createClient(supabaseUrl, publishableKey, {
		auth: { persistSession: false, autoRefreshToken: false },
	});
	const rows = await fetchContentRows(supabase);

	// RLS 설정 실수 등으로 빈 결과가 오면 빈 사이트를 배포하지 않도록 막는다.
	if (rows.albums.length === 0 || rows.tracks.length === 0) {
		throw new Error(
			`콘텐츠가 비어 있습니다 (albums ${rows.albums.length}, tracks ${rows.tracks.length}). RLS 읽기 정책과 키를 확인하세요.`,
		);
	}

	// 이미지는 Storage 의 공개 URL 로 바꿔 스냅샷에 담는다. (경로가 비어 있는 행은 기존 public/ 파일명 규칙을 그대로 쓴다)
	const data = mapContentRows(rows, { storageBaseUrl: supabaseUrl });
	const isSnapshotChanged = writeIfChanged(OUTPUT_PATH, renderSnapshot(data));
	// 지금 사이트가 어떤 데이터로 만들어졌는지 비교할 수 있도록 공개 행도 함께 저장한다.
	const isRowsChanged = writeIfChanged(ROWS_OUTPUT_PATH, `${JSON.stringify(rows)}\n`);

	console.info(
		isSnapshotChanged || isRowsChanged
			? `스냅샷 갱신 (${new URL(supabaseUrl).host}): ${formatCounts(data)}`
			: `스냅샷 변경 없음: ${formatCounts(data)}`,
	);
};

main().catch((error: unknown) => {
	console.error(error instanceof Error ? error.message : error);
	process.exit(1);
});
