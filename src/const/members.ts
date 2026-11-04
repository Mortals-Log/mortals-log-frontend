// @/const/members
// 공연 라인업에 쓰는 이름 목록. 관리자 페이지의 라인업 선택과 fixtures/concert.ts 가 함께 쓴다.

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
