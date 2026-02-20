// @pages/Song/SongDetail

import * as S from '@styles/pages/Song/SongDetailMeta.styles';
import { IconKey } from '@/types/icon';
import { NAME } from '@/const/profile';
import { ICON_CONFIG } from '@/const/icons';
import { Track } from '@/types/track';
import { Album } from '@/types/album';

interface SongDetailMetaProps {
	track: Track;
	albumInfo: Album | null | undefined;
}

const SongDetailMeta = ({ track, albumInfo }: SongDetailMetaProps) => {
	const formatDuration = (duration?: string) => {
		if (!duration) return '-';

		const [min, sec] = duration.split(':');

		const formattedMin = min.padStart(2, '0');

		return `${formattedMin}:${sec}`;
	};

	const formatCredit = (externalParticipants?: string[]) => {
		const artistName = NAME.KOREAN;

		if (!externalParticipants) return artistName;

		const participants = externalParticipants.join(', ');

		return `${artistName}, ${participants}`;
	};

	return (
		<S.MetaSection>
			<S.CreditList>
				<S.CreditItem>
					<S.ItemLabel>재생시간</S.ItemLabel> {formatDuration(track.duration)}
				</S.CreditItem>
				<S.CreditItem>
					<S.ItemLabel>작사</S.ItemLabel> {formatCredit(track.lyricist)}
				</S.CreditItem>
				<S.CreditItem>
					<S.ItemLabel>작곡</S.ItemLabel> {formatCredit(track.composer)}
				</S.CreditItem>
				<S.CreditItem>
					<S.ItemLabel>편곡</S.ItemLabel> {formatCredit(track.arranger)}
				</S.CreditItem>

				{track.singing && (
					<S.CreditItem>
						<S.ItemLabel>노래방</S.ItemLabel>
						<S.SingingWrapper>
							{track.singing.tj && (
								<S.SingingBadge brand="TJ">
									<span className="brand">TJ</span>
									<span className="number">{track.singing.tj}</span>
								</S.SingingBadge>
							)}
							{track.singing.ky && (
								<S.SingingBadge brand="KY">
									<span className="brand">KY</span>
									<span className="number">{track.singing.ky}</span>
								</S.SingingBadge>
							)}
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
