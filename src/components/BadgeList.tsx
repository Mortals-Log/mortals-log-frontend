// @/components/BadgeList

import { Track } from '@/types/track';
import { cn } from '@/utils/cn';

export const BADGE_LABEL = {
	TITLE: 'TITLE',
	CHORDS: 'CRORDS',
	MV: 'MV',
	ADULT: '🔞 미성년자 이용불가',
	TJ: 'TJ',
	KY: 'KY',
	CD: 'CD 한정',
} as const;

const BASE_BADGE =
	'inline-flex items-center justify-center py-1 px-1.5 rounded flex-shrink-0 whitespace-nowrap font-sans text-tiny font-medium tracking-[0.02em] max-tablet:py-0.5 max-tablet:px-1';

interface TrackBadgeListProps {
	track: Track;
}

const TrackBadgeList = ({ track }: TrackBadgeListProps) => {
	const badges = [
		{ show: track.isLead, className: cn(BASE_BADGE, 'bg-primary text-white'), label: BADGE_LABEL.TITLE },
		{ show: track.mvLink, className: cn(BASE_BADGE, 'bg-yellow-600 text-gray-700'), label: BADGE_LABEL.MV },
		{
			show: track.chordsList && track.chordsList.length > 0,
			className: cn(BASE_BADGE, 'bg-gray-700 text-white'),
			label: BADGE_LABEL.CHORDS,
		},
		{
			show: track.ageLimit,
			className: cn(BASE_BADGE, 'border border-primary bg-primary/20 text-xs text-primary'),
			label: BADGE_LABEL.ADULT,
		},
		{ show: track.cdOnly, className: cn(BASE_BADGE, 'bg-primary text-white'), label: BADGE_LABEL.CD },
	];

	return (
		<div className="flex flex-wrap gap-[0.3rem] max-tablet:gap-[0.2rem]">
			{badges.map(
				(badge, i) =>
					badge.show && (
						<span key={i} className={badge.className}>
							{badge.label}
						</span>
					),
			)}

			{track.singing?.tj && (
				<span className={cn(BASE_BADGE, 'bg-tj text-white')}>
					{BADGE_LABEL.TJ} {track.singing.tj}
				</span>
			)}

			{track.singing?.ky && (
				<span className={cn(BASE_BADGE, 'bg-ky text-white')}>
					{BADGE_LABEL.KY} {track.singing.ky}
				</span>
			)}
		</div>
	);
};

export default TrackBadgeList;
