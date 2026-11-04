'use client';

// @/views/Admin/TableEditor
// 한 테이블의 목록 확인 · 검색 · 정렬 · 필터 · 추가 · 수정 · 삭제. 삭제는 되돌릴 수 없어서 확인을 받는다 (숨기기만 하려면 비공개로 바꾼다).
// 목록은 표가 아니라 카드로 보여줘서 모바일에서도 그대로 읽힌다.
// 앨범처럼 한 행을 여러 테이블과 함께 편집해야 하면 renderForm 으로 자기 폼을 끼워 넣는다.
// 작성 중인 내용은 "임시 저장"으로 공유할 수 있고, 목록 위에 모든 관리자의 임시 저장이 보인다.

import { useMemo, useState, type FormEvent, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { deleteDraft, type AdminDraft } from '@/apis/admin/drafts';
import { removeImages, uploadFieldImages } from '@/apis/admin/images';
import { deleteTableRow, insertTableRow, updateTableRow } from '@/apis/admin/table-rows';
import { useTableRows } from '@/hooks/admin/useTableRows';
import { useDebouncedValue } from '@/hooks/common/useDebouncedValue';
import { cn } from '@/utils/cn';
import {
	BADGE_CLASS,
	BADGE_TONE_CLASS,
	INPUT_CLASS,
	PRIMARY_BUTTON_CLASS,
	SECONDARY_BUTTON_CLASS,
	SMALL_BUTTON_CLASS,
} from './admin-classes';
import { ALBUMS, type TableConfig } from './admin-tables';
import { useAdminActions, useRegisterDraftSaver } from './AdminActions';
import { formatDraftTime, readDraftForm, useAdminDrafts, useDraftEditor } from './AdminDrafts';
import { useAdminLookups } from './AdminLookups';
import { ChipSelect } from './ComboInput';
import FormFields from './FormFields';
import { toFormValues, toRowValues, type FormValues, type Lookups, type TableRow } from './form-codec';
import { getTrackLabelById } from './labels';
import { getRowSummary, getSearchText } from './row-summaries';

const getMessage = (error: unknown, fallback: string) => (error instanceof Error ? error.message : fallback);

export interface EditorFormProps {
	/** null: 새로 추가 */
	row: TableRow | null;
	/** 임시 저장을 열어 이어서 작성하는 경우 (아니면 null) */
	draft: AdminDraft | null;
	onCancel: () => void;
	onSaved: () => void;
}

/** 행을 가리키는 키 문자열. 임시 저장의 target 과 목록의 key 로 쓴다. */
export const getRowKey = (config: Pick<TableConfig, 'keys'>, row: TableRow) =>
	config.keys.map(key => String(row[key])).join('|');

/** 임시 저장 목록에 보이는 제목 (예: 곡 이름) */
const getDraftTitle = (config: TableConfig, form: FormValues, lookups: Lookups): string => {
	const title = typeof form.title === 'string' ? form.title.trim() : '';
	if (title) return title;
	if (config.table === 'track_chords' && typeof form.track_id === 'string' && form.track_id) {
		return getTrackLabelById(lookups.tracks, lookups.albums, form.track_id);
	}
	return '(제목 없음)';
};

interface RowFormProps extends EditorFormProps {
	config: TableConfig;
}

const RowForm = ({ config, row, draft: initialDraft, onCancel, onSaved }: RowFormProps) => {
	const { lookups, reload: reloadLookups } = useAdminLookups();
	const { draft, isSavingDraft, saveCurrent, removeCurrent } = useDraftEditor({
		scope: config.table,
		target: row ? getRowKey(config, row) : null,
		initialDraft,
	});
	const [initialForm] = useState<FormValues>(
		() => readDraftForm(initialDraft) ?? { ...toFormValues(config, row), ...config.initialExtras?.(row, lookups) },
	);
	const [form, setForm] = useState<FormValues>(initialForm);
	const { goTo } = useAdminActions();
	const relatedAlbumId = row ? (config.getRelatedAlbumId?.(row, lookups) ?? null) : null;
	const [files, setFiles] = useState<Record<string, File>>({});
	const [isSaving, setIsSaving] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const handleFileChange = (fieldName: string, file: File | null) =>
		setFiles(previous => {
			const next = { ...previous };
			if (file) next[fieldName] = file;
			else delete next[fieldName];
			return next;
		});

	const handleSaveDraft = () => saveCurrent(getDraftTitle(config, form, lookups), { form });
	// 헤더의 "임시 저장" 버튼이 이 폼을 저장할 수 있게 등록한다.
	useRegisterDraftSaver(handleSaveDraft);

	const handleGoToAlbum = () => {
		if (!relatedAlbumId) return;
		const isDirty = JSON.stringify(form) !== JSON.stringify(initialForm);
		if (
			isDirty &&
			!window.confirm(
				'저장하지 않은 내용은 사라집니다. 먼저 임시 저장하거나 저장했는지 확인하십시오. 소속 앨범 화면으로 이동하시겠습니까?',
			)
		) {
			return;
		}
		goTo(ALBUMS.table, relatedAlbumId);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setIsSaving(true);
		setErrorMessage(null);
		try {
			const isCreate = row === null;
			const values = toRowValues(config, form, { isCreate, row, lookups });
			const uploadedPaths = await uploadFieldImages(config, values, row, files);

			try {
				if (isCreate) await insertTableRow(config, values);
				else await updateTableRow(config, row, values);
			} catch (error) {
				// 새 행이 저장되지 않았다면 방금 올린 이미지도 남기지 않는다. (수정이면 같은 경로를 덮어쓴 것이라 되돌릴 수 없다.)
				if (isCreate) await removeImages(uploadedPaths).catch(() => undefined);
				throw error;
			}

			// 행은 이미 저장됐으므로 연결 정보(원곡 등) 저장이 실패해도 폼을 닫고, 다시 열어 고치도록 알린다.
			let extrasError: string | null = null;
			try {
				await config.saveExtras?.({ ...row, ...values }, form);
			} catch (error) {
				extrasError = getMessage(error, '저장하지 못했습니다.');
			}
			reloadLookups();
			await removeCurrent();

			if (extrasError) toast.error(`저장은 됐지만 연결된 정보를 저장하지 못했습니다: ${extrasError}`);
			else toast.success('저장했습니다. 사이트에 반영하려면 배포하십시오.');
			onSaved();
		} catch (error) {
			setErrorMessage(getMessage(error, '저장하지 못했습니다.'));
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-6">
			<div className="flex flex-col items-start gap-2">
				<button type="button" onClick={onCancel} disabled={isSaving} className="text-sm text-gray-500 underline">
					← 목록으로
				</button>
				<h2 className="font-sans text-xl font-semibold text-gray-700">
					{config.label} {row === null ? '추가' : '수정'}
				</h2>
				{relatedAlbumId && (
					<button type="button" onClick={handleGoToAlbum} disabled={isSaving} className={SECONDARY_BUTTON_CLASS}>
						이 곡이 수록된 앨범 열기 →
					</button>
				)}
				{draft && (
					<p className="text-sm text-gray-500">
						임시 저장된 내용입니다 — {draft.updatedByEmail ?? '알 수 없음'} · {formatDraftTime(draft.updatedAt)}
					</p>
				)}
			</div>

			<FormFields
				config={config}
				form={form}
				row={row}
				isDisabled={isSaving}
				files={files}
				onFormChange={setForm}
				onFileChange={handleFileChange}
			/>

			{errorMessage && <p className="text-base text-pink-600">{errorMessage}</p>}

			<div className="sticky bottom-0 flex flex-wrap gap-3 border-t border-gray-200 bg-white py-3">
				<button type="submit" disabled={isSaving} className={PRIMARY_BUTTON_CLASS}>
					{isSaving ? '저장 중...' : '저장'}
				</button>
				<button
					type="button"
					onClick={handleSaveDraft}
					disabled={isSaving || isSavingDraft}
					className={SECONDARY_BUTTON_CLASS}>
					{isSavingDraft ? '임시 저장 중...' : '임시 저장'}
				</button>
				<button type="button" onClick={onCancel} disabled={isSaving} className={SECONDARY_BUTTON_CLASS}>
					취소
				</button>
			</div>
		</form>
	);
};

interface DraftListProps {
	config: TableConfig;
	drafts: AdminDraft[];
	onOpen: (draft: AdminDraft) => void;
}

/** 이 목록에 대해 모든 관리자가 임시 저장해 둔 항목. 이어서 작성하거나 지울 수 있다. */
const DraftList = ({ config, drafts, onOpen }: DraftListProps) => {
	const { reload } = useAdminDrafts();

	const handleDelete = async (draft: AdminDraft) => {
		const message = `임시 저장 "${draft.title}"을(를) 삭제합니다. 다른 관리자가 저장한 것이라도 지워지며 되돌릴 수 없습니다. 진행하시겠습니까?`;
		if (!window.confirm(message)) return;
		try {
			await deleteDraft(draft.id);
			toast.success('임시 저장을 삭제했습니다.');
		} catch (error) {
			toast.error(getMessage(error, '삭제하지 못했습니다.'));
		}
		reload();
	};

	return (
		<section
			className="flex flex-col gap-2 rounded-md border border-yellow-300 bg-yellow-100 p-4"
			aria-label="임시 저장 목록">
			<h3 className="text-base font-semibold text-gray-700">
				임시 저장된 {config.label} <span className="font-normal text-gray-500">{drafts.length}건</span>
			</h3>
			<p className="text-sm text-gray-500">
				작성하다 멈춘 내용입니다. 다른 관리자가 저장한 것도 여기서 이어서 작성할 수 있습니다.
			</p>
			<ul className="flex flex-col gap-2">
				{drafts.map(draft => (
					<li key={draft.id} className="flex flex-col gap-2 rounded-md bg-white p-3">
						<div className="flex flex-wrap items-center gap-2">
							<span className={cn(BADGE_CLASS, draft.target ? BADGE_TONE_CLASS.blue : BADGE_TONE_CLASS.green)}>
								{draft.target ? '수정 중' : '새 항목'}
							</span>
							<span className="break-words text-base font-medium text-gray-700">{draft.title}</span>
						</div>
						<p className="text-sm text-gray-500">
							{draft.updatedByEmail ?? '알 수 없음'} · {formatDraftTime(draft.updatedAt)}
						</p>
						<div className="flex gap-2">
							<button
								type="button"
								onClick={() => onOpen(draft)}
								className={cn(SECONDARY_BUTTON_CLASS, 'text-primary')}>
								이어서 작성
							</button>
							<button
								type="button"
								onClick={() => handleDelete(draft)}
								className={cn(SECONDARY_BUTTON_CLASS, 'text-pink-600')}>
								삭제
							</button>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
};

interface TableEditorProps {
	config: TableConfig;
	renderForm?: (props: EditorFormProps) => ReactNode;
}

interface EditingState {
	row: TableRow | null;
	draft: AdminDraft | null;
}

const TableEditor = ({ config, renderForm }: TableEditorProps) => {
	const { rows, errorMessage, isLoading, reload } = useTableRows(config);
	const { lookups, reload: reloadLookups } = useAdminLookups();
	const { drafts } = useAdminDrafts();
	const { goTo, pendingTarget, clearPendingTarget } = useAdminActions();
	// undefined: 목록 / 그 외: 폼을 열어 둔 상태
	const [openedEditing, setEditing] = useState<EditingState | undefined>(undefined);
	const [search, setSearch] = useState('');
	const searchKeyword = useDebouncedValue(search.trim().toLowerCase());
	const [sortKey, setSortKey] = useState(config.sorts?.[0]?.key ?? '');
	const [filterValues, setFilterValues] = useState<Record<string, string>>({});
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [deletingKey, setDeletingKey] = useState<string | null>(null);

	const activeFilterCount = Object.values(filterValues).filter(Boolean).length;
	const scopeDrafts = drafts.filter(draft => draft.scope === config.table);

	const items = useMemo(
		() =>
			rows.map(row => {
				const summary = getRowSummary(config.table, row, lookups);
				const keyText = config.keys.map(key => String(row[key])).join(' ');
				return { row, summary, searchText: `${getSearchText(summary)} ${keyText.toLowerCase()}` };
			}),
		[rows, lookups, config],
	);

	const visibleItems = useMemo(() => {
		const filtered = items.filter(
			item =>
				(!searchKeyword || item.searchText.includes(searchKeyword)) &&
				(config.filters ?? []).every(
					filter => !filterValues[filter.key] || filter.matches(item.row, filterValues[filter.key], lookups),
				),
		);
		const sort = config.sorts?.find(candidate => candidate.key === sortKey);
		return sort ? [...filtered].sort((a, b) => sort.compare(a.row, b.row, lookups)) : filtered;
	}, [items, searchKeyword, filterValues, sortKey, config, lookups]);

	// 다른 탭에서 "이 항목 열어 줘"라고 요청한 경우, 목록을 불러오면 그 항목의 수정 화면을 연다.
	const pendingRow =
		pendingTarget?.table === config.table
			? rows.find(candidate => getRowKey(config, candidate) === pendingTarget.key)
			: undefined;
	const editing = openedEditing ?? (pendingRow ? { row: pendingRow, draft: null } : undefined);

	const handleOpenDraft = (draft: AdminDraft) => {
		if (draft.target === null) {
			setEditing({ row: null, draft });
			return;
		}
		const row = rows.find(candidate => getRowKey(config, candidate) === draft.target);
		if (!row) {
			toast.error('이 임시 저장이 가리키는 원래 항목을 찾을 수 없습니다. 삭제하고 새로 작성하십시오.');
			return;
		}
		setEditing({ row, draft });
	};

	const handleDelete = async (row: TableRow, title: string) => {
		const note = config.getDeleteNote?.(row, lookups);
		const message = [
			`${config.label} "${title}"을(를) 삭제합니다.`,
			note,
			'삭제하면 되돌릴 수 없습니다. 사이트에서 숨기기만 하려면 수정 화면에서 비공개로 바꾸십시오. 정말 삭제하시겠습니까?',
		]
			.filter(Boolean)
			.join('\n\n');
		if (!window.confirm(message)) return;

		setDeletingKey(getRowKey(config, row));
		try {
			await deleteTableRow(config, row);
			toast.success('삭제했습니다. 사이트에 반영하려면 배포하십시오.');
			reload();
			reloadLookups();
		} catch (error) {
			toast.error(getMessage(error, '삭제하지 못했습니다.'));
		} finally {
			setDeletingKey(null);
		}
	};

	if (editing !== undefined) {
		const handleCancel = () => {
			setEditing(undefined);
			clearPendingTarget();
		};
		const handleSaved = () => {
			setEditing(undefined);
			clearPendingTarget();
			reload();
		};
		const key = `${editing.row ? getRowKey(config, editing.row) : 'new'}:${editing.draft?.id ?? ''}`;
		const props: EditorFormProps = { ...editing, onCancel: handleCancel, onSaved: handleSaved };
		return renderForm ? <div key={key}>{renderForm(props)}</div> : <RowForm key={key} config={config} {...props} />;
	}

	const isNarrowed = search !== '' || activeFilterCount > 0;

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap items-center gap-3">
				<input
					type="search"
					value={search}
					onChange={event => setSearch(event.target.value)}
					placeholder={`${config.label} 검색`}
					aria-label={`${config.label} 검색`}
					className={cn(INPUT_CLASS, 'min-w-0 flex-1 sm:max-w-xs')}
				/>
				{config.filters && (
					<button
						type="button"
						aria-expanded={isFilterOpen}
						onClick={() => setIsFilterOpen(previous => !previous)}
						className={cn(SECONDARY_BUTTON_CLASS, activeFilterCount > 0 && 'border-primary text-primary')}>
						필터{activeFilterCount > 0 ? ` (${activeFilterCount})` : ''} {isFilterOpen ? '▲' : '▼'}
					</button>
				)}
				<button
					type="button"
					onClick={() => setEditing({ row: null, draft: null })}
					className={cn(PRIMARY_BUTTON_CLASS, 'ml-auto')}>
					+ {config.addLabel ?? '추가'}
				</button>
			</div>

			{scopeDrafts.length > 0 && <DraftList config={config} drafts={scopeDrafts} onOpen={handleOpenDraft} />}

			{config.filters && isFilterOpen && (
				<div className="flex flex-col gap-4 rounded-md border border-gray-200 bg-gray-50 p-4">
					{config.filters.map(filter => (
						<div key={filter.key} className="flex flex-col gap-2">
							<span className="text-sm font-medium text-gray-600">{filter.label}</span>
							<ChipSelect
								options={filter.getOptions(rows, lookups)}
								value={filterValues[filter.key] ?? ''}
								isDisabled={false}
								onChange={value => setFilterValues(previous => ({ ...previous, [filter.key]: value }))}
							/>
						</div>
					))}
					{activeFilterCount > 0 && (
						<button
							type="button"
							onClick={() => setFilterValues({})}
							className="self-start text-sm text-gray-500 underline">
							필터 모두 해제
						</button>
					)}
				</div>
			)}

			{config.sorts && (
				<div className="flex flex-wrap items-center gap-x-3 gap-y-2">
					<span className="text-sm text-gray-500">정렬</span>
					<ChipSelect
						options={config.sorts.map(sort => ({ value: sort.key, label: sort.label }))}
						value={sortKey}
						isRequired
						isDisabled={false}
						onChange={setSortKey}
					/>
				</div>
			)}

			<p className="text-sm text-gray-500">
				{isLoading ? '불러오는 중...' : `${visibleItems.length}건${isNarrowed ? ` / 전체 ${rows.length}건` : ''}`}
			</p>

			{errorMessage && <p className="text-base text-pink-600">{errorMessage}</p>}

			<ul className="flex flex-col gap-3">
				{visibleItems.map(({ row, summary }) => (
					<li
						key={getRowKey(config, row)}
						className={cn(
							'render-lazy flex flex-col gap-3 rounded-md border border-gray-200 bg-white p-4 [--render-lazy-size:10rem]',
							row.is_published === false && 'bg-gray-50',
						)}>
						<div className="flex items-start justify-between gap-3">
							<div className="min-w-0">
								<p className="break-words text-base font-semibold text-gray-700">{summary.title}</p>
								{summary.subtitle && <p className="mt-0.5 break-words text-sm text-gray-500">{summary.subtitle}</p>}
							</div>
							<div className="flex shrink-0 gap-1.5">
								{config.getRelatedAlbumId?.(row, lookups) && (
									<button
										type="button"
										onClick={() => goTo(ALBUMS.table, String(config.getRelatedAlbumId?.(row, lookups)))}
										className={SMALL_BUTTON_CLASS}>
										앨범 보기
									</button>
								)}
								<button
									type="button"
									onClick={() => setEditing({ row, draft: null })}
									className={cn(SMALL_BUTTON_CLASS, 'text-primary')}>
									수정
								</button>
								<button
									type="button"
									disabled={deletingKey === getRowKey(config, row)}
									onClick={() => handleDelete(row, summary.title)}
									className={cn(SMALL_BUTTON_CLASS, 'text-pink-600')}>
									{deletingKey === getRowKey(config, row) ? '삭제 중...' : '삭제'}
								</button>
							</div>
						</div>

						{summary.badges.length > 0 && (
							<div className="flex flex-wrap gap-2">
								{summary.badges.map(badge => (
									<span key={badge.label} className={cn(BADGE_CLASS, BADGE_TONE_CLASS[badge.tone])}>
										{badge.label}
									</span>
								))}
							</div>
						)}

						{summary.lines.map(line => (
							<p key={line} className="break-all text-sm text-gray-600">
								{line}
							</p>
						))}
					</li>
				))}
				{!isLoading && visibleItems.length === 0 && (
					<li className="rounded-md border border-gray-200 px-3 py-8 text-center text-base text-gray-500">
						표시할 {config.label}이(가) 없습니다.
					</li>
				)}
			</ul>
		</div>
	);
};

export default TableEditor;
