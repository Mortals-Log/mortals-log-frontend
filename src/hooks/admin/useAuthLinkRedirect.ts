// @/hooks/admin/useAuthLinkRedirect
// Supabase 인증 메일(비밀번호 재설정·가입 확인)의 링크가 관리자 페이지가 아닌 곳으로 열렸을 때 관리자 페이지로 보낸다.
// 요청한 주소(redirectTo)가 Supabase 의 Redirect URLs 에 없으면 Site URL(사이트 첫 화면)로 돌아오는데,
// 첫 화면에는 로그인 처리가 없어서 링크를 눌러도 아무 일도 일어나지 않던 문제를 막는다.

import { useEffect } from 'react';

const ADMIN_PATH = '/admin';
// 인증 링크가 주소 뒤(#)에 붙여 보내는 값: 로그인 토큰 또는 오류
const AUTH_HASH_PATTERN = /(^#|&)(access_token|error_code)=/;

export const useAuthLinkRedirect = () => {
	useEffect(() => {
		const { pathname, hash } = window.location;
		if (pathname.startsWith(ADMIN_PATH) || !AUTH_HASH_PATTERN.test(hash)) return;
		window.location.replace(`${ADMIN_PATH}${hash}`);
	}, []);
};
