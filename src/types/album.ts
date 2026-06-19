// @/types/album

/* eslint-disable storybook/default-exports */

interface Agency {
	agencyId: number;
	agencyName: string;
}

interface Distributor {
	distributorId: number;
	distributorName: string;
}

export interface Album {
	type: 'LP' | 'EP' | 'SP' | 'LV' | 'VN';
	title: string;
	volume?: number;
	coverImage?: string;
	releaseDate: string;
	tracks?: string[] | { [section: string]: string[] };

	genre?: string[];
	style?: string[];
	totalDuration?: string;
	intro?: string;

	genreMappings?: Array<{
		id: number;
		genre: {
			genreId: number;
			genreName: string;
		};
	}>;

	agency?: Agency;
	distributor?: Distributor;

	store?: string | Record<string, string>;
	streaming?: Record<string, string>;
}

export interface AlbumGroup {
	year: string;
	items: Album[];
}

export type AlbumList = AlbumGroup[];

// filename: 앨범 공식 영어 이름 변형 - 모든 글자는 영어 소문자, 공백은 -, 문장기호는 제거
// LP(Long Play): 정규 앨범 (음원/CD 중심)
// EP(Extended Play): 미니 앨범
// SP(Single Play): 싱글 앨범
// LV(Live): 라이브/공연 실황 앨범
// VN(Vinyl): LP 바이닐
