// @/apis/admin/track-media
// 곡의 노래방 번호·뮤직비디오를 여러 곡 한꺼번에 저장한다 (넘겨준 항목만 갱신). 로그인한 관리자 세션으로 요청하므로 쓰기 권한은 RLS 가 정한다.
// 곡마다 값이 달라 한 번의 요청으로 묶을 수 없어서 곡별로 수정한다. 일부만 실패할 수 있고, 실패한 곡은 오류 문구에 나열한다.

import { getSupabaseBrowserClient } from '@/lib/supabase-browser';

export interface TrackMediaUpdate {
	id: string;
	title: string;
	/** { tj: '83659', ky: '93346' }. 하나도 없으면 null. 생략하면 노래방 번호는 건드리지 않는다. */
	karaokeNumbers?: Record<string, string> | null;
	/** YouTube 영상 ID(11자). 없으면 null. 생략하면 뮤직비디오는 건드리지 않는다. */
	musicVideoYoutubeId?: string | null;
}

/** 넘겨받은 항목만 담는다 (노래방 탭이 뮤직비디오를, MV 탭이 노래방 번호를 덮어쓰지 않게). */
const toColumns = (update: TrackMediaUpdate) => ({
	...(update.karaokeNumbers !== undefined && { karaoke_numbers: update.karaokeNumbers }),
	...(update.musicVideoYoutubeId !== undefined && { music_video_youtube_id: update.musicVideoYoutubeId }),
});

const CHUNK_SIZE = 10;

export const updateTrackMedia = async (updates: TrackMediaUpdate[]): Promise<void> => {
	const client = getSupabaseBrowserClient();
	const failedTitles: string[] = [];
	let firstReason = '';

	for (let start = 0; start < updates.length; start += CHUNK_SIZE) {
		const chunk = updates.slice(start, start + CHUNK_SIZE);
		const results = await Promise.all(
			chunk.map(update => client.from('tracks').update(toColumns(update)).eq('id', update.id).select('id')),
		);
		for (const [index, result] of results.entries()) {
			// RLS 가 막은 수정은 오류 없이 0건으로 끝나므로 행 수도 확인한다.
			if (result.error || (result.data ?? []).length !== 1) {
				failedTitles.push(chunk[index].title);
				firstReason ||= result.error?.message ?? '관리자 권한을 확인하십시오.';
			}
		}
	}

	if (failedTitles.length > 0) {
		throw new Error(
			`${failedTitles.length}곡을 저장하지 못했습니다 (${failedTitles.join(', ')}): ${firstReason} 나머지는 저장됐습니다.`,
		);
	}
};
