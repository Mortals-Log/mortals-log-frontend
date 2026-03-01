// @/components/BacdgeList

import * as S from '@/styles/components/Badge.style';

import { Track } from '@/types/track';

export const BADGE_LABEL = {
	TITLE: 'TITLE',
	CHORDS: 'CRORDS',
	MV: 'MV',
	ADULT: '🔞 미성년자 이용불가',
	TJ: 'TJ',
	KY: 'KY',
} as const;

interface TrackBadgeListProps {
	track: Track;
}

const TrackBadgeList = ({ track }: TrackBadgeListProps) => {
	const badges = [
		{ show: track.isLead, component: S.LeadBadge, label: BADGE_LABEL.TITLE },
		{ show: track.mvLink, component: S.MVBadge, label: BADGE_LABEL.MV },
		{ show: track.chordsList && track.chordsList.length > 0, component: S.ChordBadge, label: BADGE_LABEL.CHORDS },
		{ show: track.ageLimit, component: S.AdultBadge, label: BADGE_LABEL.ADULT },
	];

	return (
		<S.BadgeGroup>
			{badges.map((badge, i) => badge.show && <badge.component key={i}>{badge.label}</badge.component>)}

			{track.singing?.tj && (
				<S.SingingBadge brand="TJ">
					{BADGE_LABEL.TJ} {track.singing.tj}
				</S.SingingBadge>
			)}

			{track.singing?.ky && (
				<S.SingingBadge brand="KY">
					{BADGE_LABEL.KY} {track.singing.ky}
				</S.SingingBadge>
			)}
		</S.BadgeGroup>
	);
};

export default TrackBadgeList;
