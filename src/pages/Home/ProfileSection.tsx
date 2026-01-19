import { useState, useEffect } from 'react';
import * as S from '@styles/pages/ProfileSection';
import { PROFILE, MODIFIERS } from '@const/contents';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
	const navigate = useNavigate();
	const [currentIdx, setCurrentIdx] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const [text, source, url] = MODIFIERS[currentIdx];
	const [descText, descSource, descUrl] = PROFILE.description;

	useEffect(() => {
		if (isPaused) return;

		const timer = setInterval(() => {
			setCurrentIdx(prev => (prev + 1) % MODIFIERS.length);
		}, 4000);

		return () => clearInterval(timer);
	}, [isPaused]);

	return (
		<S.ProfileContainer>
			<S.BackgroundText>{PROFILE.enName}</S.BackgroundText>

			<S.SectionWrapper>
				<S.ImageSection>
					<S.MainImage src={PROFILE.mainImage} alt={PROFILE.name} />
					<S.HanjaBadge>{PROFILE.hanjaName}</S.HanjaBadge>
				</S.ImageSection>

				<S.TextSection>
					<S.ModifierContainer onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
						<S.SourceLink href={url} target="_blank" rel="noreferrer">
							{source}
						</S.SourceLink>
						<S.ModifierText key={text}>{text}</S.ModifierText>
					</S.ModifierContainer>

					<S.NameSection>
						<S.ArtistName>{PROFILE.name}</S.ArtistName>
						<S.JobBadge>{PROFILE.job.join(' & ')}</S.JobBadge>
					</S.NameSection>

					<S.DescriptionContainer>
						<S.Description>{descText}</S.Description>
						<S.SourceLink href={descUrl} target="_blank" rel="noreferrer">
							{descSource}
						</S.SourceLink>
					</S.DescriptionContainer>

					<S.ViewMoreBtn onClick={() => navigate('/profile')}>READ PROFILE LOG</S.ViewMoreBtn>
				</S.TextSection>
			</S.SectionWrapper>
		</S.ProfileContainer>
	);
};

export default ProfileSection;
