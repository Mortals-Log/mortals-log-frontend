# Vite → Next.js + pnpm 마이그레이션

## 배경

`mortals-log-frontend`는 현재 Vite(rolldown-vite) + react-router-dom v7 기반 SPA로, yarn으로 패키지를 관리하며 Vercel에 배포되고 Storybook/Chromatic CI를 운영 중이다. 데이터는 전부 `src/const`의 정적 TS 상수이며 백엔드/API 호출이 없다.

## 목적

`index.html`에 og:image/description이 사이트 전체에 고정값 하나뿐이라, 앨범/곡/일정 상세 페이지가 카카오톡/트위터 등에 공유될 때 전부 같은 미리보기 카드가 뜬다. Next.js로 옮기면 페이지별 `generateMetadata`로 이 문제를 해결할 수 있다. 이것이 마이그레이션의 유일한 동기이며, 다른 기능 추가는 범위에 포함하지 않는다.

## 범위

포함:
- Vite → Next.js 15 App Router 전환
- yarn → pnpm 전환
- Storybook 빌더 전환 (`@storybook/react-vite` → `@storybook/nextjs`)
- CI(`chromatic.yml`)와 Vercel 배포 설정을 새 빌드 시스템에 맞게 갱신

범위 밖 (별도 후속 스펙으로 다룸):
- 데이터 스키마 최적화 (Album/Track/Schedule 구조 개선) — 이번 마이그레이션과 독립적인 별개 작업
- 신규 기능 추가

## 아키텍처

- **렌더링 전략**: Next.js App Router + 기본 Vercel Node 런타임 (`output: export` 사용 안 함). 모든 데이터가 정적 TS 상수이므로 `generateStaticParams`로 `/album/[id]`, `/song/[id]`, `/schedule/[id]`를 빌드타임에 전부 정적 생성(SSG)한다. 서버가 실제로 하는 일은 없지만, `output: export`로 고정하면 향후 `next/image` 등 기능 확장이 막히므로 기본 런타임을 유지한다.
- **메타데이터**: 각 상세 페이지에 `generateMetadata`를 구현해 곡/앨범/일정별 og:title, og:description, og:image를 채운다.

## 라우팅 매핑

기존 `src/App.tsx`의 react-router 10개 라우트를 App Router 파일 구조로 1:1 대응한다.

| 기존 (react-router) | 신규 (App Router) |
|---|---|
| `/` | `app/page.tsx` |
| `/profile` | `app/profile/page.tsx` |
| `/music` | `app/music/page.tsx` |
| `/album` | `app/album/page.tsx` |
| `/album/:id` | `app/album/[id]/page.tsx` |
| `/song` | `app/song/page.tsx` |
| `/song/:id` | `app/song/[id]/page.tsx` |
| `/schedule` | `app/schedule/page.tsx` |
| `/schedule/:id` | `app/schedule/[id]/page.tsx` |
| `/goods` | `app/goods/page.tsx` |
| `/about` | `app/about/page.tsx` |

`App.tsx`의 `ThemeProvider`/`GNB`/`Toaster`/`ScrollToTop`은 `app/layout.tsx` + 클라이언트 컴포넌트로 분리된 `Providers`로 이전한다. `useParams`/`useNavigate`는 `next/navigation`으로, `<Link>`는 `next/link`로 교체한다. `src/pages/ScheduleCalendar`는 현재 `App.tsx`에 라우트로 연결되어 있지 않은 상태를 그대로 유지한다(연결이 필요하면 별도 확인).

## 스타일링

emotion만 실제로 사용 중이다(`@types/styled-components`는 미사용 leftover devDependency이므로 삭제). 별도 SSR 설정(babel/swc emotion 플러그인) 없이, App Router 규칙에 따라 스타일이 있는 컴포넌트에 `'use client'`를 붙이는 방식으로 충분하다.

## SVG/아이콘

`vite-plugin-svgr`를 Next.js 기본 webpack 설정에 `@svgr/webpack` 룰을 추가하는 방식으로 대체해 기존 `import Icon from './icon.svg?react'` 같은 사용 패턴을 그대로 유지한다.

## Path Alias

`vite.config.ts`의 alias 목록(`@`, `@components`, `@pages`, `@assets`, `@const`, `@store`, `@styles`, `@types`, `@utils`, `@hooks`)을 `tsconfig.json`의 `paths`로 옮긴다.

## Storybook

`@storybook/react-vite` → `@storybook/nextjs`로 빌더를 교체한다. addon 구성(a11y, docs, onboarding, vitest)은 유지하고 Chromatic 연동은 그대로 둔다.

## 패키지 매니저

yarn → pnpm. `yarn.lock` 삭제 후 `pnpm-lock.yaml` 생성. `.github/wrokflows/chromatic.yml`의 `yarn install --frozen-lockfile`을 `pnpm install --frozen-lockfile`로, 캐시 키(`hashFiles('**/yarn.lock')`)를 `hashFiles('**/pnpm-lock.yaml')`로 변경한다. `package.json`의 `engines.node`(>=24)는 유지한다.

## 진행 순서

1. pnpm 전환 (독립적, 가장 저위험 — 먼저 끝내고 검증)
2. Next.js 프로젝트 골격 생성, `app/layout.tsx` + Providers 이전
3. 페이지를 하나씩 이전 (컴포넌트/스타일/유틸 로직은 그대로 재사용, 라우팅 진입점만 교체)
4. 상세 페이지에 `generateMetadata` 추가
5. SVG/alias 설정 이전
6. Storybook 빌더 전환
7. CI/Vercel 설정 갱신
8. Vite 관련 파일/의존성 제거 (`vite.config.ts`, `index.html`, `vite`, `@vitejs/plugin-react`, `vite-plugin-svgr` 등)

## 리스크 및 완화

- **라우팅 회귀**: 페이지별로 순차 이전하며 각 단계마다 로컬에서 실제 클릭 이동 확인.
- **RSC/클라이언트 경계 실수**: 훅(useState, useEffect, react-hot-toast 등) 쓰는 컴포넌트는 `'use client'` 누락 시 빌드 에러로 바로 드러남.
- **Storybook 회귀**: 빌더 전환 후 `pnpm run storybook`으로 기존 스토리 전수 확인.
- **배포 실패**: Vercel은 Next.js를 네이티브 지원하므로 프레임워크 프리셋만 변경하면 되나, 실제 프리뷰 배포로 한 번 검증 후 프로덕션 반영.
