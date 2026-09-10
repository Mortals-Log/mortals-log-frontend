// @/pages/AlbumDetail/AlbumDetailMEtaInfo

import { useMemo } from 'react';
import Link from 'next/link';
import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { Album } from '@/types/album';
import { LINK_SHOP } from '@/const/links';
import { ICON_CONFIG } from '@/const/icons';
import { IconKey } from '@/types/icon';
import useImageFallback from '@/hooks/useImageFallback';
import { GetAlbumPaths } from '@/utils/album';
import { MORE_BUTTON, MUSIC_BADGE } from '@/const/component-classes';
import {
	ADM_CONTENT_SECTION,
	ADM_INFO_WRAPPER,
	admCoverImage,
	ADM_BADGE_GROUP,
	ADM_TYPE_WRAP,
	ADM_ALBUM_TITLE,
	ADM_META_LIST,
	ADM_TERM,
	ADM_DESCRIPTION,
} from './album-detail-classes';

const MetaRow = ({ label, value }: { label: string; value?: string }) => {
	const displayValue = value || '-';

	return (
		<>
			<dt className={ADM_TERM}>{label}</dt>
			<dd className={ADM_DESCRIPTION}>{displayValue}</dd>
		</>
	);
};

const AlbumDetailMetaInfo = ({ album }: { album: Album }) => {
	const handleImgError = useImageFallback();
	const { imageSrc } = GetAlbumPaths(album);

	const metaData = useMemo(() => {
		const distributorInfo = `${album.distributor || '-'} / ${album.agency || '-'}`;

		return [
			{ label: '유형', value: ALBUM_TYPE_LABEL[album.type] },
			{ label: '장르', value: album.genre?.join(', ') },
			{ label: '스타일', value: album.style?.join(', ') },
			{ label: '발매일', value: album.releaseDate },
			{ label: '재생시간', value: album.totalDuration },
			{ label: '유통 / 기획', value: distributorInfo },
		];
	}, [album]);

	if (!album) return null;

	return (
		<section className={ADM_CONTENT_SECTION}>
			<img className={admCoverImage(!!album.store)} src={imageSrc} alt={album.title} onError={handleImgError} />

			<div className={ADM_INFO_WRAPPER}>
				{album.streaming && (
					<div className={ADM_BADGE_GROUP}>
						{Object.entries(album.streaming).map(([label, url]) => {
							if (!url) return null;
							const key = label.toLowerCase().replace(/\s+/g, '') as IconKey;
							const config = ICON_CONFIG[key];
							const Icon = config?.icon;

							return Icon ? (
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
							) : null;
						})}
					</div>
				)}

				<div className={ADM_TYPE_WRAP}>
					<span className="type">{ALBUM_TYPE_LABEL[album.type]}</span>
					{album.volume && <span className="vol">정규 {album.volume}집</span>}
				</div>

				<div className={ADM_ALBUM_TITLE}>{album.title}</div>

				<dl className={ADM_META_LIST}>
					{metaData.map(item => (
						<MetaRow key={item.label} label={item.label} value={item.value} />
					))}
				</dl>

				{album.store && (
					<>
						{typeof album.store === 'string' ? (
							<Link href={album.store} target="_blank" rel="noopener noreferrer" className={MORE_BUTTON}>
								<span className="category">{ALBUM_TYPE_LABEL[album.type]}</span>
								<span className="store">구매하기</span>
							</Link>
						) : (
							Object.entries(album.store).map(([key, url]) => {
								const detail = LINK_SHOP[key];
								return (
									<Link key={key} href={url} target="_blank" rel="noopener noreferrer" className={MORE_BUTTON}>
										{detail ? `${ALBUM_TYPE_LABEL[album.type]} 구매하기 - ${detail.STORE}` : key}
									</Link>
								);
							})
						)}
					</>
				)}
			</div>
		</section>
	);
};

export default AlbumDetailMetaInfo;
