# Supabase 백엔드 + 관리자 페이지 플랜

- **작성일**: 2026-09-10
- **목적**: 프론트엔드 포트폴리오용. 하드코딩된 `src/const/*.ts` 데이터를 Supabase(Postgres)로 옮기고, 관리자 페이지에서 CRUD 가능하게 한다.
- **결론**: 별도 백엔드 서버/레포 없음. 전부 `mortals-log-frontend` 레포 + Supabase 프로젝트에서 진행.

---

## 왜 Supabase인가

현재 데이터 규모: 레코드 수백 개, 월 1회 갱신, 편집자 1명, 100% 공개 읽기.

| 방식 | 결정 |
|---|---|
| 정적 `.ts` 유지 | 관리자 페이지 요구로 탈락 |
| Headless CMS | 커스텀 관리자 UI를 직접 못 만듦 → 포트폴리오 가치 낮음 |
| **Supabase** | ✅ Postgres + 자동 API + Auth + Storage, 서버 배포 없음 |
| 풀 커스텀 (Hono/NestJS) | 이 규모엔 과설계. 포트폴리오라도 6~7일 vs 2주 |

---

## 전체 구조

```
mortals-log-frontend/ (레포 1개)
├─ 공개 사이트  → Server Component에서 Supabase 읽기 + ISR(revalidate)
├─ /admin       → 클라이언트 + Server Actions, Supabase Auth로 보호, CRUD
└─ Supabase     → DB · Auth · Storage · 대시보드 (호스팅할 서버 코드 없음)
```

산출물 위치:

| 산출물 | 위치 |
|---|---|
| DB 스키마·RLS 마이그레이션 | `supabase/migrations/` |
| 데이터 이관 스크립트 | `scripts/seed.ts` |
| API fetch 레이어 (DTO) | `src/apis/<도메인>/` |
| Supabase 클라이언트 | `src/lib/supabase/` |
| 관리자 페이지 | `src/app/admin/` |

- 쓰기 권한은 RLS로 "로그인 사용자만". 관리자 1명이라 role 테이블 생략.
  `ponytail:` 공개 회원가입을 열게 되면 그때 role 체크 추가.

---

## DB 스키마 (`supabase/migrations/0001_init.sql`)

```sql
create table members (
  code text primary key,
  name text not null
);

create table albums (
  id           text primary key,        -- 'LP01' 등 기존 키 유지
  type         text not null,           -- LP/EP/SP/LV/VN
  volume       int,
  title        text not null,
  slug         text not null unique,    -- 기존 fileName 재사용
  release_date date not null,
  intro        text,
  credits      jsonb,
  cover_path   text,                     -- Storage 경로
  sort_order   int
);

create table tracks (
  id       text primary key,             -- 'TRK_LP01_001'
  album_id text not null references albums(id) on delete cascade,
  track_no int  not null,
  title    text not null,
  en_title text,
  duration text,
  lyrics   text
);
create index on tracks (album_id);

create table concerts (
  id          text primary key,
  type        text not null,             -- SOLO/JOIN/TOUR/LISTENING/FESTIVAL
  title       text not null,
  date        date,
  venue       text,
  poster_path text,
  description  text
);

create table concert_members (
  concert_id  text references concerts(id) on delete cascade,
  member_code text references members(code),
  primary key (concert_id, member_code)
);

create table events (
  id         bigint generated always as identity primary key,
  type       text not null,              -- INTERVIEW/RADIO/MAGAZINE
  year       text not null,
  event_date text,                        -- '03.09' 원본 형식 유지
  host       text,
  content    text,
  platform   text,
  link       text
);

-- goods/schedule/profile/career/about/links: 거의 안 바뀌므로 JSON 한 덩어리
create table site_config (
  key   text primary key,                -- 'goods' | 'schedule' | 'profile' ...
  value jsonb not null
);
```

### RLS (`supabase/migrations/0002_rls.sql`)

전 테이블에 동일 패턴 적용:

```sql
alter table albums enable row level security;

create policy "read for all"   on albums for select using (true);
create policy "write for auth" on albums for all
  using       ((select auth.uid()) is not null)
  with check  ((select auth.uid()) is not null);
```

