// @/const/concert
// 콘서트 데이터는 Supabase 스냅샷(@/generated/content)에서 온다. 수정은 관리자 페이지에서 한다.
// 손으로 쓰던 원본 데이터는 ./fixtures/concert.ts 에 보존되어 있다. (시드 / 검증 / 스토리용)

import { CONTENT } from '@/generated/content';
import type { ConcertList } from '@/types/concert';

// 밴드 멤버 구성이 바뀌면 fixtures/concert.ts 의 BAND_MEMBERS 와 함께 고친다.
const BAND_LABEL = '구토유발자들(천진우, 기토, 양동훈, 리장단, 법영이)';

export const CONCERT_TYPE_LABEL: Record<string, string> = {
	SOLO: '단독 콘서트',
	JOIN: '합동 콘서트',
	TOUR: '전국 투어',
	LISTENING: '음악감상회',
	FESTIVAL: '페스티벌',
	BAND: BAND_LABEL,
	BAND_TOUR: `${BAND_LABEL} · 전국 투어`,
};

export const FULL_CONCERTS: ConcertList = CONTENT.concerts;
