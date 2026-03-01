// @/pages/About/AboutInquirySection

import * as S from '@styles/pages/About/AboutInquirySection.style';
import { ABOUT_INQUIRY, ABOUT_INQUIRY_SUFFIX } from '@/const/about';

const AboutInquiry = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const suffix = ABOUT_INQUIRY_SUFFIX;

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.ButtonGrid>
				{Object.values(ABOUT_INQUIRY).map(item => (
					<S.InquiryButtn key={item.label} to={item.url} target="_blank" rel="noreferrer">
						{item.label}
						<span>
							{item.label}
							{suffix}
						</span>
					</S.InquiryButtn>
				))}
			</S.ButtonGrid>
		</S.ContentSection>
	);
};

export default AboutInquiry;
