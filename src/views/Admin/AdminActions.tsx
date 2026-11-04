'use client';

// @/views/Admin/AdminActions
// 화면 여러 곳이 서로 신호를 주고받아야 하는 동작을 한곳에서 관리한다.
//  1) 탭과 "다른 탭의 항목으로 이동" (곡·코드 → 관련 앨범)
//  2) 지금 열려 있는 폼의 "임시 저장" (헤더의 임시 저장 버튼이 열린 폼을 대신 저장한다)

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { SECONDARY_BUTTON_CLASS } from './admin-classes';

/** 다른 탭에서 열어 달라고 요청한 항목 (table: 탭, key: 행의 키) */
interface NavigationTarget {
	table: string;
	key: string;
}

interface AdminActionsState {
	activeTab: string;
	/** 사용자가 직접 탭을 바꾼다 (이동 요청은 취소된다) */
	setActiveTab: (tab: string) => void;
	pendingTarget: NavigationTarget | null;
	/** 다른 탭의 항목을 연다. 예: goTo('albums', 'LP01') */
	goTo: (table: string, key: string) => void;
	clearPendingTarget: () => void;
	/** 열려 있는 폼이 자신의 임시 저장 동작을 등록한다 (닫힐 때는 null) */
	registerDraftSaver: (saver: (() => Promise<void>) | null) => void;
	/** 열려 있는 폼을 임시 저장한다. 열린 폼이 없으면 안내만 한다. */
	saveOpenFormDraft: () => Promise<void>;
}

const NO_FORM_MESSAGE = '임시 저장할 작성 중인 화면이 없습니다. 항목을 추가하거나 수정하는 화면에서 사용하십시오.';

const AdminActionsContext = createContext<AdminActionsState>({
	activeTab: '',
	setActiveTab: () => undefined,
	pendingTarget: null,
	goTo: () => undefined,
	clearPendingTarget: () => undefined,
	registerDraftSaver: () => undefined,
	saveOpenFormDraft: async () => undefined,
});

export const AdminActionsProvider = ({ initialTab, children }: { initialTab: string; children: ReactNode }) => {
	const [activeTab, setActiveTabState] = useState(initialTab);
	const [pendingTarget, setPendingTarget] = useState<NavigationTarget | null>(null);
	// 폼이 다시 그려질 때마다 등록하므로 ref 에 둔다 (등록이 화면을 다시 그리게 하지 않는다).
	const saverRef = useRef<(() => Promise<void>) | null>(null);

	const setActiveTab = useCallback((tab: string) => {
		setPendingTarget(null);
		setActiveTabState(tab);
	}, []);
	const goTo = useCallback((table: string, key: string) => {
		setPendingTarget({ table, key });
		setActiveTabState(table);
	}, []);
	const clearPendingTarget = useCallback(() => setPendingTarget(null), []);
	const registerDraftSaver = useCallback((saver: (() => Promise<void>) | null) => {
		saverRef.current = saver;
	}, []);
	const saveOpenFormDraft = useCallback(async () => {
		if (!saverRef.current) {
			toast.error(NO_FORM_MESSAGE);
			return;
		}
		await saverRef.current();
	}, []);

	const state = useMemo<AdminActionsState>(
		() => ({
			activeTab,
			setActiveTab,
			pendingTarget,
			goTo,
			clearPendingTarget,
			registerDraftSaver,
			saveOpenFormDraft,
		}),
		[activeTab, setActiveTab, pendingTarget, goTo, clearPendingTarget, registerDraftSaver, saveOpenFormDraft],
	);

	return <AdminActionsContext.Provider value={state}>{children}</AdminActionsContext.Provider>;
};

export const useAdminActions = () => useContext(AdminActionsContext);

/** 폼이 열려 있는 동안 헤더의 임시 저장 버튼이 이 폼을 저장하도록 등록한다. */
export const useRegisterDraftSaver = (saver: () => Promise<void>) => {
	const { registerDraftSaver } = useAdminActions();
	// 매번 최신 입력을 저장해야 하므로 다시 그려질 때마다 등록하고, 폼이 닫히면 해제한다.
	useEffect(() => {
		registerDraftSaver(saver);
	});
	useEffect(() => () => registerDraftSaver(null), [registerDraftSaver]);
};

/** 헤더(배포하기 옆)의 임시 저장 버튼 */
export const HeaderDraftButton = () => {
	const { saveOpenFormDraft } = useAdminActions();
	const [isSaving, setIsSaving] = useState(false);

	const handleClick = async () => {
		setIsSaving(true);
		try {
			await saveOpenFormDraft();
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<button type="button" onClick={handleClick} disabled={isSaving} className={SECONDARY_BUTTON_CLASS}>
			{isSaving ? '임시 저장 중...' : '임시 저장'}
		</button>
	);
};
