// @types/track

/* eslint-disable storybook/default-exports */

interface SingingInfo {
	tj?: string;
	ky?: string;
}

interface Chords {
	chords: string;
	tuning?: string;
	provider?: string;
}

export interface Track {
	id: string;
	originalTrackId?: string | string[];

	title: string;
	enTitle: string;
	version?: string;
	ageLimit?: boolean;
	isLead?: boolean;
	duration?: string;
	lyrics?: string;

	lyricist?: string[];
	composer?: string[];
	arranger?: string[];

	chords?: Chords;

	mvLink?: string;

	singing?: SingingInfo;
}

/*
[id 규칙]
TRK_{Version}{VersionNumber}_{Number}

{Version}
LP(Long Play): 정규 앨범 (음원/CD 중심)
EP(Extended Play): 미니 앨범
SP(Single Play): 싱글 앨범
LV(Live): 라이브/공연 실황 앨범
VN(Vinyl): LP 바이닐

{VersionNumber}
해당 버전의 발매 순서로 넘버링
2자리 수로 입력: 빈자리는 0으로 채우기

e.g.) 정규앨범1집 -> LP01

{Number}
트랙 수록 순서대로 넘버링
3자리수로 입력: 빈자리는 0으로 채우기
e.g.) 001
*/
