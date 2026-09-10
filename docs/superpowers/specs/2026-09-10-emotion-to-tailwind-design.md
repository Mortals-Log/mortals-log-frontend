# Emotion → Tailwind v4 전환 (디자인 시스템 정립)

## 배경

`mortals-log-frontend`는 방금 Vite → Next.js 15 App Router 마이그레이션을 마친 천진우 팬사이트다. 현재 UI는 Emotion(`@emotion/react`, `@emotion/styled`) CSS-in-JS로 구현돼 있고, `src/styles/**/*.style.ts` 파일 46개가 사이트 전체 스타일을 담당한다. 디자인 토큰은 `src/styles/themes.ts`의 `Theme` 상수 객체(색상/타이포/브레이크포인트)로만 존재하며, `ThemeProvider` + `props => props.theme.X` 인터폴레이션으로 소비된다.

## 목적

**일관되고 강제 가능한 디자인 시스템 정립.** 현재는 토큰이 TS 상수라 강제력이 약하고, 스타일 작성 방식(styled 템플릿 리터럴)이 팀 표준으로 삼기 어렵다. Tailwind v4의 CSS-first `@theme` 토큰 + 유틸리티 클래스 체계로 옮겨 토큰을 단일 출처로 만들고 스타일 작성 방식을 표준화한다.

이것이 유일한 동기다. 시각 디자인 변경(리디자인)은 목적이 아니다.

## 범위

**포함:**
- Emotion CSS-in-JS → Tailwind v4 유틸리티 클래스 전환 (46개 `.style.ts` + 이를 쓰는 컴포넌트/페이지 전부)
- `src/styles/themes.ts`의 토큰을 Tailwind v4 `@theme` 블록으로 이관
- `src/styles/GlobalStyles.tsx`(Emotion `<Global>`)를 `globals.css`로 이관
- `cn()` 유틸리티(`clsx` + `tailwind-merge`) 추가, 변형 있는 컴포넌트에 한해 `cva` 사용
- Storybook에 Tailwind 통합
- 전환 완료 후 `@emotion/*`, `emotion`, `ThemeProvider`, `themes.ts`, `GlobalStyles.tsx` 제거

**범위 밖 (건드리지 않음):**
- 폴더/파일 리네임 전부 (`src/const` → `src/constants`, `src/views` → `src/pages`, 아이콘 `Ic` 접두사 등 `.claude/rules/` 폴더 규약)
- `@base-ui/react` / shadcn `components.json` / shadcn 스캐폴딩 도입 (범용 primitive가 프로젝트에 없음 — 폼/Dialog/Select 등 전무)
- API 레이어 / TanStack Query / Zustand (`.claude/rules/`가 요구하나 이 프로젝트에 API도 전역 상태도 없음)
- `react-calendar` 자체 CSS
- 데이터 구조
- `@storybook/nextjs` 빌더 (이미 전환 완료)
- 자동 비주얼 회귀 테스트 도구

## Global Constraints

- **시각적 재현 기준: 픽셀 근접.** 현재 보이는 화면을 그대로 재현한다. 토큰 값은 기존 `Theme` 상수를 1:1로 옮긴다. 명백한 불일치라도 이번 작업에서 "정리"하지 않는다 — 별도 작업.
- **점진적 전환.** Emotion과 Tailwind가 동시에 설치된 채로 진행한다. 한 단위(공용 컴포넌트 1개 또는 페이지 1개)가 "완료"되는 조건: 해당 `.style.ts` 파일이 삭제되고, 그 단위의 모든 파일이 Tailwind만 사용한다. 각 단위는 독립적으로 빌드·머지·검증 가능해야 한다.
- **framer-motion 유지.** `styled(motion.X)` 패턴은 `<motion.X className={cn(...)} {...motionProps}>` 로 바꾼다. framer-motion 자체는 제거하지 않는다.
- **`ThemeProvider`는 마지막까지 유지.** 아직 `props.theme`를 참조하는 Emotion 컴포넌트가 하나라도 남아 있으면 `ThemeProvider`를 제거하지 않는다.
- **의존성 최소화.** 이번 작업으로 추가하는 런타임/개발 의존성은 `tailwindcss@4`, `@tailwindcss/postcss`, `clsx`, `tailwind-merge` 넷뿐. `cva`(class-variance-authority)는 변형 로직이 실제로 있는 컴포넌트(BadgeList, GNB)에서만 필요하면 추가.
- **`any` 금지.** 기존 프로젝트 규칙 유지.
- **`@/` 절대경로 별칭 유지.** 다른 디렉터리 참조는 `@/` alias, 같은 디렉터리는 상대경로.

