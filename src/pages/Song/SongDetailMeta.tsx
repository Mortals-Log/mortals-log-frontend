// @pages/Song/SongDetail

import * as S from '@/styles/pages/Song/SongDetailMeta.styles';
import { useCallback, useMemo } from 'react';
import { NAME } from '@/const/profile';
import { ICON_CONFIG } from '@/const/icons';
import { IconKey } from '@/types/icon';
import { Track } from '@/types/track';
import { Album } from '@/types/album';

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
		<S.MetaSection>
			<S.CreditList>
				{creditItems.map(item => (
					<S.CreditItem key={item.label}>
						<S.ItemLabel>{item.label}</S.ItemLabel>
						<span>{item.value}</span>
					</S.CreditItem>
				))}

				{track.singing && (
					<S.CreditItem>
						<S.ItemLabel>노래방</S.ItemLabel>

						<S.SingingWrapper>
							{singingList.map(({ brand, number }) => (
								<S.SingingBadge key={brand} brand={brand as 'TJ' | 'KY'}>
									<span className="brand">{brand}</span>
									<span className="number">{number}</span>
								</S.SingingBadge>
							))}
						</S.SingingWrapper>
					</S.CreditItem>
				)}
			</S.CreditList>

			{/* 앨범 streaming으로 임시 사용 */}
			{albumInfo?.streaming && (
				<S.StreamingSection>
					<S.ItemLabel>스트리밍</S.ItemLabel>
					<S.BadgeGroup>
						{Object.entries(albumInfo.streaming).map(([label, url]) => {
							const key = label.toLowerCase().replace(/\s+/g, '') as IconKey;
							const config = ICON_CONFIG[key];
							const Icon = config?.icon;

							if (!Icon || !url) return null;

							return (
								<S.MusicBadge key={label} href={url} target="_blank" rel="noreferrer" title={config.label || label}>
									<Icon />
									<span>{label}</span>
								</S.MusicBadge>
							);
						})}
					</S.BadgeGroup>
				</S.StreamingSection>
			)}
		</S.MetaSection>
	);
};

export default SongDetailMeta;
