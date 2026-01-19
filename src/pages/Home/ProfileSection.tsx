// @pages/Home/ProfileSection

import * as S from '@styles/pages/ProfileSection.style';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROFILE, MODIFIERS, SNS_PLATFORMS } from '@const/contents';

const ProfileSection = () => {
	const navigate = useNavigate();
	const [currentIdx, setCurrentIdx] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	const hasModifiers = MODIFIERS.length > 0;
	const currentModifier = hasModifiers ? MODIFIERS[currentIdx] : null;
	const { content, platform, account, contentTitle, postId } = PROFILE.description;

	const getSnsUrl = (id: string) => `${SNS_PLATFORMS.INSTAGRAM.BASE_URL}${id}`;
	const getSnsLabel = (plat: string, acc: string, title: string) => `${plat}@${acc}, ${title}`;

	useEffect(() => {
		if (isPaused) return;

		const timer = setInterval(() => {
			setCurrentIdx(prev => (prev + 1) % MODIFIERS.length);
		}, 4000);

		return () => clearInterval(timer);
	}, [isPaused, hasModifiers]);

	return (
		<S.ProfileContainer>
			<S.BackgroundText>{PROFILE.enName}</S.BackgroundText>

			<S.SectionWrapper>
				<S.ImageSection>
					<S.MainImage src={PROFILE.mainImage} alt={PROFILE.name} />
					<S.HanjaBadge>{PROFILE.hanjaName}</S.HanjaBadge>
				</S.ImageSection>

				<S.TextSection>
					{currentModifier && (
						<S.ModifierContainer onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
							<S.SourceLink href={getSnsUrl(currentModifier.postId)} target="_blank" rel="noreferrer">
								{getSnsLabel(currentModifier.platform, currentModifier.account, currentModifier.contentTitle)}
							</S.SourceLink>
							<S.ModifierText key={currentModifier.content}>{currentModifier.content}</S.ModifierText>
						</S.ModifierContainer>
					)}

					<S.NameSection>
						<S.ArtistName>{PROFILE.name}</S.ArtistName>
						<S.JobBadge>{PROFILE.job.join(' & ')}</S.JobBadge>
					</S.NameSection>

					<S.DescriptionContainer>
						<S.ProfileDescription>{content}</S.ProfileDescription>
						<S.SourceLink href={getSnsUrl(postId)} target="_blank" rel="noreferrer">
							{getSnsLabel(platform, account, contentTitle)}
						</S.SourceLink>
					</S.DescriptionContainer>

					<S.ViewMoreBtn onClick={() => navigate('/profile')}>READ PROFILE LOG</S.ViewMoreBtn>
				</S.TextSection>
			</S.SectionWrapper>
		</S.ProfileContainer>
	);
};

export default ProfileSection;