## 아키텍처

### 토큰 레이어 (`src/styles/globals.css`의 `@theme`)

Tailwind v4는 설정 파일이 없다. `globals.css`에서 CSS 커스텀 프로퍼티로 토큰을 선언하면 대응 유틸리티가 자동 생성된다.

`src/styles/themes.ts` → `@theme` 매핑:

| 기존 | `@theme` 선언 | 자동 생성 유틸 |
|---|---|---|
| `COLOR.PRIMARY = '#780606'` | `--color-primary: #780606;` | `bg-primary`, `text-primary`, `border-primary` … |
| `COLOR.GRAY700` … `GRAY50` | `--color-gray-700: #303239;` … `--color-gray-50: #F8F9FB;` | `text-gray-700` … |
| `COLOR.WHITE`, `COLOR.BLACK` | `--color-white`, `--color-black` | (Tailwind 기본과 동일하나 명시) |
| `COLOR.GREEN/BLUE/PINK/YELLOW/PURPLE 100~600` | `--color-green-600` … `--color-green-100` (색상군마다 6단계) | `bg-green-600` … |
| `COLOR.ORCHID100~600` | `--color-orchid-100` … `--color-orchid-600` | `bg-orchid-500` … |
| `COLOR.FILTER = 'rgba(127,130,149,0.30)'` | `--color-filter: rgba(127,130,149,0.30);` | `bg-filter` |
| `COLOR.TOAST = 'rgba(0,0,0,0.80)'` | `--color-toast: rgba(0,0,0,0.80);` | `bg-toast` |
| `COLOR.TJ = '#00AFEC'`, `COLOR.KY = '#8270DB'` | `--color-tj`, `--color-ky` | `text-tj`, `text-ky` |
| `FONT.SIZE.DISPLAY = 'clamp(3.5rem, 12vw, 9rem)'` | `--text-display: clamp(3.5rem, 12vw, 9rem);` | `text-display` |
| `FONT.SIZE.H1/H2/H3` (clamp) | `--text-h1`, `--text-h2`, `--text-h3` | `text-h1` … |
| `FONT.SIZE.XL/LG/MD/SM/XS = 1.25/1.125/1/0.875/0.75rem` | `--text-xl` … `--text-xs` | `text-xl` … (Tailwind 기본값과 우연히 겹칠 수 있으나 명시적으로 재정의) |
| `FONT.SIZE.TINY = '0.65rem'` | `--text-tiny: 0.65rem;` | `text-tiny` |
| `FONT.WEIGHT.LIGHT~BOLD = 300~700` | `--font-weight-light: 300;` … `--font-weight-bold: 700;` | `font-light` … `font-bold` |
| `FONT.SERIF = "'Noto Serif KR', serif"` | `--font-serif: 'Noto Serif KR', serif;` | `font-serif` |
| `FONT.SANS = "'Pretendard', sans-serif"` | `--font-sans: 'Pretendard', sans-serif;` | `font-sans` |
| `WINDOW_SIZE.mobile = '(max-width: 480px)'` | `--breakpoint-mobile: 480px;` | `mobile:` (min) / `max-mobile:` (max) |
| `WINDOW_SIZE.tablet = '(max-width: 768px)'` | `--breakpoint-tablet: 768px;` | `max-tablet:` |
| `WINDOW_SIZE.laptop = '(max-width: 1024px)'` | `--breakpoint-laptop: 1024px;` | `max-laptop:` |

기존 코드의 `@media (max-width: 768px)` → `max-tablet:` variant. Tailwind v4가 커스텀 `--breakpoint-*`에 대해 `max-*` variant를 생성하는지 셋업 단계에서 반드시 실측 확인(안 되면 `@custom-variant` 로 직접 정의).

`themes.ts`는 마지막 정리 단계에서 삭제.

### 전역 스타일 (`src/styles/GlobalStyles.tsx` → `src/styles/globals.css`)

현재 `GlobalStyles.tsx`는 Emotion `<Global>` 컴포넌트로 리셋 CSS, `@font-face`(Pretendard / Noto Serif KR, `/public/fonts` 참조), body/html 기본값, `url('/assets/noise.svg')` 배경 등을 주입한다.

→ `src/styles/globals.css`:
```css
@import "tailwindcss";

@theme {
  /* 위 토큰 매핑 전부 */
}

@layer base {
  @font-face { /* Pretendard, Noto Serif KR — 기존 그대로 */ }
  /* 리셋, html/body 기본값, 기타 전역 규칙 — 기존 GlobalStyles 내용 그대로 이관 */
}
```

