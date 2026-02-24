// @pages/Schedule/ScheduleDetailConcert.tsx

import * as S from '@/styles/pages/ScheduleDetail/ScheduleDetail.style';

import { Album } from '@/types/album';
import { ALBUM_TYPE_LABEL } from '@/const/albums';
import { LINK_SHOP } from '@/const/links';
import useImageFallback from '@/hooks/useImageFallback';
import { GetAlbumPaths } from '@/utils/album';
import { GetDay } from '@/utils/date';

interface ScheduleDetailConcertProps {
	album: Album;
}

const ScheduleDetailAlbum = ({ album }: ScheduleDetailConcertProps) => {
	const handleImgError = useImageFallback();
	const { imageSrc, detailUrl } = GetAlbumPaths(album);

	return (
		<S.MainSection>
			<S.ImageWrapper>
				<img src={imageSrc} alt={album.fileName} onError={handleImgError} />
			</S.ImageWrapper>

			<S.ContentSection>
				<S.InfoGroup>
					<S.InfoTitle>TYPE</S.InfoTitle>
					<S.InfoItem>{ALBUM_TYPE_LABEL[album.type]}</S.InfoItem>
				</S.InfoGroup>

				<S.InfoGroup>
					<S.InfoTitle>Release Date</S.InfoTitle>
					<S.InfoItem>
						{album.releaseDate} ({GetDay(album.releaseDate)})
					</S.InfoItem>
				</S.InfoGroup>

				<S.InfoGroup>
					<S.InfoTitle>ABOUT ALBUM</S.InfoTitle>
					<S.MoreButton to={detailUrl} target="_blank" rel="noopener noreferrer">
						{ALBUM_TYPE_LABEL[album.type]} 정보 더보기
					</S.MoreButton>
				</S.InfoGroup>

				{album.store && (
					<S.InfoGroup>
						<S.InfoTitle>STORE</S.InfoTitle>
						{typeof album.store === 'string' ? (
							<S.MoreButton to={album.store} target="_blank" rel="noopener noreferrer">
								{ALBUM_TYPE_LABEL[album.type]}구매하기
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
					</S.InfoGroup>
				)}
			</S.ContentSection>
		</S.MainSection>
	);
};

export default ScheduleDetailAlbum;
