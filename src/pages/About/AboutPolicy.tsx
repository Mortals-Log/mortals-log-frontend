// @pages/About/AboutPolicy

import * as S from '@styles/pages/About/AboutPolicy.style';
import { ABOUT_POLICY } from '@const/about';

const AboutPolicy = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.Table>
				<tbody>
					{ABOUT_POLICY.SECTIONS.map((item, index) => (
						<S.PolicyItem key={index}>
							<td className="label">{item.label}</td>
							<td className="content-cell">
								<p className="content">{item.content}</p>
							</td>
						</S.PolicyItem>
					))}
				</tbody>
			</S.Table>
		</S.ContentSection>
	);
};

export default AboutPolicy;
