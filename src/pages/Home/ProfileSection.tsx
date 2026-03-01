// @/pages/Home/ProfileSection

import * as S from '@/styles/pages/Home/ProfileSection.style';

import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROFILE } from '@/const/profile';
import { EVENT_INTERVIEW } from '@/const/event';
import { GetSnsLabel, GetSnsUrl } from '@/utils/snsUrl';

const ProfileSection = () => {
	const navigate = useNavigate();
	const [currentIdx, setCurrentIdx] = useState(0);
	const [isPaused, setIsPaused] = useState(false);

	const interviewQuotes = useMemo(() => {
		return EVENT_INTERVIEW.flatMap(yearGroup => yearGroup.items.filter(item => item.quote));
	}, []);
	const hasQuotes = interviewQuotes.length > 0;
	const currentItem = hasQuotes ? interviewQuotes[currentIdx] : null;

	const jobDisplay = useMemo(() => PROFILE.job.join(' & '), []);

	const currentItemSnsInfo = useMemo(() => {
		if (!currentItem) return null;

		const isFullLink = currentItem.link?.startsWith('http');
		const url = isFullLink ? currentItem.link : (GetSnsUrl(currentItem.platform ?? '', currentItem.link) ?? undefined);

		return {
			url,
			label: GetSnsLabel(currentItem.platform, currentItem.host, currentItem.content),
		};
	}, [currentItem]);

	useEffect(() => {
		if (isPaused || !hasQuotes) return;

		const timer = setInterval(() => {
			setCurrentIdx(prev => (prev + 1) % interviewQuotes.length);
		}, 4000);

		return () => clearInterval(timer);
	}, [isPaused, hasQuotes, interviewQuotes.length]);

	return (
		<S.ProfileSection>
			<S.BackgroundText>{PROFILE.enName}</S.BackgroundText>

			<S.SectionWrapper>
				<S.ImageSection>
					<S.MainImage src={PROFILE.mainImage} alt={PROFILE.name} />
					<S.HanjaBadge>{PROFILE.hanjaName}</S.HanjaBadge>
				</S.ImageSection>

				<S.TextSection>
					{currentItem && currentItemSnsInfo && (
						<S.ModifierContainer onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
							{currentItemSnsInfo.url ? (
								<S.ModifierLink to={currentItemSnsInfo.url} target="_blank" rel="noreferrer">
									{currentItemSnsInfo.label}
								</S.ModifierLink>
							) : (
								<S.ModifierLink to="/" target="_blank" rel="noreferrer" $disabled={true}>
									{currentItemSnsInfo.label}
								</S.ModifierLink>
							)}
							<S.ModifierText key={currentItem.quote}>{currentItem.quote}</S.ModifierText>
						</S.ModifierContainer>
					)}

					<S.NameSection>
						<S.ArtistName>{PROFILE.name}</S.ArtistName>
						<S.JobBadge>{jobDisplay}</S.JobBadge>
					</S.NameSection>

					<S.ProfileDescription>{PROFILE.description}</S.ProfileDescription>

					<S.ViewMoreButton onClick={() => navigate('/profile')}>READ PROFILE LOG</S.ViewMoreButton>
				</S.TextSection>
			</S.SectionWrapper>
		</S.ProfileSection>
	);
};

export default ProfileSection;
