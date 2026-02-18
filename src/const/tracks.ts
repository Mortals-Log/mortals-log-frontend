// @const/tracks.ts

/* eslint-disable storybook/default-exports */

import { Track } from '@/types/track';

export const MASTER_TRACKS: Record<string, Track> = {
	// [LP 1집] 명상좀비
	TRK_LP01_001: { id: 'TRK_LP01_001', title: '헐크호건 존시나가 같이 삽니다', enTitle: 'Hulk Hogan vs John Cena' },
	TRK_LP01_002: { id: 'TRK_LP01_002', isLead: true, title: '불나방', enTitle: 'Bulnabang' },
	TRK_LP01_003: { id: 'TRK_LP01_003', title: '내일을 위한 오늘은 없다', enTitle: "I Don't Live For Tomorrow" },
	TRK_LP01_004: { id: 'TRK_LP01_004', title: '매운인간', enTitle: 'Spicy Man' },
	TRK_LP01_005: { id: 'TRK_LP01_005', title: '팡이', enTitle: 'Mold' },
	TRK_LP01_006: { id: 'TRK_LP01_006', title: '여름좀비', enTitle: 'Summer Zombie' },
	TRK_LP01_007: { id: 'TRK_LP01_007', title: '아파요', enTitle: 'Hurt' },
	TRK_LP01_008: { id: 'TRK_LP01_008', title: '잘가요', enTitle: 'Farewell' },

	// [LP 2집] 푸줏간
	TRK_LP02_001: { id: 'TRK_LP02_001', ageLimit: true, isLead: true, title: '좃됐다 좆됐어', enTitle: 'Fucked Up' },
	TRK_LP02_002: { id: 'TRK_LP02_002', title: '꽐라 블루스', enTitle: 'Drunk Blues' },
	TRK_LP02_003: { id: 'TRK_LP02_003', title: '생일축하해', enTitle: 'Happy Birthday' },
	TRK_LP02_004: { id: 'TRK_LP02_004', isLead: true, title: '마음농장', enTitle: 'Farm' },
	TRK_LP02_005: { id: 'TRK_LP02_005', title: '공포탄', enTitle: 'Blank Bullets' },
	TRK_LP02_006: { id: 'TRK_LP02_006', title: '그래 뭐가 됐든 결국 지나간다', enTitle: 'Whatever' },
	TRK_LP02_007: { id: 'TRK_LP02_007', title: '자포자기', enTitle: 'Giving Up' },
	TRK_LP02_008: { id: 'TRK_LP02_008', title: '돈벌레', enTitle: 'Money Bug' },
	TRK_LP02_009: { id: 'TRK_LP02_009', title: '집에 가자', enTitle: 'Going Home' },
	TRK_LP02_010: { id: 'TRK_LP02_010', title: '혼술', enTitle: 'Sober' },
	TRK_LP02_011: { id: 'TRK_LP02_011', title: '도움을 받아요', enTitle: 'Get Help' },

	// [LP 3집] 천진우 캐롤 모음집
	TRK_LP03_001: {
		id: 'TRK_LP03_001',
		isLead: true,
		title: '크리스마스야 미안해',
		enTitle: "It's Christmas Again God Damn It",
	},
	TRK_LP03_002: {
		id: 'TRK_LP03_002',
		title: 'We Wish You A Merry Christmas',
		enTitle: 'We Wish You a Merry Christmas',
	},
	TRK_LP03_003: { id: 'TRK_LP03_003', title: '징글벨', enTitle: 'Jingle Bells' },
	TRK_LP03_004: { id: 'TRK_LP03_004', title: '고요한 밤 거룩한 밤', enTitle: 'Silent Night' },
	TRK_LP03_005: { id: 'TRK_LP03_005', title: '울면 안돼', enTitle: 'Santa Claus Is Coming To Town' },
	TRK_LP03_006: { id: 'TRK_LP03_006', title: '구석지기 산타', enTitle: 'Korean Traditional Santa Claus' },
	TRK_LP03_007: { id: 'TRK_LP03_007', title: '아이스크림', enTitle: 'Ice Cream' },
	TRK_LP03_008: { id: 'TRK_LP03_008', title: '12월 31일', enTitle: 'Happy New Year' },

	// [LP 4집] 나는 기계가 싫어요
	TRK_LP04_001: { id: 'TRK_LP04_001', title: '중독자', enTitle: 'Junky' },
	TRK_LP04_002: { id: 'TRK_LP04_002', title: '노인을 위한 나라', enTitle: 'Country For Old Men' },
	TRK_LP04_003: { id: 'TRK_LP04_003', title: '불면증', enTitle: 'Insomnia' },
	TRK_LP04_004: { id: 'TRK_LP04_004', isLead: true, title: '좋은 친구들', enTitle: 'Goodfellas' },
	TRK_LP04_005: { id: 'TRK_LP04_005', title: '바퀴벌레', enTitle: 'Cockroach' },
	TRK_LP04_006: { id: 'TRK_LP04_006', title: '터미네이터', enTitle: 'Terminator' },
	TRK_LP04_007: { id: 'TRK_LP04_007', title: '쇠사슬', enTitle: 'Chains' },
	TRK_LP04_008: { id: 'TRK_LP04_008', title: '대가리총', enTitle: 'Headshot' },
	TRK_LP04_009: { id: 'TRK_LP04_009', title: '주정뱅이 딴따라 미친년과 빚쟁이', enTitle: 'Drunk' },
	TRK_LP04_010: { id: 'TRK_LP04_010', title: '장송곡', enTitle: 'Dead March' },

	// [LP 5집] 꽃순이
	TRK_LP05_001: { id: 'TRK_LP05_001', title: '깡조밥', enTitle: 'KKangjobab' },
	TRK_LP05_002: { id: 'TRK_LP05_002', title: '꽃순이네 아비는 파산했다', enTitle: 'Bankruptcy' },
	TRK_LP05_003: { id: 'TRK_LP05_003', title: '귀신', enTitle: 'Ghost' },
	TRK_LP05_004: { id: 'TRK_LP05_004', title: '노총각', enTitle: 'Old Kid' },
	TRK_LP05_005: { id: 'TRK_LP05_005', title: '소쩍새', enTitle: 'Crying Bird' },
	TRK_LP05_006: { id: 'TRK_LP05_006', isLead: true, title: '워메', enTitle: 'OMG' },
	TRK_LP05_007: { id: 'TRK_LP05_007', title: '밥해주오', enTitle: 'Feed Me' },
	TRK_LP05_008: { id: 'TRK_LP05_008', title: '금술 좋은 부부', enTitle: 'True Love' },
	TRK_LP05_009: { id: 'TRK_LP05_009', title: '님 따라가오', enTitle: 'I go' },

	// [LP 6집] 졸업앨범
	TRK_LP06_001: { id: 'TRK_LP06_001', title: '아이들', enTitle: 'Sorry, Kids' },
	TRK_LP06_002: { id: 'TRK_LP06_002', title: '이번 방학엔 공부 좀 해라', enTitle: 'Vacation' },
	TRK_LP06_003: { id: 'TRK_LP06_003', title: '성장통', enTitle: 'Growing Pains' },
	TRK_LP06_004: { id: 'TRK_LP06_004', title: '스카', enTitle: 'Ska' },
	TRK_LP06_005: { id: 'TRK_LP06_005', title: '사춘기', enTitle: 'Adolescence' },
	TRK_LP06_006: { id: 'TRK_LP06_006', title: '여드름', enTitle: 'Pimple' },
	TRK_LP06_007: { id: 'TRK_LP06_007', title: '장래희망', enTitle: 'Dream Job' },
	TRK_LP06_008: { id: 'TRK_LP06_008', isLead: true, title: '졸업', enTitle: 'Graduation' },
	TRK_LP06_009: { id: 'TRK_LP06_009', title: '퇴근', enTitle: 'Yodel' },
	TRK_LP06_010: { id: 'TRK_LP06_010', title: '비둘기들의 도시', enTitle: 'City Of Pigeons' },
	TRK_LP06_011: { id: 'TRK_LP06_011', title: '휴식행 티켓', enTitle: 'Game Over' },

	// [EP 1집] 굴다리
	TRK_EP01_001: { id: 'TRK_EP01_001', ageLimit: true, isLead: true, title: '청춘', enTitle: 'Youth' },
	TRK_EP01_002: { id: 'TRK_EP01_002', title: '카페인', enTitle: 'Coffee' },
	TRK_EP01_003: { id: 'TRK_EP01_003', ageLimit: true, title: '주정뱅이 딴따라 미친년과 빚쟁이', enTitle: 'Drunk' },
	TRK_EP01_004: { id: 'TRK_EP01_004', title: '시궁쥐', enTitle: 'Rat' },
	TRK_EP01_005: { id: 'TRK_EP01_005', title: '멸망', enTitle: 'Fall' },
	TRK_EP01_006: { id: 'TRK_EP01_006', title: '다리에서요', enTitle: 'On The Bridge' },

	// [EP 2집] 일기장
	TRK_EP02_001: { id: 'TRK_EP02_001', title: '내 마음 속 작은 고블린', enTitle: 'Little Goblin' },
	TRK_EP02_002: { id: 'TRK_EP02_002', isLead: true, title: '노스텔지어', enTitle: 'Nostalgia' },
	TRK_EP02_003: { id: 'TRK_EP02_003', title: '배고파요', enTitle: 'Hunger' },
	TRK_EP02_004: { id: 'TRK_EP02_004', title: '꿈 채무자', enTitle: 'I Dreamed a Dream' },

	// [EP 3집] 귀천
	TRK_EP03_001: { id: 'TRK_EP03_001', title: '쇠창살이 없는 감옥', enTitle: 'Jail of Freedom' },
	TRK_EP03_002: { id: 'TRK_EP03_002', title: '빈그릇', enTitle: 'Empty' },
	TRK_EP03_003: { id: 'TRK_EP03_003', title: '감기네요', enTitle: 'Cold' },
	TRK_EP03_004: { id: 'TRK_EP03_004', title: '안개', enTitle: 'Fog' },
	TRK_EP03_005: {
		id: 'TRK_EP03_005',
		isLead: true,
		title: '우리는 나한테만 너무 가혹하다',
		enTitle: "Don't Blame Yourself",
	},
	TRK_EP03_006: { id: 'TRK_EP03_006', title: '조각구름', enTitle: 'Jogagguleum' },

	// [SP 1집] 속편
	TRK_SP01_001: { id: 'TRK_SP01_001', isLead: true, title: '속편', enTitle: 'Sequel' },

	// [SP 2집] 인간 쓰레기
	TRK_SP02_001: { id: 'TRK_SP02_001', isLead: true, title: '인간쓰레기', enTitle: 'Trashman' },

	// [SP 3집] 고백
	TRK_SP03_001: { id: 'TRK_SP03_001', isLead: true, title: '고백', enTitle: 'UFO' },

	// [SP 4집] 세모 네모 동그라미
	TRK_SP04_001: { id: 'TRK_SP04_001', isLead: true, title: '세모 네모 동그라미', enTitle: 'Triangle Square Circle' },

	// [SP 5집] 이별이 그대는 쉽나요
	TRK_SP05_001: { id: 'TRK_SP05_001', isLead: true, title: '이별이 그대는 쉽나요', enTitle: "Don't leave me" },

	// [LV 1집] 천진우 라이브 (2024.01.11)
	TRK_LV01_001: {
		id: 'TRK_LV01_001',
		title: '매운인간+청춘',
		enTitle: 'Spicy Man+Youth',
		version: 'Live-2023.12.16.',
		originalTrackId: ['TRK_LP01_004', 'TRK_EP01_001'],
	},
	TRK_LV01_002: {
		id: 'TRK_LV01_002',
		title: '주정뱅이 딴따라 미친년과 빚쟁이',
		enTitle: 'Drunk',
		version: 'Live-2023.12.16.',
		originalTrackId: 'TRK_LP04_009',
	},
	TRK_LV01_003: {
		id: 'TRK_LV01_003',
		title: '마음농장',
		enTitle: 'Farm',
		version: 'Live-2023.12.16.',
		originalTrackId: 'TRK_LP02_004',
	},
	TRK_LV01_004: {
		id: 'TRK_LV01_004',
		title: '시궁쥐',
		enTitle: 'Rat',
		version: 'Live-2023.12.16.',
		originalTrackId: 'TRK_EP01_004',
	},
	TRK_LV01_005: {
		id: 'TRK_LV01_005',
		title: '숫자의 상대성에 관하여',
		enTitle: 'About Time',
		version: 'Live-2023.12.16.',
	},
	TRK_LV01_006: {
		id: 'TRK_LV01_006',
		isLead: true,
		title: '아이스크림',
		enTitle: 'Icecream',
		version: 'Live-2023.12.16.',
		originalTrackId: 'TRK_LP03_007',
	},
	TRK_LV01_007: {
		id: 'TRK_LV01_007',
		title: '생일축하해',
		enTitle: 'Happy Birthday',
		version: 'Live-2023.12.16.',
		originalTrackId: 'TRK_LP02_003',
	},
	TRK_LV01_008: {
		id: 'TRK_LV01_008',
		title: '집에가자',
		enTitle: 'Going Home',
		version: 'Live-2023.12.16.',
		originalTrackId: 'TRK_LP02_009',
	},

	// [LV 2집] 천진우 라이브2 (2025.02.09)
	TRK_LV02_001: {
		id: 'TRK_LV02_001',
		ageLimit: true,
		title: '좆됐다 좆됐어',
		enTitle: 'Fucked Up',
		version: 'Live-2024.05.15. with 김한수,설규리',
		originalTrackId: 'TRK_LP02_001',
	},
	TRK_LV02_002: {
		id: 'TRK_LV02_002',
		isLead: true,
		title: '멸망',
		enTitle: 'Fall',
		version: 'Live-2024.05.15. with 김한수,설규리',
		originalTrackId: 'TRK_EP01_005',
	},
	TRK_LV02_003: {
		id: 'TRK_LV02_003',
		ageLimit: true,
		title: '청춘',
		enTitle: 'Youth',
		version: 'Live-2024.05.15. with 김한수,설규리',
		originalTrackId: 'TRK_EP01_001',
	},
	TRK_LV02_004: {
		id: 'TRK_LV02_004',
		title: '혼술',
		enTitle: 'Sober',
		version: 'Live-2024.05.15. with 김한수,설규리',
		originalTrackId: 'TRK_LP02_010',
	},
	TRK_LV02_005: {
		id: 'TRK_LV02_005',
		title: '그래 뭐가 됐든 결국 지나간다',
		enTitle: 'Whatever',
		version: 'Live-2024.05.15. with 오쉽',
		originalTrackId: 'TRK_LP02_006',
	},
	TRK_LV02_006: {
		id: 'TRK_LV02_006',
		title: '꽐라 블루스',
		enTitle: 'Drunk',
		version: 'Live-2024.05.15. with 오쉽',
		originalTrackId: 'TRK_LP02_002',
	},
	TRK_LV02_007: {
		id: 'TRK_LV02_007',
		title: '아파요',
		enTitle: 'Hurt',
		version: 'Live-2024.05.15. with 오쉽',
		originalTrackId: 'TRK_LP01_007',
	},
	TRK_LV02_008: {
		id: 'TRK_LV02_008',
		title: '헐크호건 존시나가 같이 삽니다',
		enTitle: 'Hulk',
		version: 'Live-2024.04.06. with 중식이밴드',
		originalTrackId: 'TRK_LP01_001',
	},
	TRK_LV02_009: {
		id: 'TRK_LV02_009',
		title: '인간쓰레기',
		enTitle: 'Trashman',
		version: 'Live-2024.04.06. with 중식이밴드',
		originalTrackId: 'TRK_SP02_001',
	},
	TRK_LV02_010: {
		id: 'TRK_LV02_010',
		ageLimit: true,
		title: '좆됐다 좆됐어',
		enTitle: 'Fucked',
		version: 'Live-2024.04.06. with 중식이밴드',
		originalTrackId: 'TRK_LP02_001',
	},
	TRK_LV02_011: {
		id: 'TRK_LV02_011',
		title: '12월 31일',
		enTitle: 'Happy New Year',
		version: 'Live-2024.04.06. with 중식이밴드',
		originalTrackId: 'TRK_LP03_008',
	},

	// [LV 3집] 구토유발자들 (2025.04.18)
	TRK_LV03_001: {
		id: 'TRK_LV03_001',
		title: '좋은 친구들',
		enTitle: 'Goodfellas Live',
		originalTrackId: 'TRK_LP04_004',
	},
	TRK_LV03_002: {
		id: 'TRK_LP03_002',
		title: '노인을 위한 나라',
		enTitle: 'Country For Old Men Live',
		originalTrackId: 'TRK_LP04_002',
	},
	TRK_LV03_003: { id: 'TRK_LV03_003', title: '시궁쥐', enTitle: 'Rat Live', originalTrackId: 'TRK_EP01_004' },
	TRK_LV03_004: {
		id: 'TRK_LV03_004',
		title: '다리에서요',
		enTitle: 'On The Bridge Live',
		originalTrackId: 'TRK_EP01_006',
	},
	TRK_LV03_005: {
		id: 'TRK_LV03_005',
		title: '여름좀비',
		enTitle: 'Summer Zombie Live',
		originalTrackId: 'TRK_LP01_006',
	},
	TRK_LV03_006: { id: 'TRK_LV03_006', title: '아이스크림', enTitle: 'Ice Cream Live', originalTrackId: 'TRK_LP03_007' },
	TRK_LV03_007: {
		id: 'TRK_LV03_007',
		isLead: true,
		title: '세모 네모 동그라미',
		enTitle: 'Triangle Square Circle Live',
		originalTrackId: 'TRK_SP04_001',
	},
	TRK_LV03_008: { id: 'TRK_LV03_008', title: '대가리총', enTitle: 'HEadshot Live', originalTrackId: 'TRK_LP04_008' },
	TRK_LV03_009: {
		id: 'TRK_LV03_009',
		ageLimit: true,
		title: '좆됐다 좆됐어',
		enTitle: 'Fucked Up Live',
		originalTrackId: 'TRK_LP02_001',
	},
	TRK_LV03_010: { id: 'TRK_LV03_010', title: '멸망', enTitle: 'Fall Live', originalTrackId: 'TRK_EP01_005' },
	TRK_LV03_011: {
		id: 'TRK_LV03_011',
		ageLimit: true,
		title: '청춘',
		enTitle: 'Youth Live',
		originalTrackId: 'TRK_EP01_001',
	},
	TRK_LV03_012: { id: 'TRK_LV03_012', title: '집에 가자', enTitle: 'Going Home Live', originalTrackId: 'TRK_LP02_009' },

	// [VN 1집] 굴다리 (Vinyl)
	// Side A
	TRK_VN01_001: {
		id: 'TRK_VN01_001',
		title: '청춘',
		enTitle: 'Youth',
		version: 'Vinyl Side-A',
		originalTrackId: 'TRK_EP01_001',
	},
	TRK_VN01_002: {
		id: 'TRK_VN01_002',
		title: '카페인',
		enTitle: 'Coffee',
		version: 'Vinyl Side-A',
		originalTrackId: 'TRK_EP01_002',
	},
	TRK_VN01_003: {
		id: 'TRK_VN01_003',
		title: '주정뱅이 딴따라 미친년과 빚쟁이',
		enTitle: 'Drunk',
		version: 'Vinyl Side-A',
		originalTrackId: 'TRK_EP01_003',
	},

	// Side B
	TRK_VN01_004: {
		id: 'TRK_VN01_004',
		title: '시궁쥐',
		enTitle: 'Rat',
		version: 'Vinyl Side-B',
		originalTrackId: 'TRK_EP01_004',
	},
	TRK_VN01_005: {
		id: 'TRK_VN01_005',
		title: '멸망',
		enTitle: 'Fall',
		version: 'Vinyl Side-B',
		originalTrackId: 'TRK_EP01_005',
	},
	TRK_VN01_006: {
		id: 'TRK_VN01_006',
		title: '다리에서요',
		enTitle: 'On The Bridge',
		version: 'Vinyl Side-B',
		originalTrackId: 'TRK_EP01_006',
	},
};
