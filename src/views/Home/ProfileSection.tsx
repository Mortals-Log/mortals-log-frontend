'use client';

// @/pages/Home/ProfileSection

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/utils/cn';
import { VIEW_MORE_BUTTON, SOURCE_LINK, SOURCE_LINK_DISABLED } from '@/const/component-classes';
import {
	PS_SECTION,
	PS_BACKGROUND_TEXT,
	PS_SECTION_WRAPPER,
	PS_IMAGE_SECTION,
	PS_MAIN_IMAGE,
	PS_HANJA_BADGE,
	PS_TEXT_SECTION,
	PS_MODIFIER_CONTAINER,
	PS_MODIFIER_LINK_EXTRA,
	PS_MODIFIER_TEXT,
	PS_NAME_SECTION,
	PS_ARTIST_NAME,
	PS_JOB_BADGE,
	PS_PROFILE_DESCRIPTION,
} from './home-classes';
import { PROFILE } from '@/const/profile';
import { EVENT_INTERVIEW } from '@/const/event';
import { GetSnsLabel, GetSnsUrl } from '@/utils/snsUrl';

const ProfileSection = () => {
	const router = useRouter();
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
		<section className={PS_SECTION}>
			<div className={PS_BACKGROUND_TEXT}>{PROFILE.enName}</div>

			<div className={PS_SECTION_WRAPPER}>
				<div className={PS_IMAGE_SECTION}>
					<img className={PS_MAIN_IMAGE} src={PROFILE.mainImage} alt={PROFILE.name} />
					<div className={PS_HANJA_BADGE}>{PROFILE.hanjaName}</div>
				</div>

				<div className={PS_TEXT_SECTION}>
					{currentItem && currentItemSnsInfo && (
						<div
							className={PS_MODIFIER_CONTAINER}
							onMouseEnter={() => setIsPaused(true)}
							onMouseLeave={() => setIsPaused(false)}>
							{currentItemSnsInfo.url ? (
								<Link
									href={currentItemSnsInfo.url}
									target="_blank"
									rel="noreferrer"
									className={cn(SOURCE_LINK, PS_MODIFIER_LINK_EXTRA)}>
									{currentItemSnsInfo.label}
								</Link>
							) : (
								<Link
									href="/"
									target="_blank"
									rel="noreferrer"
									className={cn(SOURCE_LINK, PS_MODIFIER_LINK_EXTRA, SOURCE_LINK_DISABLED)}>
									{currentItemSnsInfo.label}
								</Link>
							)}
							<p className={PS_MODIFIER_TEXT} key={currentItem.quote}>
								{currentItem.quote}
							</p>
						</div>
					)}

					<div className={PS_NAME_SECTION}>
						<div className={PS_ARTIST_NAME}>{PROFILE.name}</div>
						<span className={PS_JOB_BADGE}>{jobDisplay}</span>
					</div>

					<div className={PS_PROFILE_DESCRIPTION}>{PROFILE.description}</div>

					<button className={VIEW_MORE_BUTTON} onClick={() => router.push('/profile')}>
						READ PROFILE LOG
					</button>
				</div>
			</div>
		</section>
	);
};

export default ProfileSection;
