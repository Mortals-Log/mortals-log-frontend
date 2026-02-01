// @components/Album/AlbumMetaInfo.tsx

import * as S from '@styles/pages/Album/AlbumDetailMetaInfo.style';
import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { Album } from '@/types/album';

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
	if (!album) return null;

	const year = album.releaseDate.split('.')[0];
	const key = `${album.type}_${year}_${album.fileName}`;

	const distributorName = album.distributor || '-';
	const agencyName = album.agency || '-';
	const distributorInfo = `${distributorName} / ${agencyName}`;

	return (
		<S.ContentSection>
			<S.CoverImage hasStore={!!album.store} src={`/images/albums/${key}.webp`} alt={album.title} />

			<S.InfoWrapper>
				<S.TypeWrap>
					<S.AlbumId>{ALBUM_TYPE_LABEL[album.type]}</S.AlbumId>
					{album.volume && <S.VolText>정규 {album.volume}집</S.VolText>}
				</S.TypeWrap>

				<S.MainTitle>{album.title}</S.MainTitle>

				<S.MetaList>
					<MetaRow label="유형" value={ALBUM_TYPE_LABEL[album.type]} />
					<MetaRow label="장르" value={album.genre?.join(', ')} />
					<MetaRow label="스타일" value={album.style} />
					<MetaRow label="발매일" value={album.releaseDate} />
					<MetaRow label="재생시간" value={album.totalDuration} />
					<MetaRow label="유통 / 기획" value={distributorInfo} />
				</S.MetaList>

				{album.store && (
					<S.MoreButton to={album.store} target="_blank">
						{ALBUM_TYPE_LABEL[album.type]} 구매하기
					</S.MoreButton>
				)}
			</S.InfoWrapper>
		</S.ContentSection>
	);
};

export default AlbumDetailMetaInfo;
