# Emotion → Tailwind v4 전환 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `mortals-log-frontend`의 UI 스타일을 Emotion CSS-in-JS에서 Tailwind v4 유틸리티 클래스로 점진 전환하고, `themes.ts`의 디자인 토큰을 Tailwind `@theme` 단일 출처로 옮긴다.

**Architecture:** Emotion과 Tailwind가 병존하는 상태로 한 단위(공용 컴포넌트 1개 또는 페이지 1개)씩 전환한다. 각 단위는 대응 `.style.ts` 파일을 삭제하고 Tailwind만 쓰는 상태로 끝난다. 토큰은 `src/styles/globals.css`의 `@theme` 블록에 `themes.ts` 값을 1:1로 옮긴다. `styled(motion.X)`는 `<motion.X className={cn(...)}>`로 바꾸되 framer-motion은 유지. `ThemeProvider`는 마지막 정리 태스크에서 제거.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/postcss`), `clsx` + `tailwind-merge` (`cn`), framer-motion (유지), Storybook `@storybook/nextjs`, pnpm.

## Global Constraints

- **시각적 재현 기준: 픽셀 근접.** 현재 화면을 그대로 재현한다. 토큰 값은 `src/styles/themes.ts`를 1:1로 옮긴다. 불일치라도 이번 작업에서 "정리"하지 않는다.
- **점진적 전환.** Emotion과 Tailwind 동시 설치 유지. 한 단위 "완료" 조건: 대응 `.style.ts` 파일 삭제 + 그 단위의 모든 `.tsx`가 Emotion(`@emotion/*`, `props.theme`, `styled`) 미사용.
- **framer-motion 유지.** `styled(motion.X)` → `<motion.X className={cn(...)} {...motionProps}>`. `initial`/`animate`/`variants`/`transition`/`whileHover` 등 prop 전량 보존.
- **`ThemeProvider`는 마지막까지 유지.** `props.theme` 참조하는 Emotion 컴포넌트가 하나라도 남아 있으면 제거 금지. → 마지막 정리 태스크에서만 제거.
- **의존성 최소화.** 추가 의존성은 `tailwindcss` (v4), `@tailwindcss/postcss`, `clsx`, `tailwind-merge` 넷뿐. `class-variance-authority`(`cva`)는 BadgeList / GNB에서 변형 로직이 실제로 필요하면 그때만 추가.
- **`any` 금지.**
- **`@/` 절대경로 별칭 유지.** 다른 디렉터리는 `@/`, 같은 디렉터리는 상대경로.
- **폴더/파일 리네임 금지.** `src/const`, `src/views`, 아이콘 파일명, `src/utils` 위치 모두 그대로. `cn` 유틸은 `src/utils/cn.ts`.
- **`react-calendar` 자체 CSS는 건드리지 않는다.**
- **검증 명령**: 각 태스크 끝에서 `pnpm exec tsc --noEmit` (에러 0), `rm -rf .next && pnpm run build` (에러 0, 라우트 수 불변). 커밋 컨벤션: 타입 소문자 + 한글 제목, 마침표 없음.

---

## 공용 변환 절차 (모든 컴포넌트/페이지 태스크가 참조)

각 변환 태스크는 아래 절차를 그대로 따른다. "적절히 처리" 같은 판단 여지는 없다.

**A. 대상 파악**
- 태스크가 지정한 `.tsx` 파일들과 그 파일들이 `import * as S from '...style'`로 가져오는 `.style.ts(x)` 파일들이 대상이다.

**B. 각 `styled` export를 클래스 문자열로 변환**
1. `.style.ts`의 `export const Foo = styled.div\`CSS\`` 에서 CSS를 Tailwind 유틸리티 클래스 시퀀스로 옮긴다. 매핑 규칙:
   - 색상/타이포/폰트/브레이크포인트 → 아래 "토큰 → 유틸" 표의 클래스 사용 (`color: PRIMARY` → `text-primary`, `font-size: H1` → `text-h1`, `@media (max-width:768px)` → `max-tablet:` variant).
   - 토큰 스케일 밖 수치 → arbitrary value: `height: 60px` → `h-[60px]`, `z-index: 9999` → `z-[9999]`, `backdrop-filter: blur(30px)` → `backdrop-blur-[30px]`, `max-width: 1200px` → `max-w-[1200px]`, `gap: 1rem` → `gap-4`, `padding: 0 2rem` → `px-8`.
   - `props => props.theme.COLOR.X` 인터폴레이션 → 해당 토큰 클래스. 유틸로 못 쓰는 자리(예: `box-shadow`의 색, `background: linear-gradient(...)`) → arbitrary `[box-shadow:...]` 또는 `bg-[linear-gradient(...)]` 안에서 `var(--color-x)` 참조.
   - `&:hover { ... }` → `hover:...`. `&:active` → `active:...`. `&:disabled` → `disabled:...`. `&::before`/`&::after` → `before:...`/`after:...` (content는 `before:content-['']`).
   - 자식 셀렉터 `& .logo { color: ... }` → 부모 요소에 `group`, 자식 요소에 `group-hover:...` 또는 부모에 arbitrary `[&_.logo]:text-primary`.
   - `@media print { display: none !important }` → `print:hidden`.
   - `keyframes`(Emotion `@emotion/react`의 `keyframes`) → `src/styles/globals.css`의 `@layer utilities`에 `@keyframes name { ... }` 추가 + 요소에 arbitrary `animate-[name_2s_ease-in-out_infinite]`.
2. prop 기반 조건부 스타일 `styled.button<{ $isActive?: boolean }>` :
   - 조건이 1개고 재사용 적음 → 소비 `.tsx`에서 `className={cn('기본클래스', isActive && '활성클래스')}`.
   - 조건이 2개 이상 & 재사용 → `class-variance-authority` 설치 후 대상 `.tsx` 옆에 `<Name>.variants.ts` 만들어 `cva` 정의, `.tsx`에서 `cn(nameVariants({ variant }))`.

**C. 소비 `.tsx` 수정**
- `import * as S from '...style'` 삭제.
- `<S.Foo ...>` → 원래 렌더된 HTML 태그(`styled.div` → `<div>`, `styled(motion.nav)` → `<motion.nav>`, `styled(Link)` → `<Link>`)로 바꾸고 `className={cn('변환된 클래스들')}` 부여. 기존에 넘기던 다른 prop(`onClick`, `href`, `initial`, `animate` 등) 전부 유지.
- `styled(motion.X)` 였던 것은 `import { motion } from 'framer-motion'` 확인 후 `<motion.X className={cn(...)} {...기존 motion props}>`.
- `styled(Link)` 였던 것은 `import Link from 'next/link'` 유지, `<Link className={cn(...)} href={...}>`.
- `useTheme()` 호출 → 제거하고 해당 값 사용처를 토큰 클래스로.

**D. `.style.ts` 파일 삭제**
- 대상 `.style.ts(x)` 파일을 `git rm` 한다.
- 단, **여러 페이지가 공유하는 style 파일**(`src/styles/components/Buttons.style.ts`, `AlbumCard.style.ts`, `Badge.style.ts`, `Selector.style.tsx`, `Toast.style.tsx`, `src/styles/common/Layout.style.ts`, `VideoWrapper.style.ts`, `ArrowIcon.style.ts`)은 이 태스크에서 **삭제하지 않는다**. 다른 소비처가 남아 있을 수 있다. 대신 그 파일에서 이 태스크가 쓰는 export만 Tailwind로 옮겨 소비처를 고치고, 파일 자체는 최종 정리 태스크(Task 18/20)에서 grep으로 소비처 0 확인 후 삭제한다.

**E. 검증**
1. `pnpm exec tsc --noEmit` → 에러 0.
2. `rm -rf .next && pnpm run build` → 에러 0, 라우트 표의 라우트 수가 직전 태스크와 동일.
3. `grep -rn "@emotion\|props.theme\|useTheme\|styled(" <이 태스크가 건드린 .tsx들>` → 결과 0.
4. `pnpm run start` 로 서버 띄우고 이 단위가 영향을 주는 라우트를 데스크톱(1280) / `max-tablet`(768) / `max-mobile`(480) 3개 폭에서 스크린샷. 직전 커밋 체크아웃본과 육안 비교해 레이아웃/색/간격/폰트가 픽셀 근접인지 확인. framer-motion 애니메이션이 있으면 스크롤·호버·토글 실제 동작 확인. 차이가 보이면 클래스 수정 후 재확인.
5. 서버 종료.

**F. 커밋**
- `git add -A && git commit -m "refactor: <단위명> Tailwind 전환"`

---

## 토큰 → 유틸리티 매핑 (Task 1이 `globals.css`에 심는 값, 이후 모든 태스크가 이 클래스명을 사용)

`src/styles/themes.ts` 기준. `@theme` 선언 → 자동 생성 유틸.

| `themes.ts` | `@theme` 선언 | 쓰는 클래스 |
|---|---|---|
| `COLOR.PRIMARY '#780606'` | `--color-primary: #780606;` | `text-primary` `bg-primary` `border-primary` |
| `COLOR.GRAY700..50` (`#303239 #50525F #7F8295 #AEB2C6 #D0D3E1 #E4E5ED #F1F2F6 #F8F9FB`) | `--color-gray-700..50` | `text-gray-700` … `bg-gray-50` |
| `COLOR.WHITE #FFFFFF` `BLACK #000000` | `--color-white` `--color-black` | `text-white` `bg-black` |
| `COLOR.GREEN600..100` (`#3CD080 #65D196 #83DDAC #A7EFC8 #CBF6DF #E7FEF2`) | `--color-green-600..100` | `bg-green-600` … |
| `COLOR.BLUE600..100` (`#2C7BE5 #509CF7 #79B4F9 #AED1FB #CEE7F7 #E6F4FE`) | `--color-blue-600..100` | `bg-blue-600` … |
| `COLOR.PINK600..100` (`#FD5B73 #FF8093 #FF95A5 #FFB6C1 #FFE7EA #FFF7F8`) | `--color-pink-600..100` | `bg-pink-600` … |
| `COLOR.YELLOW600..100` (`#E5A500 #FDBA12 #FFD358 #FFE494 #FFF1C2 #FFF9E5`) | `--color-yellow-600..100` | `bg-yellow-600` … |
| `COLOR.PURPLE600..100` (`#7E3AF2 #8B5CF6 #A78BFA #C4B5FD #DDD6FE #EDE9FE`) | `--color-purple-600..100` | `bg-purple-600` … |
| `COLOR.ORCHID600..100` (`#B85CB5 #DA70D6 #E67DFF #F0B3FF #F9DFFF #FDF2FF`) | `--color-orchid-600..100` | `bg-orchid-500` … |
| `COLOR.FILTER 'rgba(127,130,149,0.30)'` | `--color-filter: rgba(127,130,149,0.30);` | `bg-filter` |
| `COLOR.TOAST 'rgba(0,0,0,0.80)'` | `--color-toast: rgba(0,0,0,0.80);` | `bg-toast` |
| `COLOR.TJ '#00AFEC'` `KY '#8270DB'` | `--color-tj` `--color-ky` | `text-tj` `bg-ky` |
| `FONT.SIZE.DISPLAY 'clamp(3.5rem,12vw,9rem)'` | `--text-display: clamp(3.5rem,12vw,9rem);` | `text-display` |
| `FONT.SIZE.H1 'clamp(1.75rem,4vw,3rem)'` | `--text-h1: clamp(1.75rem,4vw,3rem);` | `text-h1` |
| `FONT.SIZE.H2 'clamp(1.375rem,3vw,2rem)'` | `--text-h2: clamp(1.375rem,3vw,2rem);` | `text-h2` |
| `FONT.SIZE.H3 'clamp(1.125rem,2vw,1.5rem)'` | `--text-h3: clamp(1.125rem,2vw,1.5rem);` | `text-h3` |
| `FONT.SIZE.XL 1.25rem` `LG 1.125rem` `MD 1rem` `SM .875rem` `XS .75rem` | `--text-xl:1.25rem;` … `--text-xs:.75rem;` | `text-xl` … `text-xs` |
| `FONT.SIZE.TINY '0.65rem'` | `--text-tiny: 0.65rem;` | `text-tiny` |
| `FONT.WEIGHT.LIGHT 300 REGULAR 400 MEDIUM 500 SEMIBOLD 600 BOLD 700` | `--font-weight-light:300;` … `--font-weight-bold:700;` | `font-light` … `font-bold` |
| `FONT.SERIF "'Noto Serif KR', serif"` | `--font-serif: 'Noto Serif KR', serif;` | `font-serif` |
| `FONT.SANS "'Pretendard', sans-serif"` | `--font-sans: 'Pretendard', sans-serif;` | `font-sans` |
| `WINDOW_SIZE.mobile 480 tablet 768 laptop 1024` (max-width) | `--breakpoint-mobile:480px;` `--breakpoint-tablet:768px;` `--breakpoint-laptop:1024px;` | `max-mobile:` `max-tablet:` `max-laptop:` (Task 1에서 max variant 실동작 확인, 안 되면 `@custom-variant`로 명시) |

---

### Task 1: Tailwind v4 셋업 + 토큰 + globals.css + cn 유틸

**Files:**
- Create: `postcss.config.mjs`
- Create: `src/styles/globals.css`
- Create: `src/utils/cn.ts`
- Modify: `package.json` (dependencies)
- Modify: `app/layout.tsx` (globals.css import)
- Modify: `.storybook/preview.ts` (globals.css import)
- Read (이관 원본): `src/styles/GlobalStyles.tsx`, `src/styles/themes.ts`

**Interfaces:**
- Consumes: 없음
- Produces:
  - `src/utils/cn.ts` — `export const cn: (...inputs: ClassValue[]) => string`
  - `src/styles/globals.css` — `@theme` 토큰 전량 + `@layer base`. 이후 모든 태스크가 위 "토큰 → 유틸리티 매핑" 표의 클래스명을 사용.
  - 이 태스크 이후에도 `src/styles/GlobalStyles.tsx`와 `ThemeProvider`는 그대로 유지된다 (전역 스타일 이중 적용, 값 동일하므로 무해). Task 20에서 제거.

- [ ] **Step 1: 패키지 설치**

```bash
pnpm add clsx tailwind-merge
pnpm add -D tailwindcss @tailwindcss/postcss
```

- [ ] **Step 2: postcss.config.mjs 생성**

```js
const config = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};

export default config;
```

- [ ] **Step 3: src/utils/cn.ts 생성**

```ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
```

- [ ] **Step 4: src/styles/globals.css 생성**

파일 뼈대:

```css
@import 'tailwindcss';

@theme {
  /* 위 "토큰 → 유틸리티 매핑" 표의 모든 --color-*, --text-*, --font-weight-*, --font-*, --breakpoint-* 선언을 여기에 전부 적는다. themes.ts의 값과 문자 그대로 일치해야 한다. */
}

