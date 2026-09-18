// @/const/layout-classes
// src/styles/common/Layout.style.ts 의 공용 레이아웃 프리미티브를 Tailwind 클래스 문자열로 이관.
// Layout.style.ts 는 Task 18 에서 소비처 0 확인 후 삭제.

/* eslint-disable storybook/default-exports */

/** styled.main — 페이지 최상위 컨테이너 */
export const LAYOUT_MAIN =
	'max-w-[800px] mx-auto py-[100px] px-[60px] min-h-screen max-tablet:py-20 max-tablet:px-[1.8rem] max-mobile:py-20 max-mobile:px-6';

/** styled.section — 페이지 내 섹션 */
export const LAYOUT_CONTENT_SECTION = 'w-full mt-16';

/** styled.div — 섹션 제목 (자식 span 은 영문 부제) */
export const LAYOUT_SECTION_TITLE =
	'flex w-full items-baseline gap-[0.3rem] font-serif text-xl font-normal text-gray-700 border-b-2 border-primary pb-4 tracking-[1px] flex-wrap [word-break:keep-all] [&_span]:text-sm [&_span]:font-normal [&_span]:text-gray-500 [&_span]:uppercase [&_span]:tracking-[1px] max-tablet:pb-[0.6rem] max-tablet:text-lg max-mobile:pb-[0.7rem] max-mobile:gap-[0.4rem] max-mobile:[&_span]:text-xs';

/** styled.div — H2급 페이지 타이틀 */
export const LAYOUT_MAIN_TITLE =
	'font-serif text-h2 font-medium text-black mt-[0.3rem] leading-[1.3] max-tablet:mt-[0.2rem] max-mobile:text-h3';

/** styled.span — 페이지 타이틀 영문 부제 */
export const LAYOUT_SUB_TITLE =
	'font-sans text-md font-normal text-primary uppercase max-tablet:text-sm max-mobile:text-xs';

/** styled.div — 페이지 타이틀 하위 설명문 */
export const LAYOUT_DESCRIPTION =
	'mt-[0.8rem] mb-[-2rem] font-sans text-sm font-normal text-gray-500 leading-[1.5] whitespace-pre-wrap [word-break:keep-all] max-tablet:leading-[1.2] max-tablet:mt-[0.5rem] max-tablet:mb-[-2.5rem] max-mobile:text-xs';
