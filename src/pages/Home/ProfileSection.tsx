// @pages/Home/ProfileSection

import * as S from '@/styles/pages/Home/ProfileSection.style';
import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROFILE } from '@/const/profile';
import { GetSnsLabel, GetSnsUrl } from '@/utils/snsUrl';
import { EVENT_INTERVIEW } from '@/const/event';

const ProfileSection = () => {
	const navigate = useNavigate();
	const [currentIdx, setCurrentIdx] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	const interviewQuotes = useMemo(() => {
		return EVENT_INTERVIEW.flatMap(yearGroup => yearGroup.items.filter(item => item.quote));
	}, []);
	const hasQuotes = interviewQuotes.length > 0;
	const currentItem = hasQuotes ? interviewQuotes[currentIdx] : null;

	const { content, platform, account, contentTitle, postId } = PROFILE.description;

	useEffect(() => {
		if (isPaused || !hasQuotes) return;

		const timer = setInterval(() => {
			setCurrentIdx(prev => (prev + 1) % interviewQuotes.length);
		}, 4000);

		return () => clearInterval(timer);
	}, [isPaused, hasQuotes, interviewQuotes.length]);

	return (
		<S.ProfileContainer>
			<S.BackgroundText>{PROFILE.enName}</S.BackgroundText>

			<S.SectionWrapper>
				<S.ImageSection>
					<S.MainImage src={PROFILE.mainImage} alt={PROFILE.name} />
					<S.HanjaBadge>{PROFILE.hanjaName}</S.HanjaBadge>
				</S.ImageSection>

				<S.TextSection>
					{currentItem && (
						<S.ModifierContainer onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
							<S.SourceLink
								href={GetSnsUrl(currentItem.platform ?? '', currentItem.link) ?? undefined}
								target="_blank"
								rel="noreferrer">
								{GetSnsLabel(currentItem.platform || '', currentItem.host, currentItem.content)}{' '}
							</S.SourceLink>
							<S.ModifierText key={currentItem.quote}>{currentItem.quote}</S.ModifierText>
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
