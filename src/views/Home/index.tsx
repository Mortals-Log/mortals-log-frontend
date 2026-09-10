'use client';

// @/views/Home

import { motion } from 'framer-motion';
import InformationSection from '@/views/Home/InformationSection';
import ProfileSection from '@/views/Home/ProfileSection';
import { METADATA } from '@/const/contents';
import { NAME } from '@/const/profile';
import {
	HOME_MAIN,
	HOME_HERO_SECTION,
	HOME_DESCRIPTION,
	HOME_MAIN_TITLE,
	HOME_SUBTITLE_CONTAINER,
	HOME_SUBTITLE_WRAPPER,
	HOME_SUBTITLE,
} from './home-classes';

const Home = () => {
	return (
		<main className={HOME_MAIN}>
			<motion.section
				className={HOME_HERO_SECTION}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1.5 }}>
				<header>
					<span className={HOME_DESCRIPTION}>{METADATA.DESCRIPTION}</span>
					<h1 className={HOME_MAIN_TITLE}>{NAME.KOREAN}</h1>

					<motion.div
						className={HOME_SUBTITLE_CONTAINER}
						initial={{ width: 0, opacity: 0 }}
						animate={{ width: '100%', opacity: 1 }}
						transition={{ delay: 0.8, duration: 1.5, ease: 'easeInOut' }}>
						<div className={HOME_SUBTITLE_WRAPPER}>
							<span className={HOME_SUBTITLE}>{NAME.ENGLISH}</span>
							<span className={HOME_SUBTITLE}>{NAME.HANJA}</span>
							<span className={HOME_SUBTITLE}>{NAME.SOCIALID}</span>
						</div>
					</motion.div>
				</header>

				<InformationSection />
			</motion.section>

			<ProfileSection />
		</main>
	);
};

export default Home;
