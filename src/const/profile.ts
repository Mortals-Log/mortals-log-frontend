// @const/contents

/* eslint-disable storybook/default-exports */

import { Profile } from '@/types/profile';
import { LINK_LIST } from '@const/links';

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
	description:
		'천진우의 음악은 어딘가 구슬프다. 멜로디는 서정적인데, 가사가 마냥 밝지만은 않다. 마치 블랙 코미디 영화처럼, 웃기지만 우습지는 않은 이야기를 노래로 풀어낸다. 정형화된 따뜻한 위로에 조금 질린 사람, 뒤틀린 미소와 씁쓸한 애착에 끌리시는 사람이라면 천진우의 음악을 추천한다.',

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
