// @components/Album/AlbumMetaInfo.tsx

import * as S from '@styles/pages/Album/AlbumDetailMetaInfo.style';
import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { Album } from '@/types/album';
import { LINK_SHOP } from '@/const/links';
import { ICON_CONFIG } from '@/const/icons';
import { IconKey } from '@/types/icon';
import useImageFallback from '@/hooks/useImageFallback';
import { GetAlbumPaths } from '@/utils/album';

const MetaRow = ({ label, value }: { label: string; value?: string }) => {
	if (!value) value = '-';
	return (
		<>
			<S.Term>{label}</S.Term>
			<S.Description>{value}</S.Description>
		</>
	);
};

const AlbumDetailMetaInfo = ({ album }: { album: Album }) => {
	const handleImgError = useImageFallback();
	if (!album) return null;

	const { imageSrc } = GetAlbumPaths(album);

	const distributorName = album.distributor || '-';
	const agencyName = album.agency || '-';
	const distributorInfo = `${distributorName} / ${agencyName}`;

	return (
		<S.ContentSection>
			<S.CoverImage hasStore={!!album.store} src={imageSrc} alt={album.title} onError={handleImgError} />

			<S.InfoWrapper>
				{album.streaming && (
					<S.BadgeGroup>
						{Object.entries(album.streaming).map(([label, url]) => {
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
				)}

				<S.TypeWrap>
					<S.AlbumId>{ALBUM_TYPE_LABEL[album.type]}</S.AlbumId>
					{album.volume && <S.VolText>정규 {album.volume}집</S.VolText>}
				</S.TypeWrap>

				<S.MainTitle>{album.title}</S.MainTitle>

				<S.MetaList>
					<MetaRow label="유형" value={ALBUM_TYPE_LABEL[album.type]} />
					<MetaRow label="장르" value={album.genre?.join(', ')} />
					<MetaRow label="스타일" value={album.style?.join(', ')} />
					<MetaRow label="발매일" value={album.releaseDate} />
					<MetaRow label="재생시간" value={album.totalDuration} />
					<MetaRow label="유통 / 기획" value={distributorInfo} />
				</S.MetaList>

				{album.store && (
					<>
						{typeof album.store === 'string' ? (
							<S.MoreButton to={album.store} target="_blank" rel="noopener noreferrer">
								<span className="category">{ALBUM_TYPE_LABEL[album.type]}</span>
								<span className="store">구매하기</span>
							</S.MoreButton>
						) : (
							Object.entries(album.store).map(([key, url]) => {
								const detail = LINK_SHOP[key];

								return (
									<S.MoreButton key={key} to={url} target="_blank" rel="noopener noreferrer">
										{detail ? (
											<>
												{ALBUM_TYPE_LABEL[album.type]} 구매하기 - {detail.STORE}
											</>
										) : (
											<>{key}</>
										)}
									</S.MoreButton>
								);
							})
						)}
					</>
				)}
			</S.InfoWrapper>
		</S.ContentSection>
	);
};

export default AlbumDetailMetaInfo;
