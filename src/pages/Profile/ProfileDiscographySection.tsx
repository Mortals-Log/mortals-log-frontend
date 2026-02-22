// @pages/Profile/ProfileDiscographySection

/* eslint-disable react-hooks/set-state-in-effect */

import * as S from '@styles/pages/Profile/ProfileDiscographySection.style';
import { useEffect, useRef, useState } from 'react';
import { ALBUM_TYPE_LABEL, GET_LP_ALBUMS } from '@const/albums';
import { GetAlbumPaths } from '@utils/album';
import useImageFallback from '@hooks/useImageFallback';

const DiscographySection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const handleImgError = useImageFallback();

	const sliderRef = useRef<HTMLDivElement>(null);
	const [isAtStart, setIsAtStart] = useState(true);
	const [isAtEnd, setIsAtEnd] = useState(false);

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
		checkScrollPosition();
		window.addEventListener('resize', checkScrollPosition);
		return () => window.removeEventListener('resize', checkScrollPosition);
	}, []);

	const handleScroll = (direction: 'left' | 'right') => {
		if (sliderRef.current) {
			const card = sliderRef.current.querySelector('div');
			const cardWidth = card ? card.clientWidth : 300;
			const gap = 20;

			const moveDistance = cardWidth + gap;

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
					{GET_LP_ALBUMS.map(album => {
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
