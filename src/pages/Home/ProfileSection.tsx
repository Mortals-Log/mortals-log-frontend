// @pages/Home/ProfileSection

import * as S from '@/styles/pages/Home/ProfileSection.style';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MODIFIERS, PROFILE } from '@/const/profile';
import { GetSnsLabel, GetSnsUrl } from '@/utils/snsUrl';

const ProfileSection = () => {
	const navigate = useNavigate();
	const [currentIdx, setCurrentIdx] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	const hasModifiers = MODIFIERS.length > 0;
	const currentModifier = hasModifiers ? MODIFIERS[currentIdx] : null;
	const { content, platform, account, contentTitle, postId } = PROFILE.description;

	useEffect(() => {
		if (isPaused || !hasModifiers) return;

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
							<S.SourceLink
								href={GetSnsUrl(currentModifier.platform, currentModifier.postId) ?? undefined}
								$disabled={!GetSnsUrl(currentModifier.platform, currentModifier.postId)}
								target="_blank"
								rel="noreferrer">
								{GetSnsLabel(currentModifier.platform, currentModifier.account, currentModifier.contentTitle)}
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
						<S.SourceLink
							href={GetSnsUrl(platform, postId) ?? undefined}
							$disabled={!GetSnsUrl(platform, postId)}
							target="_blank"
							rel="noreferrer">
							{GetSnsLabel(platform, account, contentTitle)}
						</S.SourceLink>
					</S.DescriptionContainer>

					<S.ViewMoreButton onClick={() => navigate('/profile')}>READ PROFILE LOG</S.ViewMoreButton>
				</S.TextSection>
			</S.SectionWrapper>
		</S.ProfileContainer>
	);
};

export default ProfileSection;
