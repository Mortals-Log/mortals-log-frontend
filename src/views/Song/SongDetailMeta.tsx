// @/pages/Song/SongDetail

import { useCallback, useMemo } from 'react';
import { NAME } from '@/const/profile';
import { ICON_CONFIG } from '@/const/icons';
import { IconKey } from '@/types/icon';
import { Track } from '@/types/track';
import { Album } from '@/types/album';
import { MUSIC_BADGE, BADGE_GROUP } from '@/const/component-classes';
import {
	SDM_META_SECTION,
	SDM_CREDIT_LIST,
	SDM_ITEM_LABEL,
	SDM_CREDIT_ITEM,
	SDM_STREAMING_SECTION,
	SDM_SINGING_WRAPPER,
	sdmSingingBadge,
} from './song-detail-classes';

interface SongDetailMetaProps {
	track: Track;
	albumInfo: Album | null | undefined;
}

const SongDetailMeta = ({ track, albumInfo }: SongDetailMetaProps) => {
	const formattedDuration = useMemo(() => {
		if (!track.duration) return '-';
		const [min, sec] = track.duration.split(':');
		return `${min.padStart(2, '0')}:${sec}`;
	}, [track.duration]);

	const getCredit = useCallback((participants?: string[]) => {
		const artistName = NAME.KOREAN;
		if (!participants || participants.length === 0) return artistName;
		return [artistName, ...participants].join(', ');
	}, []);

	const creditItems = useMemo(
		() => [
			{ label: '재생시간', value: formattedDuration },
			{ label: '작사', value: getCredit(track.lyricist) },
			{ label: '작곡', value: getCredit(track.composer) },
			{ label: '편곡', value: getCredit(track.arranger) },
		],
		[formattedDuration, getCredit, track],
	);

	const singingList = useMemo(() => {
		if (!track.singing) return [];

		return Object.entries(track.singing)
			.filter(([number]) => !!number)
			.map(([brand, number]) => ({
				brand: brand.toUpperCase(),
				number,
			}));
	}, [track.singing]);

	return (
		<section className={SDM_META_SECTION}>
			<div className={SDM_CREDIT_LIST}>
				{creditItems.map(item => (
					<span className={SDM_CREDIT_ITEM} key={item.label}>
						<div className={SDM_ITEM_LABEL}>{item.label}</div>
						<span>{item.value}</span>
					</span>
				))}

				{track.singing && (
					<span className={SDM_CREDIT_ITEM}>
						<div className={SDM_ITEM_LABEL}>노래방</div>

						<div className={SDM_SINGING_WRAPPER}>
							{singingList.map(({ brand, number }) => (
								<div key={brand} className={sdmSingingBadge(brand as 'TJ' | 'KY')}>
									<span className="brand">{brand}</span>
									<span className="number">{number}</span>
								</div>
							))}
						</div>
					</span>
				)}
			</div>

			{/* 앨범 streaming으로 임시 사용 */}
			{albumInfo?.streaming && (
				<div className={SDM_STREAMING_SECTION}>
					<div className={SDM_ITEM_LABEL}>스트리밍</div>
					<div className={BADGE_GROUP}>
						{Object.entries(albumInfo.streaming).map(([label, url]) => {
							const key = label.toLowerCase().replace(/\s+/g, '') as IconKey;
							const config = ICON_CONFIG[key];
							const Icon = config?.icon;

							if (!Icon || !url) return null;

							return (
								<a
									key={label}
									href={url}
									target="_blank"
									rel="noreferrer"
									title={config.label || label}
									className={MUSIC_BADGE}>
									<Icon />
									<span>{label}</span>
								</a>
							);
						})}
					</div>
				</div>
			)}
		</section>
	);
};

export default SongDetailMeta;
