// @/utils/chord

/* eslint-disable storybook/default-exports */

import { MASTER_CHORDS } from '@/const/chords';
import { Chord } from '@/types/chord';

export const GetChordsByTrackId = (trackId: string): Chord[] => MASTER_CHORDS[trackId] ?? [];
