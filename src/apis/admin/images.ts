// @/apis/admin/images
// 앨범 커버·공연 포스터를 Supabase Storage(공개 버킷 images)에 올린다. 올리기 권한은 관리자 세션(RLS)이 정한다.
// 파일은 webp 로 바꿔 올리고, 경로는 사이트가 쓰는 파일명 규칙(albums/LP_2026_her.webp)을 따른다.

import { STORAGE_BUCKET } from '@/apis/content/mappers';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';
import type { TableConfig } from '@/views/Admin/admin-tables';
import type { TableRow } from '@/views/Admin/form-codec';

const MAX_LONG_SIDE = 1200; // 카드·포스터는 이보다 크게 보이지 않으므로 이보다 큰 사진은 줄여서 올린다
const WEBP_QUALITY = 0.8;
const CACHE_SECONDS = '86400'; // 같은 경로를 다시 올릴 수 있으므로 하루만 저장해 둔다.

const toWebp = async (file: File): Promise<Blob> => {
	const bitmap = await createImageBitmap(file);
	const scale = Math.min(1, MAX_LONG_SIDE / Math.max(bitmap.width, bitmap.height));
	const canvas = document.createElement('canvas');
	canvas.width = Math.round(bitmap.width * scale);
	canvas.height = Math.round(bitmap.height * scale);
	canvas.getContext('2d')?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
	bitmap.close();

	const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, 'image/webp', WEBP_QUALITY));
	if (!blob) throw new Error('이미지를 webp 로 바꾸지 못했습니다. 다른 파일로 시도하십시오.');
	return blob;
};

export const uploadImage = async (objectPath: string, file: File): Promise<void> => {
	const blob = await toWebp(file);
	const { error } = await getSupabaseBrowserClient()
		.storage.from(STORAGE_BUCKET)
		.upload(objectPath, blob, { upsert: true, contentType: 'image/webp', cacheControl: CACHE_SECONDS });
	if (error) {
		const hint = /bucket/i.test(error.message) ? ' (Storage 마이그레이션이 적용됐는지 확인하십시오.)' : '';
		throw new Error(`이미지를 올리지 못했습니다: ${error.message}${hint}`);
	}
};

/** 등록이 실패했을 때 방금 올린 파일을 지우는 용도. 지우지 못해도 등록 실패 오류를 가리지 않도록 삼킨다. */
export const removeImages = async (objectPaths: string[]): Promise<void> => {
	if (objectPaths.length === 0) return;
	await getSupabaseBrowserClient().storage.from(STORAGE_BUCKET).remove(objectPaths);
};

export const getImageUrl = (objectPath: string): string =>
	getSupabaseBrowserClient().storage.from(STORAGE_BUCKET).getPublicUrl(objectPath).data.publicUrl;

/**
 * 이미지가 저장될 경로(예: albums/LP_2026_her.webp). 파일명에 쓰는 값(영어 이름)이 비어 있으면 resolveImageKey 로 채운 값을 쓴다.
 * 어떤 파일을 골랐는지는 상관없이 항상 사이트 규칙의 이름이 된다.
 */
export const getImageTargetPath = (config: TableConfig, values: TableRow, row: TableRow | null): string => {
	if (!config.imageTarget) throw new Error(`${config.label}에는 이미지를 올릴 수 없습니다.`);
	const filled =
		config.resolveImageKey && !values.image_key
			? { ...values, image_key: config.resolveImageKey(values, row) }
			: values;
	return config.imageTarget(filled, row);
};

/**
 * 폼에서 고른 이미지 파일을 올리고, 그 경로를 저장할 값(values)에 채운다. 올린 경로 목록을 돌려준다.
 * 파일을 고르지 않은 이미지 필드는 건드리지 않는다.
 */
export const uploadFieldImages = async (
	config: TableConfig,
	values: TableRow,
	row: TableRow | null,
	files: Record<string, File>,
): Promise<string[]> => {
	const uploaded: string[] = [];
	try {
		for (const field of config.fields) {
			const file = files[field.name];
			if (field.kind !== 'image' || !file) continue;
			if (config.resolveImageKey && !values.image_key) values.image_key = config.resolveImageKey(values, row);
			const objectPath = getImageTargetPath(config, values, row);
			await uploadImage(objectPath, file);
			values[field.name] = objectPath;
			uploaded.push(objectPath);
		}
	} catch (error) {
		await removeImages(uploaded).catch(() => undefined);
		throw error;
	}
	return uploaded;
};
