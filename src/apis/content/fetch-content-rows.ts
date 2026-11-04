// @/apis/content/fetch-content-rows
// Supabase 에서 콘텐츠 테이블을 읽어 행으로 돌려준다. 도메인 객체로의 변환은 mappers 가 맡는다.
// 공개 키로 읽으면 RLS 에 따라 게시된(is_published) 행만 보인다.

import type { SupabaseClient } from '@supabase/supabase-js';
import type {
	AlbumLinkRow,
	AlbumRow,
	ConcertRow,
	ContentRows,
	MediaAppearanceRow,
	TrackChordRow,
	TrackOriginRow,
	TrackRow,
} from '@/types/content-row';

interface QueryResult {
	data: unknown[] | null;
	error: { message: string } | null;
}

const unwrap = <Row>(tableName: string, { data, error }: QueryResult): Row[] => {
	if (error) throw new Error(`${tableName} 조회 실패: ${error.message}`);
	// 행 모양은 supabase/migrations 와 @/types/content-row 가 함께 보장한다. (타입 생성 도입 전까지는 이 단언으로 잇는다)
	return (data ?? []) as Row[];
};

// concerts / media_appearances 는 id(= 등록 순서)로 정렬한다. 같은 날짜끼리의 표시 순서가 이 순서에 따른다.
export const fetchContentRows = async (supabase: SupabaseClient): Promise<ContentRows> => {
	const [albums, albumLinks, tracks, trackOrigins, trackChords, concerts, mediaAppearances] = await Promise.all([
		supabase.from('albums').select('*').order('id'),
		supabase.from('album_links').select('*').order('album_id').order('kind').order('sort_order'),
		supabase.from('tracks').select('*').order('id'),
		supabase.from('track_origins').select('*').order('track_id').order('sort_order'),
		supabase.from('track_chords').select('*').order('track_id'),
		supabase.from('concerts').select('*').order('id'),
		supabase.from('media_appearances').select('*').order('id'),
	]);

	return {
		albums: unwrap<AlbumRow>('albums', albums),
		albumLinks: unwrap<AlbumLinkRow>('album_links', albumLinks),
		tracks: unwrap<TrackRow>('tracks', tracks),
		trackOrigins: unwrap<TrackOriginRow>('track_origins', trackOrigins),
		trackChords: unwrap<TrackChordRow>('track_chords', trackChords),
		concerts: unwrap<ConcertRow>('concerts', concerts),
		mediaAppearances: unwrap<MediaAppearanceRow>('media_appearances', mediaAppearances),
	};
};
