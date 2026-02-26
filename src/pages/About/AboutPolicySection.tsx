// @pages/About/AboutPolicySection

import * as S from '@/styles/pages/About/AboutPolicySection.style';

import { ABOUT_POLICY } from '@/const/about';

const AboutPolicy = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			{ABOUT_POLICY.SECTIONS.map((item, index) => (
				<S.PolicyItem key={index}>
					<div className="label">{item.label}</div>
					<div className="content">{item.content}</div>
				</S.PolicyItem>
			))}
		</S.ContentSection>
	);
};

export default AboutPolicy;
