// @src/pages/home/index

import * as S from '@styles/pages/Home.style';
import { VerticalBar } from '@styles/components/VerticalBar.style';
import { NAME, METADATA } from '@const/contents';
import Information from './InformationSection';
import ProfileSection from './ProfileSection';

const Home = () => {
	return (
		<S.MainContainer>
			<S.HeroSection initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
				<header>
					<S.Description>{METADATA.DESCRIPTION}</S.Description>
					<S.MainTitle>{NAME.KOREAN}</S.MainTitle>

					<S.SubTitleContainer
						initial={{ width: 0, opacity: 0 }}
						animate={{ width: '100%', opacity: 1 }}
						transition={{ delay: 0.8, duration: 1.5, ease: 'easeInOut' }}>
						<S.SubTitleWrapper>
							<S.SubTitle>{NAME.ENGLISH}</S.SubTitle>
							<VerticalBar>|</VerticalBar>
							<S.SubTitle>{NAME.HANJA}</S.SubTitle>
							<VerticalBar>|</VerticalBar>
							<S.SubTitle>{NAME.SOCIALID}</S.SubTitle>
						</S.SubTitleWrapper>
					</S.SubTitleContainer>
				</header>

				<Information />
			</S.HeroSection>

			<S.SectionWrapper>
				<ProfileSection />
			</S.SectionWrapper>
		</S.MainContainer>
	);
};

export default Home;
