// @types/album

/* eslint-disable storybook/default-exports */

export interface Album {
	title: string;
	releaseDate: string;
	type: 'LP' | 'EP' | 'SP' | 'LV' | 'VN';
	volume?: number;
	fileName?: string;
	tracks?: string[] | { [section: string]: string[] };
	store?: string;
	musicVideo?: string;
}

export interface AlbumGroup {
	year: string;
	items: Album[];
}

export type AlbumList = AlbumGroup[];

// LP(Long Play): 정규 앨범 (음원/CD 중심)
// EP(Extended Play): 미니 앨범
// SP(Single Play): 싱글 앨범
// LV(Live): 라이브/공연 실황 앨범
// VN(Vinyl): LP 바이닐
