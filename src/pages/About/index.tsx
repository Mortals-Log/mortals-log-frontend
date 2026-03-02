// @/pages/About

import * as S from '@/styles/pages/About/About.style';

import { useEffect } from 'react';
import AboutTitle from '@/pages/About/AboutTitle';
import AboutPolicySection from '@/pages/About/AboutPolicySection';
import AboutInquirySection from '@/pages/About/AboutInquirySection';
import { UpdateMetaTags } from '@/utils/meta';
import { METADATA } from '@/const/contents';

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
	useEffect(() => {
		const pageTitle = `${METADATA.NAME} | About`;
		const description = `${METADATA.NAME}의 저작권 정책 및 문의 정보를 확인하세요.`;

		UpdateMetaTags(pageTitle, description, undefined, 'website');

		return () => {
			UpdateMetaTags(METADATA.NAME, METADATA.DESCRIPTION, undefined, 'website');
		};
	}, []);

	return (
		<S.MainContainer>
			<AboutTitle />
			<AboutPolicySection {...SECTION_TITLE.POLICY} />
			<AboutInquirySection {...SECTION_TITLE.INQUIRY} />
		</S.MainContainer>
	);
};
export default About;
