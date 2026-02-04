// @const/contents

/* eslint-disable storybook/default-exports */

import { Profile } from '@/types/profile';
import { LINK_LIST, LINK_PLATFORM } from '@const/links';
import { EVENT_INTERVIEW } from './event';

const targetInterview = EVENT_INTERVIEW.find(group => group.year === '2025')?.items.find(
	item => item.host === 'nerv_mag',
);

export const NAME = {
	KOREAN: '천진우',
	ENGLISH: 'CHUN JINWOO',
	HANJA: '千鎭宇',
	SOCIALID: '1000_jinwoo',
};

export const PROFILE: Profile = {
	id: NAME.SOCIALID,
	name: NAME.KOREAN,
	enName: NAME.ENGLISH,
	hanjaName: NAME.HANJA,

	mainImage: '/images/profile/main.jpg',
	description: {
		content:
			targetInterview?.descriptionContent ||
			`사람과 사람 사이의 틈을 채울 생각은 없습니다.\n오히려 그 틈 자체를 낭만적으로 바라보고 노래로 옮겨적는 것 같습니다.`,
		platform: targetInterview?.platform || LINK_PLATFORM.INSTAGRAM.NAME,
		account: targetInterview?.host || 'nerv_mag',
		contentTitle: targetInterview?.content || '[에바와 음악Vol.1] 인터뷰',
		postId: targetInterview?.link || 'DMOosfnz7IV/?img_index=1',
	},

	birth: ['1996. 06. 13', '강원도 춘천시 (現 강원특별자치도 춘천시)'],
	nationality: '대한민국',

	education: '강원대학교 사범대학 (일반사회교육학 / 학사)',

	mbti: 'INTJ',
	bloodType: 'O형',

	debut: ['2022. 08. 20', 'EP 굴다리'],
	job: ['싱어송라이터', '교사'],
	alias: ['어둠의 김광석', '(음악)공장장'],
	fandom: '필멸자',

	officialLinks: LINK_LIST,
};
