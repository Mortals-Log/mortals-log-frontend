'use client';

// @/views/Admin/ChangePasswordForm
// 본인 비밀번호를 새로 정하는 폼. 세 곳에서 쓴다: 내 계정 탭, 첫 로그인(초기 비밀번호 변경), 비밀번호 찾기 링크로 들어왔을 때.

import { useState, type FormEvent } from 'react';
import toast from 'react-hot-toast';
import { changeOwnPassword, MIN_PASSWORD_LENGTH } from '@/apis/admin/accounts';
import { cn } from '@/utils/cn';
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS } from './admin-classes';

interface ChangePasswordFormProps {
	/** 같은 화면에 폼이 둘 이상 생겨도 id 가 겹치지 않게 하는 접두사 */
	idPrefix: string;
	submitLabel?: string;
	onChanged?: () => void;
}

const ChangePasswordForm = ({ idPrefix, submitLabel = '비밀번호 변경', onChanged }: ChangePasswordFormProps) => {
	const [newPassword, setNewPassword] = useState('');
	const [confirmation, setConfirmation] = useState('');
	const [isSaving, setIsSaving] = useState(false);

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (newPassword !== confirmation) {
			toast.error('새 비밀번호와 확인 입력이 다릅니다.');
			return;
		}
		setIsSaving(true);
		try {
			await changeOwnPassword(newPassword);
			toast.success('비밀번호를 변경했습니다.');
			setNewPassword('');
			setConfirmation('');
			onChanged?.();
		} catch (error) {
			toast.error(error instanceof Error ? error.message : '비밀번호를 변경하지 못했습니다.');
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex max-w-sm flex-col gap-3">
			<label htmlFor={`${idPrefix}-new`} className="text-sm font-medium text-gray-600">
				새 비밀번호 ({MIN_PASSWORD_LENGTH}자 이상)
			</label>
			<input
				id={`${idPrefix}-new`}
				type="password"
				value={newPassword}
				autoComplete="new-password"
				required
				disabled={isSaving}
				onChange={event => setNewPassword(event.target.value)}
				className={INPUT_CLASS}
			/>
			<label htmlFor={`${idPrefix}-confirm`} className="text-sm font-medium text-gray-600">
				새 비밀번호 확인
			</label>
			<input
				id={`${idPrefix}-confirm`}
				type="password"
				value={confirmation}
				autoComplete="new-password"
				required
				disabled={isSaving}
				onChange={event => setConfirmation(event.target.value)}
				className={INPUT_CLASS}
			/>
			<button type="submit" disabled={isSaving} className={cn(PRIMARY_BUTTON_CLASS, 'self-start')}>
				{isSaving ? '변경 중...' : submitLabel}
			</button>
		</form>
	);
};

export default ChangePasswordForm;
