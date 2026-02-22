// @pages/Profile/ProfileDiscographySection

import * as S from '@styles/pages/Profile/ProfileDiscographySection.style';
import { useEffect, useRef, useState } from 'react';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@const/albums';
import { GetAlbumPaths } from '@utils/album';
import useImageFallback from '@hooks/useImageFallback';

const DiscographySection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const handleImgError = useImageFallback();

	const sliderRef = useRef<HTMLDivElement>(null);
	const [isAtStart, setIsAtStart] = useState(true);
	const [isAtEnd, setIsAtEnd] = useState(false);
	const [isMobile, setIsMobile] = useState(false);

	const allAlbumsFlat = FULL_ALBUMS.flatMap(group => group.items);
	const displayAlbums = isMobile ? allAlbumsFlat.slice(0, 4) : allAlbumsFlat.slice(0, 8);

	const checkScrollPosition = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

			if (scrollWidth <= clientWidth) {
				setIsAtStart(true);
				setIsAtEnd(true);
				return;
			}

			setIsAtStart(scrollLeft <= 1);
			setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 2);
		}
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 800);
			setTimeout(checkScrollPosition, 0);
		};

		handleResize();
		window.addEventListener('resize', handleResize);

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const handleScroll = (direction: 'left' | 'right') => {
		if (sliderRef.current) {
			const card = sliderRef.current.querySelector('div');
			const moveDistance = (card?.clientWidth || 220) + 20;

			sliderRef.current.scrollBy({
				left: direction === 'left' ? -moveDistance : moveDistance,
				behavior: 'smooth',
			});
		}
	};

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR} <span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.SliderContainer>
				{!isAtStart && (
					<S.SliderNavButton $direction="left" onClick={() => handleScroll('left')}>
						<span>‹</span>
					</S.SliderNavButton>
				)}

				<S.Slider ref={sliderRef} onScroll={checkScrollPosition}>
					{displayAlbums.map(album => {
						const { key, imageSrc, detailUrl } = GetAlbumPaths(album);

						return (
							<S.AlbumCard key={key} to={detailUrl}>
								<S.CoverWrapper>
									<img src={imageSrc} alt={album.title} onError={handleImgError} />

									<S.Overlay className="overlay">
										<span>VIEW TRACKS →</span>
									</S.Overlay>
								</S.CoverWrapper>

								<S.AlbumInfo>
									<span className="title">{album.title}</span>
									<span className="info">
										{album.type === 'LP'
											? `${ALBUM_TYPE_LABEL[album.type]} ${album.volume}집`
											: ALBUM_TYPE_LABEL[album.type]}
										{' | '}
										{album.releaseDate.split('.')[0]}년
									</span>
								</S.AlbumInfo>
							</S.AlbumCard>
						);
					})}
				</S.Slider>

				{!isAtEnd && (
					<S.SliderNavButton $direction="right" onClick={() => handleScroll('right')}>
						<span>›</span>
					</S.SliderNavButton>
				)}
			</S.SliderContainer>

			<S.MoreButton to="/album" target="_self" rel="noreferrer">
				전체 앨범 보러가기
				<S.ExternalIcon>↗</S.ExternalIcon>
			</S.MoreButton>
		</S.ContentSection>
	);
};

export default DiscographySection;
