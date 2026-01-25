// @src/pages/About/index

import * as S from '@styles/pages/About/About.style';
import AboutTitle from '@pages/About/AboutTitle';
import AboutPolicy from '@pages/About/AboutPolicy';

const SECTION_TITLE = {
	POLICY: {
		TITLE_KR: '저작권',
		TITLE_EN: 'POLICY & RIGHTS',
	},
} as const;

const About = () => {
	return (
		<S.MainContainer>
			<AboutTitle />
			<AboutPolicy {...SECTION_TITLE.POLICY} />
		</S.MainContainer>
	);
};
export default About;
