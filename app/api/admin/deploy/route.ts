// POST /api/admin/deploy
// 관리자 페이지의 "배포" 버튼이 부르는 서버 라우트. Vercel Deploy Hook 을 대신 호출한다.
// Hook URL 은 주소 자체가 비밀번호라서 서버 환경변수(VERCEL_DEPLOY_HOOK_URL)에만 두고 브라우저로 내보내지 않는다.
// 호출자가 관리자인지는 요청의 Supabase 액세스 토큰을 Auth 서버에 확인해서 판단한다.

import { createClient } from '@supabase/supabase-js';
import { isAdminUser } from '@/lib/admin';

const respond = (status: number, message: string) => Response.json({ message }, { status });

export const POST = async (request: Request) => {
	const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
	const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;
	if (!supabaseUrl || !publishableKey) return respond(500, '서버에 Supabase 환경변수가 없습니다.');

	const token = request.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
	if (!token) return respond(401, '로그인이 필요합니다.');

	const supabase = createClient(supabaseUrl, publishableKey, {
		auth: { persistSession: false, autoRefreshToken: false },
	});
	const { data, error } = await supabase.auth.getUser(token);
	if (error || !data.user) return respond(401, '로그인이 만료되었습니다. 다시 로그인하십시오.');
	if (!isAdminUser(data.user)) return respond(403, '관리자 권한이 없습니다.');

	// 인증을 통과한 관리자에게만 설정 누락을 알린다.
	const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
	if (!hookUrl) return respond(500, '서버에 VERCEL_DEPLOY_HOOK_URL 환경변수가 없습니다.');

	try {
		const hookResponse = await fetch(hookUrl, { method: 'POST' });
		if (!hookResponse.ok) return respond(502, `Vercel 이 배포 요청을 거절했습니다 (${hookResponse.status}).`);
	} catch {
		return respond(502, 'Vercel 에 연결하지 못했습니다. 잠시 후 다시 시도하십시오.');
	}

	return respond(200, '배포를 요청했습니다.');
};
