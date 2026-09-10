// @/pages/Profile/ProfileDiscographySection

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { MORE_BUTTON } from '@/const/component-classes';
import {
	PDG_SLIDER_CONTAINER,
	PDG_SLIDER,
	PDG_ALBUM_CARD,
	PDG_COVER_WRAPPER,
	PDG_OVERLAY,
	PDG_ALBUM_INFO,
	pdgNavButton,
} from './profile-classes';
import { ALBUM_TYPE_LABEL, FULL_ALBUMS } from '@/const/albums';
import { GetAlbumPaths } from '@/utils/album';
import useImageFallback from '@/hooks/useImageFallback';

const DiscographySection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const handleImgError = useImageFallback();

	const getDisplayCount = () => {
		if (typeof window === 'undefined') return 8;
		const width = window.innerWidth;
		if (width <= 480) return 4;
		if (width <= 1100) return 6;
		return 8;
	};

	const sliderRef = useRef<HTMLDivElement>(null);
	const allAlbumsFlat = FULL_ALBUMS.flatMap(group => group.items);

	const [isAtStart, setIsAtStart] = useState(true);
	const [isAtEnd, setIsAtEnd] = useState(false);
	const [displayCount, setDisplayCount] = useState(8);

	const displayAlbums = allAlbumsFlat.slice(0, displayCount);

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
			setDisplayCount(getDisplayCount());
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
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR} <span>{TITLE_EN}</span>
			</div>

			<div className={PDG_SLIDER_CONTAINER}>
				{!isAtStart && (
					<button className={pdgNavButton('left')} onClick={() => handleScroll('left')}>
						<span>‹</span>
					</button>
				)}

				<div className={PDG_SLIDER} ref={sliderRef} onScroll={checkScrollPosition}>
					{displayAlbums.map(album => {
						const { key, imageSrc, detailUrl } = GetAlbumPaths(album);

						return (
							<Link key={key} href={detailUrl} className={PDG_ALBUM_CARD}>
								<div className={PDG_COVER_WRAPPER}>
									<img src={imageSrc} alt={album.title} onError={handleImgError} />

									<div className={`overlay ${PDG_OVERLAY}`}>
										<span>VIEW TRACKS →</span>
									</div>
								</div>

								<div className={PDG_ALBUM_INFO}>
									<span className="title">{album.title}</span>
									<span className="info">
										{album.type === 'LP'
											? `${ALBUM_TYPE_LABEL[album.type]} ${album.volume}집`
											: ALBUM_TYPE_LABEL[album.type]}
										{' | '}
										{album.releaseDate.split('.')[0]}년
									</span>
								</div>
							</Link>
						);
					})}
				</div>

				{!isAtEnd && (
					<button className={pdgNavButton('right')} onClick={() => handleScroll('right')}>
						<span>›</span>
					</button>
				)}
			</div>

			<Link href="/music" target="_self" rel="noreferrer" className={MORE_BUTTON}>
				전체 앨범 보러가기 ↗
			</Link>
		</section>
	);
};

export default DiscographySection;
