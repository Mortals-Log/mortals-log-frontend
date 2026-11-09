'use client';

// @/views/Admin
// 관리자 페이지: 로그인 → 테이블별 목록·추가·수정. 배포는 헤더 버튼으로 한다.

import { useEffect, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import type { Session } from '@supabase/supabase-js';
import { LAYOUT_MAIN, LAYOUT_MAIN_TITLE, LAYOUT_SUB_TITLE, LAYOUT_DESCRIPTION } from '@/const/layout-classes';
import { getLoginErrorMessage, sendPasswordResetEmail } from '@/apis/admin/accounts';
import { isAdminUser, isSuperAdminUser, mustChangePassword } from '@/lib/admin';
import { getSupabaseBrowserClient } from '@/lib/supabase-browser';
import { cn } from '@/utils/cn';
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS, SECONDARY_BUTTON_CLASS } from './admin-classes';
import { ADMIN_TABLES, ALBUMS, TRACK_CHORDS } from './admin-tables';
import AccountsPanel from './AccountsPanel';
import { AdminActionsProvider, HeaderDraftButton, useAdminActions } from './AdminActions';
import { AdminDraftsProvider, useAdminDrafts } from './AdminDrafts';
import { AdminLookupsProvider, useAdminLookups } from './AdminLookups';
import AlbumBundleForm from './AlbumBundleForm';
import ChangePasswordForm from './ChangePasswordForm';
import DeployDialog from './DeployDialog';
import TableEditor from './TableEditor';
import TrackMediaEditor from './TrackMediaEditor';

// 환경변수가 빠진 배포에서 화면이 깨지지 않고 이유를 보여주도록 클라이언트 생성 실패를 문구로 바꾼다.
const getSetupError = (): { setupError: string | null } => {
	try {
		getSupabaseBrowserClient();
		return { setupError: null };
	} catch (error) {
		return { setupError: error instanceof Error ? error.message : '설정을 확인하십시오.' };
	}
};

// 사이트 전역 규칙이 h1~h3 를 세리프로 지정하므로, 관리자 화면 안의 제목도 본문과 같은 Pretendard 로 되돌린다.
const ADMIN_FONT_CLASS = 'font-sans [&_h1]:font-sans [&_h2]:font-sans [&_h3]:font-sans';

/**
 * 인증 메일 링크가 실패해서 돌아온 경우(주소 뒤 #error_code=...)의 안내. 메일 앱이 링크를 미리 열어 보면
 * 한 번만 쓸 수 있는 링크가 먼저 소모되어 otp_expired 로 돌아오기도 한다.
 */
const getAuthLinkError = (): string | null => {
	if (typeof window === 'undefined') return null;
	const params = new URLSearchParams(window.location.hash.slice(1));
	const errorCode = params.get('error_code');
	if (!errorCode) return null;
	if (errorCode === 'otp_expired') {
		return '메일의 링크가 만료되었거나 이미 사용되었습니다. "비밀번호 찾기"로 새 링크를 받아 바로 눌러 주십시오.';
	}
	return `메일의 링크로 로그인하지 못했습니다. (${params.get('error_description') ?? errorCode})`;
};

const ACCOUNTS_TAB = 'accounts';
// 곡의 노래방 번호·뮤직비디오를 각각 고치는 탭 (테이블 하나에 대응하지 않아 ADMIN_TABLES 에 없다)
const KARAOKE_TAB = 'track-karaoke';
const VIDEO_TAB = 'track-video';

interface AdminWorkspaceProps {
	currentUserId: string;
	currentEmail: string;
	isSuper: boolean;
}