`members`, `tracks`, `concerts`, `concert_members`, `events`, `site_config` 반복.

---

## 단계별 플랜 (1인, 약 6~7 person-day)

### Phase 0 — 셋업 (0.5일)
- Supabase 프로젝트 생성, `supabase` CLI 설치 → `supabase link`
- 패키지: `pnpm add @supabase/supabase-js @supabase/ssr` / `pnpm add -D tsx supabase`
- env: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`(시드 전용, 서버에서만)

### Phase 1 — 스키마 + RLS (0.5일)
- 마이그레이션 `0001`, `0002` 작성 → `supabase db push`
- `src/types/*.ts`를 스키마에 맞춰 정리 (대부분 그대로 사용)

### Phase 2 — 데이터 이관 (0.5일)
- `scripts/seed.ts`: 기존 `src/const/*.ts` import → row 매핑 → service_role 클라이언트로 `insert`
- 끝에 카운트 assert: albums 20 / tracks 70 / concerts 78 / events 19
- `pnpm tsx scripts/seed.ts` 1회 실행. 월 갱신 시 재사용 가능
- 순서 주의: `members` → `albums` → `tracks` → `concerts` → `concert_members` → `events` → `site_config`

### Phase 3 — 공개 사이트 읽기 전환 (1일)
- `src/lib/supabase/server.ts`, `src/lib/supabase/client.ts` (kebab-case, `@/` alias)
- `src/apis/album/`, `apis/track/`, `apis/concert/`, `apis/event/`:
  `fetchAlbums(): Promise<AlbumDto[]>` 형태 (rules `03-api-conventions.md` 준수, Query Key 상수 객체)
- 각 `src/views/*`에서 `const` import 제거 → Server Component에서 fetch, `export const revalidate = 3600`
- Storybook용으로 `src/const`는 목 데이터로 남겨도 됨

### Phase 4 — 관리자 인증 (0.5일)
- `@supabase/ssr` 미들웨어로 세션 처리, `/admin/**` 미인증 시 `/admin/login` 리다이렉트
- 관리자 계정은 Supabase 대시보드에서 직접 1개 생성 (회원가입 UI 없음)

### Phase 5 — 관리자 CRUD (2~3일)
- `/admin` — 레코드 카운트 대시보드
- `/admin/albums` 목록 → `/admin/albums/new`, `/admin/albums/[id]` 편집
- `/admin/tracks`, `/admin/concerts`(+ 멤버 다중선택), `/admin/events`, `/admin/config`(JSON 에디터)
- 폼: **Server Actions + `revalidatePath`** (Next 15). 필드 수가 적어 form 라이브러리 불필요.
  `ponytail:` 폼이 커지면 그때 `react-hook-form` 추가

### Phase 6 — 이미지 업로드 (0.5일)
- Storage 버킷 `covers`, `posters` (public read)
- 관리자 폼에서 업로드 → `cover_path` / `poster_path` 저장, 공개 페이지는 `getPublicUrl`
- 기존 `public/` 이미지는 그대로 두고 신규만 Storage 사용 가능

### Phase 7 — 배포 + 마무리 (0.5일)
- Vercel 환경변수 등록
- README에 아키텍처 다이어그램 (포트폴리오 어필 포인트)

---

## 비용

| 항목 | 비용 |
|---|---|
| Supabase Free (500MB DB, 1GB Storage, 50k MAU) | $0 |
| Vercel Hobby | $0 |
| 도메인 | 기존 재사용 시 $0 |

**주의**: Free 프로젝트는 7일 미접속 시 자동 일시정지. 시연 대비책:
- (a) 시연 전 대시보드에서 resume
- (b) GitHub Actions cron으로 주 1회 헬스 쿼리 핑 ← 권장
- (c) Pro $25/mo

---

## 하지 않는 것 (스코프 컷)

- 별도 `mortals-log-backend` 레포 / 커스텀 API 서버 → Supabase가 대체
- 다중 관리자 / 권한 role 시스템 → 편집자 1명
- 실시간 구독, 팬 댓글/투고, OAuth → 현재 요구 아님
- `goods`/`schedule`/`profile` 등 정적성 데이터의 개별 테이블화 → `site_config` JSON으로 충분
