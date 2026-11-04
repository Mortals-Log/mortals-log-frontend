'use client';

// @/views/Admin/AdminDrafts
// 모든 탭이 함께 쓰는 임시 저장 목록. 다른 관리자가 저장한 내용을 보려면 목록을 다시 불러와야 하므로,
// 탭으로 돌아오거나 창을 다시 볼 때 자동으로 새로 불러온다.

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { deleteDraft, fetchDrafts, saveDraft, type AdminDraft } from '@/apis/admin/drafts';
import type { FormValues } from './form-codec';

interface DraftsState {
	drafts: AdminDraft[];
	/** 임시 저장 기능을 쓸 수 있는지 (마이그레이션 전이면 errorMessage 가 채워진다) */
	errorMessage: string | null;
	reload: () => void;
}

export const AdminDraftsContext = createContext<DraftsState>({
	drafts: [],
	errorMessage: null,
	reload: () => undefined,
});

interface LoadResult {
	drafts: AdminDraft[];
	errorMessage: string | null;
}

export const AdminDraftsProvider = ({ children }: { children: ReactNode }) => {
	const [reloadCount, setReloadCount] = useState(0);
	const [result, setResult] = useState<LoadResult>({ drafts: [], errorMessage: null });

	useEffect(() => {
		let isCancelled = false;
		fetchDrafts()
			.then((drafts): LoadResult => ({ drafts, errorMessage: null }))
			.catch((error: unknown): LoadResult => ({
				drafts: [],
				errorMessage: error instanceof Error ? error.message : '임시 저장 목록을 불러오지 못했습니다.',
			}))
			.then(next => {
				if (!isCancelled) setResult(next);
			});
		return () => {
			isCancelled = true;
		};
	}, [reloadCount]);

	const reload = useCallback(() => setReloadCount(count => count + 1), []);

	// 다른 관리자가 저장한 내용을 보려고, 창으로 돌아올 때마다 새로 불러온다.
	useEffect(() => {
		const handleVisible = () => {
			if (document.visibilityState === 'visible') reload();
		};
		document.addEventListener('visibilitychange', handleVisible);
		return () => document.removeEventListener('visibilitychange', handleVisible);
	}, [reload]);

	const state = useMemo<DraftsState>(
		() => ({ drafts: result.drafts, errorMessage: result.errorMessage, reload }),
		[result, reload],
	);

	return <AdminDraftsContext.Provider value={state}>{children}</AdminDraftsContext.Provider>;
};

export const useAdminDrafts = () => useContext(AdminDraftsContext);

// ── 폼이 임시 저장을 다루는 방법 (RowForm · AlbumBundleForm 이 함께 쓴다) ──

interface DraftEditorOptions {
	scope: string;
	/** 수정 중인 행의 키 (새로 추가하는 폼이면 null) */
	target: string | null;
	/** 목록에서 열어 이어서 작성하는 중인 임시 저장 */
	initialDraft: AdminDraft | null;
}

export const useDraftEditor = ({ scope, target, initialDraft }: DraftEditorOptions) => {
	const { reload } = useAdminDrafts();
	const [draft, setDraft] = useState<AdminDraft | null>(initialDraft);
	const [isSavingDraft, setIsSavingDraft] = useState(false);

	/** 지금 입력한 내용을 임시 저장한다. 처음이면 새로 만들고, 이미 있으면 같은 임시 저장을 갱신한다. */
	const saveCurrent = async (title: string, payload: unknown) => {
		setIsSavingDraft(true);
		try {
			setDraft(await saveDraft({ draft, scope, target, title, payload }));
			reload();
			toast.success('임시 저장했습니다. 다른 관리자도 임시 저장 목록에서 이어서 작성할 수 있습니다.');
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '임시 저장하지 못했습니다.');
		} finally {
			setIsSavingDraft(false);
		}
	};

	/** 실제 저장에 성공하면 이 임시 저장은 더 필요 없으므로 지운다. 지우지 못해도 저장 성공을 가리지 않는다. */
	const removeCurrent = async () => {
		if (!draft) return;
		await deleteDraft(draft.id).catch(() => undefined);
		reload();
	};

	return { draft, isSavingDraft, saveCurrent, removeCurrent };
};

/** 저장한 임시 저장 내용 중 폼 값(form)을 꺼낸다. 모양이 맞지 않으면 null. */
export const readDraftForm = (draft: AdminDraft | null): FormValues | null => {
	const payload = draft?.payload as { form?: FormValues } | null | undefined;
	return payload && typeof payload === 'object' && payload.form && typeof payload.form === 'object'
		? payload.form
		: null;
};

export const formatDraftTime = (iso: string): string =>
	new Date(iso).toLocaleString('ko-KR', { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