// 계정 탭은 모든 관리자에게 보인다 (일반 관리자는 "내 계정", 최종 관리자는 관리자 추가·삭제까지).
const AdminWorkspace = ({ currentUserId, currentEmail, isSuper }: AdminWorkspaceProps) => {
	const { isReady, errorMessage } = useAdminLookups();
	const { drafts } = useAdminDrafts();
	const { activeTab, setActiveTab } = useAdminActions();
	const activeConfig = ADMIN_TABLES.find(config => config.table === activeTab);

	// "노래방·MV" 탭은 곡 관련 탭(곡, 코드) 바로 뒤에 둔다.
	const tabs = ADMIN_TABLES.flatMap(config => {
		const draftCount = drafts.filter(draft => draft.scope === config.table).length;
		const tab = {
			id: config.table,
			label: `${config.tabLabel ?? config.label}${draftCount > 0 ? ` (임시 ${draftCount})` : ''}`,
		};
		return config.table === TRACK_CHORDS.table
			? [tab, { id: KARAOKE_TAB, label: '노래방' }, { id: VIDEO_TAB, label: 'MV' }]
			: [tab];
	}).concat({ id: ACCOUNTS_TAB, label: isSuper ? '계정 관리' : '내 계정' });

	return (
		<div className="flex flex-col gap-6">
			{/* 스크롤해도 사이트 상단 바(60px) 아래에 붙어 따라온다 */}
			<nav className="sticky top-15 z-30 flex gap-1 overflow-x-auto border-b border-gray-200 bg-white">
				{tabs.map(tab => (
					<button
						key={tab.id}
						type="button"
						onClick={() => setActiveTab(tab.id)}
						className={cn(
							'min-h-11 whitespace-nowrap border-b-2 px-4 py-2 font-sans text-base',
							activeTab === tab.id ? 'border-primary font-medium text-primary' : 'border-transparent text-gray-500',
						)}>
						{tab.label}
					</button>
				))}
			</nav>

			{errorMessage && <p className="text-base text-pink-600">{errorMessage}</p>}
			{!isReady && !errorMessage && <p className="text-base text-gray-500">불러오는 중...</p>}

			{activeTab === ACCOUNTS_TAB && (
				<AccountsPanel currentUserId={currentUserId} currentEmail={currentEmail} isSuper={isSuper} />
			)}
			{isReady && activeTab === KARAOKE_TAB && <TrackMediaEditor key={KARAOKE_TAB} kind="karaoke" />}
			{isReady && activeTab === VIDEO_TAB && <TrackMediaEditor key={VIDEO_TAB} kind="video" />}
			{isReady && activeConfig && (
				<TableEditor
					key={activeConfig.table}
					config={activeConfig}
					renderForm={activeConfig.table === ALBUMS.table ? props => <AlbumBundleForm {...props} /> : undefined}
				/>
			)}
		</div>
	);
};

const AdminConsole = ({ session, onLogout }: { session: Session; onLogout: () => void }) => (
	<AdminActionsProvider initialTab={ADMIN_TABLES[0].table}>
		<AdminLookupsProvider>
			<AdminDraftsProvider>
				<div className="mt-12 flex flex-col gap-6">
					<div className="flex flex-wrap items-center justify-between gap-3">
						<p className={cn(LAYOUT_DESCRIPTION, 'm-0 max-tablet:m-0 break-all')}>로그인 계정: {session.user.email}</p>
						<div className="flex flex-wrap gap-2">
							<HeaderDraftButton />
							<DeployDialog accessToken={session.access_token} />
							<button type="button" onClick={onLogout} className={SECONDARY_BUTTON_CLASS}>
								로그아웃
							</button>
						</div>
					</div>

					<AdminWorkspace
						currentUserId={session.user.id}
						currentEmail={session.user.email ?? ''}
						isSuper={isSuperAdminUser(session.user)}
					/>
				</div>
			</AdminDraftsProvider>
		</AdminLookupsProvider>
	</AdminActionsProvider>
);

