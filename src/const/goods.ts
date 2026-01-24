// @const/goods

/* eslint-disable storybook/default-exports */

import { instagram, kakaotalk } from '@/assets/icons';
import { LINKS } from '@const/contents';

const snsCategory = LINKS.find(link => link.category === 'SNS');
const instagramUrl = snsCategory?.items.find(item => item.label === 'Instagram')?.url || 'https://instagram.com';

export const CONNACT = {
	KAKAO: 'https://open.kakao.com/o/sIllL2Qe',
	DM: instagramUrl,
} as const;

export const FAN_GOODS_GUIDE = {
	DESCRIPTION:
		'아티스트의 공식 판매처 링크와 올바른 팬 굿즈 제작 문화를 위해 마련되었습니다.\n아티스트와 팬이 서로 존중하는 창작 환경을 위해 제작 가이드라인을 반드시 숙지해 주시길 부탁드립니다.',
	RULES_TITLE: '💡 굿즈 제작 규칙',
	rules: [
		'굿즈샵에 공식적으로 올라오지 않은 제품군만 제작 가능합니다.',
		'제작 전 아티스트(가수)에게 개인 메시지를 통해 사전 허락을 받아야 합니다.',
		'수익이 발생하는 공동구매 형식이 아닌 순수 나눔 및 개인 소장 목적이어야 합니다.',
	],

	CONTACT_TITLE: '💡 굿즈 제작 허락 받기',
	CONTACT_CHANNELS: [
		{
			label: '카카오톡 오픈채팅',
			url: CONNACT.KAKAO,
			icon: kakaotalk,
		},
		{
			label: '인스타그램 디엠',
			url: CONNACT.DM,
			icon: instagram,
		},
	],
} as const;
