// @pages/Profile/ProfileDiscographySection

import * as S from '@styles/pages/Profile/ProfileDiscographySection.style';
import { useEffect, useRef, useState } from 'react';
import { ALBUM_TYPE_LABEL, LP_ALBUMS } from '@const/albums';

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

			<S.SliderContainer>
				{!isAtStart && (
					<S.SliderNavButton $direction="left" onClick={() => handleScroll('left')}>
						<span>‹</span>
					</S.SliderNavButton>
				)}
				<S.Slider ref={sliderRef} onScroll={checkScrollPosition}>
					{LP_ALBUMS.map(album => {
						const year = album.releaseDate.split('.')[0];
						const key = `${album.type}_${year}_${album.fileName}`;

						const slug = album.title.replace(/\s/g, '-');
						const url = `/album/${encodeURIComponent(slug)}`;

						return (
							<S.AlbumCard key={key} to={`${url}`}>
								<S.CoverWrapper>
									<img
										src={`/images/albums/${key}.webp`}
										alt={album.title}
										onError={e => {
											e.currentTarget.src = '/images/albums/default.webp';
										}}
									/>

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
