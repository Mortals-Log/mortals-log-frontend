# Vite → Next.js + pnpm 마이그레이션 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** `mortals-log-frontend`를 Vite/react-router-dom SPA에서 Next.js 15 App Router로 옮기고 패키지 매니저를 yarn에서 pnpm으로 바꿔서, 앨범/곡/일정 상세 페이지마다 다른 소셜 공유 미리보기(og:title/description/image)를 서버에서 생성할 수 있게 한다.

**Architecture:** 기존 `src/pages/*/index.tsx`의 UI/로직은 그대로 재사용하고 `'use client'`만 붙인다. 각 라우트에 `app/<route>/page.tsx`라는 얇은 서버 컴포넌트 wrapper를 새로 만들어 `export const metadata`(정적 페이지) 또는 `generateMetadata`+`generateStaticParams`(동적 상세 페이지, `/album/[id]`·`/song/[id]`·`/schedule/[id]`)를 그 안에 둔다. 데이터가 전부 `src/const`의 정적 TS 상수이므로 모든 페이지는 빌드타임에 SSG된다. 배포는 기본 Vercel Next.js 런타임을 그대로 사용한다.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, emotion(`@emotion/react`, `@emotion/styled`), pnpm, `@svgr/webpack`, Storybook `@storybook/nextjs`.

## Global Constraints

- 스펙 범위 밖: 데이터 스키마 최적화는 이 계획에 포함하지 않는다 (`docs/superpowers/specs/2026-08-07-nextjs-migration-design.md` 참고).
- `output: 'export'`는 사용하지 않는다 — 기본 Vercel Node 런타임 유지.
- `styled-components` 관련 코드/타입 의존성은 미사용이므로 제거 대상이다 (`@types/styled-components`).
- `engines.node`는 `>=24`로 유지한다.
- ~~기존 `src/pages/*`의 UI 컴포넌트 트리 구조와 파일 위치는 옮기지 않는다~~ **(Task 5 검증 중 수정됨: `src/pages`는 Next.js가 레거시 Pages Router로 자동 인식하는 예약 디렉터리명이라 충돌한다. `src/views`로 이름을 바꾸고 `@pages` alias만 재지정했다 — 그 외 파일 트리 구조/분리는 옮기지 않는다는 최소 diff 원칙은 유지.)**
- CI 워크플로 경로는 오탈자가 있는 기존 디렉터리명 `.github/wrokflows/`를 그대로 사용한다 (이번 마이그레이션 범위에서 이름을 고치지 않는다 — 별도 이슈로 남긴다).

---

### Task 1: pnpm으로 패키지 매니저 전환

**Files:**
- Modify: `package.json:1-49` (engines, packageManager 필드 추가)
- Create: `pnpm-lock.yaml` (pnpm install이 생성)
- Delete: `yarn.lock`

**Interfaces:**
- Consumes: 없음 (첫 작업)
- Produces: 이후 모든 태스크가 `pnpm <script>` 명령으로 실행됨을 전제로 함

- [ ] **Step 1: yarn.lock 삭제하고 pnpm으로 설치**

```bash
rm yarn.lock
corepack enable
pnpm install
```

Expected: `pnpm-lock.yaml`이 새로 생성되고 `node_modules`가 설치됨.

- [ ] **Step 2: package.json에 packageManager 필드 추가**

`package.json`의 `"engines"` 블록 바로 아래에 추가:

```json
	"packageManager": "pnpm@9.15.0",
```

- [ ] **Step 3: 기존 스크립트가 pnpm으로도 동작하는지 확인**

Run: `pnpm run lint`
Expected: 기존과 동일하게 eslint가 돌고 에러 없이 끝남 (Vite 관련 스크립트는 이후 태스크에서 교체하므로 `dev`/`build`는 아직 확인하지 않음).

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git rm yarn.lock
git commit -m "chore: yarn에서 pnpm으로 패키지 매니저 전환"
```

---

### Task 2: Next.js 프로젝트 골격 및 설정 추가

**Files:**
- Create: `next.config.ts`
- Create: `next-env.d.ts`
- Modify: `tsconfig.json:1-23`
- Modify: `package.json` (`dependencies`/`devDependencies`/`scripts`)
- Delete: `vite.config.ts`, `index.html`, `tsconfig.app.json`, `tsconfig.node.json`, `src/main.tsx`

**Interfaces:**
- Consumes: Task 1의 pnpm 환경
- Produces: `next build`/`next dev` 커맨드로 빌드 가능한 최소 골격. 이후 태스크가 `app/` 디렉터리에 파일을 추가함.

- [ ] **Step 1: Next.js 및 관련 패키지 설치, Vite 패키지 제거**

```bash
pnpm add next@15
pnpm add -D @svgr/webpack
pnpm remove vite @vitejs/plugin-react vite-plugin-svgr
```

- [ ] **Step 2: next.config.ts 작성 (svgr webpack 룰 추가)**

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	webpack(config) {
		const fileLoaderRule = config.module.rules.find(
			(rule: any) => rule.test?.test?.('.svg'),
		);

		config.module.rules.push(
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: /react/,
				use: ['@svgr/webpack'],
			},
			{
				...fileLoaderRule,
				test: /\.svg$/i,
				resourceQuery: { not: [...(fileLoaderRule.resourceQuery?.not || []), /react/] },
			},
		);

		fileLoaderRule.exclude = /\.svg$/i;

		return config;
	},
};

export default nextConfig;
```

- [ ] **Step 3: tsconfig.json을 Next.js 규칙에 맞게 갱신**

`tsconfig.json`을 다음 내용으로 교체 (기존 `paths`는 그대로 유지, `references`/`typeRoots`/`types`/`allowImportingTsExtensions`는 Next.js가 요구하는 필드로 교체):

```json
{
	"compilerOptions": {
		"target": "ES2017",
		"lib": ["dom", "dom.iterable", "esnext"],
		"allowJs": true,
		"skipLibCheck": true,
		"strict": true,
		"noEmit": true,
		"esModuleInterop": true,
		"module": "esnext",
		"moduleResolution": "bundler",
		"resolveJsonModule": true,
		"isolatedModules": true,
		"jsx": "preserve",
		"incremental": true,
		"plugins": [{ "name": "next" }],
		"baseUrl": ".",
		"paths": {
			"@/*": ["src/*"],
			"@components/*": ["src/components/*"],
			"@pages/*": ["src/pages/*"],
			"@assets/*": ["src/assets/*"],
			"@const/*": ["src/const/*"],
			"@store/*": ["src/store/*"],
			"@styles/*": ["src/styles/*"],
			"@types/*": ["src/types/*"],
			"@utils/*": ["src/utils/*"],
			"@hooks/*": ["src/hooks/*"]
		}
	},
	"include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
	"exclude": ["node_modules"]
}
```

- [ ] **Step 4: tsconfig.app.json, tsconfig.node.json, vite.config.ts, index.html, src/main.tsx 삭제**

