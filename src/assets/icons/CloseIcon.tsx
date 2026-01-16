import { motion } from 'framer-motion';
import { useTheme } from '@emotion/react';

interface CloseIconProps {
	color?: string;
	size?: number;
}

const CloseIcon = ({ color, size = 24 }: CloseIconProps) => {
	const theme = useTheme();
	const iconColor = color || theme.COLOR.BLACK;

	return (
		<motion.svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			whileHover={{ rotate: 90 }}
			transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
			<path d="M18 6L6 18M6 6L18 18" stroke={iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
		</motion.svg>
	);
};

export default CloseIcon;
