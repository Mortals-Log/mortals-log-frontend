// @pages/Profile/ProfileDiscographySection

import * as S from '@styles/pages/Profile';
import { ALBUM_TYPE_LABEL, LP_ALBUMS } from '@const/albums';
import { GetAlbumCoverPath } from '@/utils/album';
import { useEffect, useRef, useState } from 'react';

const DiscographySection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const sliderRef = useRef<HTMLDivElement>(null);
	const [isAtStart, setIsAtStart] = useState(true);
	const [isAtEnd, setIsAtEnd] = useState(false);

	const checkScrollPosition = () => {
		if (sliderRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;

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

			<S.AlbumSliderContainer>
				{!isAtStart && (
					<S.SliderNavButton $direction="left" onClick={() => handleScroll('left')}>
						<span>‹</span>
					</S.SliderNavButton>
				)}
				<S.AlbumSlider ref={sliderRef} onScroll={checkScrollPosition}>
					{LP_ALBUMS.map(album => (
						<S.AlbumCard key={`${album.type}-${album.title}`}>
							<img
								src={GetAlbumCoverPath(album)}
								alt={album.title}
								onError={e => {
									const target = e.currentTarget;
									target.src = '/images/albums/default.webp';
									target.onerror = null;
								}}
							/>

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
					))}
				</S.AlbumSlider>

				{!isAtEnd && (
					<S.SliderNavButton $direction="right" onClick={() => handleScroll('right')}>
						<span>›</span>
					</S.SliderNavButton>
				)}
			</S.AlbumSliderContainer>

			<S.MoreButton to="/album" target="_self" rel="noreferrer">
				전체 앨범 보러가기
				<S.ExternalIcon>↗</S.ExternalIcon>
			</S.MoreButton>
		</S.ContentSection>
	);
};

export default DiscographySection;
