// @/components/TrackRow

import React from 'react';
import TrackBadgeList from '@/components/BadgeList';
import { Track } from '@/types/track';
import { ICON_CONFIG } from '@/const/icons';
import { cn } from '@/utils/cn';

interface TrackRowProps {
	track: Track;
	album?: string;
	index: number;
	onClick: (id: string) => void;
	onKeyDown: (e: React.KeyboardEvent, id: string) => void;
	variant?: 'song' | 'album';
}

const VARIANT = {
	song: {
		item: 'flex items-center cursor-pointer transition-all duration-200 py-4 px-6 border border-gray-100 rounded-[10px] hover:border-primary max-tablet:py-[0.8rem] max-tablet:px-4 max-mobile:py-[0.8rem] max-mobile:px-4',
		number:
			'flex-shrink-0 text-center font-normal w-[25px] mr-6 font-serif text-sm text-primary max-tablet:mr-[1.2rem] max-mobile:mr-4',
		title:
			'flex items-center gap-2 mb-1 font-sans text-md font-normal text-gray-700 flex-wrap [word-break:keep-all] leading-[1.4] [&_.title-text]:whitespace-pre-wrap [&_.title-text]:[word-break:keep-all]',
	},
	album: {
		item: 'flex items-baseline cursor-pointer transition-all duration-200 py-6 px-4 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 max-tablet:py-[1.2rem] max-tablet:px-4 max-mobile:py-[1.2rem] max-mobile:px-4',
		number:
			'flex-shrink-0 text-center font-normal w-[30px] font-sans text-sm text-gray-500 max-tablet:text-xs max-mobile:text-xs',
		title:
			'flex items-center flex-wrap [word-break:keep-all] gap-2 leading-[1.4] font-sans font-normal text-gray-700 text-md max-tablet:text-sm max-mobile:text-sm',
	},
} as const;

const CD_ONLY_CLASS = 'opacity-60 cursor-default pointer-events-none grayscale-[0.5]';

const TrackRow = React.memo(({ track, album, index, onClick, onKeyDown, variant = 'song' }: TrackRowProps) => {
	const styles = VARIANT[variant];
	const trackIdx = String(index + 1).padStart(2, '0');

	const iconConfig = ICON_CONFIG['lock'];
	const Icon = iconConfig?.icon;

	return (
		<div
			className={cn(styles.item, track.cdOnly && CD_ONLY_CLASS)}
			onClick={() => onClick(track.id)}
			onKeyDown={e => onKeyDown(e, track.id)}
			role="button"
			tabIndex={0}>
			<span className={styles.number}>{trackIdx}</span>
			<div className="flex min-w-0 flex-1 flex-col gap-px">
				<div className={styles.title}>
					<span className="title-text">
						{track.cdOnly && Icon && <Icon width={16} height={16} className="inline-block align-middle" />}
						{track.title}
						{track.version && <span className="version"> ({track.version})</span>}
					</span>
					<TrackBadgeList track={track} />
				</div>
				{variant === 'song' && (
					<div className="font-sans text-sm font-normal text-gray-500 whitespace-pre-wrap [word-break:keep-all] max-tablet:text-xs">
						{album}
					</div>
				)}
			</div>
		</div>
	);
});

export default TrackRow;
