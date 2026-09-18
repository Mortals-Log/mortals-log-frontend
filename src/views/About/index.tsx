'use client';

// @/views/About

import { LAYOUT_MAIN } from '@/const/layout-classes';

import AboutTitle from '@/views/About/AboutTitle';
import AboutPolicySection from '@/views/About/AboutPolicySection';
import AboutInquirySection from '@/views/About/AboutInquirySection';

const SECTION_TITLE = {
	POLICY: {
		TITLE_KR: '저작권',
		TITLE_EN: 'POLICY & RIGHTS',
	},
	INQUIRY: {
		TITLE_KR: '문의',
		TITLE_EN: 'INQUIRY',
	},
} as const;

const About = () => {
	return (
		<main className={LAYOUT_MAIN}>
			<AboutTitle />
			<AboutPolicySection {...SECTION_TITLE.POLICY} />
			<AboutInquirySection {...SECTION_TITLE.INQUIRY} />
		</main>
	);
};
export default About;
