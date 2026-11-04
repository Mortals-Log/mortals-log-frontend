// @/lib/supabase-browser
// 브라우저용 Supabase 클라이언트 (공개 키). 관리자 로그인 세션을 localStorage 에 보관한다.
// 공개 키만 쓰므로 권한은 전적으로 RLS 가 정한다. service_role 키는 브라우저 코드에서 절대 쓰지 않는다.

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;
let publicClient: SupabaseClient | null = null;

const getSupabaseEnv = () => {
	const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
	if (!url || !publishableKey) {
		throw new Error('NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY 가 설정되지 않았습니다.');
	}
	return { url, publishableKey };
};

export const getSupabaseBrowserClient = (): SupabaseClient => {
	if (client) return client;

	const { url, publishableKey } = getSupabaseEnv();
	client = createClient(url, publishableKey);
	return client;
};

/**
 * 세션을 저장하지 않는 일회용 클라이언트. 새 계정 가입(signUp)처럼 지금 로그인한 관리자의 세션을 바꾸면 안 되는
 * 작업에 쓴다. 호출할 때마다 새로 만든다.
 */
export const createIsolatedSupabaseClient = (): SupabaseClient => {
	const { url, publishableKey } = getSupabaseEnv();
	return createClient(url, publishableKey, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false,
			storageKey: 'mortals-log-isolated',
		},
	});
};

/**
 * 로그인 세션 없이 공개 키로만 읽는 클라이언트. 관리자 세션이 있어도 방문자와 똑같이 "공개된 행"만 보이므로,
 * 지금 배포하면 사이트에 나타날 내용을 확인하는 데 쓴다. 세션을 저장하지 않는다.
 */
export const getSupabasePublicClient = (): SupabaseClient => {
	if (publicClient) return publicClient;

	const { url, publishableKey } = getSupabaseEnv();
	publicClient = createClient(url, publishableKey, {
		auth: {
			persistSession: false,
			autoRefreshToken: false,
			detectSessionInUrl: false,
			storageKey: 'mortals-log-public',
		},
	});
	return publicClient;
};
