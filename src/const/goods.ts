// @/const/goods

/* eslint-disable storybook/default-exports */

import { instagram, kakaotalk } from '@/assets/icons';
import { LINK_LIST } from '@const/links';

export const GetSafeLink = (category: string, label: string, fallback: string = '#'): string => {
	const targetCategory = LINK_LIST.find(link => link.category === category);
	const targetItem = targetCategory?.items.find(item => item.label === label);

	return targetItem?.url || fallback;
};

export const CONTACT = {
	KAKAO: 'https://open.kakao.com/o/sIllL2Qe',
	DM: GetSafeLink('SNS', 'Instagram', 'https://www.instagram.com/1000_jinwoo'),
} as const;

export const FAN_GOODS_GUIDE = {
	DESCRIPTION:
		'아티스트의 공식 판매처 링크와 올바른 팬 굿즈 제작 문화를 위해 마련되었습니다.\n아티스트와 팬이 서로 존중하는 창작 환경을 위해 제작 가이드라인을 반드시 숙지해 주시길 부탁드립니다.',
	GOODS_MADE_TITLE: '💡 굿즈 제작 규칙',
	GOODS_MADE_RULES: [
		'굿즈샵에 공식적으로 올라오지 않은 제품군만 제작 가능합니다.',
		'제작 전 아티스트(가수)에게 개인 메시지를 통해 사전 허락을 받아야 합니다.',
		'수익이 발생하는 공동구매 형식이 아닌 순수 나눔 및 개인 소장 목적이어야 합니다.',
	],

	GOODS_ETIQUETTE_SLOGAN:
		'누군가의 소중한 시간과 마음이 담긴 나눔입니다. 아쉬움 섞인 말 한마디보다 따뜻한 고마움을 먼저 건네는 팬이 됩시다.',
	GOODS_CAUTION_TITLE: '💡 굿즈 수령자 주의사항',
	GOODS_CAUTION_RULES: [
		'나눔은 무료 나눔을 원칙으로 합니다. 오프라인 나눔(공연장 등) 외에 택배로 굿즈를 받을 경우에는 배송비(택배비) 외에 추가 금액을 요구하거나 나눔을 빌미로 다른 물건의 구매를 유도한다면 거절하세요.',
		'배송을 위해 주소와 연락처를 알려줘야 할 경우 가급적 카카오톡 오픈채팅방이나 편의점 반값 택배를 이용해 개인정보 노출을 최소화하세요.',
		'오프라인 나눔(공연장 등)의 경우 가급적 사람이 많은 공개적인 장소 혹은 공연장 내부에서 만나고 늦은 시간이나 외진 곳은 피하세요.',
	],

	GOODS_ETIQUETTE_TITLE: '💡 굿즈 수령자 에티켓',
	GOODS_ETIQUETTE_RULES: [
		'나눔 받은 굿즈를 유료로 되파는 행위는 제작자에 대한 예의가 아니며 팬덤 내에서 큰 문제가 될 수 있습니다. 소장용으로만 간직해주세요.',
		'나눔은 제작자의 순수한 호의로 진행됩니다. 수량이 적다거나 본인이 받지 못했다는 이유로 불만을 표출하는 행위는 삼가주세요.',
		'나눔되는 모든 물품은 제작자의 시간과 정성, 비용이 들어간 소중한 결과물임을 잊지 말아 주세요.',
		'굿즈를 잘 받았다면 제작자에게 간단한 후기나 감사 인사를 남겨주세요. 다음 나눔 문화를 만드는 큰 힘이 됩니다.',
	],

	CONTACT_TITLE: '💡 굿즈 제작 허락 받기',
	CONTACT_CHANNELS: [
		{
			label: '카카오톡 오픈채팅',
			url: CONTACT.KAKAO,
			icon: kakaotalk,
		},
		{
			label: '인스타그램 디엠',
			url: CONTACT.DM,
			icon: instagram,
		},
	],
} as const;
