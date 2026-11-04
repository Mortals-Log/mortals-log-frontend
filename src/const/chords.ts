// @/const/chords
// 코드 악보 데이터는 Supabase 스냅샷(@/generated/content)에서 온다. 수정은 관리자 페이지에서 한다.
// 손으로 쓰던 원본 데이터는 ./fixtures/chords.ts 에 보존되어 있다. (시드 / 검증 / 스토리용)

import { CONTENT } from '@/generated/content';
import type { Chord } from '@/types/chord';

export const MASTER_CHORDS: Record<string, Chord[]> = CONTENT.chords;
