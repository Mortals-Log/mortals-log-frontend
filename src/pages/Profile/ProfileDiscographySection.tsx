// @pages/Profile/ProfileDiscographySection

import * as S from '@styles/pages/Profile.style';
import { ALBUM_TYPE_LABEL, LP_ALBUMS } from '@const/albums';
import { MoreButton } from '@/styles/components/buttons.style';

const DiscographySection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR} <span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.AlbumSliderContainer>
				<S.AlbumSlider>
					{LP_ALBUMS.map(album => (
						<S.AlbumCard>
							<S.AlbumCover>
								<img src={album.coverImage} alt={album.title} />
							</S.AlbumCover>

							<S.AlbumInfo>
								<span className="title">{album.title}</span>
								<span className="info">
									{ALBUM_TYPE_LABEL[album.type] || album.type} • {album.releaseDate.split('.')[0]}
								</span>
							</S.AlbumInfo>
						</S.AlbumCard>
					))}
				</S.AlbumSlider>
			</S.AlbumSliderContainer>

			<MoreButton href="/album" target="_self" rel="noreferrer">
				전체 앨범 보러가기
				<S.ExternalIcon>↗</S.ExternalIcon>
			</MoreButton>
		</S.ContentSection>
	);
};

export default DiscographySection;
