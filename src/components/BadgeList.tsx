// @src/components/Track/TrackBadgeList

import * as S from '@/styles/components/Badge.style';

import { Track } from '@/types/track';

export const BADGE_LABEL = {
	TITLE: 'TITLE',
	CHORDS: 'CRORDS',
	MV: 'MV',
	ADULT: '🔞 미성년자 청취불가',
	TJ: 'TJ',
	KY: 'KY',
} as const;

interface TrackBadgeListProps {
	track: Track;
}

const TrackBadgeList = ({ track }: TrackBadgeListProps) => {
	return (
		<S.BadgeGroup>
			{track.isLead && <S.LeadBadge>{BADGE_LABEL.TITLE}</S.LeadBadge>}

			{track.mvLink && <S.MVBadge>{BADGE_LABEL.MV}</S.MVBadge>}

			{track.chordsList && track.chordsList.length > 0 && <S.ChordBadge>{BADGE_LABEL.CHORDS}</S.ChordBadge>}

			{track.ageLimit && <S.AdultBadge>{BADGE_LABEL.ADULT}</S.AdultBadge>}

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
