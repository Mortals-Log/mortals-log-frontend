'use client';

// @/views/Admin/AlbumBundleForm
// 앨범 정보 + 링크 + 수록곡을 한 화면에서 등록하고, 이미 등록한 앨범도 같은 화면에서 조회·수정한다.
// 새 앨범은 비공개로 시작한다. 저장된 곡은 지울 수 없고(앨범을 비공개로 숨긴다) 순서만 바꿀 수 있으며, 새 곡은 추가할 수 있다.
// 작성 중인 내용은 "임시 저장"으로 다른 관리자와 공유할 수 있다.

import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { createAlbumBundle, updateAlbumBundle } from '@/apis/admin/album-bundle';
import { uploadFieldImages } from '@/apis/admin/images';
import { useAlbumChildren } from '@/hooks/admin/useAlbumChildren';
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS, SECONDARY_BUTTON_CLASS } from './admin-classes';
import { ALBUMS, TRACK_CHORDS, TRACKS } from './admin-tables';
import { useAdminActions, useRegisterDraftSaver } from './AdminActions';
import { formatDraftTime, readDraftForm, useDraftEditor } from './AdminDrafts';
import { useAdminLookups } from './AdminLookups';
import {
	buildAlbumBundle,
	createEmptyLink,
	createEmptyTrack,
	DEFAULT_CREDIT,
	toLinkDraft,
	toTrackDraft,
	type LinkDraft,
	type TrackDraft,
} from './album-bulk';
import { ChipSelect, ComboInput } from './ComboInput';
import type { EditorFormProps } from './TableEditor';
import FormFields from './FormFields';
import { toFormValues, type FormValues } from './form-codec';
import { LINK_KIND_OPTIONS } from './labels';
import ListEditor from './ListEditor';
import { StringsInput } from './StructuredInputs';

const getMessage = (error: unknown, fallback: string) => (error instanceof Error ? error.message : fallback);

const SECTION_TITLE_CLASS = 'font-sans text-xl font-semibold text-gray-700';
const CAPTION_CLASS = 'flex flex-col gap-1 text-sm text-gray-600';
type CreditKey = 'lyricists' | 'composers' | 'arrangers';

const hasNames = (names: string[]) => names.some(name => name.trim() !== '');

const CREDIT_FIELDS = [
	['작사', 'lyricists'],
	['작곡', 'composers'],
	['편곡', 'arrangers'],
] as const;

/** 임시 저장에 담는 내용. 이미지 파일은 담기지 않는다. */
interface BundleDraftPayload {
	form: FormValues;
	links: LinkDraft[];
	tracks: TrackDraft[];
	deletedLinkIds: number[];
	commonCredits: Record<CreditKey, string[]>;
}

const readBundleDraft = (draft: EditorFormProps['draft']): BundleDraftPayload | null => {
	const payload = draft?.payload as Partial<BundleDraftPayload> | null | undefined;
	if (!payload || !readDraftForm(draft) || !Array.isArray(payload.links) || !Array.isArray(payload.tracks)) return null;
	return payload as BundleDraftPayload;
};

const DEFAULT_COMMON_CREDITS: Record<CreditKey, string[]> = {
	lyricists: [DEFAULT_CREDIT],
	composers: [DEFAULT_CREDIT],
	arrangers: [DEFAULT_CREDIT],
};

interface BodyProps extends EditorFormProps {
	initialLinks: LinkDraft[];
	initialTracks: TrackDraft[];
}

