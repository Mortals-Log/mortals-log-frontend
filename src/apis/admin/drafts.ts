// @/apis/admin/drafts
// 관리자 임시 저장(공유). 작성 중인 폼 값을 DB(admin_drafts)에 저장해 다른 관리자도 이어서 작성할 수 있게 한다.
// 같은 행에는 임시 저장을 하나만 두고, 저장할 때 revision 으로 동시 수정(충돌)을 감지한다.

import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

export interface AdminDraft {
	id: string;
	scope: string;
	/** 수정 중인 행의 키 (새로 추가하는 폼이면 null) */
	target: string | null;
	title: string;
	payload: unknown;
	revision: number;
	createdByEmail: string | null;
	updatedByEmail: string | null;
	createdAt: string;
	updatedAt: string;
}

interface DraftRow {
	id: string;
	scope: string;
	target: string | null;
	title: string;
	payload: unknown;
	revision: number;
	created_by_email: string | null;
	updated_by_email: string | null;
	created_at: string;
	updated_at: string;
}

const MIGRATION_MESSAGE =
	'임시 저장 기능이 아직 설치되지 않았습니다. 마이그레이션 20261104090000_admin_drafts.sql 을 적용하십시오.';
const CONFLICT_MESSAGE =
	'다른 관리자가 그 사이에 이 임시 저장을 고쳤거나 지웠습니다. 임시 저장 목록에서 최신 내용을 다시 열어 확인하십시오.';
const DUPLICATE_MESSAGE = '이 항목은 이미 다른 임시 저장이 있습니다. 임시 저장 목록에서 열어 이어서 작성하십시오.';

const toDraft = (row: DraftRow): AdminDraft => ({
	id: row.id,
	scope: row.scope,
	target: row.target,
	title: row.title,
	payload: row.payload,
	revision: row.revision,
	createdByEmail: row.created_by_email,
	updatedByEmail: row.updated_by_email,
	createdAt: row.created_at,
	updatedAt: row.updated_at,
});

const toDraftError = (error: { code?: string; message: string }): Error => {
	if (error.code === 'PGRST205' || error.code === '42P01' || /admin_drafts/.test(error.message)) {
		if (/does not exist|schema cache|Could not find/i.test(error.message)) return new Error(MIGRATION_MESSAGE);
	}
	if (error.code === '23505') return new Error(DUPLICATE_MESSAGE);
	return new Error(error.message);
};

const getCurrentEmail = async (): Promise<string | null> => {
	const { data } = await getSupabaseBrowserClient().auth.getSession();
	return data.session?.user.email ?? null;
};

export const fetchDrafts = async (): Promise<AdminDraft[]> => {
	const { data, error } = await getSupabaseBrowserClient()
		.from('admin_drafts')
		.select('*')
		.order('updated_at', { ascending: false });
	if (error) throw toDraftError(error);
	return ((data ?? []) as DraftRow[]).map(toDraft);
};

interface SaveDraftInput {
	/** 이미 저장된 임시 저장을 다시 저장하는 경우 (revision 으로 충돌을 확인한다). 처음 저장이면 null. */
	draft: AdminDraft | null;
	scope: string;
	target: string | null;
	title: string;
	payload: unknown;
}

export const saveDraft = async ({ draft, scope, target, title, payload }: SaveDraftInput): Promise<AdminDraft> => {
	const client = getSupabaseBrowserClient();
	const email = await getCurrentEmail();

	if (!draft) {
		const { data, error } = await client
			.from('admin_drafts')
			.insert({ scope, target, title, payload, created_by_email: email, updated_by_email: email })
			.select()
			.single();
		if (error) throw toDraftError(error);
		return toDraft(data as DraftRow);
	}

	const { data, error } = await client
		.from('admin_drafts')
		.update({ title, payload, updated_by_email: email, revision: draft.revision + 1 })
		.eq('id', draft.id)
		.eq('revision', draft.revision)
		.select();
	if (error) throw toDraftError(error);
	if (!data?.length) throw new Error(CONFLICT_MESSAGE);
	return toDraft(data[0] as DraftRow);
};

export const deleteDraft = async (draftId: string): Promise<void> => {
	const { error } = await getSupabaseBrowserClient().from('admin_drafts').delete().eq('id', draftId);
	if (error) throw toDraftError(error);
};
