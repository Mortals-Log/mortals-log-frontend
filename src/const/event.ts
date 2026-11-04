// @/const/event
// 이벤트 데이터는 Supabase 스냅샷(@/generated/content)에서 온다. 수정은 관리자 페이지에서 한다.
// 손으로 쓰던 원본 데이터는 ./fixtures/event.ts 에 보존되어 있다. (시드 / 검증 / 스토리용)

import { CONTENT } from '@/generated/content';
import type { EventList } from '@/types/event';

export const EVENT_TYPE_LABEL: Record<string, string> = {
	INTERVIEW: '인터뷰',
	RADIO: '라디오',
	MAGAZINE: '매거진/잡지',
} as const;

export const EVENT_INTERVIEW: EventList = CONTENT.interviews;

export const FULL_EVENTS: EventList = CONTENT.events;
