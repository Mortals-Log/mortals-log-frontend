// @/apis/admin/accounts
// 관리자 계정 관리. 서버 키 없이 DB 함수(supabase/migrations/20261105090000_admin_self_service.sql)를 호출한다.
//   - 본인 계정: 비밀번호 변경, 탈퇴 (로그인한 누구나, 본인 것만)
//   - 관리자 계정 목록·추가·삭제: 최종 관리자만. DB 함수가 호출자를 다시 확인하므로 화면에서 막는 것은 편의일 뿐이다.

import type { AuthError } from '@supabase/supabase-js';
import { createIsolatedSupabaseClient, getSupabaseBrowserClient } from '@/lib/supabase-browser';

export interface AdminAccount {
	id: string;
	email: string;
	isSuper: boolean;
	/** 초기 비밀번호를 아직 바꾸지 않았다 */
	mustChangePassword: boolean;
	isConfirmed: boolean;
}

interface AccountRow {
	id: string;
	email: string;
	is_super: boolean;
	must_change_password: boolean;
	is_confirmed: boolean;
}

export interface CreateAdminResult {
	/** 새로 가입시킨 경우 새 관리자에게 알려줄 초기 비밀번호. 이미 가입된 계정에 권한만 준 경우는 null. */
	initialPassword: string | null;
}

export const MIN_PASSWORD_LENGTH = 8;

const MIGRATION_MESSAGE =
	'관리자 계정 기능이 아직 설치되지 않았습니다. 마이그레이션 20261105090000_admin_self_service.sql 을 적용하십시오.';

/** DB 함수 오류를 화면에 보여줄 문장으로 바꾼다. 함수 안에서 직접 던진 메시지는 그대로 쓴다. */
const toAccountError = (error: { code?: string; message: string }): Error => {
	if (error.code === 'PGRST202' || /could not find the function/i.test(error.message)) {
		return new Error(MIGRATION_MESSAGE);
	}
	if (error.code === '42501') return new Error('사용할 수 없는 기능이거나 로그인이 필요합니다.');
	return new Error(error.message);
};

/** 인증 메일의 링크가 돌아올 주소. Supabase 대시보드의 Redirect URLs 에 등록되어 있어야 한다. */
const getAdminPageUrl = () => `${window.location.origin}/admin`;

const isEmailRateLimited = (error: AuthError) =>
	error.status === 429 || error.code === 'over_email_send_rate_limit' || error.code === 'over_request_rate_limit';

/** 로그인 실패를 화면 문장으로 바꾼다. 이메일 확인 전·횟수 제한은 비밀번호 오류와 구분해서 알린다. */
export const getLoginErrorMessage = (error: AuthError): string => {
	if (error.code === 'email_not_confirmed') {
		return '이메일 확인이 끝나지 않은 계정입니다. 받은 메일의 링크를 누르거나, 최종 관리자에게 계정을 다시 추가해 달라고 요청하십시오.';
	}
	if (isEmailRateLimited(error)) return '로그인 시도가 너무 많습니다. 잠시 후 다시 시도하십시오.';
	return '이메일 또는 비밀번호가 올바르지 않습니다.';
};

const assertPasswordLength = (password: string) => {
	if (password.length < MIN_PASSWORD_LENGTH) {
		throw new Error(`비밀번호는 ${MIN_PASSWORD_LENGTH}자 이상이어야 합니다.`);
	}
};

export const fetchAccounts = async (): Promise<AdminAccount[]> => {
	const { data, error } = await getSupabaseBrowserClient().rpc('admin_list_accounts');
	if (error) throw toAccountError(error);
	return ((data ?? []) as AccountRow[]).map(row => ({
		id: row.id,
		email: row.email,
		isSuper: row.is_super,
		mustChangePassword: row.must_change_password,
		isConfirmed: row.is_confirmed,
	}));
};

export const deleteAccount = async (accountId: string): Promise<void> => {
	const { error } = await getSupabaseBrowserClient().rpc('admin_delete_account', { target: accountId });
	if (error) throw toAccountError(error);
};

