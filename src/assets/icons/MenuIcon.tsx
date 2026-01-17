import { motion } from 'framer-motion';
import { useTheme } from '@emotion/react';

interface MenuIconProps {
	isOpen: boolean;
	color?: string;
}

const MenuIcon = ({ isOpen, color }: MenuIconProps) => {
	const theme = useTheme();
	const iconColor = color || theme.COLOR.BLACK;

	const variant = {
		top: {
			closed: { d: 'M 3 6 L 21 6' },
			opened: { d: 'M 5 5 L 19 19' },
		},
		middle: {
			closed: { opacity: 1 },
			opened: { opacity: 0 },
		},
		bottom: {
			closed: { d: 'M 3 18 L 21 18' },
			opened: { d: 'M 5 19 L 19 5' },
		},
	};

	return (
		<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
			<motion.path
				stroke={iconColor}
				strokeWidth="2"
				strokeLinecap="round"
				animate={isOpen ? variant.top.opened : variant.top.closed}
			/>
			<motion.path
				stroke={iconColor}
				strokeWidth="2"
				strokeLinecap="round"
				animate={isOpen ? variant.middle.opened : variant.middle.closed}
				d="M 3 12 L 21 12"
			/>
			<motion.path
				stroke={iconColor}
				strokeWidth="2"
				strokeLinecap="round"
				animate={isOpen ? variant.bottom.opened : variant.bottom.closed}
			/>
		</svg>
	);
};

export default MenuIcon;
