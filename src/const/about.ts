// @/const/about

/* eslint-disable storybook/default-exports */

export const ABOUT_STORY = {
	MAINTITLE: 'MORTALS\nLOG',
	SUBTITLE: ': 필멸자들의 기록\n: 필멸자들을 위한 기록',
	DESCRIPTION: {
		MAIN: [
			'우리는 모두 찰나를 살아가는 유한한 존재',
			':Mortals',
			'이지만\n우리가 남기는 기록',
			':Log',
			'은 그 순간을 영원으로 만듭니다.',
		],
		SUB: 'Mortals Log는 아티스트 천진우의 활동을 기록하기 위해 시작되었습니다.\n팬들로 채워지는 아카이브 공간입니다.',
	},
} as const;

export const ABOUT_POLICY = {
	SECTIONS: [
		{
			label: 'DISCLAIMER',
			content:
				'본 사이트는 아티스트 천진우를 응원하는 비공식 팬페이지입니다. 아티스트와의 공식적인 관계가 없으며 영리적 목적을 취하지 않는 순수 아카이브 공간입니다.',
		},
		{
			label: 'COPYRIGHT',
			content:
				'사이트 내 모든 공식 콘텐츠의 저작권은 아티스트에게 있습니다. 모든 컨텐츠의 크롭 및 상업적 이용은 금지합니다.',
		},
		{
			label: 'CONTACT',
			content: '오류 제보, 콘텐츠 삭제 요청 및 기타 문의는 하단 SNS 채팅 혹은 이메일을 통해 전달해 주시기 바랍니다.',
		},
	],
} as const;

export const ABOUT_INQUIRY = {
	KAKAO: { label: '카카오톡 오픈채팅', url: 'https://open.kakao.com/me/mortalsLog' },
	GOOGLE: { label: '구글 폼', url: 'https://forms.gle/KxC4H35ecY3eizZs6' },
} as const;

export const ABOUT_INQUIRY_SUFFIX = '으로 문의하기 →' as const;
