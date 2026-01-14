import * as S from '@styles/pages/Home.style';
import Information from './Information';

const Home = () => {
	return (
		<S.MainContainer>
			<S.BackgroundNoise />

			<S.HeroSection initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}>
				<header>
					<S.Category>천진우 팬페이지</S.Category>
					<S.MainTitle>천진우</S.MainTitle>

					<S.SubTitleContainer
						initial={{ width: 0, opacity: 0 }}
						animate={{ width: '100%', opacity: 1 }}
						transition={{ delay: 0.8, duration: 1.5, ease: 'easeInOut' }}>
						<S.SubTitleWrapper>
							<S.SubTitle>CHUN JINWOO</S.SubTitle>
							<S.VerticalBar>|</S.VerticalBar>
							<S.SubTitle>千鎭宇</S.SubTitle>
							<S.VerticalBar>|</S.VerticalBar>
							<S.SubTitle>1000 Jinwoo</S.SubTitle>
						</S.SubTitleWrapper>
					</S.SubTitleContainer>
				</header>

				<Information />
			</S.HeroSection>

			<S.ScrollIndicator>
				<p>SCROLL</p>
				<div className="line" />
			</S.ScrollIndicator>
		</S.MainContainer>
	);
};

export default Home;