`app/layout.tsx`에서 `import '@/styles/globals.css'` (또는 `../src/styles/globals.css`). `app/Providers.tsx`에서 `<GlobalStyle />` 렌더 제거. `GlobalStyles.tsx` 파일은 마지막 정리 단계에서 삭제.

### 컴포넌트 전환 패턴

| 기존 Emotion | Tailwind 전환 후 |
|---|---|
| `export const Box = styled.div\`정적 CSS\`` + JSX `<S.Box>` | styled export 삭제, JSX에 `<div className="...">` 직접 |
| `props => props.theme.COLOR.PRIMARY` | 토큰 클래스 `text-primary` / `bg-primary`. 유틸로 표현 불가한 자리(예: `box-shadow` 색): `[color:var(--color-primary)]` arbitrary |
| `styled(motion.nav)\`...\`` | `<motion.nav className={cn("...")} {...restMotionProps}>` — `initial`/`animate`/`variants`/`transition` prop 그대로 유지 |
| `& .logo { color }`, `&:hover .child { ... }` | 부모에 `group`, 자식에 `group-hover:...` / `[&_.logo]:...` arbitrary variant |
| `styled.button<{ $isActive?: boolean }>\`${p => p.$isActive && css\`...\`}\`` | 변형이 2개 이상·재사용되면 `cva`, 아니면 `cn(base, isActive && "...")` |
| 토큰 스케일 밖 수치 (`height: 60px`, `z-index: 9999`, `backdrop-filter: blur(30px)`, `max-width: 1200px`) | arbitrary: `h-[60px] z-[9999] backdrop-blur-[30px] max-w-[1200px]`. 3회 이상 반복되면 `@theme`에 토큰 추가 검토 |
| `@media print { display: none !important }` | `print:hidden` |
| `keyframes` (Emotion) | `globals.css`의 `@keyframes` + `@theme`의 `--animate-*` 또는 arbitrary `animate-[...]` |

- 새 유틸: `src/utils/cn.ts` — `import { clsx, type ClassValue } from 'clsx'; import { twMerge } from 'tailwind-merge'; export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));`. `.claude/rules/`는 `src/lib/utils`를 요구하나 폴더 리네임이 범위 밖이므로 기존 `src/utils/` 관례를 따른다.
- `cva`는 **BadgeList**(뱃지 type별 색상), **GNB**(nav item active 상태)에서만 필요 시 추가. 나머지는 `cn()` 조건부로 충분.

### 공존 및 전환 순서

Emotion과 Tailwind가 병존한다. 두 스타일 시스템은 서로 독립적이므로 절반만 전환된 상태에서도 사이트는 정상 동작한다(Emotion 컴포넌트가 Tailwind 페이지 안에 있어도, 그 반대도 문제없음).

**Step 0 — 셋업 (한 단위):**
- `pnpm add -D tailwindcss@4 @tailwindcss/postcss` (Next.js 15 + Tailwind v4 공식 방식), `pnpm add clsx tailwind-merge`
- `postcss.config.mjs` 생성 (`@tailwindcss/postcss` 플러그인)
- `src/styles/globals.css` 생성: `@import "tailwindcss"` + `@theme`(토큰 전량 매핑) + `@layer base`(GlobalStyles 내용 이관). **단 이 단계에서는 `GlobalStyles.tsx`도 그대로 유지** — 리셋/폰트가 이중 적용돼도 무해, 마지막에 한쪽 제거.
- `app/layout.tsx`에 `globals.css` import
- `src/utils/cn.ts` 추가
- `.storybook/preview.ts`(또는 `preview.tsx`)에 `import '../src/styles/globals.css'`
- **검증**: 임의 요소에 `className="text-primary max-tablet:hidden"` 넣어 토큰·브레이크포인트 유틸이 실제 동작하는지 확인. `pnpm run build` + `tsc --noEmit` 통과. Emotion 화면은 그대로.

**Step 1~6 — 공용 컴포넌트 (각 1단위):** `GNB` → `BackButton` → `BadgeList` → `Placeholder` → `Table` → `TrackRow`. 각 컴포넌트의 `.tsx` + 대응 `.style.ts` 전환, `.style.ts` 삭제.
- GNB(199줄, framer-motion, 모바일 오버레이 메뉴, active 상태)가 가장 복잡 — 별도 단위로.

**Step 7~ — 페이지 (각 1단위, 쉬운 순):**
`About` → `Goods` → `Profile` → `Home` → `Music`(목록) → `Album`(목록) → `Song`(목록) → `Schedule` → `ScheduleCalendar` → `ScheduleDetail` → `AlbumDetail` → `SongDetail`
- 한 페이지 단위 = `src/views/<Page>/**` 의 `index.tsx` + 모든 하위 컴포넌트 + 대응 `src/styles/pages/<Page>/**/*.style.ts` 전부. 해당 `.style.ts`들 삭제.