```bash
rm -f tsconfig.app.json tsconfig.node.json vite.config.ts index.html src/main.tsx
```

- [ ] **Step 5: next-env.d.ts 생성**

```typescript
// next-env.d.ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />

// NOTE: This file should not be edited
```

- [ ] **Step 6: package.json scripts를 Next.js 커맨드로 교체**

```json
	"scripts": {
		"dev": "next dev -p 3000",
		"build": "next build",
		"start": "next start",
		"lint": "eslint .",
		"storybook": "storybook dev -p 6006",
		"build-storybook": "storybook build"
	},
```

`"type": "module"` 필드는 삭제한다 (Next.js는 CommonJS/ESM을 자체적으로 처리하며 `"type": "module"`이 있으면 `next.config.ts`가 `.mts`로 취급되어 문제가 될 수 있음).

- [ ] **Step 7: Commit**

```bash
git add next.config.ts next-env.d.ts tsconfig.json package.json pnpm-lock.yaml
git rm vite.config.ts index.html tsconfig.app.json tsconfig.node.json src/main.tsx
git commit -m "chore: Next.js 프로젝트 골격 추가, Vite 설정 제거"
```

---

### Task 3: Root layout, Providers, 전역 메타데이터

**Files:**
- Create: `app/layout.tsx`
- Create: `app/Providers.tsx`
- Modify: `src/styles/GlobalStyles.tsx:1,180-183` (client 컴포넌트로 명시)
- Delete: `src/App.tsx`

**Interfaces:**
- Consumes: `Theme`(`@styles/themes`), `GlobalStyle`(`@styles/GlobalStyles`), `GNB`(`@components/GNB`, Task 4에서 마이그레이션됨), `METADATA`(`@const/contents`)
- Produces: 모든 `app/**/page.tsx`가 이 레이아웃 아래에서 렌더링됨. 하위 페이지는 `export const metadata`로 이 기본값을 override.

- [ ] **Step 1: GlobalStyles.tsx 최상단에 'use client' 추가**

`src/styles/GlobalStyles.tsx` 1번째 줄 위에 추가:

```typescript
'use client';

// @/styles/GlobalStyles
```

- [ ] **Step 2: app/Providers.tsx 작성 (클라이언트 전용 래퍼)**

```typescript
// app/Providers.tsx
'use client';

import { ThemeProvider } from '@emotion/react';
import { Toaster } from 'react-hot-toast';
import { Theme } from '@styles/themes';
import GlobalStyle from '@styles/GlobalStyles';
import GNB from '@components/GNB';
import ScrollToTop from '@const/ScrollToTop';

const Providers = ({ children }: { children: React.ReactNode }) => {
	return (
		<ThemeProvider theme={Theme}>
			<GlobalStyle />
			<ScrollToTop />
			<GNB />
			<Toaster position="bottom-center" reverseOrder={false} />
			{children}
		</ThemeProvider>
	);
};

export default Providers;
```

- [ ] **Step 3: app/layout.tsx 작성 (index.html의 head 태그를 metadata로 이전)**

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import Providers from './Providers';

