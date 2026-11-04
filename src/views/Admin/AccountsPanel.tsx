'use client';

// @/views/Admin/AccountsPanel
// 계정 탭. 모든 관리자에게 "내 계정"(비밀번호 변경, 탈퇴)이 보이고, 최종 관리자에게는 "관리자 계정"(추가·삭제)이 더 보인다.
// 화면에서 숨기는 것은 편의이고, 실제 권한은 DB 함수가 호출자를 다시 확인한다 (@/apis/admin/accounts).

import { useEffect, useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import {
	createAdminAccount,
	deleteAccount,
	deleteOwnAccount,
	fetchAccounts,
	type AdminAccount,
} from '@/apis/admin/accounts';
import { cn } from '@/utils/cn';
import {
	BADGE_CLASS,
	BADGE_TONE_CLASS,
	INPUT_CLASS,
	PRIMARY_BUTTON_CLASS,
	SECONDARY_BUTTON_CLASS,
	SMALL_BUTTON_CLASS,
} from './admin-classes';
import ChangePasswordForm from './ChangePasswordForm';

const getMessage = (error: unknown, fallback: string) => (error instanceof Error ? error.message : fallback);

const SECTION_TITLE_CLASS = 'font-sans text-xl font-semibold text-gray-700';

const MyAccountSection = ({ email }: { email: string }) => {
	const [currentPassword, setCurrentPassword] = useState('');
	const [isDeleting, setIsDeleting] = useState(false);

	const handleDeleteOwnAccount = async (event: FormEvent) => {
		event.preventDefault();
		if (
			!window.confirm(
				`${email} 계정을 탈퇴합니다. 이 계정은 더 이상 로그인할 수 없으며 되돌릴 수 없습니다. 정말 탈퇴하시겠습니까?`,
			)
		) {
			return;
		}
		setIsDeleting(true);
		try {
			await deleteOwnAccount(currentPassword);
			toast.success('계정을 탈퇴했습니다.');
		} catch (error) {
			toast.error(getMessage(error, '계정을 탈퇴하지 못했습니다.'));
			setIsDeleting(false);
		}
	};

	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-1">
				<h2 className={SECTION_TITLE_CLASS}>내 계정</h2>
				<p className="break-all text-sm text-gray-500">{email}</p>
			</div>

			<div className="flex flex-col gap-3 rounded-md border border-gray-200 p-4">
				<h3 className="text-base font-semibold text-gray-700">비밀번호 변경</h3>
				<p className="text-sm text-gray-500">
					변경하면 이 기기를 제외한 다른 기기의 로그인은 끊깁니다. 비밀번호를 잊으셨다면 로그아웃한 뒤 로그인 화면의
					"비밀번호 찾기"를 이용하십시오.
				</p>
				<ChangePasswordForm idPrefix="my-account" />
			</div>

			<form onSubmit={handleDeleteOwnAccount} className="flex flex-col gap-3 rounded-md border border-gray-200 p-4">
				<h3 className="text-base font-semibold text-gray-700">계정 탈퇴</h3>
				<p className="text-sm text-gray-500">
					탈퇴하면 이 계정으로 더 이상 로그인할 수 없고 되돌릴 수 없습니다. 지금까지 수정한 콘텐츠는 그대로 남습니다.
					마지막 최종 관리자는 탈퇴할 수 없습니다.
				</p>
				<label htmlFor="delete-own-password" className="text-sm font-medium text-gray-600">
					현재 비밀번호
				</label>
				<input
					id="delete-own-password"
					type="password"
					value={currentPassword}
					autoComplete="current-password"
					required
					disabled={isDeleting}
					onChange={event => setCurrentPassword(event.target.value)}
					className={cn(INPUT_CLASS, 'max-w-sm')}
				/>
				<button
					type="submit"
					disabled={isDeleting || currentPassword === ''}
					className={cn(SECONDARY_BUTTON_CLASS, 'self-start text-pink-600')}>
					{isDeleting ? '탈퇴 중...' : '계정 탈퇴'}
				</button>
			</form>
		</section>
	);
};

