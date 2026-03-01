// @/pages/Home

import * as S from '@/styles/pages/Home/Home.style';

import InformationSection from '@/pages/Home/InformationSection';
import ProfileSection from '@/pages/Home/ProfileSection';
import { METADATA } from '@/const/contents';
import { NAME } from '@/const/profile';

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
							<S.SubTitle>{NAME.HANJA}</S.SubTitle>
							<S.SubTitle>{NAME.SOCIALID}</S.SubTitle>
						</S.SubTitleWrapper>
					</S.SubTitleContainer>
				</header>

				<InformationSection />
			</S.HeroSection>

			<ProfileSection />
		</S.MainContainer>
	);
};

export default Home;
