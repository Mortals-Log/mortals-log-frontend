// @/types/content-row
// supabase/migrations 의 테이블 행 모양. 컬럼명은 DB 그대로 snake_case 이다.
// 도메인 객체(Album, Track ...)로의 변환은 @/apis/content/mappers 가 맡는다.
// 앱이 쓰지 않는 컬럼(created_at, updated_at, is_published, cover_image_path ...)은 적지 않았다.

import type { Album } from '@/types/album';
import type { Chord } from '@/types/chord';
import type { ConcertItem } from '@/types/concert';
import type { EventItem } from '@/types/event';
import type { Track } from '@/types/track';

export interface AlbumRow {
	id: string;
	album_type: Album['type'];
	volume: number | null; // 정규 앨범(LP)만 값이 있다
	title: string;
	image_key: string | null;
	/** 버킷 images 안의 경로 (예: albums/LP_2022_xxx.webp) */
	cover_image_path?: string | null;
	release_date: string; // 'YYYY-MM-DD'
	intro: string | null;
	genres: string[];
	styles: string[];
	distributor: string | null;
	total_duration: string | null;
	agency: string | null;
}

export type AlbumLinkKind = 'streaming' | 'store';

export interface AlbumLinkRow {
	album_id: string;
	kind: AlbumLinkKind;
	platform: string | null; // 단일 구매 링크는 null
	url: string;
	sort_order: number;
}

export interface TrackRow {
	id: string;
	album_id: string;
	track_no: number;
	side: string | null;
	title: string;
	title_en: string;
	version: string | null;
	is_age_restricted: boolean;
	is_lead: boolean;
	is_cd_only: boolean;
	duration: string | null;
	lyrics: string | null;
	lyricists: string[];
	composers: string[];
	arrangers: string[];
	music_video_youtube_id: string | null;
	karaoke_numbers: Track['singing'] | null;
}

export interface TrackOriginRow {
	track_id: string;
	original_track_id: string;
	sort_order: number;
}

export interface TrackChordRow {
	track_id: string;
	chords: Chord[];
}

/** 공연 형식. 투어·밴드 여부는 별도 boolean 이다. */
export type ConcertFormat = 'SOLO' | 'JOIN' | 'FESTIVAL' | 'LISTENING';

export interface ConcertRow {
	concert_type: ConcertFormat;
	is_tour: boolean;
	is_band_performance: boolean;
	title: string;
	start_date: string; // 'YYYY-MM-DD'
	end_date: string | null;
	location: string | null;
	performance_location: string | null;
	seat_type: ConcertItem['seatType'] | null;
	showtimes: string[] | null;
	performance_dates: string[] | null; // 'YYYY-MM-DD'[]
	lineup: string[] | null;
	price: ConcertItem['price'] | null;
	image_key: string | null;
	/** 버킷 images 안의 경로 (예: concerts/SOLO_20231216.webp) */
	poster_image_path?: string | null;
	ticketing: ConcertItem['ticketing'] | null;
	is_age_restricted: boolean;
}

export interface MediaAppearanceRow {
	appearance_type: EventItem['type'];
	appeared_on: string; // 'YYYY-MM-DD'
	title: string;
	source_name: string | null;
	link: string | null; // platform 에 따라 YouTube 영상 ID 이거나 URL
	platform: string | null;
	quote: string | null;
	description: string | null;
}

export interface ContentRows {
	albums: AlbumRow[];
	albumLinks: AlbumLinkRow[];
	tracks: TrackRow[];
	trackOrigins: TrackOriginRow[];
	trackChords: TrackChordRow[];
	concerts: ConcertRow[];
	mediaAppearances: MediaAppearanceRow[];
}