**마지막 Step — 정리 (한 단위):**
- 잔여 `.style.ts` / `props.theme` 참조가 0인지 grep 확인
- `pnpm remove @emotion/react @emotion/styled emotion`
- `app/Providers.tsx`에서 `ThemeProvider` import·래핑 제거, `GlobalStyles.tsx` 삭제, `src/styles/themes.ts` 삭제
- `.storybook`의 Emotion `ThemeProvider` decorator(있다면) 제거
- `pnpm run build` + `tsc --noEmit` + 전 라우트 스모크

### Storybook

`.storybook/preview.ts`에 `import '../src/styles/globals.css'` 추가 → 스토리에서 Tailwind 유틸 동작. Emotion 스토리는 `ThemeProvider` decorator로 계속 동작(있다면 유지, 마지막에 제거). 스토리는 현재 3개(Button/Header/Page 온보딩 기본)뿐이라 부담 없음.

## 데이터 흐름

해당 없음 — 순수 프레젠테이션 레이어 변경. 데이터는 전부 `src/const`의 정적 상수 그대로.

## 에러 처리

해당 없음 — 런타임 로직 변경 없음. 빌드 타임에 Tailwind가 클래스를 생성하지 못하면(오타 등) 스타일이 조용히 누락되므로, 각 단위 검증에서 **전/후 스크린샷 육안 비교**가 유일한 안전망이다.

## 검증 전략

각 단위(Step) 완료 시:
1. `pnpm exec tsc --noEmit` — 에러 0
2. `rm -rf .next && pnpm run build` — 에러 0, 라우트 수 불변
3. 영향받은 라우트를 전환 전 커밋(또는 `git stash`)과 후를 각각 `pnpm run start` + 스크린샷으로 캡처해 육안 비교. 데스크톱 + `max-tablet`(768px) + `max-mobile`(480px) 3개 뷰포트.
4. framer-motion 애니메이션이 있는 화면(GNB, Home 히어로 등)은 실제 동작(스크롤/호버/모바일 메뉴 토글) 확인.

`pnpm run lint`는 기존에 사전 존재 에러가 많으므로(스토리북 플러그인 오작동) 카운트만 확인 — 이번 작업이 **새 에러를 추가하지 않는지**만 본다.

## 리스크 및 완화

- **Tailwind v4 + Next.js 15 셋업**: v4는 신규(설정 없는 CSS-first). `@tailwindcss/postcss` 공식 경로로 설치하고 Step 0에서 토큰·브레이크포인트 유틸 실동작을 반드시 확인 후 다음 단계 진행.
- **max-width 브레이크포인트 시맨틱**: Tailwind는 기본 mobile-first(min-width). 기존 코드는 전부 `max-width`. `--breakpoint-*` + `max-*` variant로 대응하되 Step 0에서 실측. 안 되면 `@custom-variant max-tablet (@media (max-width: 768px))` 명시.
- **복잡한 `.style.ts`**(AlbumDetail, ScheduleDetailBody 등 수백 줄): 페이지 단위가 커짐. 계획에서 이들 페이지 단위에 여유를 둠. 필요하면 한 페이지를 "하위 컴포넌트별 서브 단위"로 더 쪼갬.
- **`styled(motion.X)` 전환 시 motion prop 누락**: 변환은 기계적이지만 `initial`/`animate`/`variants`/`whileHover` 등을 빠뜨리면 애니메이션이 죽음. 각 motion 컴포넌트 전환 후 실제 동작 확인 필수(검증 4번).
- **이중 리셋/폰트**: Step 0~마지막 정리 사이에는 `globals.css`와 `GlobalStyles.tsx`가 둘 다 전역 스타일을 주입. 상충 가능성(예: body margin) 있으면 Step 0에서 `GlobalStyles.tsx` 내용을 `@layer base`로 그대로 옮기고 `GlobalStyles.tsx`는 렌더만 유지(중복이나 값 동일하므로 무해), 마지막에 제거.
- **`props.theme` 잔재**: 페이지 단위 전환 시 하위 컴포넌트 하나라도 놓치면 `ThemeProvider` 제거 단계에서 런타임 에러. 마지막 정리 전 `grep -rn "props.theme\|\.theme\.\|useTheme\|from '@emotion" src` 로 0 확인.
- **react-hot-toast `<Toaster>`**: `toastOptions`로 인라인 스타일링(Emotion 아님) — 그대로 두되 `COLOR.TOAST` 값 참조 지점만 리터럴로 인라인.
