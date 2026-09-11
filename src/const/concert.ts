// @/const/concert

/* eslint-disable storybook/default-exports */

import { ConcertItem, ConcertList } from '@/types/concert';

export const CONCERT_TYPE_LABEL: Record<string, string> = {
	SOLO: '단독 콘서트',
	JOIN: '합동 콘서트',
	TOUR: '전국 투어',
	LISTENING: '음악감상회',
	FESTIVAL: '페스티벌',
};

export const MEMBERS = {
	// 코어 멤버
	CJW: '천진우',
	KJE: '강주은',
	KHS: '김한수',
	LJD: '리장단',
	BY: '법영이',

	// 자주 출연
	JS: '중식이',
	GT: '기토',
	YDH: '양동훈',
	KTH: '김태현',
	LDH: '이덕현',
	WD: '왑띠',

	// 그 외
	KIH: '김인한',
	G: '걔',
	PSG: '박성균',
	SKL: '설규리',
	LJM: '이정민',
	GSB: '정새벽',
	HW: '한우',
	LES: '이은서',
	SR: '산사람 밴드',

	OS: '오쉽 밴드',
	DB: '대방중 뉴진스',
	HANABI: '금옥중 하나비 밴드',
} as const;

export const SOLO_CONCERT: ConcertList = [
	{
		year: '2026',
		items: [
			{
				type: 'SOLO',
				date: '03.28 ~ 03.29',
				content: '천진우 포크 공연',
				location: '금천구 수상한창고',
				times: ['17:00'],
				price: { regular: 50000, onSpot: 60000 },
				lineUp: [MEMBERS.CJW],
				ticketing: [
					{
						label: '1일차',
						ticketingDate: '2026.03.08',
						ticketingTime: '12:00',
						ticketingLink:
							'https://docs.google.com/forms/d/e/1FAIpQLSdU61HJVon7iyEqp8WqUYTZxHbF3oLEb7qXNGwcFacn0FAdrQ/viewform',
					},
					{
						label: '2일차',
						ticketingDate: '2026.03.08',
						ticketingTime: '12:00',
						ticketingLink:
							'https://docs.google.com/forms/d/e/1FAIpQLSdLle2YuPhFF5Cm8IWnbArF-L1n52WQ7GGUDunq2esMtQgwlQ/viewform',
					},
				],
			},
			{
				type: 'SOLO',
				date: '02.07 ~ 02.08',
				content: '고독의 포크 전사 주정뱅이 딴따라',
				location: '홍대 롤링홀',
				times: ['16:00'],
				price: { regular: 55000, onSpot: 66000 },
				lineUp: [MEMBERS.CJW],
				ticketing: [
					{
						ticketingDate: '2026.01.12',
						ticketingTime: '20:00',
						ticketingLink: 'https://ticket.melon.com/performance/index.htm?prodId=212599',
					},
				],
			},
			{
				type: 'SOLO',
				date: '01.17',
				content: '부산불바다2',
				location: '부산 리얼라이즈',
				times: ['16:00', '19:00'],
				price: { regular: 50000, army: 40000 },
				lineUp: [MEMBERS.CJW, MEMBERS.GT, MEMBERS.YDH, MEMBERS.LJD, MEMBERS.BY],
				ticketing: [
					{
						ticketingDate: '2025.12.20',
						ticketingTime: '13:00',
					},
					{
						ticketingDate: '2025.12.27',
						ticketingTime: '13:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '05.24',
				content: '고통을 믿지마, 인생은 가짜야',
				location: '얼라이브홀',
				times: ['16:00'],
				price: { regular: 60000, student: 50000, monk: 0 },
				lineUp: [MEMBERS.CJW, MEMBERS.GT, MEMBERS.HW, MEMBERS.BY, MEMBERS.LES],
				ticketing: [
					{
						ticketingDate: '2026.05.03',
						ticketingTime: '12:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '07.20',
				content: '[먼데이프로젝트 시즌9] 천진우 단독 포크 콘서트 ‘월요일은 개 같은 날이라서 월요일일까’',
				location: '연남스페이스',
				times: ['20:00'],
				price: { regular: 55000 },
				lineUp: [MEMBERS.CJW],
				ticketing: [
					{
						ticketingDate: '2026.07.03',
						ticketingTime: '18:00',
					},
				],
			},

			{
				type: 'SOLO',
				date: '09.27',
				content: '초가을 천진우 포크공연',
				location: '금천구 수상한 창고',
				times: ['17:00'],
				price: { regular: 60000, student: 50000 },
				lineUp: [MEMBERS.CJW],
				ticketing: [
					{
						ticketingDate: '2026.09.12',
						ticketingTime: '13:00',
					},
				],
			},
		],
	},
	{
		year: '2025',
		items: [
			{
				type: 'SOLO',
				date: '11.21',
				content: '천진우의 연말시상식',
				location: '홍대 롤링홀',
				times: ['20:00'],
				price: { regular: 55000, student: 45000 },
				lineUp: [MEMBERS.CJW, MEMBERS.KJE, MEMBERS.KHS, MEMBERS.BY, MEMBERS.HANABI],
				ticketing: [
					{
						ticketingDate: '2025.11.21',
						ticketingTime: '20:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '08.17',
				content: '오싹오싹 공포의 인간쓰레기',
				location: '홍대 롤링홀',
				times: ['17:00'],
				price: { regular: 55000, onSpot: 66000 },
				lineUp: [MEMBERS.CJW, MEMBERS.KJE, MEMBERS.KHS, MEMBERS.BY, MEMBERS.LDH],
				ticketing: [
					{
						ticketingDate: '2025.07.22',
						ticketingTime: '20:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '05.03',
				content: '천진우와의 가장 가까운 만남',
				location: '대전 럭스라운지',
				times: ['18:00'],
				price: { regular: 30000, student: 25000 },
				lineUp: [MEMBERS.CJW, MEMBERS.KJE, MEMBERS.KHS, MEMBERS.BY, MEMBERS.LDH],
			},
			{
				type: 'SOLO',
				date: '03.03',
				content: '구토유발자들',
				location: '홍대 얼라이브홀',
				times: ['16:00'],
				price: { regular: 45000, student: 35000 },
				lineUp: [MEMBERS.CJW, MEMBERS.KJE, MEMBERS.KHS, MEMBERS.LJD, MEMBERS.BY],
				ticketing: [
					{
						ticketingDate: '2025.02.16',
						ticketingTime: '12:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '02.08',
				content: '랑만 버스킹',
				location: '청주 랑만',
				times: ['20:00'],
				lineUp: [MEMBERS.CJW],
			},
			{
				type: 'SOLO',
				date: '01.25',
				content: '천진우와 무법자들',
				location: '홍대 청춘예찬',
				times: ['16:00'],
				price: { regular: 45000, student: 35000 },
				lineUp: [MEMBERS.CJW, MEMBERS.KJE, MEMBERS.KHS, MEMBERS.LJD, MEMBERS.BY],
				ticketing: [
					{
						ticketingDate: '2025.01.12',
						ticketingTime: '12:00',
					},
				],
			},
		],
	},
	{
		year: '2024',
		items: [
			{
				type: 'SOLO',
				date: '12.20',
				content: '대가리총 빵야빵야',
				location: '스페이스 한강',
				times: ['20:00'],
				price: { regular: 33000 },
				lineUp: [MEMBERS.CJW, MEMBERS.KJE, MEMBERS.KHS, MEMBERS.LJD, MEMBERS.BY],
				ticketing: [
					{
						ticketingDate: '2024.12.09',
						ticketingTime: '12:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '12.08',
				content: '대뽀까지마라',
				location: '부산 리얼라이즈',
				times: ['16:00'],
				price: { regular: 35000, student: 25000 },
				lineUp: [MEMBERS.CJW, MEMBERS.KTH, MEMBERS.LJD],
				ticketing: [
					{
						ticketingDate: '2024.11.24',
						ticketingTime: '12:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '11.23',
				content: '달달이 공연 제5호',
				location: '수상한 창고',
				times: ['16:00'],
				price: { regular: 40000, student: 30000 },
				lineUp: [MEMBERS.CJW, MEMBERS.KTH, MEMBERS.LJD],
				ticketing: [
					{
						ticketingDate: '2024.11.10',
						ticketingTime: '12:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '09.21',
				content: '달달이 공연 제4호',
				location: '홍대 플렉스라운지',
				times: ['16:00'],
				price: { regular: 35000, student: 25000 },
				lineUp: [MEMBERS.CJW, MEMBERS.KJE, MEMBERS.KTH, MEMBERS.KHS],
				ticketing: [
					{
						ticketingDate: '2024.09.09',
						ticketingTime: '12:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '08.25',
				content: '홍대불바다',
				location: '홍대 청춘예찬',
				times: ['16:00'],
				price: { regular: 35000, student: 25000 },
				lineUp: [MEMBERS.CJW, MEMBERS.GT, MEMBERS.YDH, MEMBERS.LJD],
				ticketing: [
					{
						ticketingDate: '2024.08.11',
						ticketingTime: '12:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '07.28',
				content: '부산불바다',
				location: '부산 오방가르드',
				times: ['16:00'],
				price: { regular: 30000, student: 20000, alien: 100000 },
				lineUp: [MEMBERS.CJW, MEMBERS.GT, MEMBERS.YDH, MEMBERS.LJD],
				ticketing: [
					{
						ticketingDate: '2024.07.18',
						ticketingTime: '12:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '05.15',
				content: '달달이 공연 제3호',
				location: '홍대 플렉스라운지',
				times: ['16:00'],
				price: { regular: 35000, student: 25000, teacher: 25000 },
				lineUp: [MEMBERS.CJW, MEMBERS.KHS, MEMBERS.SKL, MEMBERS.OS],

				ticketing: [
					{
						ticketingDate: '2024.04.28',
						ticketingTime: '12:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '02.24',
				content: '달달이 공연 제2호',
				location: '수상한 창고',
				times: ['16:00'],
				price: { regular: 35000 },
				lineUp: [MEMBERS.CJW, MEMBERS.JS],
				ticketing: [
					{
						ticketingDate: '2024.02.12',
						ticketingTime: '14:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '01.28',
				content: '달달이 공연 제1호',
				location: '수상한 창고',
				times: ['16:00'],
				price: { regular: 35000 },
				lineUp: [MEMBERS.CJW, MEMBERS.GT],
				ticketing: [
					{
						ticketingDate: '2024.01.21',
						ticketingTime: '17:00',
					},
				],
			},
		],
	},
	{
		year: '2023',
		items: [
			{
				type: 'SOLO',
				date: '12.16',
				content: '앗-! 겁나게 뜨거 여러분의 사랑',
				location: '홍대 스페이스홍',
				times: ['13:00'],
				price: { regular: 35000 },
				lineUp: [MEMBERS.CJW, MEMBERS.WD, MEMBERS.DB],
				ticketing: [
					{
						ticketingDate: '2023.12.01',
						ticketingTime: '13:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '06.24',
				content: '아기다리 고기다리던 가라오케 업로드',
				location: '중식이 스튜디오',
				times: ['16:00'],
				price: { regular: 30000 },
				lineUp: [MEMBERS.CJW],
				ticketing: [
					{
						ticketingDate: '2023.06.24',
						ticketingTime: '16:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '05.05',
				content: '어른이날',
				location: '홍대 스페이스홍',
				times: ['16:00'],
				price: { regular: 30000, student: 25000 },
				lineUp: [MEMBERS.CJW],
				ticketing: [
					{
						ticketingDate: '2023.04.14',
						ticketingTime: '13:00',
					},
				],
			},
			{
				type: 'SOLO',
				date: '01.28',
				content: '내일을 위한 오늘은 없다 대신에 여기 당신을 위한 공연이 왔다',
				location: '중식이 스튜디오',
				times: ['16:00'],
				price: { regular: 30000 },
				lineUp: [MEMBERS.CJW, MEMBERS.G],
				ticketing: [
					{
						ticketingDate: '2023.01.17',
						ticketingTime: '12:00',
					},
				],
			},
		],
	},
	{
		year: '2022',
		items: [
			{
				type: 'SOLO',
				date: '12.03',
				content: '굴다리에서 명상좀비',
				location: '중식이 스튜디오',
				times: ['16:00'],
				price: { regular: 10000, student: 7000 },
				lineUp: [MEMBERS.CJW, MEMBERS.JS, MEMBERS.GSB],
			},
		],
	},
];

export const JOIN_CONCERT: ConcertList = [
	{
		year: '2026',
		items: [
			{
				type: 'JOIN',
				date: '06.26',
				content: '개과천선▫산사람(과나) X 천진우 합동공연',
				location: '홍대 듈스튜디오',
				times: ['20:00'],
				price: { regular: 65000, student: 55000 },
				lineUp: [MEMBERS.CJW, MEMBERS.SR, MEMBERS.GT, MEMBERS.HW, MEMBERS.BY, MEMBERS.LES],
				ticketing: [
					{
						ticketingDate: '2026.06.06',
						ticketingTime: '13:00',
					},
				],
			},
		],
	},
	{
		year: '2025',
		items: [
			{
				type: 'JOIN',
				date: '04.18',
				content: '와따리가따리 시즌2',
				location: '홍대 롤링홀',
				times: ['21:00'],
				lineUp: [MEMBERS.CJW, MEMBERS.JS],
				ticketing: [
					{
						ticketingDate: '2025.03.30',
						ticketingTime: '12:00',
					},
				],
			},
		],
	},
	{
		year: '2024',
		items: [
			{
				type: 'JOIN',
				date: '04.19',
				content: '19금 스탠드업 코미디 콜라보 딸딸이 공연',
				location: '수상한 창고',
				times: ['20:00'],
				price: { regular: 40000 },
				lineUp: [MEMBERS.CJW, MEMBERS.KIH, MEMBERS.PSG, MEMBERS.LJM, MEMBERS.OS],
				ageLimit: true,
				ticketing: [
					{
						ticketingDate: '2024.04.10',
						ticketingTime: '13:00',
					},
				],
			},
			{
				type: 'JOIN',
				date: '04.06',
				content: '와따리가따리 시즌1',
				// 시즌2(2025.04.18)와 장소가 뒤바뀌어 있던 것을 namu.wiki 대조로 확인 후 수정.
				location: '홍대 플렉스라운지',
				lineUp: [MEMBERS.CJW, MEMBERS.JS],
				ticketing: [
					{
						ticketingDate: '2024.03.15',
						ticketingTime: '20:00',
					},
				],
			},
		],
	},
];

export const TOUR_CONCERT: ConcertList = [
	{
		year: '2023',
		items: [
			{
				type: 'TOUR',
				date: '07.29',
				content: '여름좀비 - 춘천',
				location: '춘천 클럽투투',
				price: { regular: 30000 },
				lineUp: [MEMBERS.CJW],
				ticketing: [
					{
						ticketingDate: '2023.07.22',
						ticketingTime: '13:00',
					},
				],
			},
			{
				type: 'TOUR',
				date: '08.04',
				content: '여름좀비 - 부산',
				location: '부산 오방가르드',
				price: { regular: 30000 },
				lineUp: [MEMBERS.CJW],
				fileName: 'TOUR_20230729',
				ticketing: [
					{
						ticketingDate: '2023.07.22',
						ticketingTime: '13:00',
					},
				],
			},
			{
				type: 'TOUR',
				date: '08.06',
				content: '여름좀비 - 서울',
				location: '홍대 언플러그드',
				price: { regular: 30000 },
				lineUp: [MEMBERS.CJW],
				fileName: 'TOUR_20230729',
				ticketing: [
					{
						ticketingDate: '2023.07.22',
						ticketingTime: '13:00',
					},
				],
			},
		],
	},
];

export const LISTENING: ConcertList = [
	{
		year: '2026',
		items: [
			{
				type: 'LISTENING',
				date: '04.23',
				content: '제3회 음악감상회',
				location: '금천구 수상한 창고',
			},
		],
	},
	{
		year: '2025',
		items: [
			{
				type: 'LISTENING',
				date: '06.14',
				content: '제1회 음악감상회',
				location: '수상한 창고',
				times: ['15:00'],
				price: { regular: 25000 },
				ticketing: [
					{
						ticketingDate: '2025.06.01',
						ticketingTime: '12:00',
					},
				],
			},
			{
				type: 'LISTENING',
				date: '10.09',
				content: '제2회 음악감상회',
				location: '수상한 창고',
				times: ['13:00'],
				price: { regular: 25000 },
				ticketing: [
					{
						ticketingDate: '2025.09.20',
						ticketingTime: '13:00',
					},
				],
			},
		],
	},
];

export const FESTIVAL: ConcertList = [
	{
		year: '2026',
		items: [
			{
				type: 'FESTIVAL',
				date: '09.05 ~ 09.06',
				performanceDates: ['09.06'],
				times: ['10:40 ~ 11:20'],
				ageLimit: true,
				content: '사운드 플래닛 페스티벌 2026',
				location: '인천광역시 영종구 파라다이스시티',
				performanceLocation: '크로마 스테이지',
				lineUp: [MEMBERS.CJW, MEMBERS.GT, MEMBERS.BY, MEMBERS.LJD, MEMBERS.YDH],
				price: {
					regular: [
						{ label: '1일권', amount: 132000 },
						{ label: '2일권', amount: 198000 },
					],
					early: [
						{ label: '1일권', amount: 118800 },
						{ label: '2일권', amount: 158000 },
					],
				},
				ticketing: [
					{
						label: '얼리버드',
						ticketingDate: '2026.03.17',
						ticketingTime: '14:00',
					},
					{
						label: '일반',
						ticketingDate: '2026.07.03',
						ticketingTime: '12:00',
					},
				],
			},

			{
				type: 'FESTIVAL',
				date: '04.12',
				content: '와우산록페스티벌',
				location: '와우산로의 라이브 클럽',
				lineUp: [MEMBERS.CJW],
			},
		],
	},
];

export const GET_FULL_CONCERTS = () => {
	const combinedMap: Record<string, ConcertItem[]> = {};

	[...SOLO_CONCERT, ...JOIN_CONCERT, ...TOUR_CONCERT, ...LISTENING, ...FESTIVAL].forEach(group => {
		if (!combinedMap[group.year]) {
			combinedMap[group.year] = [];
		}

		const enrichedItems = group.items.map(item => {
			const pendingTimes = item.times || ['미정'];
			const pendingLocation = item.location || '미정';

			return {
				...item,
				location: pendingLocation,
				times: pendingTimes,
				fileName: item.fileName,
			};
		});

		combinedMap[group.year].push(...enrichedItems);
	});

	return Object.keys(combinedMap)
		.sort((a, b) => Number(b) - Number(a))
		.map(year => ({
			year,
			items: combinedMap[year].sort((a, b) => {
				const dateA = a.date
					.split('~')[0]
					.replace(/[^0-9]/g, '')
					.padEnd(4, '0');
				const dateB = b.date
					.split('~')[0]
					.replace(/[^0-9]/g, '')
					.padEnd(4, '0');

				return Number(dateB) - Number(dateA);
			}),
		}));
};

export const FULL_CONCERTS: ConcertList = GET_FULL_CONCERTS();
