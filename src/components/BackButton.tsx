'use client';

// @/components/BackButton

import * as S from '@/styles/components/Buttons.style';

import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface BackButtonProps {
	to?: string;
}

const BackButton = ({ to }: BackButtonProps) => {
	const router = useRouter();

	const handleBack = useCallback(() => {
		if (to) {
			router.push(to);
			return;
		}

		if (window.history.length <= 1) {
			router.push('/');
		} else {
			router.back();
		}
	}, [to, router]);

	const buttonLabel = useMemo(() => {
		if (to) {
			const listName = to.replace('/', '').toUpperCase();
			return `GO TO ${listName} LIST`;
		}
		return 'BACK TO PAGE';
	}, [to]);

	return (
		<S.BackButton onClick={handleBack} aria-label={buttonLabel}>
			{buttonLabel}
		</S.BackButton>
	);
};

export default BackButton;
