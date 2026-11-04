'use client';

// @/views/Admin/FormFields
// 필드 설정(TableConfig)대로 폼 본문을 그린다. 행 한 건을 고치는 폼과 앨범 화면의 앨범 정보 부분이 함께 쓴다.
// 새로 만들 때는 config.onFieldChange 가 다른 필드를 채워 준다 (예: 정규를 고르면 다음 집 번호).
// 수정 화면에서 바꿀 수 없는 필드(앨범 ID, 코드의 곡 ...)는 선택 상자 대신 글자로 보여준다.

import { getImageTargetPath, getImageUrl } from '@/apis/admin/images';
import { cn } from '@/utils/cn';
import type { FieldConfig, FieldKind, TableConfig } from './admin-tables';
import { useAdminLookups } from './AdminLookups';
import { FieldInput, ImageInput } from './FieldInput';
import { toRowValues, type FormValue, type FormValues, type Lookups, type TableRow } from './form-codec';
import { getAlbumLabelById, getOptionLabel, getTrackLabelById } from './labels';

// 입력이 여러 개로 이루어져 하나의 <label> 로 묶을 수 없는 종류
const COMPOSITE_KINDS: FieldKind[] = [
	'select',
	'strings',
	'lineup',
	'originTracks',
	'chords',
	'price',
	'ticketing',
	'karaoke',
	'image',
];

const getStoredText = (value: FormValue | undefined): string => (typeof value === 'string' ? value : '');

const getLockedText = (field: FieldConfig, value: FormValue | undefined, lookups: Lookups): string => {
	const text = getStoredText(value);
	if (field.kind === 'ref') {
		return field.refTable === 'tracks'
			? getTrackLabelById(lookups.tracks, lookups.albums, text)
			: getAlbumLabelById(lookups.albums, text);
	}
	if (field.kind === 'select') return getOptionLabel(field.options ?? [], text);
	return text;
};

/** 올려 둔 이미지가 있으면 그 주소를, 없으면 사이트가 쓰는 public/ 파일 규칙의 주소를 미리보기로 쓴다. */
const getImagePreviewUrl = (
	config: TableConfig,
	field: FieldConfig,
	form: FormValues,
	row: TableRow | null,
	lookups: Lookups,
): string | null => {
	const storedPath = getStoredText(form[field.name]);
	if (storedPath) return getImageUrl(storedPath);
	if (!config.imageTarget) return null;
	try {
		const values = toRowValues(config, form, { isCreate: row === null, row, lookups });
		return `/images/${config.imageTarget(values, row)}`;
	} catch {
		// 영어 이름이나 날짜가 아직 비어 있으면 파일명을 만들 수 없다. 미리보기만 없을 뿐이다.
		return null;
	}
};

/** 고른 이미지가 저장될 이름 (예: albums/EP_2026_ep04.webp). 아직 만들 수 없으면 null. */
const getTargetName = (
	config: TableConfig,
	form: FormValues,
	row: TableRow | null,
	lookups: Lookups,
): string | null => {
	try {
		const values = toRowValues(config, form, { isCreate: row === null, row, lookups });
		return getImageTargetPath(config, values, row);
	} catch {
		return null;
	}
};

interface FormFieldsProps {
	config: TableConfig;
	form: FormValues;
	/** null: 새로 추가 */
	row: TableRow | null;
	isDisabled: boolean;
	/** 필드 이름 → 폴더에서 고른 이미지 파일 (저장할 때 올라간다) */
	files: Record<string, File>;
	onFormChange: (form: FormValues) => void;
	onFileChange: (fieldName: string, file: File | null) => void;
}

const FormFields = ({ config, form, row, isDisabled, files, onFormChange, onFileChange }: FormFieldsProps) => {
	const { lookups } = useAdminLookups();
	const isCreate = row === null;

	const handleChange = (name: string, value: FormValue) => {
		const patch = isCreate ? config.onFieldChange?.(name, value, form, { isCreate, lookups }) : undefined;
		const next: FormValues = { ...form, [name]: value };
		for (const [patchName, patchValue] of Object.entries(patch ?? {})) {
			if (patchValue !== undefined) next[patchName] = patchValue;
		}
		onFormChange(next);
	};

	return (
		<div className="flex flex-col gap-6">
			{config.fields.map(field => {
				if (isCreate && field.autoOnCreate) return null;
				if (field.showIf && !field.showIf(form, lookups)) return null;

				const isLocked =
					!isCreate && (config.keys.includes(field.name) || field.autoOnCreate === true || field.lockedOnEdit === true);
				const isFieldDisabled = isLocked || isDisabled;
				const labelText = (
					<>
						{field.label}
						{field.required && <span className="ml-1 text-pink-600">*</span>}
					</>
				);

				return (
					<div key={field.name} className="flex flex-col gap-2">
						{field.section && (
							<h3 className="mt-2 border-t border-gray-200 pt-6 text-base font-semibold text-gray-700">
								{field.section}
							</h3>
						)}

						{isLocked ? (
							<>
								<span className="text-base font-medium text-gray-700">{field.label}</span>
								<p className="break-words text-base text-gray-700">{getLockedText(field, form[field.name], lookups)}</p>
							</>
						) : field.kind === 'boolean' ? (
							<label className="flex items-center gap-3 text-base font-medium text-gray-700">
								<FieldInput
									field={field}
									value={form[field.name]}
									form={form}
									rowId={row ? String(row.id ?? '') : null}
									lookups={lookups}
									isDisabled={isFieldDisabled}
									onChange={value => handleChange(field.name, value)}
								/>
								{labelText}
							</label>
						) : (
							<>
								{COMPOSITE_KINDS.includes(field.kind) ? (
									<span className="text-base font-medium text-gray-700">{labelText}</span>
								) : (
									<label htmlFor={`field-${field.name}`} className="text-base font-medium text-gray-700">
										{labelText}
									</label>
								)}
								{field.kind === 'image' ? (
									<ImageInput
										previewUrl={getImagePreviewUrl(config, field, form, row, lookups)}
										targetName={files[field.name] ? getTargetName(config, form, row, lookups) : null}
										file={files[field.name] ?? null}
										isDisabled={isFieldDisabled}
										onFileChange={file => onFileChange(field.name, file)}
									/>
								) : (
									<FieldInput
										field={field}
										value={form[field.name]}
										form={form}
										rowId={row ? String(row.id ?? '') : null}
										lookups={lookups}
										isDisabled={isFieldDisabled}
										onChange={value => handleChange(field.name, value)}
									/>
								)}
							</>
						)}

						{isLocked && (
							<p className="text-sm text-gray-500">{field.lockedHint ?? '등록한 뒤에는 변경할 수 없는 항목입니다.'}</p>
						)}
						{field.hint && !isLocked && (
							<p className={cn('text-sm text-gray-500', field.kind === 'boolean' && !isLocked && 'pl-9')}>
								{field.hint}
							</p>
						)}
					</div>
				);
			})}
		</div>
	);
};

export default FormFields;
