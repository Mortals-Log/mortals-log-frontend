// @pages/components/TrackRow.ts

import * as S from '@styles/components/TrackRow.style';

import React from 'react';
import TrackBadgeList from '@/components/BadgeList';

interface TrackRowProps {
	track: any;
	index: number;
	onClick: (id: string) => void;
	onKeyDown: (e: React.KeyboardEvent, id: string) => void;
	variant?: 'song' | 'album';
}

const TrackRow = React.memo(({ track, index, onClick, onKeyDown, variant = 'song' }: TrackRowProps) => {
	const SSet = S.STYLES[variant];
	const trackIdx = String(index + 1).padStart(2, '0');

	return (
		<SSet.TrackItem
			onClick={() => onClick(track.id)}
			onKeyDown={e => onKeyDown(e, track.id)}
			role="button"
			tabIndex={0}>
			<SSet.TrackNumber>{trackIdx}</SSet.TrackNumber>
			<S.TrackInfo>
				<SSet.TrackTitle>
					<span className="title-text">
						{track.title}
						{track.version && <span className="version"> ({track.version})</span>}
					</span>
					<TrackBadgeList track={track} />
				</SSet.TrackTitle>
				{variant === 'song' && <S.AlbumName>{track.albumTitle}</S.AlbumName>}
			</S.TrackInfo>
		</SSet.TrackItem>
	);
});

export default TrackRow;
