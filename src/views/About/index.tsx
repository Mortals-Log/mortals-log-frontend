'use client';

// @/pages/About

import * as S from '@/styles/pages/About/About.style';

import AboutTitle from '@/pages/About/AboutTitle';
import AboutPolicySection from '@/pages/About/AboutPolicySection';
import AboutInquirySection from '@/pages/About/AboutInquirySection';

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
		<S.MainContainer>
			<AboutTitle />
			<AboutPolicySection {...SECTION_TITLE.POLICY} />
			<AboutInquirySection {...SECTION_TITLE.INQUIRY} />
	</S.MainContainer>
	);
};
export default About;