@layer base {
  /* src/styles/GlobalStyles.tsx의 <Global> 안 CSS를 그대로 옮긴다:
     - @font-face (Pretendard, Noto Serif KR — src/styles/GlobalStyles.tsx에 있는 src/format/weight 그대로)
     - * { box-sizing } 등 리셋
     - html, body 기본값 (margin/padding/폰트/색/배경)
     - 그 외 전역 규칙 (예: body background url('/assets/noise.svg') 있으면 그대로)
     GlobalStyles.tsx를 열어 내용을 1:1로 베낀다. 값 변경 금지. */
}
```

`src/styles/GlobalStyles.tsx`를 열어 `<Global styles={css\`...\`} />`의 `...` 부분 전체를 `@layer base { }` 안에 옮긴다. Emotion `css` 태그 문법은 순수 CSS이므로 그대로 붙여넣으면 된다 (`${props => ...}` 인터폴레이션이 있으면 그 값을 리터럴로 치환).

- [ ] **Step 5: app/layout.tsx에 globals.css import**

`app/layout.tsx` 최상단 import 구역에 추가 (다른 import보다 먼저, 사이드이펙트 import):

```ts
import '@/styles/globals.css';
```

- [ ] **Step 6: .storybook/preview.ts에 globals.css import**

`.storybook/preview.ts` 최상단에 추가:

```ts
import '../src/styles/globals.css';
```

- [ ] **Step 7: 브레이크포인트 max variant 실동작 확인**

`app/page.tsx`(또는 아무 페이지)의 최상위 요소에 임시로 `className="text-primary max-tablet:hidden"` 를 넣고:

```bash
rm -rf .next && pnpm run build
pnpm run start &
sleep 3
curl -s localhost:3000 | grep -o 'text-primary\|max-tablet' | head
```

브라우저(또는 스크린샷)로 768px 이하에서 요소가 사라지고 `text-primary` 색(#780606)이 적용되는지 확인. 안 되면 `globals.css`의 `@theme` 아래에 다음을 추가:

```css
@custom-variant max-mobile (@media (max-width: 480px));
@custom-variant max-tablet (@media (max-width: 768px));
@custom-variant max-laptop (@media (max-width: 1024px));
```

확인 후 임시 클래스 제거.

- [ ] **Step 8: 검증**

```bash
pnpm exec tsc --noEmit
rm -rf .next && pnpm run build
```

둘 다 에러 0. `pnpm run start` 후 전 라우트(`/`, `/about`, `/profile` 등) 스크린샷 — 이 태스크는 스타일을 **추가**만 하므로 기존 Emotion 화면이 그대로여야 한다 (globals.css의 `@layer base`가 GlobalStyles와 동일 값이므로 시각 변화 없음). 변화가 보이면 `@layer base` 이관이 부정확한 것 — GlobalStyles.tsx와 대조.

- [ ] **Step 9: 커밋**

```bash
git add -A
git commit -m "chore: Tailwind v4 셋업 및 디자인 토큰 globals.css 이관"
```

---

### Task 2: GNB 컴포넌트 Tailwind 전환

**Files:**
- Modify: `src/components/GNB.tsx`
- Delete: `src/styles/components/GNB.style.ts`
- Create (필요 시): `src/components/GNB.variants.ts`

**Interfaces:**
- Consumes: `cn` (`@/utils/cn`), `globals.css` 토큰 클래스 (Task 1)
- Produces: `GNB` 컴포넌트 시그니처 불변 (props 없음, `export default`)

- [ ] **Step 1**: "공용 변환 절차" A~F를 `src/components/GNB.tsx` + `src/styles/components/GNB.style.ts` 대상으로 수행.

컴포넌트 특이사항:
- `styled(motion.nav)` (GNBContainer), `styled(motion.div)` (Tagline), `styled(motion.li)<{ $isActive?: boolean }>` (NavItem), `styled(motion.div)` (MobileOverlay/MobileMenu), `styled(Link)` (DDayContent/MobileDDayFooter) 가 섞여 있다. 절차 C의 태그 매핑을 각각 적용.
- `NavItem`의 `$isActive` 변형: nav 항목마다 활성/비활성 2상태 + 반복 사용 → `pnpm add class-variance-authority` 후 `src/components/GNB.variants.ts`에 `navItemVariants` 정의, `GNB.tsx`에서 `cn(navItemVariants({ active: isActive }))`.
- `backdrop-filter: blur(30px)` → `backdrop-blur-[30px]`. `height: 60px` → `h-[60px]`. `z-index: 9999` → `z-[9999]`. `@media print { display:none }` → `print:hidden`.
- `&:hover .logo { color: PRIMARY }` → LogoGroup 요소에 `group`, Logo 요소에 `group-hover:text-primary group-active:text-primary`.
- framer-motion `variants`/`initial`/`animate`/`AnimatePresence` (모바일 메뉴 토글) 전부 그대로 유지.

- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = **전체** (GNB는 모든 페이지 상단에 있음). 데스크톱/768/480에서 상단바, 스크롤 시 backdrop blur, 로고 호버 색, 모바일(480) 햄버거 → 오버레이 메뉴 토글 애니메이션, D-Day 배지 링크 동작 확인.

- [ ] **Step 3**: 커밋 — `git commit -m "refactor: GNB 컴포넌트 Tailwind 전환"`

---

### Task 3: BackButton 컴포넌트 Tailwind 전환

**Files:**
- Modify: `src/components/BackButton.tsx`
- Modify: `src/styles/components/Buttons.style.ts` (BackButton이 쓰는 export만 변환; 파일은 삭제 안 함 — 다른 페이지가 공유)

**Interfaces:**
- Consumes: `cn`, 토큰 클래스
- Produces: `BackButton` 시그니처 불변 (`{ to }: { to?: string }`)

- [ ] **Step 1**: "공용 변환 절차" 수행. `BackButton.tsx`가 `Buttons.style.ts`에서 가져오는 export만 Tailwind 클래스로 옮겨 `BackButton.tsx`에 인라인. `Buttons.style.ts`에서 그 export를 지운다. 파일에 다른 export가 남아 있으면 파일은 보존 (절차 D 예외 규칙).

- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/album/[id]`, `/song/[id]`, `/schedule/[id]` (BackButton 사용처). 뒤로가기 버튼 위치/아이콘/호버, 클릭 동작 확인.

- [ ] **Step 3**: 커밋 — `git commit -m "refactor: BackButton 컴포넌트 Tailwind 전환"`

---

### Task 4: BadgeList 컴포넌트 Tailwind 전환

**Files:**
- Modify: `src/components/BadgeList.tsx`
- Delete: `src/styles/components/Badge.style.ts`
- Create (필요 시): `src/components/BadgeList.variants.ts`

**Interfaces:**
- Consumes: `cn`, 토큰 클래스
- Produces: `BadgeList` 시그니처 불변

- [ ] **Step 1**: "공용 변환 절차" 수행. `Badge.style.ts`에 뱃지 종류(type)별 배경/글자색 변형이 있으면 `class-variance-authority`로 `src/components/BadgeList.variants.ts`에 `badgeVariants` 정의 후 `cn(badgeVariants({ type }))`. 색은 토큰 클래스(`bg-purple-100 text-purple-600` 등).

- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = BadgeList 사용처 (`grep -rl BadgeList src/views`로 확인). 뱃지 색/모서리/간격/줄바꿈 확인.

- [ ] **Step 3**: 커밋 — `git commit -m "refactor: BadgeList 컴포넌트 Tailwind 전환"`

---

### Task 5: Placeholder 컴포넌트 Tailwind 전환

**Files:**
- Modify: `src/components/Placeholder.tsx`
- Delete: `src/styles/components/Placeholder.style.ts`

**Interfaces:**
- Consumes: `cn`, 토큰 클래스
- Produces: `Placeholder` 시그니처 불변 (`{ message }`)

- [ ] **Step 1**: "공용 변환 절차" 수행. (16줄, 단순 — 중앙 정렬 메시지 박스)
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = 존재하지 않는 `/album/<junk>` 등 fallback 화면. 중앙 정렬/폰트/색 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: Placeholder 컴포넌트 Tailwind 전환"`

---

### Task 6: Table 컴포넌트 Tailwind 전환

**Files:**
- Modify: `src/components/Table.tsx`
- Delete: `src/styles/components/Table.style.ts`

**Interfaces:**
- Consumes: `cn`, 토큰 클래스
- Produces: `Table` 시그니처 불변

- [ ] **Step 1**: "공용 변환 절차" 수행. (25줄)
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = Table 사용처 (`grep -rl "components/Table" src/views` — Profile/AlbumDetail 메타 정보 표 등). 행 구분선/셀 패딩/정렬 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: Table 컴포넌트 Tailwind 전환"`

---

### Task 7: TrackRow 컴포넌트 Tailwind 전환

**Files:**
- Modify: `src/components/TrackRow.tsx`
- Delete: `src/styles/components/TrackRow.style.ts`

**Interfaces:**
- Consumes: `cn`, 토큰 클래스
- Produces: `TrackRow` 시그니처 불변

- [ ] **Step 1**: "공용 변환 절차" 수행. hover 상태, 트랙 번호/제목/러닝타임 레이아웃 주의.
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/song`, `/album/[id]`, `/song/[id]` (트랙 목록). 행 hover, 컬럼 정렬, 잘림 처리(`truncate`) 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: TrackRow 컴포넌트 Tailwind 전환"`

---

### Task 8: About 페이지 Tailwind 전환

**Files:**
- Modify: `src/views/About/index.tsx`, `src/views/About/AboutTitle.tsx`, `src/views/About/AboutPolicySection.tsx`, `src/views/About/AboutInquirySection.tsx`
- Delete: `src/styles/pages/About/About.style.ts`, `AboutTitle.style.ts`, `AboutPolicySection.style.ts`, `AboutInquirySection.style.ts`
- Modify (공유 style, 삭제 금지): `src/styles/components/Buttons.style.ts` (AboutInquirySection이 `S.InquiryButtn` 사용 시 해당 export만 변환)

**Interfaces:**
- Consumes: `cn`, 토큰 클래스
- Produces: 페이지 시그니처 불변

- [ ] **Step 1**: "공용 변환 절차" 수행. About은 정적 텍스트 섹션 위주라 단순.
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/about`. 3뷰포트 전후 비교.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: About 페이지 Tailwind 전환"`

---

### Task 9: Goods 페이지 Tailwind 전환

**Files:**
- Modify: `src/views/Goods/index.tsx`, `src/views/Goods/GoodsLinkSection.tsx`, `src/views/Goods/GoodsGuideSection.tsx`, `src/views/Goods/GoodsEtiquetteSection.tsx`
- Delete: `src/styles/pages/Goods/Goods.style.ts`
- Modify (공유, 삭제 금지): `src/styles/components/Buttons.style.ts` (`S.LinkButton`, `S.CardButton` 사용분)

**Interfaces:** Consumes: `cn`, 토큰. Produces: 시그니처 불변.

- [ ] **Step 1**: "공용 변환 절차" 수행. Goods 하위 3개 섹션 컴포넌트가 `Goods.style.ts` 하나를 공유하니 export를 섹션별로 나눠 인라인.
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/goods`. 링크 카드 그리드/버튼/간격 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: Goods 페이지 Tailwind 전환"`

---

### Task 10: Profile 페이지 Tailwind 전환

**Files:**
- Modify: `src/views/Profile/index.tsx`, `ProfileHeader.tsx`, `ProfileDetailSection.tsx`, `ProfileCareerSection.tsx`, `ProfileLinkSection.tsx`, `ProfileDiscographySection.tsx`
- Delete: `src/styles/pages/Profile/Profile.style.ts`, `ProfileHeader.style.ts`, `ProfileDetailSection.style.ts`, `ProfileCareerSection.style.ts`, `ProfileLinkSection.style.ts`, `ProfileDiscographySection.style.ts`
- Modify (공유, 삭제 금지): `src/styles/components/Buttons.style.ts` (`S.MoreButton`), `src/styles/components/AlbumCard.style.ts` (Discography가 앨범 카드 사용 시)

**Interfaces:** Consumes: `cn`, 토큰, Task 6의 Table (Profile 상세 표). Produces: 시그니처 불변.

- [ ] **Step 1**: "공용 변환 절차" 수행. `ProfileDiscographySection.tsx`는 `getDisplayCount()`의 `typeof window` 가드 로직(하이드레이션 관련, 이전 마이그레이션에서 추가됨)을 **그대로 유지** — 스타일만 바꾼다. 가로 스크롤 슬라이더 레이아웃 주의.
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/profile`. 헤더 이미지, 상세 표, 커리어 타임라인, 링크 버튼, 디스코그래피 슬라이더(480/768/1280에서 카드 개수 4/6/8), 스크롤 화살표 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: Profile 페이지 Tailwind 전환"`

---

### Task 11: Home 페이지 Tailwind 전환

**Files:**
- Modify: `src/views/Home/index.tsx`, `src/views/Home/ProfileSection.tsx`, `src/views/Home/InformationSection.tsx`
- Delete: `src/styles/pages/Home/Home.style.ts`, `ProfileSection.style.ts`, `InformationSection.style.ts`
- Modify (공유, 삭제 금지): `src/styles/common/Layout.style.ts` (Home이 쓰면), `src/styles/components/Buttons.style.ts`, `src/styles/components/AlbumCard.style.ts` (InformationSection 최신 앨범 카드)

**Interfaces:** Consumes: `cn`, 토큰. Produces: 시그니처 불변.

- [ ] **Step 1**: "공용 변환 절차" 수행. Home 히어로 섹션은 `styled(motion.section)` + `initial/animate/transition`(fade-in, width 애니메이션) 다수 — 절차 C대로 `<motion.section className={cn(...)} {...props}>`, `FONT.SIZE.DISPLAY`(`text-display`) clamp 확인.
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/`. 3뷰포트 + 첫 로드 시 fade-in/서브타이틀 width 애니메이션 실제 재생 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: Home 페이지 Tailwind 전환"`

---

### Task 12: Music / Album / Song 목록 페이지 Tailwind 전환

**Files:**
- Modify: `src/views/Music/index.tsx`; `src/views/Album/index.tsx`, `AlbumReleaseSection.tsx`, `AlbumTypeSection.tsx`, `AlbumPromotionSection.tsx`, `AlbumYearGroup.tsx`; `src/views/Song/index.tsx`
- Delete: `src/styles/pages/Music/Music.style.ts`; `src/styles/pages/Album/AlbumReleaseSection.style.ts`, `AlbumTypeSection.style.ts`, `AlbumPromotionSection.style.ts`; `src/styles/pages/Song/Song.styles.ts`
- Modify (공유, 삭제 금지): `src/styles/components/AlbumCard.style.ts`, `src/styles/components/Selector.style.tsx` (탭 셀렉터), `src/styles/components/Buttons.style.ts`

**Interfaces:** Consumes: `cn`, 토큰, Task 7 TrackRow (Song 목록), Task 4 BadgeList. Produces: 시그니처 불변.

- [ ] **Step 1**: "공용 변환 절차" 수행. Music/Album/Song은 서로 겹치는 셀렉터(`Selector.style.tsx` 탭)를 공유하니 이 태스크에서 `Selector.style.tsx` export를 Tailwind로 옮겨 세 곳 소비처를 다 고치되 파일은 Task 18까지 보존. `AlbumPromotionSection`은 D-Day 계산 로직 유지, 스타일만.
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/music`, `/album`, `/song`. 탭 전환 UI, 앨범 카드 그리드(반응형 열 수), 정렬 셀렉터, 트랙 목록 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: Music/Album/Song 목록 페이지 Tailwind 전환"`

---

### Task 13: Schedule 목록 페이지 Tailwind 전환

**Files:**
- Modify: `src/views/Schedule/index.tsx`, `ScheduleUpcommingBanner.tsx`, `ScheduleCalandarAgenda.tsx`
- Delete: `src/styles/pages/Schedule/Schedule.style.ts`, `ScheduleUpcommingBanner.style.ts`, `ScheduleCalandarAgenda.style.ts`
- Modify (공유, 삭제 금지): `src/styles/common/*` 사용분

**Interfaces:** Consumes: `cn`, 토큰. Produces: 시그니처 불변.

- [ ] **Step 1**: "공용 변환 절차" 수행. `ScheduleUpcommingBanner`는 `styled(motion.*)` 배너 애니메이션 유지.
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/schedule`. 다가오는 일정 배너, 아젠다 리스트 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: Schedule 목록 페이지 Tailwind 전환"`

---

### Task 14: ScheduleCalendar 페이지 Tailwind 전환

**Files:**
- Modify: `src/views/ScheduleCalendar/index.tsx`, `ScheduleWeekView.tsx`, `ScheduleListView.tsx`, `ScheduleLabel.tsx`
- Delete: `src/styles/pages/ScheduleCalendar/ScheduleCalendar.style.ts`, `ScheduleWeekView.style.ts`, `ScheduleListView.style.ts`, `ScheduleLabel.style.ts`
- Modify (필요 시): `src/styles/globals.css` (`@layer components`에 react-calendar 오버라이드)

**Interfaces:** Consumes: `cn`, 토큰. Produces: 시그니처 불변.

- [ ] **Step 1**: "공용 변환 절차" 수행. `react-calendar` 라이브러리 자체 CSS 오버라이드가 `.style.ts`에 있으면(`:global(.react-calendar ...)` 류) → `globals.css`의 `@layer components`로 옮긴다 (arbitrary variant로는 라이브러리 내부 클래스 타겟 불가). 스케줄 라벨 색상은 토큰 클래스.
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/schedule` (캘린더가 Schedule 하위에 렌더되면 그쪽) 또는 별도 라우트. 주간 뷰/리스트 뷰 전환, 날짜 셀, 일정 라벨 색 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: ScheduleCalendar 페이지 Tailwind 전환"`

---

### Task 15: ScheduleDetail 페이지 Tailwind 전환

**Files:**
- Modify: `src/views/ScheduleDetail/index.tsx`, `ScheduleDetailBody.tsx`
- Delete: `src/styles/pages/ScheduleDetail/ScheduleDetail.style.ts`, `ScheduleDetailBody.style.ts`
- Modify (공유, 삭제 금지): `src/styles/components/Buttons.style.ts` (`S.MoreButton`, `S.PrimaryButton` 다수 사용)

**Interfaces:** Consumes: `cn`, 토큰, Task 3 BackButton, Task 4 BadgeList. Produces: 시그니처 불변.

- [ ] **Step 1**: "공용 변환 절차" 수행. `ScheduleDetailBody.style.ts`는 크다(수백 줄, 티켓팅/앨범/방송 등 타입별 블록). export가 많으니 하나씩 소비처와 대조하며 옮긴다. 필요하면 `ScheduleDetailBody.tsx`를 타입별 하위 컴포넌트로 쪼개도 되나 **이번 범위는 스타일만** — 구조 리팩터는 금지, 클래스만 이동.
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/schedule/[id]` (여러 타입: 앨범 발매 / 공연·티켓팅 / 방송 각각 하나씩 실제 slug로). 카테고리 뱃지, 본문 블록, 외부 링크 버튼 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: ScheduleDetail 페이지 Tailwind 전환"`

---

### Task 16: AlbumDetail 페이지 Tailwind 전환

**Files:**
- Modify: `src/views/AlbumDetail/index.tsx`, `AlbumDetailIntro.tsx`, `AlbumDetailMetaInfo.tsx`, `AlbumDetailTracks.tsx`
- Delete: `src/styles/pages/AlbumDetail/AlbumDetail.style.ts`, `AlbumDetailIntro.style.ts`, `AlbumDetailMetaInfo.style.ts`, `AlbumDetailTracks.style.ts`
- Modify (공유, 삭제 금지): `src/styles/components/Buttons.style.ts` (`S.MoreButton` 스트리밍 링크), `src/styles/components/AlbumCard.style.ts`

**Interfaces:** Consumes: `cn`, 토큰, Task 3 BackButton, Task 6 Table (메타 정보), Task 7 TrackRow. Produces: 시그니처 불변.

- [ ] **Step 1**: "공용 변환 절차" 수행. `AlbumDetail.style.ts`가 크다. 커버 이미지 레이아웃, 메타 정보 표, 트랙 리스트, 인트로 텍스트 블록 각각. `AlbumDetailMetaInfo`의 스트리밍 링크 아이콘 그리드 주의.
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/album/[id]` (실제 앨범 slug 2개: 트랙 많은 정규앨범 + 싱글). 커버/메타표/트랙목록/스트리밍 버튼, 3뷰포트 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: AlbumDetail 페이지 Tailwind 전환"`

---

### Task 17: SongDetail 페이지 Tailwind 전환

**Files:**
- Modify: `src/views/Song/SongDetail.tsx`, `SongDetailHeader.tsx`, `SongDetailMeta.tsx`, `SongDetailContent.tsx`
- Delete: `src/styles/pages/Song/SongDetail.styles.ts`, `SongDetailHeader.styles.ts`, `SongDetailMeta.styles.ts`, `SongDetailContent.styles.ts`
- Modify (공유, 삭제 금지): `src/styles/components/Buttons.style.ts` (`S.PrimaryButton`)

**Interfaces:** Consumes: `cn`, 토큰, Task 3 BackButton. Produces: 시그니처 불변.

- [ ] **Step 1**: "공용 변환 절차" 수행. 가사 본문(`SongDetailContent`)의 줄바꿈 보존(`whitespace-pre-line`), 헤더의 앨범 커버 배경 처리 주의.
- [ ] **Step 2**: 검증 절차 E. 영향 라우트 = `/song/[id]` (가사 있는 곡 + 연주곡 각각). 헤더/메타/가사 레이아웃, 3뷰포트 확인.
- [ ] **Step 3**: 커밋 — `git commit -m "refactor: SongDetail 페이지 Tailwind 전환"`

---

### Task 18: 잔여 공유/common 스타일 전환 및 style 파일 전멸

**Files:**
- Modify (남은 소비처 인라인 후): `src/styles/components/Buttons.style.ts`, `AlbumCard.style.ts`, `Badge.style.ts`(미삭제분), `Selector.style.tsx`, `Toast.style.tsx`, `src/styles/common/Layout.style.ts`, `VideoWrapper.style.ts`, `ArrowIcon.style.ts`
- Modify: `app/Providers.tsx` (`<Toaster>` 스타일이 `Toast.style.tsx`에 있으면 prop으로 인라인)
- Delete: 위 8개 파일 중 실제 존재하는 전부

**Interfaces:** Consumes: `cn`, 토큰. Produces: `find src -name "*.style.*" → 0`.

- [ ] **Step 1**: 각 공유 style 파일에 대해 `grep -rn "Buttons.style\|AlbumCard.style\|Badge.style\|Selector.style\|Toast.style\|Layout.style\|VideoWrapper.style\|ArrowIcon.style" src` 로 소비처 전수 확인. 각 소비처 `.tsx`에서 남은 `S.*` 사용을 "공용 변환 절차 C"대로 Tailwind 클래스로 교체.
- [ ] **Step 2**: `Toast.style.tsx` — react-hot-toast `<Toaster>`의 `toastOptions`/커스텀 렌더에 쓰이면 해당 값(`COLOR.TOAST` = `rgba(0,0,0,0.80)`)을 `app/Providers.tsx`의 `<Toaster>` prop에 리터럴로 인라인.
- [ ] **Step 3**: 소비처 0 확인 후 파일 삭제: `git rm` 로 위 8개 중 존재하는 전부 제거.
- [ ] **Step 4**: 검증 — `pnpm exec tsc --noEmit`, `rm -rf .next && pnpm run build`. `find src -name "*.style.ts" -o -name "*.style.tsx" -o -name "*.styles.ts"` → **결과 0**. 전 11개 라우트 스모크 스크린샷.
- [ ] **Step 5**: 커밋 — `git commit -m "refactor: 잔여 공유 스타일 Tailwind 전환 및 style 파일 제거"`

---

### Task 19: Storybook 스토리 Tailwind 확인

**Files:**
- Modify (필요 시): `.storybook/preview.ts`, `src/stories/*.stories.ts`

**Interfaces:** Consumes: Task 1의 globals.css import. Produces: 없음.

- [ ] **Step 1**: `pnpm run build-storybook` 실행 — 성공 확인. `pnpm run storybook` 로 띄워 기본 3개 스토리(Button/Header/Page)가 Tailwind 스타일로 정상 렌더되는지 확인.
- [ ] **Step 2**: `.storybook/preview.ts`에 Emotion `ThemeProvider` decorator가 있으면 **아직 남겨둔다** (Task 20에서 제거). Tailwind globals.css import만 확인.
- [ ] **Step 3**: 변경 있었으면 커밋 — `git commit -m "chore: Storybook Tailwind 스타일 확인"`. 변경 없으면 이 태스크는 no-op 기록만.

---

### Task 20: Emotion 완전 제거 및 정리

**Files:**
- Modify: `package.json` (dependencies)
- Modify: `app/Providers.tsx` (ThemeProvider 제거)
- Modify: `app/layout.tsx` (필요 시)
- Delete: `src/styles/GlobalStyles.tsx`, `src/styles/themes.ts`
- Modify: `.storybook/preview.ts` (Emotion decorator 제거)

**Interfaces:** Consumes: Task 1~19 전부. Produces: Emotion-free 최종 상태.

- [ ] **Step 1: 잔재 확인**

```bash
grep -rn "@emotion\|from 'emotion'\|props\.theme\|useTheme\|styled\`\|styled(" src app .storybook
find src -name "*.style.ts" -o -name "*.style.tsx" -o -name "*.styles.ts"
```

둘 다 **결과 0**이어야 한다. 남아 있으면 해당 파일을 "공용 변환 절차"로 처리 후 진행.

- [ ] **Step 2: ThemeProvider / GlobalStyle 제거**

`app/Providers.tsx`에서 `import { ThemeProvider } from '@emotion/react'`, `import { Theme } from '@/styles/themes'`, `import GlobalStyle from '@/styles/GlobalStyles'` 및 `<ThemeProvider theme={Theme}>` 래핑, `<GlobalStyle />` 렌더를 모두 제거. `<Providers>`는 이제 `ScrollToTop` + `GNB` + `Toaster` + `{children}`만 감싼다 (`ThemeProvider` 없이 fragment 또는 기존 최상위 요소).

- [ ] **Step 3: .storybook/preview.ts 정리**

Emotion `ThemeProvider` decorator import/등록 제거. `import '../src/styles/globals.css'`만 남긴다.

- [ ] **Step 4: 파일/의존성 제거**

```bash
git rm src/styles/GlobalStyles.tsx src/styles/themes.ts
pnpm remove @emotion/react @emotion/styled emotion
```

`src/styles/themes.ts`를 import하던 곳(`import { ColorType } ...` 등 타입 import 포함)이 전부 제거된 상태여야 한다 — Step 1 grep으로 재확인.

- [ ] **Step 5: 최종 검증**

```bash
pnpm exec tsc --noEmit
rm -rf .next && pnpm run build
pnpm run build-storybook
```

세 명령 모두 에러 0. `pnpm run start` 후 전 11개 라우트(`/`, `/profile`, `/music`, `/album`, `/album/<slug>`, `/song`, `/song/<slug>`, `/schedule`, `/schedule/<id>`, `/goods`, `/about`)를 데스크톱/768/480 3뷰포트로 스크린샷, 이 브랜치 시작 커밋(Task 1 직전)과 육안 전수 비교. framer-motion 화면 실동작. 콘솔 에러 0.

- [ ] **Step 6: 커밋**

```bash
git add -A
git commit -m "refactor: Emotion 의존성 완전 제거 및 ThemeProvider 정리"
```

---

## Self-Review

**Spec coverage:**
- 토큰 `@theme` 이관 → Task 1. ✅
- GlobalStyles → globals.css → Task 1 (이관) + Task 20 (원본 삭제). ✅
- `cn` 유틸 → Task 1. ✅
- 46개 `.style.ts` 전환 → Task 2~18 (컴포넌트 6 + 페이지 12 묶음 + 잔여 공유 1). ✅ (Task 18 Step 4의 `find ... → 0` 이 전수 커버 검증)
- framer-motion 유지 → 공용 절차 C + Task 2/11/13에 명시. ✅
- Storybook 통합 → Task 1 (import) + Task 19 (확인) + Task 20 (decorator 제거). ✅
- Emotion 의존성 제거 → Task 20. ✅
- 검증(tsc/build/3뷰포트 스크린샷/framer 실동작) → 공용 절차 E, 모든 태스크. ✅
- `cva`는 BadgeList/GNB만 → Task 2, Task 4. ✅
- 폴더 리네임 금지, `cn`은 `src/utils/cn.ts` → Global Constraints + Task 1. ✅

**Placeholder scan:** 각 태스크가 정확한 파일 경로 + "공용 변환 절차"(구체적 매핑 규칙) + 컴포넌트별 특이사항 + 검증 라우트를 명시. "적절히 처리" 류 없음. 공유 style 파일 삭제 시점(Task 18/20)이 명시됨.

**Type consistency:** `cn` 시그니처(`(...inputs: ClassValue[]) => string`)가 Task 1에서 정의되고 이후 동일하게 참조됨. 컴포넌트 시그니처는 전부 "불변"으로 고정. 토큰 클래스명은 "토큰 → 유틸리티 매핑" 표 단일 출처.

**미해결 위험(계획 내 명시됨):** Task 1 Step 7의 `max-*` variant 실동작은 실측 후 분기(`@custom-variant` fallback 포함). Task 14의 `react-calendar` `:global` 오버라이드는 `@layer components`로 이동. Task 15/16의 큰 style 파일은 "구조 리팩터 금지, 클래스만 이동" 제약.
