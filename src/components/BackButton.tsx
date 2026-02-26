// @components/BackButton.tsx

import * as S from '@/styles/components/Buttons.style';

import { useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

interface BackButtonProps {
	to?: string;
}

const BackButton = ({ to }: BackButtonProps) => {
	const navigate = useNavigate();
	const location = useLocation();

	const handleBack = useCallback(() => {
		if (to) {
			navigate(to);
			return;
		}

		if (window.history.length <= 1 || location.key === 'default') {
			navigate('/');
		} else {
			navigate(-1);
		}
	}, [to, navigate, location.key]);

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
