// @/types/chord

import { ChordProvider } from '@/const/chord-providers';

export interface Chord {
	chords: string;
	tuning?: string;
	provider?: ChordProvider;
	chordModeType: 'integrated' | 'separated';
}