const AlbumBundleFormBody = ({
	row,
	draft: initialDraft,
	initialLinks,
	initialTracks,
	onCancel,
	onSaved,
}: BodyProps) => {
	const { lookups, reload: reloadLookups } = useAdminLookups();
	const { draft, isSavingDraft, saveCurrent, removeCurrent } = useDraftEditor({
		scope: ALBUMS.table,
		target: row ? String(row.id) : null,
		initialDraft,
	});
	const savedDraft = readBundleDraft(initialDraft);
	const isCreate = row === null;
	const [albumForm, setAlbumForm] = useState<FormValues>(
		() => savedDraft?.form ?? { ...toFormValues(ALBUMS, row), ...ALBUMS.initialExtras?.(row, lookups) },
	);
	const [files, setFiles] = useState<Record<string, File>>({});
	const [links, setLinks] = useState<LinkDraft[]>(initialLinks);
	const [deletedLinkIds, setDeletedLinkIds] = useState<number[]>(savedDraft?.deletedLinkIds ?? []);
	const [tracks, setTracks] = useState<TrackDraft[]>(initialTracks);
	const [commonCredits, setCommonCredits] = useState<Record<CreditKey, string[]>>(
		savedDraft?.commonCredits ?? DEFAULT_COMMON_CREDITS,
	);
	const [isSaving, setIsSaving] = useState(false);
	const [errorMessage, setErrorMessage] = useState<string | null>(null);

	const { goTo } = useAdminActions();
	const getSnapshot = () => JSON.stringify({ albumForm, links, tracks, deletedLinkIds, commonCredits });
	const [initialSnapshot] = useState(getSnapshot);

	const isVinyl = albumForm.album_type === 'VN';
	const hasSavedTracks = tracks.some(track => track.source);

	const handleFileChange = (fieldName: string, file: File | null) =>
		setFiles(previous => {
			const next = { ...previous };
			if (file) next[fieldName] = file;
			else delete next[fieldName];
			return next;
		});

	// −/초기화로 목록에서 빠진 저장된 링크는 저장할 때 지운다.
	const handleLinksChange = (next: LinkDraft[]) => {
		const keptIds = new Set(next.map(link => link.source?.id));
		const droppedIds = links
			.filter(link => link.source && !keptIds.has(link.source.id))
			.map(link => Number(link.source?.id));
		if (droppedIds.length > 0) setDeletedLinkIds(previous => [...previous, ...droppedIds]);
		setLinks(next);
	};

	const albumTitle =
		typeof albumForm.title === 'string' && albumForm.title.trim() ? albumForm.title.trim() : '(제목 없음)';

	const handleSaveDraft = () =>
		saveCurrent(albumTitle, {
			form: albumForm,
			links,
			tracks,
			deletedLinkIds,
			commonCredits,
		} satisfies BundleDraftPayload);

	// 헤더의 "임시 저장" 버튼이 이 폼을 저장할 수 있게 등록한다.
	useRegisterDraftSaver(handleSaveDraft);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		setIsSaving(true);
		setErrorMessage(null);
		try {
			const bundle = buildAlbumBundle(albumForm, links, tracks, { isCreate, row, lookups }, deletedLinkIds);
			const uploadedPaths = await uploadFieldImages(ALBUMS, bundle.album, row, files);
			if (isCreate) await createAlbumBundle(bundle, uploadedPaths);
			else await updateAlbumBundle(bundle, row);

			reloadLookups();
			await removeCurrent();
			toast.success(
				isCreate
					? `앨범 ${bundle.albumId} 를 등록했습니다 (링크 ${bundle.links.length}개, 수록곡 ${bundle.tracks.length}곡). 비공개로 시작하니 준비되면 공개로 바꾸십시오.`
					: '저장했습니다. 사이트에 반영하려면 배포하십시오.',
			);
			onSaved();
		} catch (error) {
			setErrorMessage(getMessage(error, '저장하지 못했습니다.'));
		} finally {
			setIsSaving(false);
		}
	};

	// 공통 참여진을 비어 있는 칸에만 채운다 (이미 입력한 곡은 그대로 둔다).
	const handleApplyCommonCredits = () => {
		let filledCount = 0;
		const next = tracks.map(track => {
			const patch: Partial<Record<CreditKey, string[]>> = {};
			for (const [, key] of CREDIT_FIELDS) {
				if (!hasNames(track[key]) && hasNames(commonCredits[key])) patch[key] = commonCredits[key];
			}
			if (Object.keys(patch).length > 0) filledCount += 1;
			return { ...track, ...patch };
		});
		setTracks(next);
		if (filledCount > 0) toast.success(`${filledCount}곡의 비어 있는 작사·작곡·편곡을 채웠습니다.`);
		else toast.error('채울 곳이 없습니다. 모든 곡에 이미 입력되어 있거나 공통 참여진이 비어 있습니다.');
	};

	// 저장하지 않은 내용이 있으면 확인을 받고, 곡/코드 탭의 수정 화면으로 이동한다.
	const handleGoToTrack = (table: string, key: string, targetLabel: string) => {
		const isDirty = getSnapshot() !== initialSnapshot || Object.keys(files).length > 0;
		if (
			isDirty &&
			!window.confirm(
				`저장하지 않은 내용은 사라집니다. 먼저 저장하거나 임시 저장했는지 확인하십시오. ${targetLabel}(으)로 이동하시겠습니까?`,
			)
		) {
			return;
		}
		goTo(table, key);
	};

	const updateTrack = (index: number, next: TrackDraft) =>
		setTracks(previous => previous.map((track, position) => (position === index ? next : track)));

	return (
		<form onSubmit={handleSubmit} className="flex max-w-2xl flex-col gap-10">
			{/* 탭 바 아래에 붙어 따라오는 제목 줄 (사이트 상단 바 60px + 탭 바 44px 아래) */}
			<div className="sticky top-26 z-20 -mt-4 flex h-14 items-center gap-3 border-b border-gray-200 bg-white">
				<button
					type="button"
					onClick={onCancel}
					disabled={isSaving}
					className="shrink-0 text-sm text-gray-500 underline">
					← 목록으로
				</button>
				<h2 className="min-w-0 flex-1 truncate font-sans text-lg font-semibold text-gray-700">
					{isCreate ? '앨범 등록' : '앨범 수정'} — {albumTitle}
				</h2>
			</div>
			{draft && (
				<p className="-mt-6 text-sm text-gray-500">
					임시 저장된 내용입니다 — {draft.updatedByEmail ?? '알 수 없음'} · {formatDraftTime(draft.updatedAt)}
				</p>
			)}

			<section className="flex flex-col gap-6">
				<h2 className={SECTION_TITLE_CLASS}>1. 앨범 정보</h2>
				<FormFields
					config={ALBUMS}
					form={albumForm}
					row={row}
					isDisabled={isSaving}
					files={files}
					onFormChange={setAlbumForm}
					onFileChange={handleFileChange}
				/>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className={SECTION_TITLE_CLASS}>2. 링크 (음원 사이트 · 구매처)</h2>
				<p className="text-sm text-gray-500">
					비워 둔 칸은 무시합니다. 표시 순서는 위에서부터 구분별로 1, 2, 3... 입니다. 저장된 링크를 비우거나 −로 빼면
					저장할 때 삭제됩니다.
				</p>
				<ListEditor
					items={links}
					label="링크"
					variant="card"
					getItemTitle={index => `링크 ${index + 1}`}
					createItem={createEmptyLink}
					isDisabled={isSaving}
					onChange={handleLinksChange}
					renderItem={(link, index, onItemChange) => (
						<div className="flex flex-col gap-3">
							<ChipSelect
								options={LINK_KIND_OPTIONS}
								value={link.kind}
								isRequired
								isDisabled={isSaving}
								onChange={kind => onItemChange({ ...link, kind: kind === 'store' ? 'store' : 'streaming' })}
							/>
							<div className={CAPTION_CLASS}>
								플랫폼
								<ComboInput
									value={link.platform}
									options={lookups.vocab.linkPlatforms}
									label={`링크 ${index + 1} 플랫폼`}
									emptyLabel="(없음)"
									isDisabled={isSaving}
									onChange={platform => onItemChange({ ...link, platform })}
								/>
							</div>
							<label className={CAPTION_CLASS}>
								주소
								<input
									value={link.url}
									disabled={isSaving}
									onChange={event => onItemChange({ ...link, url: event.target.value })}
									className={INPUT_CLASS}
								/>
							</label>
						</div>
					)}
				/>
			</section>

			<section className="flex flex-col gap-4">
				<h2 className={SECTION_TITLE_CLASS}>3. 수록곡</h2>
				<p className="text-sm text-gray-500">
					수록 번호는 목록의 위치(위에서부터 1, 2, 3...)로 정해지며 ↑↓로 순서를 바꿉니다. 곡 ID는 순서를 바꿔도 변하지
					않습니다. 가사·뮤직비디오·노래방 번호·원곡 등은 곡 탭에서 입력하십시오.
					{hasSavedTracks && ' 저장된 곡은 삭제할 수 없으니, 숨기려면 앨범을 비공개로 바꾸십시오.'}
				</p>
				<div className="flex flex-col gap-3 rounded-md border border-gray-200 p-4">
					<p className="text-base font-medium text-gray-700">앨범 공통 참여진</p>
					<p className="text-sm text-gray-500">
						곡마다 따로 입력하지 않고 한 번에 채울 수 있습니다. 작사·작곡·편곡이 비어 있는 곡에만 적용되며, 이미 입력한
						곡은 바뀌지 않습니다.
					</p>
					{CREDIT_FIELDS.map(([label, key]) => (
						<div key={key} className={CAPTION_CLASS}>
							{label}
							<StringsInput
								value={commonCredits[key]}
								label={`공통 ${label}`}
								vocabOptions={lookups.vocab.people}
								isDisabled={isSaving}
								onChange={items => setCommonCredits(previous => ({ ...previous, [key]: items }))}
							/>
						</div>
					))}
					<button
						type="button"
						disabled={isSaving}
						onClick={handleApplyCommonCredits}
						className={`${SECONDARY_BUTTON_CLASS} self-start`}>
						비어 있는 곡에 적용
					</button>
				</div>
				<ListEditor
					items={tracks}
					label="곡"
					variant="card"
					getItemTitle={index => `${index + 1}번 곡`}
					getItemKey={track => track.key}
					collapsible={{
						getSummary: track => track.title || '(제목 없음)',
					}}
					isReorderable
					headerClassName="sticky top-40 z-10 -mx-4 -mt-4 rounded-t-md border-b border-gray-200 bg-gray-50 px-4 py-2"
					createItem={createEmptyTrack}
					canRemove={track => !track.source}
					canReset={!hasSavedTracks}
					blockedMessage="저장된 곡은 삭제하거나 초기화할 수 없습니다. 숨기려면 앨범을 비공개로 바꾸십시오."
					isDisabled={isSaving}
					onChange={setTracks}
					renderItem={(track, index) => (
						<div className="flex flex-col gap-4">
							<div className="grid grid-cols-2 gap-3 max-mobile:grid-cols-1">
								<label className={CAPTION_CLASS}>
									<span>
										제목<span className="ml-1 text-pink-600">*</span>
									</span>
									<input
										value={track.title}
										disabled={isSaving}
										onChange={event => updateTrack(index, { ...track, title: event.target.value })}
										className={INPUT_CLASS}
									/>
								</label>
								<label className={CAPTION_CLASS}>
									영문 제목
									<input
										value={track.titleEn}
										disabled={isSaving}
										onChange={event => updateTrack(index, { ...track, titleEn: event.target.value })}
										className={INPUT_CLASS}
									/>
								</label>
								<label className={CAPTION_CLASS}>
									재생시간
									<input
										value={track.duration}
										disabled={isSaving}
										onChange={event => updateTrack(index, { ...track, duration: event.target.value })}
										className={INPUT_CLASS}
									/>
								</label>
								{isVinyl && (
									<div className={CAPTION_CLASS}>
										Side
										<ComboInput
											value={track.side}
											options={lookups.vocab.sides}
											label={`곡 ${index + 1} Side`}
											emptyLabel="(없음)"
											isDisabled={isSaving}
											onChange={side => updateTrack(index, { ...track, side })}
										/>
									</div>
								)}
							</div>
							<div className="flex flex-wrap gap-x-6 gap-y-3">
								{(
									[
										['타이틀곡', 'isLead'],
										['CD 전용', 'isCdOnly'],
										['연령 제한', 'isAgeRestricted'],
									] as const
								).map(([label, field]) => (
									<label key={field} className="flex items-center gap-3 text-base text-gray-700">
										<input
											type="checkbox"
											checked={Boolean(track[field])}
											disabled={isSaving}
											onChange={event => updateTrack(index, { ...track, [field]: event.target.checked })}
											className="size-6 accent-primary"
										/>
										{label}
									</label>
								))}
							</div>
							{track.source && (
								<div className="flex flex-wrap gap-2">
									<button
										type="button"
										disabled={isSaving}
										onClick={() => handleGoToTrack(TRACKS.table, String(track.source?.id), '곡 상세 편집')}
										className={SECONDARY_BUTTON_CLASS}>
										곡 상세 편집
									</button>
									<button
										type="button"
										disabled={isSaving}
										onClick={() =>
											lookups.chordTrackIds.includes(String(track.source?.id))
												? handleGoToTrack(TRACK_CHORDS.table, String(track.source?.id), '코드 상세 편집')
												: toast.error('이 곡에는 등록된 코드가 없습니다. 코드 탭에서 새로 추가하십시오.')
										}
										className={SECONDARY_BUTTON_CLASS}>
										코드 상세 편집
									</button>
								</div>
							)}
							{CREDIT_FIELDS.map(([label, key]) => (
								<div key={key} className={CAPTION_CLASS}>
									{label}
									<StringsInput
										value={track[key]}
										label={label}
										vocabOptions={lookups.vocab.people}
										isDisabled={isSaving}
										onChange={items => updateTrack(index, { ...track, [key]: items })}
									/>
								</div>
							))}
						</div>
					)}
				/>
			</section>

			{errorMessage && <p className="text-base text-pink-600">{errorMessage}</p>}

			<div className="sticky bottom-0 flex flex-wrap gap-3 border-t border-gray-200 bg-white py-3">
				<button type="submit" disabled={isSaving} className={PRIMARY_BUTTON_CLASS}>
					{isSaving ? '저장 중...' : isCreate ? '앨범 등록' : '저장'}
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

const AlbumBundleForm = (props: EditorFormProps) => {
	const { row, draft } = props;
	const savedDraft = readBundleDraft(draft);
	const { children, errorMessage, isLoading } = useAlbumChildren(row && !savedDraft ? String(row.id) : null);

	// 임시 저장을 이어서 작성하는 경우에는 임시 저장에 담긴 링크·곡을 그대로 쓴다.
	if (savedDraft) {
		return <AlbumBundleFormBody {...props} initialLinks={savedDraft.links} initialTracks={savedDraft.tracks} />;
	}
	if (row === null) {
		return <AlbumBundleFormBody {...props} initialLinks={[createEmptyLink()]} initialTracks={[createEmptyTrack()]} />;
	}
	if (isLoading) return <p className="text-base text-gray-500">앨범 정보를 불러오는 중...</p>;
	if (!children) {
		return (
			<div className="flex flex-col items-start gap-3">
				<p className="text-base text-pink-600">{errorMessage ?? '앨범 정보를 불러오지 못했습니다.'}</p>
				<button type="button" onClick={props.onCancel} className={SECONDARY_BUTTON_CLASS}>
					목록으로
				</button>
			</div>
		);
	}

	return (
		<AlbumBundleFormBody
			{...props}
			initialLinks={children.links.length > 0 ? children.links.map(toLinkDraft) : [createEmptyLink()]}
			initialTracks={children.tracks.length > 0 ? children.tracks.map(toTrackDraft) : [createEmptyTrack()]}
		/>
	);
};

export default AlbumBundleForm;
