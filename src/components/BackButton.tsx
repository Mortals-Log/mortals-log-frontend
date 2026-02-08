// @components/BackButton.tsx

import { useNavigate } from 'react-router-dom';
import * as S from '@/styles/components/Buttons.style';

interface BackButtonProps {
	to?: string;
}

const BackButton = ({ to }: BackButtonProps) => {
	const navigate = useNavigate();

	const handleBack = () => {
		if (to) {
			navigate(to);
		} else {
			navigate(-1);
		}
	};

	return (
		<S.BackButton onClick={handleBack}>
			{to ? `GO TO ${to.toUpperCase().replace('/', '')} LIST` : `BACK TO PAGE`}
		</S.BackButton>
	);
};

export default BackButton;