const Admin = () => {
	// undefined: 확인 중 / null: 로그아웃 상태
	const [session, setSession] = useState<Session | null | undefined>(undefined);
	// 비밀번호 찾기 메일의 링크로 들어온 상태. Supabase 클라이언트가 주소의 토큰을 지우기 전에 읽어야 해서 가장 먼저 둔다.
	const [isRecovering, setIsRecovering] = useState(
		() => typeof window !== 'undefined' && window.location.hash.includes('type=recovery'),
	);
	const [authLinkError] = useState(getAuthLinkError);
	const [{ setupError }] = useState(getSetupError);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isForgotMode, setIsForgotMode] = useState(false);

	useEffect(() => {
		if (setupError) return;
		const { data } = getSupabaseBrowserClient().auth.onAuthStateChange((event, nextSession) => {
			if (event === 'PASSWORD_RECOVERY') setIsRecovering(true);
			setSession(nextSession);
		});
		return () => data.subscription.unsubscribe();
	}, [setupError]);

	const handleLogin = async (event: FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);
		const { error } = await getSupabaseBrowserClient().auth.signInWithPassword({ email, password });
		setIsSubmitting(false);
		if (error) toast.error(getLoginErrorMessage(error));
		setPassword('');
	};

	// 존재하는 이메일인지는 알리지 않는다 (계정 확인용으로 악용되지 않게 항상 같은 안내).
	const handleSendReset = async (event: FormEvent) => {
		event.preventDefault();
		setIsSubmitting(true);
		try {
			await sendPasswordResetEmail(email.trim());
			toast.success('가입된 이메일이라면 비밀번호 재설정 링크를 보냈습니다. 메일함을 확인하십시오.');
			setIsForgotMode(false);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '재설정 메일을 보내지 못했습니다.');
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleLogout = () => {
		void getSupabaseBrowserClient().auth.signOut();
	};

	const isAdmin = session ? isAdminUser(session.user) : false;
	const isFirstLogin = session ? mustChangePassword(session.user) : false;

	return (
		<main className={cn(LAYOUT_MAIN, ADMIN_FONT_CLASS, isAdmin && 'max-w-5xl')}>
			<span className={LAYOUT_SUB_TITLE}>ADMIN</span>
			<div className={cn(LAYOUT_MAIN_TITLE, 'font-sans')}>관리자</div>

			{setupError && <p className="mt-16 text-base text-pink-600">{setupError}</p>}

			{session === undefined && !setupError && <p className="mt-16 text-base text-gray-500">확인 중...</p>}

			{session === null && authLinkError && <p className="mt-16 text-base text-pink-600">{authLinkError}</p>}

			{session === null && !isForgotMode && (
				<form onSubmit={handleLogin} className="mt-16 flex max-w-sm flex-col gap-3">
					<input
						type="email"
						value={email}
						onChange={event => setEmail(event.target.value)}
						placeholder="이메일"
						autoComplete="username"
						required
						className={INPUT_CLASS}
					/>
					<input
						type="password"
						value={password}
						onChange={event => setPassword(event.target.value)}
						placeholder="비밀번호"
						autoComplete="current-password"
						required
						className={INPUT_CLASS}
					/>
					<button type="submit" disabled={isSubmitting} className={PRIMARY_BUTTON_CLASS}>
						{isSubmitting ? '로그인 중...' : '로그인'}
					</button>
					<button
						type="button"
						onClick={() => setIsForgotMode(true)}
						className="min-h-11 self-start text-sm text-gray-500 underline">
						비밀번호 찾기
					</button>
				</form>
			)}

			{session === null && isForgotMode && (
				<form onSubmit={handleSendReset} className="mt-16 flex max-w-sm flex-col gap-3">
					<p className="text-sm text-gray-500">
						가입한 이메일을 입력하면 비밀번호를 다시 정할 수 있는 링크를 보내 드립니다.
					</p>
					<input
						type="email"
						value={email}
						onChange={event => setEmail(event.target.value)}
						placeholder="이메일"
						autoComplete="username"
						required
						className={INPUT_CLASS}
					/>
					<button type="submit" disabled={isSubmitting} className={PRIMARY_BUTTON_CLASS}>
						{isSubmitting ? '보내는 중...' : '재설정 링크 보내기'}
					</button>
					<button
						type="button"
						onClick={() => setIsForgotMode(false)}
						className="min-h-11 self-start text-sm text-gray-500 underline">
						로그인으로 돌아가기
					</button>
				</form>
			)}

			{session && isRecovering && (
				<div className="mt-16 flex flex-col items-start gap-4">
					<p className="text-base text-gray-700">새 비밀번호를 정하십시오. ({session.user.email})</p>
					<ChangePasswordForm
						idPrefix="recovery"
						submitLabel="새 비밀번호 저장"
						onChanged={() => setIsRecovering(false)}
					/>
				</div>
			)}

			{session && !isRecovering && isFirstLogin && (
				<div className="mt-16 flex flex-col items-start gap-4">
					<p className="text-base text-gray-700">
						처음 로그인하셨습니다. 계속하려면 초기 비밀번호를 본인만 아는 비밀번호로 바꿔야 합니다. (
						{session.user.email})
					</p>
					<ChangePasswordForm idPrefix="first-login" submitLabel="비밀번호 변경하고 시작" />
					<button type="button" onClick={handleLogout} className={SECONDARY_BUTTON_CLASS}>
						로그아웃
					</button>
				</div>
			)}

			{session && !isRecovering && !isFirstLogin && !isAdmin && (
				<div className="mt-16 flex flex-col items-start gap-4">
					<p className="text-base text-gray-600">관리자 권한이 없는 계정입니다. ({session.user.email})</p>
					<button type="button" onClick={handleLogout} className={SECONDARY_BUTTON_CLASS}>
						로그아웃
					</button>
				</div>
			)}

			{session && !isRecovering && isAdmin && <AdminConsole session={session} onLogout={handleLogout} />}
		</main>
	);
};

export default Admin;