/**
 * 관리자 계정을 추가한다. 모든 새 관리자는 같은 초기 비밀번호(DB 에 보관)로 가입시키고,
 * 첫 로그인에서 비밀번호를 바꾸도록 표시한다. 가입(signUp)은 일회용 클라이언트로 해서 지금 로그인한 세션이 바뀌지 않게 한다.
 * 프로젝트에서 이메일 확인이 켜져 있으면 새 관리자가 확인 메일의 링크를 눌러야 로그인할 수 있다.
 */
export const createAdminAccount = async (email: string): Promise<CreateAdminResult> => {
	const client = getSupabaseBrowserClient();
	const { data: initialPassword, error: passwordError } = await client.rpc('admin_initial_password');
	if (passwordError) throw toAccountError(passwordError);

	// initial_password 는 가입 확인 메일 템플릿({{ .Data.initial_password }})에서 꺼내 새 관리자에게 보낸다.
	// 비밀번호를 바꾸면 DB 함수가 이 값을 지운다 (20261105090000_admin_self_service.sql).
	const { data, error } = await createIsolatedSupabaseClient().auth.signUp({
		email,
		password: initialPassword as string,
		options: { emailRedirectTo: getAdminPageUrl(), data: { initial_password: initialPassword as string } },
	});
	if (error) {
		if (/signups? not allowed|signup.*disabled/i.test(error.message)) {
			throw new Error(
				'현재 Supabase 에서 회원가입이 꺼져 있어 계정을 만들 수 없습니다. 가입을 켜거나, 대시보드에서 계정을 만든 뒤 다시 추가하십시오.',
			);
		}
		throw new Error(error.message);
	}
	// 관리자로 지정하면서 이메일 확인도 함께 끝내므로 메일이 도착하지 않아도 초기 비밀번호로 로그인할 수 있다
	// (20261109090000_admin_confirm_email.sql).
	// 이미 가입된 이메일은 오류 대신 identities 가 빈 사용자로 응답한다 (계정 존재 여부를 숨기는 Supabase 동작).
	const isExistingAccount = !data.user || (data.user.identities?.length ?? 0) === 0;

	const { error: grantError } = await client.rpc('admin_grant_admin', { target_email: email });
	if (grantError) throw toAccountError(grantError);

	return { initialPassword: isExistingAccount ? null : (initialPassword as string) };
};

/** 본인 비밀번호를 바꾼다. 바꾼 뒤 로그인 정보를 새로 받아 "초기 비밀번호 변경 필요" 표시를 없앤다. */
export const changeOwnPassword = async (newPassword: string): Promise<void> => {
	assertPasswordLength(newPassword);
	const client = getSupabaseBrowserClient();
	const { error } = await client.rpc('admin_change_own_password', { new_password: newPassword });
	if (error) throw toAccountError(error);
	const { error: refreshError } = await client.auth.refreshSession();
	if (refreshError) throw new Error('비밀번호는 바꿨지만 로그인 정보를 갱신하지 못했습니다. 다시 로그인하십시오.');
};

/** 본인 계정을 탈퇴한다. 현재 비밀번호를 다시 확인하고, 끝나면 로그아웃한다. */
export const deleteOwnAccount = async (currentPassword: string): Promise<void> => {
	const client = getSupabaseBrowserClient();
	const { error } = await client.rpc('admin_delete_own_account', { current_password: currentPassword });
	if (error) throw toAccountError(error);
	// 계정이 이미 지워져 서버 쪽 로그아웃은 실패할 수 있으므로 이 브라우저의 세션만 지운다.
	await client.auth.signOut({ scope: 'local' });
};

/** 로그인 화면의 "비밀번호 찾기": 재설정 링크를 메일로 보낸다. 가입 여부는 알리지 않는다. */
export const sendPasswordResetEmail = async (email: string): Promise<void> => {
	const { error } = await getSupabaseBrowserClient().auth.resetPasswordForEmail(email, {
		redirectTo: getAdminPageUrl(),
	});
	if (!error) return;
	if (isEmailRateLimited(error)) {
		throw new Error('메일을 너무 자주 요청했습니다. 잠시(최대 1시간) 후 다시 시도하십시오.');
	}
	throw new Error(`재설정 메일을 보내지 못했습니다. 잠시 후 다시 시도하십시오. (${error.message})`);
};
