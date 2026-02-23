// @pages/Song/TrackRow.ts

import * as S from '@styles/pages/Song/Song.styles';

import React from 'react';
import TrackBadgeList from '@/components/BadgeList';

interface TrackRowProps {
	track: any;
	index: number;
	onClick: (id: string) => void;
	onKeyDown: (e: React.KeyboardEvent, id: string) => void;
}

const TrackRow = React.memo(({ track, index, onClick, onKeyDown }: TrackRowProps) => {
	const trackIdx = String(index + 1).padStart(2, '0');

	return (
		<S.TrackItem onClick={() => onClick(track.id)} onKeyDown={e => onKeyDown(e, track.id)} role="button" tabIndex={0}>
			<S.TrackNumber>{trackIdx}</S.TrackNumber>
			<S.TrackInfo>
				<S.TrackTitle>
					<span className="title-text">
						{track.title}
						{track.version && <span className="version"> ({track.version})</span>}
					</span>
					<TrackBadgeList track={track} />
				</S.TrackTitle>
				<S.AlbumName>{track.albumTitle}</S.AlbumName>
			</S.TrackInfo>
		</S.TrackItem>
	);
});

export default TrackRow;