export const metadata: Metadata = {
	title: METADATA.NAME,
	description: METADATA.DESCRIPTION,
	appleWebApp: { title: 'Mortals Log' },
	manifest: '/site.webmanifest',
	icons: {
		icon: [
			{ url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
			{ url: '/favicon.svg', type: 'image/svg+xml' },
		],
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
	openGraph: {
		title: METADATA.NAME,
		description: METADATA.DESCRIPTION,
		images: ['https://mortals-log.vercel.app/images/profile/main.jpg'],
		url: 'https://mortals-log.vercel.app',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
	},
};

export const viewport = {
	width: 'device-width',
	initialScale: 1,
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="kr">
			<body>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
};

export default RootLayout;
```

- [ ] **Step 4: src/App.tsx 삭제**

```bash
rm src/App.tsx
```

(라우팅은 Task 5~10에서 `app/**/page.tsx`로 대체된다.)

- [ ] **Step 5: 빌드 확인**

Run: `pnpm run build`
Expected: `app/layout.tsx`만 있는 상태에서는 아직 `/` 라우트가 없어 에러가 날 수 있음 — Task 5에서 `app/page.tsx`를 추가하면 해결되므로, 이 시점에는 `tsc`/타입 에러가 없는지만 확인:
Run: `pnpm exec tsc --noEmit`
Expected: `app/page.tsx`가 없다는 라우팅 관련 경고 외에 타입 에러 없음.

- [ ] **Step 6: Commit**

```bash
git add app/layout.tsx app/Providers.tsx src/styles/GlobalStyles.tsx
git rm src/App.tsx
git commit -m "feat: Next.js root layout과 Providers 추가"
```

---

### Task 4: 공용 네비게이션 유틸 마이그레이션 (GNB, BackButton, useTrackNavigation, ScrollToTop)

**Files:**
- Modify: `src/components/GNB.tsx:1,6`
- Modify: `src/components/BackButton.tsx:1,5`
- Modify: `src/hooks/useTrackNavigation.ts:1,3`
- Modify: `src/const/ScrollToTop.ts:1,4`

**Interfaces:**
- Consumes: `next/navigation`의 `usePathname`, `useRouter`, `useParams`
- Produces: 이후 모든 페이지가 이 네 개의 공용 컴포넌트/훅을 그대로 import해서 씀 (시그니처 불변: `GNB()`, `BackButton({ to }: { to?: string })`, `UseTrackNavigation()` → `{ handleItemClick, handleKeyDown }`, `ScrollToTop()`)

- [ ] **Step 1: GNB.tsx — react-router-dom을 next/navigation으로 교체**

`src/components/GNB.tsx` 최상단에 `'use client';` 추가하고, import 교체:

```diff
+'use client';
+
 // @/components/GNB

 import * as S from '@/styles/components/GNB.style';

 import { useEffect, useMemo, useState } from 'react';
-import { useLocation, useNavigate } from 'react-router-dom';
+import { usePathname, useRouter } from 'next/navigation';
```

44번째 줄 부근의 사용부 교체:

```diff
-	const navigate = useNavigate();
-	const location = useLocation();
-	const currentPath = location.pathname;
+	const router = useRouter();
+	const currentPath = usePathname();
```

`handleNavClick` 내부(102번째 줄 부근):

```diff
 	const handleNavClick = (path: string) => {
 		if (path.startsWith('http')) {
 			window.open(path, '_blank', 'noopener,noreferrer');
 		} else {
-			navigate(path);
+			router.push(path);
 		}
```

- [ ] **Step 2: BackButton.tsx — react-router-dom을 next/navigation으로 교체**

```diff
+'use client';
+
 // @/components/BackButton

 import * as S from '@/styles/components/Buttons.style';

-import { useNavigate, useLocation } from 'react-router-dom';
+import { useRouter } from 'next/navigation';
 import { useCallback, useMemo } from 'react';
```

내부 로직 교체 (`location.key === 'default'` 판별은 Next.js에 대응 개념이 없으므로 `window.history.length` 체크만 남긴다):

```diff
 const BackButton = ({ to }: BackButtonProps) => {
-	const navigate = useNavigate();
-	const location = useLocation();
+	const router = useRouter();

 	const handleBack = useCallback(() => {
 		if (to) {
-			navigate(to);
+			router.push(to);
 			return;
 		}

-		if (window.history.length <= 1 || location.key === 'default') {
-			navigate('/');
+		if (window.history.length <= 1) {
+			router.push('/');
 		} else {
-			navigate(-1);
+			router.back();
 		}
-	}, [to, navigate, location.key]);
+	}, [to, router]);
```

- [ ] **Step 3: useTrackNavigation.ts — react-router-dom을 next/navigation으로 교체**

```diff
+'use client';
+
 // @/hooks/useTrackNavigation.ts

-import { useNavigate } from 'react-router-dom';
+import { useRouter } from 'next/navigation';
 import { Track } from '@/types/track';

 export const UseTrackNavigation = () => {
-	const navigate = useNavigate();
+	const router = useRouter();

 	const handleItemClick = (track: Track) => {
 		if (!track) return;

 		let slug = track.title;

 		if (track.id.startsWith('TRK_LV')) {
 			const hasLiveTag = track.version?.toLowerCase().includes('live');

 			if (!hasLiveTag) {
 				slug = `${track.title}_Live`;
 			} else if (track.version) {
 				slug = `${track.title}_${track.version}`;
 			}
 		} else if (track.version) {
 			slug = `${track.title}_${track.version}`;
 		}

-		navigate(`/song/${encodeURIComponent(slug)}`);
+		router.push(`/song/${encodeURIComponent(slug)}`);
 	};
```

- [ ] **Step 4: ScrollToTop.ts — react-router-dom을 next/navigation으로 교체**

```diff
+'use client';
+
 // @/const/ScrollToTop

 import { useEffect } from 'react';
-import { useLocation } from 'react-router-dom';
+import { usePathname } from 'next/navigation';

 const ScrollToTop = () => {
-	const { pathname } = useLocation();
+	const pathname = usePathname();

 	useEffect(() => {
 		window.scrollTo({
 			top: 0,
 			left: 0,
 			behavior: 'instant',
 		});
 	}, [pathname]);
```

- [ ] **Step 5: react-router-dom 의존성 사용처가 이 네 파일뿐인지 확인 (남은 페이지 마이그레이션 태스크에서 각자 처리하므로 여기선 존재 확인만)**

Run: `grep -rl "react-router-dom" src app 2>/dev/null`
Expected: Task 8/9/10에서 다룰 `AlbumDetail/index.tsx`, `Song/SongDetail.tsx`, `ScheduleDetail/index.tsx`만 남아 있음 (이 파일들은 Task 8~10에서 처리).

- [ ] **Step 6: Commit**

```bash
git add src/components/GNB.tsx src/components/BackButton.tsx src/hooks/useTrackNavigation.ts src/const/ScrollToTop.ts
git commit -m "refactor: GNB/BackButton/useTrackNavigation/ScrollToTop을 next/navigation으로 전환"
```

---

### Task 4b: 나머지 react-router-dom 잔여 사용처 일괄 마이그레이션

> Task 4 리뷰 중 발견된 계획 누락분을 메우는 태스크. Task 4는 공용 훅 4개만 다뤘지만, 실제로는 `Link`를 감싼 styled-components 11개와 `useNavigate`를 직접 쓰는 페이지 컴포넌트 4개가 더 있었다. `next/link`의 `Link`는 목적지 prop이 `to`가 아니라 `href`이므로, import 교체만으로는 부족하고 각 소비처(JSX)의 `to=` prop도 `href=`로 바꿔야 한다.

**Files:**
- Modify (import만 `react-router-dom` → `next/link`, `Link` → default import): `src/styles/components/GNB.style.ts:7`, `src/styles/components/Buttons.style.ts:7`, `src/styles/components/AlbumCard.style.ts:6`, `src/styles/pages/Home/InformationSection.style.ts:7`, `src/styles/pages/Profile/ProfileDiscographySection.style.ts:6`, `src/styles/pages/About/AboutInquirySection.style.ts:6`, `src/styles/pages/Album/AlbumPromotionSection.style.ts:8`
- Modify (`useNavigate` → `useRouter`, 패턴은 Task 4의 GNB.tsx/BackButton.tsx와 동일): `src/pages/Home/ProfileSection.tsx:6`, `src/pages/Song/SongDetailHeader.tsx:6`, `src/pages/Schedule/ScheduleUpcommingBanner.tsx:6`, `src/pages/Schedule/ScheduleCalandarAgenda.tsx:5`
- Modify (`to=` → `href=` prop rename, 소비처): `src/components/GNB.tsx:139,186`, `src/pages/Profile/ProfileDiscographySection.tsx:86,117`, `src/pages/Album/AlbumReleaseSection.tsx:66`, `src/pages/Album/AlbumTypeSection.tsx:103`, `src/pages/Album/AlbumYearGroup.tsx:32`, `src/pages/Home/InformationSection.tsx:85`, `src/pages/ScheduleDetail/ScheduleDetailBody.tsx:202,242,250,258,306,350,356`, `src/pages/AlbumDetail/AlbumDetailMetaInfo.tsx:83,91`, `src/pages/Profile/ProfileLinkSection.tsx:31`, `src/pages/Goods/GoodsGuideSection.tsx:30`, `src/pages/Goods/GoodsLinkSection.tsx:25`, `src/pages/Song/SongDetailContent.tsx:153`, `src/pages/About/AboutInquirySection.tsx:18`, `src/pages/Album/AlbumPromotionSection.tsx:95`

**Interfaces:**
- Consumes: 없음 (leaf-level import/prop 교체)
- Produces: 이 태스크 이후 `grep -rn "react-router-dom" src app`의 결과는 Task 8/9/10이 아직 처리하지 않은 `AlbumDetail/index.tsx`, `Song/SongDetail.tsx`, `ScheduleDetail/index.tsx` 3개 파일만 남아야 함 (Task 11의 전제 조건).

- [ ] **Step 1: 11개 style 파일의 import 교체**

각 파일에서:
```diff
-import { Link } from 'react-router-dom';
+import Link from 'next/link';
```

- [ ] **Step 2: 4개 페이지 컴포넌트의 useNavigate → useRouter 교체**

`ProfileSection.tsx`, `SongDetailHeader.tsx`, `ScheduleUpcommingBanner.tsx`, `ScheduleCalandarAgenda.tsx` 각각에 대해 Task 4의 `GNB.tsx`/`BackButton.tsx`와 동일한 패턴 적용:
```diff
+'use client';
+
-import { useNavigate } from 'react-router-dom';
+import { useRouter } from 'next/navigation';
```
```diff
-	const navigate = useNavigate();
+	const router = useRouter();
```
그리고 해당 파일 내 `navigate(...)` 호출을 모두 `router.push(...)`로 교체 (파일별로 정확한 호출부는 다르므로, 각 파일에서 `navigate(` 문자열을 검색해 나오는 모든 호출부를 동일하게 바꾼다).

- [ ] **Step 3: to= prop을 href=로 일괄 교체**

위 Files 목록의 "to= → href= prop rename" 항목에 나열된 모든 줄에서, JSX 속성 `to={...}` 또는 `to="..."`를 `href={...}` / `href="..."`로 이름만 바꾼다 (값은 그대로 유지). 예:
```diff
-<S.DDayContent to={`/schedule/${nextEvent.id}`} className="pc-only">
+<S.DDayContent href={`/schedule/${nextEvent.id}`} className="pc-only">
```

- [ ] **Step 4: 잔여 사용처 확인**

Run: `grep -rn "react-router-dom" src app`
Expected: `src/pages/AlbumDetail/index.tsx`, `src/pages/Song/SongDetail.tsx`, `src/pages/ScheduleDetail/index.tsx` 3개 파일만 남음 (Task 8/9/10에서 처리 예정).

- [ ] **Step 5: 타입 체크**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음.

- [ ] **Step 6: Commit**

```bash
git add src/styles/components/GNB.style.ts src/styles/components/Buttons.style.ts src/styles/components/AlbumCard.style.ts src/styles/pages/Home/InformationSection.style.ts src/styles/pages/Profile/ProfileDiscographySection.style.ts src/styles/pages/About/AboutInquirySection.style.ts src/styles/pages/Album/AlbumPromotionSection.style.ts src/pages/Home/ProfileSection.tsx src/pages/Song/SongDetailHeader.tsx src/pages/Schedule/ScheduleUpcommingBanner.tsx src/pages/Schedule/ScheduleCalandarAgenda.tsx src/components/GNB.tsx src/pages/Profile/ProfileDiscographySection.tsx src/pages/Album/AlbumReleaseSection.tsx src/pages/Album/AlbumTypeSection.tsx src/pages/Album/AlbumYearGroup.tsx src/pages/Home/InformationSection.tsx src/pages/ScheduleDetail/ScheduleDetailBody.tsx src/pages/AlbumDetail/AlbumDetailMetaInfo.tsx src/pages/Profile/ProfileLinkSection.tsx src/pages/Goods/GoodsGuideSection.tsx src/pages/Goods/GoodsLinkSection.tsx src/pages/Song/SongDetailContent.tsx src/pages/About/AboutInquirySection.tsx src/pages/Album/AlbumPromotionSection.tsx
git commit -m "refactor: 나머지 react-router-dom Link/useNavigate 사용처를 next/link, next/navigation으로 전환"
```

---

### Task 5: 정적 페이지 라우트 추가 — Home, Profile, About

**Files:**
- Create: `app/page.tsx`
- Create: `app/profile/page.tsx`
- Create: `app/about/page.tsx`
- Modify: `src/pages/Home/index.tsx:1`
- Modify: `src/pages/Profile/index.tsx:1,36-45` (UpdateMetaTags effect 제거)
- Modify: `src/pages/About/index.tsx:1,24-33` (UpdateMetaTags effect 제거)

**Interfaces:**
- Consumes: 기존 `Home`, `Profile`, `About` 컴포넌트의 default export (시그니처 불변, props 없음)
- Produces: `/`, `/profile`, `/about` 라우트

- [ ] **Step 1: Home — 'use client' 추가 (자식 컴포넌트가 framer-motion 애니메이션을 쓰므로 필요)**

`src/pages/Home/index.tsx` 최상단에 추가:

```diff
+'use client';
+
 // @/pages/Home
```

- [ ] **Step 2: app/page.tsx 작성 (Home은 기존 UpdateMetaTags 호출이 없었으므로 layout의 기본 metadata를 그대로 상속)**

```typescript
// app/page.tsx
import Home from '@pages/Home';

const Page = () => <Home />;

export default Page;
```

- [ ] **Step 3: Profile — 'use client' 추가하고 UpdateMetaTags useEffect 제거**

`src/pages/Profile/index.tsx` 최상단에 `'use client';` 추가. 아래 블록(36~45번째 줄)을 삭제:

```diff
-	useEffect(() => {
-		const pageTitle = `${METADATA.NAME} | Profile`;
-		const description = `${NAME.KOREAN}의 프로필, 주요 활동 및 디스코그래피를 확인하세요.`;
-
-		UpdateMetaTags(pageTitle, description, '/images/profile/main.jpg', 'website');
-
-		return () => {
-			UpdateMetaTags(METADATA.NAME, METADATA.DESCRIPTION, undefined, 'website');
-		};
-	}, []);
-
```

`useEffect`와 `UpdateMetaTags` import가 더 이상 쓰이지 않으면 import 목록에서도 제거한다.

- [ ] **Step 4: app/profile/page.tsx 작성**

```typescript
// app/profile/page.tsx
import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import { NAME } from '@const/profile';
import Profile from '@pages/Profile';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | Profile`,
	description: `${NAME.KOREAN}의 프로필, 주요 활동 및 디스코그래피를 확인하세요.`,
	openGraph: {
		images: ['/images/profile/main.jpg'],
	},
};

const Page = () => <Profile />;

export default Page;
```

- [ ] **Step 5: About — 'use client' 추가하고 UpdateMetaTags useEffect 제거**

`src/pages/About/index.tsx` 최상단에 `'use client';` 추가. 24~33번째 줄 블록 삭제 (Profile과 동일 패턴). 미사용 import 정리.

- [ ] **Step 6: app/about/page.tsx 작성**

```typescript
// app/about/page.tsx
import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import About from '@pages/About';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | About`,
	description: `${METADATA.NAME}의 저작권 정책 및 문의 정보를 확인하세요.`,
};

const Page = () => <About />;

export default Page;
```

- [ ] **Step 7: 빌드 및 로컬 확인**

Run: `pnpm run build && pnpm run start`
Expected: `/`, `/profile`, `/about` 세 페이지가 에러 없이 렌더링됨. 브라우저에서 각 페이지 `view-source:`로 `<title>`과 `og:*` meta 태그가 페이지별로 다르게 나오는지 확인.

- [ ] **Step 8: Commit**

```bash
git add app/page.tsx app/profile/page.tsx app/about/page.tsx src/pages/Home/index.tsx src/pages/Profile/index.tsx src/pages/About/index.tsx
git commit -m "feat: Home/Profile/About 라우트를 App Router로 이전"
```

---

### Task 6: 정적 페이지 라우트 추가 — Schedule, Goods, Music, Album, Song (목록 페이지)

**Files:**
- Create: `app/schedule/page.tsx`, `app/goods/page.tsx`, `app/music/page.tsx`, `app/album/page.tsx`, `app/song/page.tsx`
- Modify: `src/views/Schedule/index.tsx:1,26-35`
- Modify: `src/views/Goods/index.tsx:1,36-45`
- Modify: `src/views/Music/index.tsx:1,27-36`
- Modify: `src/views/Album/index.tsx:1`
- Modify: `src/views/Song/index.tsx:1`

**Interfaces:**
- Consumes: 기존 `Schedule`, `Goods`, `Music`, `Album`, `Song` 컴포넌트의 default export (props 없음)
- Produces: `/schedule`, `/goods`, `/music`, `/album`, `/song` 라우트

- [ ] **Step 1: Schedule — 'use client' 추가, UpdateMetaTags effect 제거**

`src/views/Schedule/index.tsx` 최상단에 `'use client';` 추가. 26~35번째 줄의 `useEffect(() => { ... UpdateMetaTags ... })` 블록 삭제, 미사용 import 정리.

- [ ] **Step 2: app/schedule/page.tsx 작성**

```typescript
// app/schedule/page.tsx
import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import { NAME } from '@const/profile';
import Schedule from '@pages/Schedule';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | Schedule`,
	description: `${NAME.KOREAN}의 공연, 앨범 발매, 인터뷰 등 주요 일정을 한눈에 확인하실 수 있습니다.`,
};

const Page = () => <Schedule />;

export default Page;
```

- [ ] **Step 3: Goods — 'use client' 추가, UpdateMetaTags effect 제거**

`src/views/Goods/index.tsx` 최상단에 `'use client';` 추가. 36~45번째 줄 블록 삭제, 미사용 import 정리. `DESCRIPTION`은 `FAN_GOODS_GUIDE`에서 가져오므로 page.tsx에서도 동일하게 import한다.

- [ ] **Step 4: app/goods/page.tsx 작성**

```typescript
// app/goods/page.tsx
import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import { FAN_GOODS_GUIDE } from '@const/goods';
import Goods from '@pages/Goods';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | Goods`,
	description: FAN_GOODS_GUIDE.DESCRIPTION,
};

const Page = () => <Goods />;

export default Page;
```

- [ ] **Step 5: Music — 'use client' 추가 (useState로 탭 전환), UpdateMetaTags effect 제거**

`src/views/Music/index.tsx` 최상단에 `'use client';` 추가. 27~36번째 줄 블록 삭제, 미사용 import 정리.

- [ ] **Step 6: app/music/page.tsx 작성**

```typescript
// app/music/page.tsx
import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import { NAME } from '@const/profile';
import Music from '@pages/Music';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | Music`,
	description: `${NAME.KOREAN}의 정규 앨범부터 싱글, 라이브까지 각 앨범의 상세 정보와 수록곡을 확인할 수 있습니다.`,
};

const Page = () => <Music />;

export default Page;
```

- [ ] **Step 7: Album 목록 페이지 — 'use client' 추가 (하위 섹션이 훅을 사용하는지 확인 후 필요시)**

`src/views/Album/index.tsx`는 자체 상태는 없지만 `AlbumPromotionSection`/`AlbumReleaseSection`/`AlbumTypeSection`이 훅을 쓸 수 있으므로 최상단에 `'use client';`를 추가한다 (하위 컴포넌트가 client 컴포넌트를 포함하면 부모도 client 경계 안에 있어야 함).

- [ ] **Step 8: app/album/page.tsx 작성 (metadata는 Music과 동일 문구 재사용)**

```typescript
// app/album/page.tsx
import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import { NAME } from '@const/profile';
import Album from '@pages/Album';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | Album`,
	description: `${NAME.KOREAN}의 정규 앨범부터 싱글, 라이브까지 각 앨범의 상세 정보와 수록곡을 확인할 수 있습니다.`,
};

const Page = () => <Album />;

export default Page;
```

- [ ] **Step 9: Song 목록 페이지 — 'use client' 추가 (useState로 정렬 상태 관리)**

`src/views/Song/index.tsx` 최상단에 `'use client';` 추가.

- [ ] **Step 10: app/song/page.tsx 작성**

```typescript
// app/song/page.tsx
import type { Metadata } from 'next';
import { METADATA } from '@const/contents';
import { NAME } from '@const/profile';
import Song from '@pages/Song';

export const metadata: Metadata = {
	title: `${METADATA.NAME} | Song`,
	description: `${NAME.KOREAN}의 모든 수록곡을 최신순, 발매순, 가나다순으로 확인할 수 있습니다.`,
};

const Page = () => <Song />;

export default Page;
```

- [ ] **Step 11: 빌드 및 확인**

Run: `pnpm run build && pnpm run start`
Expected: `/schedule`, `/goods`, `/music`, `/album`, `/song` 다섯 페이지 모두 정상 렌더링, 각 페이지 소스에서 `<title>`이 요청한 값으로 나오는지 확인.

- [ ] **Step 12: Commit**

```bash
git add app/schedule/page.tsx app/goods/page.tsx app/music/page.tsx app/album/page.tsx app/song/page.tsx src/views/Schedule/index.tsx src/views/Goods/index.tsx src/views/Music/index.tsx src/views/Album/index.tsx src/views/Song/index.tsx
git commit -m "feat: Schedule/Goods/Music/Album/Song 목록 라우트를 App Router로 이전"
```

---

### Task 7: 트랙 슬러그 계산 공용 함수 추출 (DRY)

**Files:**
- Modify: `src/utils/track.ts:1-6` (`GetTrackSlug` 함수 추가)
- Modify: `src/hooks/useTrackNavigation.ts` (새 함수 재사용)

**Interfaces:**
- Consumes: 없음
- Produces: `GetTrackSlug(track: Track): string` — Task 9(`SongDetail` 동적 라우트)의 `generateStaticParams`/`generateMetadata`가 이 함수로 트랙마다 URL 슬러그를 계산함. 기존 `useTrackNavigation.ts`의 슬러그 계산 로직과 100% 동일해야 두 곳에서 만든 링크가 일치한다.

- [ ] **Step 1: utils/track.ts에 GetTrackSlug 추가**

`src/utils/track.ts` 최상단 import 아래에 추가:

```typescript
export const GetTrackSlug = (track: Track): string => {
	let slug = track.title;

	if (track.id.startsWith('TRK_LV')) {
		const hasLiveTag = track.version?.toLowerCase().includes('live');

		if (!hasLiveTag) {
			slug = `${track.title}_Live`;
		} else if (track.version) {
			slug = `${track.title}_${track.version}`;
		}
	} else if (track.version) {
		slug = `${track.title}_${track.version}`;
	}

	return slug;
};
```

- [ ] **Step 2: useTrackNavigation.ts가 GetTrackSlug를 재사용하도록 교체**

```diff
+'use client';
+
 // @/hooks/useTrackNavigation.ts

 import { useRouter } from 'next/navigation';
 import { Track } from '@/types/track';
+import { GetTrackSlug } from '@/utils/track';

 export const UseTrackNavigation = () => {
 	const router = useRouter();

 	const handleItemClick = (track: Track) => {
 		if (!track) return;

-		let slug = track.title;
-
-		if (track.id.startsWith('TRK_LV')) {
-			const hasLiveTag = track.version?.toLowerCase().includes('live');
-
-			if (!hasLiveTag) {
-				slug = `${track.title}_Live`;
-			} else if (track.version) {
-				slug = `${track.title}_${track.version}`;
-			}
-		} else if (track.version) {
-			slug = `${track.title}_${track.version}`;
-		}
-
-		router.push(`/song/${encodeURIComponent(slug)}`);
+		router.push(`/song/${encodeURIComponent(GetTrackSlug(track))}`);
 	};
```

(Task 4에서 이미 `'use client'`를 추가했다면 중복 추가하지 않는다.)

- [ ] **Step 3: 타입 체크**

Run: `pnpm exec tsc --noEmit`
Expected: 에러 없음.

- [ ] **Step 4: Commit**

```bash
git add src/utils/track.ts src/hooks/useTrackNavigation.ts
git commit -m "refactor: 트랙 URL 슬러그 계산 로직을 GetTrackSlug로 추출"
```

---

### Task 8: 앨범 상세 동적 라우트 (`/album/[id]`)

**Files:**
- Create: `app/album/[id]/page.tsx`
- Modify: `src/views/AlbumDetail/index.tsx:1,4,38-53`

**Interfaces:**
- Consumes: `ALL_ALBUMS_FLAT`(`@pages/AlbumDetail`), `IsAlbumMatch`/`GetAlbumPaths`(`@utils/album`)
- Produces: `/album/[id]` 라우트, 앨범별 `generateMetadata`

- [ ] **Step 1: AlbumDetail/index.tsx — react-router-dom을 next/navigation으로, UpdateMetaTags effect 제거**

```diff
+'use client';
+
 // @/pages/AlbumDetail

 import * as S from '@styles/pages/AlbumDetail/AlbumDetail.style';
-import { useParams } from 'react-router-dom';
-import { useEffect, useMemo } from 'react';
+import { useParams } from 'next/navigation';
+import { useMemo } from 'react';
 import { GET_FULL_ALBUMS } from '@const/albums';
 import AlbumDetailTracks from '@/pages/AlbumDetail/AlbumDetailTracks';
 import AlbumDetailMetaInfo from '@/pages/AlbumDetail/AlbumDetailMetaInfo';
 import AlbumDetailIntro from '@/pages/AlbumDetail/AlbumDetailIntro';
-import { METADATA } from '@/const/contents';
 import BackButton from '@/components/BackButton';
 import Placeholder from '@/components/Placeholder';
-import { GetAlbumPaths, IsAlbumMatch } from '@/utils/album';
-import { UpdateMetaTags } from '@/utils/meta';
+import { IsAlbumMatch } from '@/utils/album';
```

`useEffect` 메타태그 블록(38~53번째 줄) 전체 삭제:

```diff
-	useEffect(() => {
-		if (!albumData) {
-			UpdateMetaTags(METADATA.NAME, METADATA.DESCRIPTION, undefined, 'website');
-			return;
-		}
-
-		const { imageSrc } = GetAlbumPaths(albumData);
-		const pageTitle = `${METADATA.NAME} | ${albumData.title}`;
-		const description = `${albumData.title} 앨범의 수록곡과 소개 정보를 확인하세요.`;
-
-		UpdateMetaTags(pageTitle, description, imageSrc, 'music.album');
-
-		return () => {
-			UpdateMetaTags(METADATA.NAME, METADATA.DESCRIPTION, undefined, 'website');
-		};
-	}, [albumData]);
-
```

`useParams<{ id: string }>()`는 `next/navigation`에서도 동일한 시그니처로 동작하므로 나머지 로직(`albumData` 계산, JSX)은 그대로 둔다.

- [ ] **Step 2: app/album/[id]/page.tsx 작성**

```typescript
// app/album/[id]/page.tsx
import type { Metadata } from 'next';
import { GET_FULL_ALBUMS } from '@const/albums';
import { GetAlbumPaths, IsAlbumMatch } from '@utils/album';
import { GetSlug } from '@utils/urlSlug';
import { METADATA } from '@const/contents';
import AlbumDetail from '@pages/AlbumDetail';

const ALL_ALBUMS_FLAT = GET_FULL_ALBUMS().flatMap(group => group.items);

export const generateStaticParams = () => {
	return ALL_ALBUMS_FLAT.map(album => ({ id: GetSlug(album.title) }));
};

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> => {
	const { id } = await params;
	const album = ALL_ALBUMS_FLAT.find(item => IsAlbumMatch(item, id));

	if (!album) {
		return { title: METADATA.NAME, description: METADATA.DESCRIPTION };
	}

	const { imageSrc } = GetAlbumPaths(album);

	return {
		title: `${METADATA.NAME} | ${album.title}`,
		description: `${album.title} 앨범의 수록곡과 소개 정보를 확인하세요.`,
		openGraph: { images: [imageSrc], type: 'music.song' },
	};
};

const Page = () => <AlbumDetail />;

export default Page;
```

(Open Graph `type`은 Next.js `Metadata` 타입이 `music.album`을 지원하지 않아 `music.song`으로 제한되므로, 기존 `'music.album'` 대신 허용되는 값을 쓴다 — 이 부분은 Next.js 타입 제약에 따른 의도적 변경.)

- [ ] **Step 3: 빌드 확인**

Run: `pnpm run build`
Expected: 모든 앨범 슬러그에 대해 정적 페이지가 생성됨 (`✓ Generating static params` 로그에 앨범 개수만큼 경로가 나옴). `pnpm run start` 후 `/album/명상좀비`(URL 인코딩된 형태) 접속 시 정상 렌더링.

- [ ] **Step 4: Commit**

```bash
git add app/album/[id]/page.tsx src/views/AlbumDetail/index.tsx
git commit -m "feat: 앨범 상세 동적 라우트와 앨범별 메타데이터 추가"
```

---

### Task 9: 곡 상세 동적 라우트 (`/song/[id]`)

**Files:**
- Create: `app/song/[id]/page.tsx`
- Modify: `src/views/Song/SongDetail.tsx:1,5,18-52`

**Interfaces:**
- Consumes: `MASTER_TRACKS`(`@const/tracks`), `IsTrackMatch`/`GetTrackSlug`(`@utils/track`), `FULL_ALBUMS`(`@const/albums`), `GetAlbumPaths`(`@utils/album`)
- Produces: `/song/[id]` 라우트, 곡별 `generateMetadata`

- [ ] **Step 1: SongDetail.tsx — react-router-dom을 next/navigation으로, UpdateMetaTags effect 제거**

```diff
+'use client';
+
 // @/pages/Song/SongDetail

 import * as S from '@styles/pages/Song/SongDetail.styles';
-import { useEffect, useMemo } from 'react';
-import { useParams } from 'react-router-dom';
+import { useMemo } from 'react';
+import { useParams } from 'next/navigation';
 import { FULL_ALBUMS } from '@/const/albums';
 import { MASTER_TRACKS } from '@/const/tracks';
-import { METADATA } from '@/const/contents';
 import BackButton from '@/components/BackButton';
 import Placeholder from '@/components/Placeholder';
 import SongDetailHeader from '@/pages/Song/SongDetailHeader';
 import SongDetailMeta from '@/pages/Song/SongDetailMeta';
 import SongDetailContent from '@/pages/Song/SongDetailContent';
 import { IsTrackMatch } from '@/utils/track';
-import { UpdateMetaTags } from '@/utils/meta';
-import { GetAlbumPaths } from '@/utils/album';
```

`useEffect` 메타태그 블록(40~52번째 줄) 삭제:

```diff
-	useEffect(() => {
-		if (track && albumInfo) {
-			const { imageSrc } = GetAlbumPaths(albumInfo);
-			const pageTitle = `${METADATA.NAME} | ${track.title}`;
-			const description = `${track.title} 곡의 정보를 확인하세요.`;
-
-			UpdateMetaTags(pageTitle, description, imageSrc, 'music.song');
-		}
-
-		return () => {
-			UpdateMetaTags(METADATA.NAME, METADATA.DESCRIPTION, undefined, 'website');
-		};
-	}, [track, albumInfo]);
-
```

- [ ] **Step 2: app/song/[id]/page.tsx 작성**

```typescript
// app/song/[id]/page.tsx
import type { Metadata } from 'next';
import { FULL_ALBUMS } from '@const/albums';
import { MASTER_TRACKS } from '@const/tracks';
import { GetAlbumPaths } from '@utils/album';
import { IsTrackMatch, GetTrackSlug } from '@utils/track';
import { METADATA } from '@const/contents';
import SongDetail from '@pages/Song/SongDetail';

export const generateStaticParams = () => {
	return Object.values(MASTER_TRACKS).map(track => ({
		id: encodeURIComponent(GetTrackSlug(track)),
	}));
};

const findTrackAndAlbum = (id: string) => {
	const track = Object.values(MASTER_TRACKS).find(t => IsTrackMatch(t, id));
	if (!track) return { track: null, albumInfo: null };

	const albumInfo = FULL_ALBUMS.flatMap(cat => cat.items).find(album => {
		const tracksData = album.tracks;
		const flatTracks = Array.isArray(tracksData) ? tracksData : Object.values(tracksData || {}).flat();

		return (flatTracks as string[]).some(t => {
			const pattern = t.replace('*', '');
			return track.id.startsWith(pattern);
		});
	});

	return { track, albumInfo: albumInfo || null };
};

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> => {
	const { id } = await params;
	const { track, albumInfo } = findTrackAndAlbum(id);

	if (!track) {
		return { title: METADATA.NAME, description: METADATA.DESCRIPTION };
	}

	const image = albumInfo ? GetAlbumPaths(albumInfo).imageSrc : undefined;

	return {
		title: `${METADATA.NAME} | ${track.title}`,
		description: `${track.title} 곡의 정보를 확인하세요.`,
		openGraph: { images: image ? [image] : undefined, type: 'music.song' },
	};
};

const Page = () => <SongDetail />;

export default Page;
```

- [ ] **Step 3: 빌드 확인**

Run: `pnpm run build`
Expected: `MASTER_TRACKS`의 트랙 수만큼 정적 경로 생성. `pnpm run start` 후 `/song/민달팽이` 같은 URL로 접속해 정상 렌더링 확인.

- [ ] **Step 4: Commit**

```bash
git add app/song/[id]/page.tsx src/views/Song/SongDetail.tsx
git commit -m "feat: 곡 상세 동적 라우트와 곡별 메타데이터 추가"
```

---

### Task 10: 일정 상세 동적 라우트 (`/schedule/[id]`)

**Files:**
- Create: `app/schedule/[id]/page.tsx`
- Modify: `src/views/ScheduleDetail/index.tsx:1,5,25-81`

**Interfaces:**
- Consumes: `ALL_SCHEDULE_LIST`(`@utils/schedule`), `SCHEDULE_LABEL_MAP`(`@const/schedule`)
- Produces: `/schedule/[id]` 라우트, 일정별 `generateMetadata`

- [ ] **Step 1: ScheduleDetail/index.tsx — react-router-dom을 next/navigation으로, UpdateMetaTags effect 제거**

```diff
+'use client';
+
 // @/pages/Schedule/ScheduleDetail

 import * as S from '@/styles/pages/ScheduleDetail/ScheduleDetail.style';

-import { useParams } from 'react-router-dom';
-import { useEffect, useMemo } from 'react';
+import { useParams } from 'next/navigation';
+import { useMemo } from 'react';

 import { ALL_SCHEDULE_LIST } from '@/utils/schedule';
 import { ConcertItem } from '@/types/concert';

 import { SCHEDULE_LABEL_MAP } from '@/const/schedule';
 import { FULL_CONCERTS } from '@/const/concert';
 import { FULL_ALBUMS } from '@/const/albums';
 import { FULL_EVENTS } from '@/const/event';

 import BackButton from '@/components/BackButton';
 import Placeholder from '@/components/Placeholder';
 import ScheduleDetailBody from '@/pages/ScheduleDetail/ScheduleDetailBody';
-import { UpdateMetaTags } from '@/utils/meta';
-import { METADATA } from '@/const/contents';
```

`useEffect` 메타태그 블록(64~81번째 줄) 삭제:

```diff
-	useEffect(() => {
-		if (!scheduleBase) {
-			UpdateMetaTags(METADATA.NAME, METADATA.DESCRIPTION, undefined, 'website');
-			return;
-		}
-
-		const displayTitle = (isConcert(detailData) && detailData?.content) || scheduleBase.content;
-		const categoryLabel = SCHEDULE_LABEL_MAP[scheduleBase.type];
-
-		const pageTitle = `${METADATA.NAME} | [${categoryLabel}] ${displayTitle}`;
-		const description = `${scheduleBase.date} - ${displayTitle} 일정을 확인하세요.`;
-
-		UpdateMetaTags(pageTitle, description, scheduleBase.imageUrl, 'website');
-
-		return () => {
-			UpdateMetaTags(METADATA.NAME, METADATA.DESCRIPTION, undefined, 'website');
-		};
-	}, [scheduleBase, detailData]);
-
```

- [ ] **Step 2: app/schedule/[id]/page.tsx 작성**

```typescript
// app/schedule/[id]/page.tsx
import type { Metadata } from 'next';
import { ALL_SCHEDULE_LIST } from '@utils/schedule';
import { FULL_CONCERTS } from '@const/concert';
import { SCHEDULE_LABEL_MAP } from '@const/schedule';
import { METADATA } from '@const/contents';
import ScheduleDetail from '@pages/ScheduleDetail';

export const generateStaticParams = () => {
	return ALL_SCHEDULE_LIST.map(item => ({ id: String(item.id) }));
};

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> => {
	const { id } = await params;
	const scheduleBase = ALL_SCHEDULE_LIST.find(item => String(item.id) === id);

	if (!scheduleBase) {
		return { title: METADATA.NAME, description: METADATA.DESCRIPTION };
	}

	const concertMatch = FULL_CONCERTS.flatMap(g => g.items).find(i => scheduleBase.content.includes(i.content));
	const displayTitle = concertMatch?.content || scheduleBase.content;
	const categoryLabel = SCHEDULE_LABEL_MAP[scheduleBase.type];

	return {
		title: `${METADATA.NAME} | [${categoryLabel}] ${displayTitle}`,
		description: `${scheduleBase.date} - ${displayTitle} 일정을 확인하세요.`,
		openGraph: { images: scheduleBase.imageUrl ? [scheduleBase.imageUrl] : undefined },
	};
};

const Page = () => <ScheduleDetail />;

export default Page;
```

- [ ] **Step 3: 빌드 확인**

Run: `pnpm run build`
Expected: `ALL_SCHEDULE_LIST` 항목 수만큼 정적 경로 생성 (수천 개 수준일 수 있음 — 데뷔 기념일/생일이 10년치 매년 생성되므로). 빌드 시간이 눈에 띄게 길어지면 이 태스크 완료 후 별도로 보고한다.

- [ ] **Step 4: Commit**

```bash
git add app/schedule/[id]/page.tsx src/views/ScheduleDetail/index.tsx
git commit -m "feat: 일정 상세 동적 라우트와 일정별 메타데이터 추가"
```

---

### Task 11: 전체 react-router-dom 제거 확인

**Files:**
- Modify: `package.json` (dependency 제거)

**Interfaces:**
- Consumes: Task 4~10에서 모든 사용처가 `next/navigation`으로 교체된 상태
- Produces: 없음 (정리 작업)

- [ ] **Step 1: 잔여 사용처 확인**

Run: `grep -rn "react-router-dom" src app`
Expected: 결과 없음 (0줄).

- [ ] **Step 2: 의존성 제거**

```bash
pnpm remove react-router-dom
```

- [ ] **Step 3: 타입 체크 및 빌드**

Run: `pnpm exec tsc --noEmit && pnpm run build`
Expected: 에러 없음.

- [ ] **Step 4: Commit**

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: react-router-dom 의존성 제거"
```

---

### Task 12: Storybook 빌더를 @storybook/nextjs로 전환

**Files:**
- Modify: `package.json` (devDependencies)
- Modify: `.storybook/main.ts` (framework 필드)

**Interfaces:**
- Consumes: 없음
- Produces: `pnpm run storybook` / `pnpm run build-storybook`가 Next.js 빌드 파이프라인 기준으로 동작

- [ ] **Step 1: 기존 .storybook/main.ts 확인**

Run: `cat .storybook/main.ts`
(framework 필드에 `@storybook/react-vite`가 어떤 옵션과 함께 설정되어 있는지 확인 후 다음 스텝에서 그 옵션을 유지한 채 framework만 교체)

- [ ] **Step 2: 패키지 교체**

```bash
pnpm remove @storybook/react-vite
pnpm add -D @storybook/nextjs
```

- [ ] **Step 3: .storybook/main.ts의 framework 필드 교체**

```diff
-	framework: '@storybook/react-vite',
+	framework: '@storybook/nextjs',
```

(addons 배열의 `@chromatic-com/storybook`, `@storybook/addon-a11y`, `@storybook/addon-docs`, `@storybook/addon-onboarding`, `@storybook/addon-vitest`는 그대로 유지.)

- [ ] **Step 4: Storybook 동작 확인**

Run: `pnpm run storybook`
Expected: 로컬 6006 포트에서 Storybook이 뜨고, 기존 스토리들(TrackRow, GNB, BadgeList 등)이 에러 없이 렌더링됨. `Ctrl+C`로 종료 후 다음 스텝 진행.

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml .storybook/main.ts
git commit -m "chore: Storybook 빌더를 react-vite에서 nextjs로 전환"
```

---

### Task 13: CI(chromatic.yml)와 Vercel 배포 설정 갱신

**Files:**
- Modify: `.github/wrokflows/chromatic.yml:16-21`

**Interfaces:**
- Consumes: Task 1의 `pnpm-lock.yaml`
- Produces: PR마다 도는 Chromatic 배포 워크플로가 pnpm 기준으로 캐시/설치

- [ ] **Step 1: chromatic.yml의 캐시 키와 설치 커맨드를 pnpm 기준으로 교체**

```diff
       - name: Cache Dependencies
         id: cache
         uses: actions/cache@v3
         with:
           path: '**/node_modules'
-          key: ${{ runner.os }}-node-${{ hashFiles('**/yarn.lock') }}-storybook
+          key: ${{ runner.os }}-node-${{ hashFiles('**/pnpm-lock.yaml') }}-storybook
       - name: Install Dependencies
         if: steps.cache.outputs.cache-hit != 'true'
-        run: yarn install --frozen-lockfile
+        run: |
+          corepack enable
+          pnpm install --frozen-lockfile
```

- [ ] **Step 2: Vercel 프로젝트 설정에서 프레임워크 프리셋 확인 (수동, 코드 변경 아님)**

Vercel 대시보드 → 프로젝트 Settings → General → Framework Preset을 "Next.js"로, Install Command를 `pnpm install`로 바꿔야 한다는 점을 사용자에게 안내한다 (Vercel 프로젝트 설정은 저장소 밖 리소스라 이 계획에서 직접 변경할 수 없음).

- [ ] **Step 3: Commit**

```bash
git add .github/wrokflows/chromatic.yml
git commit -m "ci: chromatic 워크플로를 pnpm 기준으로 갱신"
```

---

### Task 14: 최종 정리 및 검증

**Files:**
- Modify: `package.json` (`@types/styled-components` 제거)
- Modify: `.gitignore` (`.next/` 추가, 기존 `dist` 대신)

**Interfaces:**
- Consumes: Task 1~13의 전체 결과물
- Produces: 배포 가능한 최종 상태

- [ ] **Step 1: 미사용 의존성 제거**

```bash
pnpm remove @types/styled-components
```

- [ ] **Step 2: .gitignore 확인 및 갱신**

Run: `grep -n "^dist" .gitignore`
`dist`(Vite 빌드 산출물) 항목이 있으면 `.next`로 교체하거나 추가:

```diff
-dist
+.next
```

- [ ] **Step 3: 전체 검증**

```bash
pnpm run lint
pnpm exec tsc --noEmit
pnpm run build
```

Expected: 세 명령 모두 에러 없이 통과.

- [ ] **Step 4: 로컬에서 전체 라우트 수동 점검**

Run: `pnpm run start`, 브라우저에서 아래 경로를 전부 열어 콘솔 에러 없이 렌더링되는지 확인:
`/`, `/profile`, `/music`, `/album`, `/album/[임의의 앨범]`, `/song`, `/song/[임의의 곡]`, `/schedule`, `/schedule/[임의의 일정]`, `/goods`, `/about`

- [ ] **Step 5: Commit**

```bash
git add package.json pnpm-lock.yaml .gitignore
git commit -m "chore: 미사용 의존성 정리 및 Next.js 산출물 gitignore 반영"
```