interface LoadResult {
	accounts: AdminAccount[] | null;
	errorMessage: string | null;
}

const AdminAccountsSection = ({ currentUserId }: { currentUserId: string }) => {
	const [reloadCount, setReloadCount] = useState(0);
	const [result, setResult] = useState<LoadResult | null>(null);
	const [busyId, setBusyId] = useState<string | null>(null);
	const [email, setEmail] = useState('');
	const [isCreating, setIsCreating] = useState(false);
	/** 방금 추가한 계정 안내 (초기 비밀번호는 이 화면을 벗어나면 사라진다) */
	const [created, setCreated] = useState<{ email: string; initialPassword: string | null } | null>(null);

	useEffect(() => {
		let isCancelled = false;
		fetchAccounts()
			.then((accounts): LoadResult => ({ accounts, errorMessage: null }))
			.catch((error: unknown): LoadResult => ({
				accounts: null,
				errorMessage: getMessage(error, '계정 목록을 불러오지 못했습니다.'),
			}))
			.then(next => {
				if (!isCancelled)
					setResult(previous => ({
						accounts: next.accounts ?? previous?.accounts ?? null,
						errorMessage: next.errorMessage,
					}));
			});
		return () => {
			isCancelled = true;
		};
	}, [reloadCount]);

	const reload = () => setReloadCount(count => count + 1);

	const handleCreate = async (event: FormEvent) => {
		event.preventDefault();
		const targetEmail = email.trim();
		setIsCreating(true);
		setCreated(null);
		try {
			const { initialPassword } = await createAdminAccount(targetEmail);
			setCreated({ email: targetEmail, initialPassword });
			setEmail('');
		} catch (error) {
			toast.error(getMessage(error, '계정을 추가하지 못했습니다.'));
		} finally {
			setIsCreating(false);
			reload();
		}
	};

	const handleDelete = async (account: AdminAccount) => {
		if (
			!window.confirm(
				`${account.email} 계정을 삭제합니다. 이 계정은 더 이상 로그인할 수 없으며 되돌릴 수 없습니다. 진행하시겠습니까?`,
			)
		) {
			return;
		}
		setBusyId(account.id);
		try {
			await deleteAccount(account.id);
			toast.success('계정을 삭제했습니다.');
			reload();
		} catch (error) {
			toast.error(getMessage(error, '계정을 삭제하지 못했습니다.'));
		} finally {
			setBusyId(null);
		}
	};

	return (
		<section className="flex flex-col gap-6">
			<div className="flex flex-col gap-1">
				<h2 className={SECTION_TITLE_CLASS}>관리자 계정</h2>
				<p className="text-sm text-gray-500">
					최종 관리자만 볼 수 있는 영역입니다. 관리자 계정을 추가하거나 삭제할 수 있고, 다른 관리자의 비밀번호는 바꿀 수
					없습니다.
				</p>
			</div>

			<form onSubmit={handleCreate} className="flex flex-col gap-3 rounded-md border border-gray-200 p-4">
				<h3 className="text-base font-semibold text-gray-700">관리자 계정 추가</h3>
				<label htmlFor="new-admin-email" className="text-sm font-medium text-gray-600">
					이메일
				</label>
				<input
					id="new-admin-email"
					type="email"
					value={email}
					autoComplete="off"
					required
					disabled={isCreating}
					onChange={event => setEmail(event.target.value)}
					className={cn(INPUT_CLASS, 'max-w-sm')}
				/>
				<p className="text-sm text-gray-500">
					추가하면 모든 새 관리자에게 같은 초기 비밀번호가 설정되고, 입력한 이메일로 안내 메일이 발송됩니다. 새 관리자는
					메일의 링크로 이메일을 확인한 뒤 처음 로그인할 때 반드시 비밀번호를 바꿔야 하며, 바꾸기 전에는 콘텐츠를 수정할
					수 없습니다.
				</p>
				<button type="submit" disabled={isCreating} className={cn(PRIMARY_BUTTON_CLASS, 'self-start')}>
					{isCreating ? '추가 중...' : '관리자 계정 추가'}
				</button>

				{created && (
					<div className="flex flex-col gap-2 rounded-md bg-gray-50 p-3">
						<p className="break-all text-sm font-medium text-gray-700">{created.email} 계정을 추가했습니다.</p>
						{created.initialPassword ? (
							<>
								<p className="text-sm text-gray-600">
									초기 비밀번호를 {created.email} 로 발송했습니다. 새 관리자는 메일의 링크로 이메일을 확인한 뒤 로그인할
									수 있습니다.
								</p>
								<p className="text-sm text-gray-500">
									메일이 도착하지 않으면 스팸함을 확인하고, 그래도 없으면 아래 초기 비밀번호를 직접 전달하십시오. 이
									안내는 화면을 벗어나면 다시 표시되지 않습니다.
								</p>
								<p className="text-sm text-gray-600">
									초기 비밀번호: <code className="rounded bg-white px-2 py-1 font-mono">{created.initialPassword}</code>
								</p>
							</>
						) : (
							<p className="text-sm text-gray-500">
								이미 가입된 이메일이라 관리자 권한만 부여했습니다. 해당 사용자가 기존 비밀번호로 로그인하면 비밀번호를
								새로 정하도록 안내됩니다.
							</p>
						)}
					</div>
				)}
			</form>

			<div className="flex flex-col gap-3">
				<h3 className="text-base font-semibold text-gray-700">
					관리자 목록{' '}
					{result?.accounts ? <span className="font-normal text-gray-500">{result.accounts.length}명</span> : null}
				</h3>
				{result === null && <p className="text-base text-gray-500">불러오는 중...</p>}
				{result?.errorMessage && <p className="text-base text-pink-600">{result.errorMessage}</p>}
				<ul className="flex flex-col gap-3">
					{result?.accounts?.map(account => {
						const isSelf = account.id === currentUserId;
						return (
							<li
								key={account.id}
								className="flex flex-wrap items-center justify-between gap-3 rounded-md border border-gray-200 bg-white p-4">
								<div className="flex min-w-0 flex-col gap-2">
									<p className="break-all text-base font-semibold text-gray-700">{account.email}</p>
									<div className="flex flex-wrap gap-2">
										<span
											className={cn(BADGE_CLASS, account.isSuper ? BADGE_TONE_CLASS.primary : BADGE_TONE_CLASS.green)}>
											{account.isSuper ? '최종 관리자' : '관리자'}
										</span>
										{isSelf && <span className={cn(BADGE_CLASS, BADGE_TONE_CLASS.blue)}>현재 로그인</span>}
										{account.mustChangePassword && (
											<span className={cn(BADGE_CLASS, BADGE_TONE_CLASS.yellow)}>초기 비밀번호 미변경</span>
										)}
										{!account.isConfirmed && (
											<span className={cn(BADGE_CLASS, BADGE_TONE_CLASS.yellow)}>이메일 미확인</span>
										)}
									</div>
								</div>
								{!account.isSuper && !isSelf && (
									<button
										type="button"
										disabled={busyId === account.id}
										onClick={() => void handleDelete(account)}
										className={cn(SMALL_BUTTON_CLASS, 'text-pink-600')}>
										{busyId === account.id ? '삭제 중...' : '삭제'}
									</button>
								)}
							</li>
						);
					})}
				</ul>
			</div>
		</section>
	);
};

interface AccountsPanelProps {
	currentUserId: string;
	currentEmail: string;
	isSuper: boolean;
}

const AccountsPanel = ({ currentUserId, currentEmail, isSuper }: AccountsPanelProps) => (
	<div className="flex max-w-2xl flex-col gap-12">
		<MyAccountSection email={currentEmail} />
		{isSuper && <AdminAccountsSection currentUserId={currentUserId} />}
	</div>
);

export default AccountsPanel;
