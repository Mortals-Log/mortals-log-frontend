'use client';

// @/components/BackButton

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
		<button
			onClick={handleBack}
			aria-label={buttonLabel}
			className="py-1 mb-[1.2rem] font-sans text-sm font-medium text-gray-400 cursor-pointer transition-colors duration-200 before:content-['←'] before:mr-1.5 hover:text-primary active:scale-[0.98] max-tablet:mb-4 max-tablet:text-sm max-mobile:mb-2 max-mobile:text-xs print:hidden">
			{buttonLabel}
		</button>
	);
};

export default BackButton;
