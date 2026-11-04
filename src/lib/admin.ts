// @/lib/admin
// 관리자 판별. app_metadata 는 서버(대시보드·service_role)만 쓸 수 있어서 사용자가 바꿀 수 없다.
// (user_metadata 는 가입자가 직접 바꿀 수 있으므로 쓰지 않는다. DB 의 public.is_admin() 과 같은 기준)

import type { User } from '@supabase/supabase-js';

const hasAdminRole = (user: User | null | undefined): boolean => user?.app_metadata?.role === 'admin';

/**
 * 초기 비밀번호를 아직 바꾸지 않은 관리자. 새 관리자는 첫 로그인에서 비밀번호를 바꿔야 하고,
 * 바꾸기 전에는 DB(is_admin())도 관리자로 인정하지 않는다.
 */
export const mustChangePassword = (user: User | null | undefined): boolean =>
	hasAdminRole(user) && user?.app_metadata?.must_change_password === true;

export const isAdminUser = (user: User | null | undefined): boolean => hasAdminRole(user) && !mustChangePassword(user);

/**
 * 최종 관리자: 관리자이면서 app_metadata.super 가 true 인 계정. 관리자 계정을 관리할 수 있다.
 * 화면을 보여줄지 정하는 용도일 뿐이고, 실제 권한은 DB 함수(public.is_super_admin())가 다시 확인한다.
 */
export const isSuperAdminUser = (user: User | null | undefined): boolean =>
	isAdminUser(user) && user?.app_metadata?.super === true;
