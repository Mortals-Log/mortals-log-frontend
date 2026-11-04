# 스키마 구조·네이밍 점검과 개선안

[backend.md](./backend.md)에 정리한 현재 스키마(테이블 5개)를 점검하고, 개선이 필요한 부분과 구체적인 개선안을 정리한 문서입니다.

- 기준일: 2026-10-26 점검, 2026-10-27 적용
- 점검 방법: 원격 DB의 실제 데이터(앨범 20 / 곡 133 / 코드 45 / 콘서트 41 / 이벤트 11)로 통계를 내고, 개선안은 같은 데이터를 넣은 로컬 Postgres에서 적용해 검증했습니다.
- **P0·P1·네이밍은 원격에 적용을 마쳤습니다.** 적용 결과는 아래 "처리 현황"과 [backend.md](./backend.md)에 있습니다. 이 문서의 1~3장은 **적용 전 시점의 점검 기록**이라 컬럼 이름이 옛 이름(`type`, `position`, `file_name` 등)으로 적혀 있습니다.
- (이전 상태) 원격 DB와 앱 코드는 바꾸지 않았습니다. 개선안 SQL은 `supabase/migrations/`가 아니라 [`supabase/migrations/`](../supabase/migrations/)에 초안으로 있습니다.

## 처리 현황 (2026-10-27)

| 항목 | 결과 |
| :-- | :-- |
| S1·S2 JSON 표시 순서, `store` 이중 모양 | **적용.** `album_links`(`sort_order`) |
| S3 날짜 | **적용.** `date` 타입, 문자열로 되돌려도 원본과 동일 |
| S4 파생 id 일관성 | **적용.** CHECK 제약 |
| S5 `volume` | **결정: LP만 채움.** "LP일 때만 값이 있다"를 CHECK로 강제 |
| S6 원곡 관계 | **적용.** `track_origins`(FK, 삭제 보호) |
| S7 크레딧 | 보류. 소개글 유지 (결정 대기) |
| S8·S9 가격·예매·코드 악보 구조화, 튜닝 분해 | 보류 (P2) |
| S10 이미지 | **부분.** 경로 컬럼(`cover_image_path`, `poster_image_path`)만 추가. 화면 연결은 관리자 페이지 단계 |
| S11 게시 여부 | **결정: 필요 → 적용.** `is_published` + RLS, 원격에서 동작 확인 |
| S12 감사 컬럼 | **적용.** `created_at`, `updated_at` |
| S13 중복 방지 | **적용.** 유니크 인덱스 |
| S14 사람 이름 테이블 | 보류 (필요할 때) |
| S15 공연 유형 | **결정: 분리 → 적용.** 형식 + `is_tour` + `is_band_performance`. 기존 `TOUR`(천진우 단독 순회) 3건과 `BAND_TOUR`(밴드 5인의 단독 순회) 2건은 형식 SOLO |
| S16 재생시간 | **부분.** `m:ss` 형식 CHECK만 적용, 정수화는 보류 |
| 2장 네이밍 | **적용.** 단 `events.link`는 정규화 방침이 정해질 때까지 유지 |

적용 후 검증: 로컬 Postgres 38/38(실제 데이터 제자리 변환 + 새 시드), 실제 Supabase 12/12, 스냅샷 파일 바이트 동일, 빌드 산출물 618개 동일.

## 0. 한눈에 보기

| 우선순위 | 내용 | 재시드 | 앱 코드 변경 | 초안 |
| :-- | :-- | :-- | :-- | :-- |
| **P0** | 무결성 제약, 생성·수정 시각, 컬럼 설명, 정책 이름 정리 | 불필요 | 없음 | `0004` |
| **P1** | 순서 있는 링크 테이블, 원곡 FK, 실제 날짜 타입, 게시 여부, 이미지 경로 | 불필요 (DB 안에서 변환) | 매퍼·행 타입·시드 | `0005` |
| **P1-네이밍** | 이름 정리 (테이블 1개, 컬럼 25개) | 불필요 | 매퍼·행 타입·시드 | `0006` |
| P2 | 크레딧 구조화, 가격·예매·코드 악보 테이블화, 재생시간 정수화 | 상황에 따라 | 매퍼 + 일부 화면 | 설계만 (1장) |
| 하지 않음 | 타입 룩업 테이블, 가사 분리, 회사 테이블 등 | - | - | 5장 |

**권장 순서:** P0는 지금 해도 안전합니다. P1은 **관리자 페이지를 만들기 전에** 한 번에 하는 것이 가장 쌉니다. 아직 DB와 코드 데이터가 일치하고, 관리자 수정이 생기기 전이기 때문입니다.

**왜 지금이 싼가.** 화면은 `src/apis/content/mappers.ts`가 만든 도메인 객체만 봅니다. 그래서 DB 구조와 이름을 바꿔도 영향 범위는 매퍼·행 타입·시드 스크립트에 한정되고, 화면 코드는 바뀌지 않습니다. 변환이 맞는지는 이미 있는 검증(`verify-mappers`, 빌드 산출물 618개 비교)으로 다시 확인할 수 있습니다.

---

## 1. 테이블 구조·속성 개선 사항

각 항목은 **문제 → 근거 → 제안** 순서입니다. 근거의 숫자는 실제 데이터에서 센 값입니다.

### S1. JSON 컬럼에 의존하는 표시 순서 `[P1]`

- **문제:** `albums.streaming`, `albums.store`, `concerts.price`, `tracks.singing`은 JSON 객체의 **키 순서가 곧 화면 표시 순서**입니다. `jsonb`가 순서를 보존하지 않아 이미 한 번 회귀를 일으켰고(스트리밍 링크 순서가 뒤바뀜), 지금은 `json` 타입에 의존해 막고 있습니다. "이 컬럼은 json이어야 한다"는 사실이 스키마 어디에도 강제되지 않습니다.
- **근거:** 스트리밍 플랫폼은 6종이고 키 조합은 2가지뿐입니다. 순서를 사람이 직접 JSON 텍스트에서 맞춰야 합니다.
- **제안:** 순서를 `sort_order` 컬럼으로 명시하는 행 테이블로 옮깁니다. `album_links(album_id, kind, platform, url, sort_order)`. 관리자 페이지에서 순서 변경이 일반 행 편집이 되고, URL 형식 CHECK도 걸 수 있습니다.

### S2. `albums.store`의 모양이 두 가지 `[P1]`

- **문제:** 같은 컬럼이 문자열(단일 구매 링크)이기도 하고 객체(`{LP, CD}`)이기도 합니다. 제약으로 막을 방법이 없고 소비 코드마다 분기가 필요합니다.
- **근거:** `null` 11개 / 문자열 8개 / 객체 1개.
- **제안:** S1의 `album_links`로 흡수합니다. 단일 링크는 `platform = null`인 한 행입니다.

### S3. 날짜가 문자열 두 컬럼에 쪼개져 있음 `[P1]`

- **문제:** 콘서트·이벤트의 날짜가 `year text` + `date text`(`'09.05 ~ 09.06'`)로 나뉘어 있어 SQL로 정렬·범위 검색·달력 조회를 못 하고, 달력에 없는 날짜(`'02.30'`)도 DB가 막지 못합니다. 앞 점검에서 날짜 유효성을 별도 스크립트로 검사해야 했습니다.
- **근거:** 형식은 `99.99`(38건)와 `99.99 ~ 99.99`(3건) 두 가지뿐이고, **`date` 타입으로 바꿨다가 원래 문자열로 되돌리면 콘서트 41건·이벤트 11건 모두 동일**합니다(무손실).
- **제안:** `start_date date` + `end_date date`, 이벤트는 `event_date date`. `make_date`가 잘못된 날짜를 거부하므로 검증도 겸합니다. `year`는 `start_date`에서 파생되므로 삭제합니다. `performance_dates`도 `date[]`로 바꿉니다.

### S4. 파생값이 독립 컬럼으로 중복 저장됨 `[P0]`

- **문제:** `tracks.id`(`TRK_LP01_001`)는 `album_id` + `position`에서 결정되는 값인데 셋이 따로 저장돼 서로 어긋날 수 있습니다. `albums.id`(`LP01`)도 `type`, `volume`과 중복입니다.
- **근거:** 현재 133곡의 id가 `TRK_{album_id}_{position 3자리}`와 **전부 일치**하고, 앨범 id도 전부 `type`으로 시작합니다. 즉 CHECK를 걸어도 기존 데이터가 깨지지 않습니다.
- **제안:** CHECK 제약으로 강제합니다. id는 불변으로 취급합니다(`on update cascade`를 일부러 두지 않음).

### S5. `albums.volume`이 `LP`에만 채워져 있음 `[결정 필요]`

- **문제:** 13개 앨범(EP·SP·LV·VN)은 `volume`이 `null`인데 id 숫자(`EP01`의 `01`)가 사실상 회차입니다. LP는 `volume` = id 숫자로 일치합니다. 즉 `volume`은 LP에서만 의미 있는 중복 컬럼입니다.
- **제안(택1):** (a) 전부 채우고 id와 일치를 CHECK로 강제, (b) 삭제하고 id에서 파생. 화면이 `volume`을 "N집" 표기에만 쓰는지 확인 후 결정합니다.

### S6. 원곡 관계가 FK 없는 배열 `[P1]`

- **문제:** `tracks.original_track_ids text[]`는 존재하지 않는 id가 들어가도, 원곡을 지워도 DB가 모릅니다(앱 검증에만 의존).
- **근거:** 42개 관계(대부분 1개, 1곡만 2개).
- **제안:** 접합 테이블 `track_origins(track_id, original_track_id, sort_order)`에 FK를 걸고, 원곡이 참조 중이면 삭제를 막습니다(`on delete restrict`). 검증에서 차단 동작을 확인했습니다.

### S7. 크레딧이 소개글 문장에 묻혀 있음 `[P2 / 결정 필요]`

- **문제:** 작사·작곡·편곡 정보가 앨범 `intro`의 문장(`Composed by …`)과 곡의 구조화 컬럼에 **이중으로, 불완전하게** 있습니다.
- **근거:** 소개글에 크레딧 문장이 있는 앨범 17/20, 구조화된 크레딧이 있는 곡 57/133, 곡 단위 크레딧이 전혀 없는 앨범 14개. 작사·작곡 이름은 `천진우` 한 명뿐이고, 편곡 이름은 16명입니다.
- **제안:** 앨범 단위 `album_credits(album_id, role, name, sort_order)`로 분리하고 소개글에서 크레딧 줄을 뺍니다. 다만 화면에 보이는 소개글이 바뀌므로 제품 결정이 필요합니다.

### S8. 모양이 정해진 정보를 JSON에 넣음 `[P2]`

| 컬럼 | 실제 데이터 | 제안 |
| :-- | :-- | :-- |
| `concerts.price` | 키 8종(`regular` 35건, `student` 17건, `onSpot` 5건, 나머지 5종은 1건씩), 값이 숫자이기도 하고 단계 배열이기도 함(4건) | `concert_prices(concert_id, kind, label, amount, sort_order)` |
| `concerts.ticketing` | 38건이 날짜+시각, 링크는 5건뿐, `label` 4건. 날짜는 항상 `YYYY.MM.DD`, 시각은 항상 `HH:MM` | `concert_ticket_sales(concert_id, round_no, opens_at timestamptz, url, label, is_sold_out)` |
| `tracks.singing` | 4곡만 사용 (`tj`, `ky` 두 값) | 컬럼 2개 `karaoke_tj`, `karaoke_ky` |
| `track_chords.chords` | 곡당 항목 1개×25곡, 2개×15곡, 3개×5곡 | 행 테이블 `track_chords(track_id, sort_order, provider, mode, tuning, capo, note, body)` |

### S9. 코드 악보의 `tuning`이 잡동사니 문자열 `[P2]`

- **문제:** 튜닝, 카포, 자유 메모가 한 문자열에 `|`로 섞여 있습니다. 예: `다운튜닝 | 2카포`, `정튜닝 | 우주 바깥에서도: 2번 프렛 카포`.
- **근거:** 56개 값 모두 기본 튜닝(`정튜닝/표준튜닝/다운튜닝`)이 인식되고 카포는 20개에서 인식됩니다. **8개는 분해 후 자유 메모가 남아** 자동 변환만으로는 손실이 생깁니다.
- **제안:** `tuning`(기본 튜닝) + `capo int` + `note text`로 분해하되, 8개 메모는 사람이 확인합니다.

### S10. 이미지 경로가 규칙에서 계산되고, 파일이 저장소에 있음 `[P1]`

- **문제:** 이미지는 `type_발매연도_파일명.webp` 규칙에서 **계산**되고 파일은 `public/` 폴더에 있습니다. 관리자 페이지에서 새 앨범·공연을 추가해도 이미지를 올릴 방법이 없고, 발매연도를 고치면 파일을 못 찾습니다. 이미 콘서트 포스터 2개(`JOIN_20261114`, `LISTENING_20260423`)가 없습니다.
- **제안:** `albums.cover_image_path`, `concerts.poster_image_path`(Supabase Storage 경로)를 추가하고, 비어 있으면 기존 규칙으로 되돌아가게 합니다(점진 이행). 앱에서는 `GetAlbumPaths`, `GetConcertPaths`가 이 값을 우선하도록 바꿉니다.

### S11. 게시 여부가 없음 `[P1]`

- **문제:** 모든 행이 읽기 공개이고 빌드마다 전부 반영됩니다. 관리자가 작성 중인 앨범이나 발매 전 공연이 **다음 빌드에 그대로 공개**됩니다.
- **제안:** `is_published boolean`을 추가하고 공개 읽기 정책을 게시된 행으로 제한합니다. 관리자는 쓰기 정책(`for all`)으로 초안도 봅니다. 곡·링크·원곡은 소속 앨범의 게시 여부를 따릅니다. 검증에서 비공개 앨범과 그 수록곡·링크가 anon에게 안 보이는 것을 확인했습니다.

### S12. 감사 정보가 없음 `[P0]`

- **문제:** `created_at`, `updated_at`이 없어 관리자가 언제 무엇을 고쳤는지 알 수 없습니다.
- **제안:** 5개 테이블에 `created_at`, `updated_at`(트리거로 자동 갱신)을 추가합니다. 앱은 이 컬럼을 읽지 않아 영향이 없습니다.

### S13. 자연 키 중복 방지가 없음 `[P1]`

- **문제:** 같은 날 같은 제목의 공연·이벤트가 중복 등록돼도 DB가 막지 못합니다.
- **제안:** `(start_date, title)`, `(appeared_on, title)` 유니크 인덱스. 현재 데이터에는 중복이 없습니다.

### S14. 사람 이름이 자유 텍스트 `[P2, 낮음]`

- **근거:** `line_up`에 고유 이름 23개가 있고 사람·밴드·별칭이 섞여 있습니다(`금옥중 하나비 밴드`, `오쉽 밴드`, `대방중 뉴진스`, `걔`).
- **제안:** `people`(사람/밴드 구분) + `concert_lineup` 접합 테이블. 철자 일관성과 관리자 선택 UI에 유리하지만, 지금은 이름 수정이 드물어 필요할 때 도입해도 됩니다.

### S15. `concert_type` 값이 서로 다른 축을 섞음 `[결정 필요]`

- **문제:** `SOLO / JOIN / FESTIVAL / LISTENING`은 공연의 **형식**이고, `TOUR`와 `BAND_TOUR`는 **투어 여부**, `BAND`와 `BAND_TOUR`는 **누가 하는가**입니다. 형식·투어·출연 주체가 한 컬럼에 섞여 있어 "솔로 투어"와 "밴드 단독 공연"을 표현할 수 없습니다.
- **근거:** 사용 중인 값은 `SOLO` 26, `JOIN` 5, `TOUR` 3, `LISTENING` 3, `FESTIVAL` 2, `BAND_TOUR` 2건이고 `BAND`는 0건입니다.
- **제안:** `concert_type`(형식) + `is_tour boolean` + `act`(출연 주체) 분리. 다만 기존 `TOUR` 3건이 솔로 투어인지 합동 투어인지 **원본에 정보가 없어서** 매핑은 사람이 정해야 합니다.

### S16. 재생시간이 문자열이고 총합이 중복 저장됨 `[P2]`

- **문제:** `tracks.duration`, `albums.total_duration`이 `'m:ss'` 문자열이라 합계를 SQL로 못 구합니다. 총 재생시간은 곡 합계에서 파생되는 값인데 따로 저장돼 **실제로 어긋났습니다**(`LV01`: 총 26:44 ↔ 곡 합 28:44).
- **제안:** `duration_seconds int`로 바꾸고 화면용 `m:ss`는 매퍼에서 만듭니다. 총합은 계산값을 기본으로 하되, 숨김 트랙처럼 길이가 비어 있어 계산할 수 없는 4개 앨범은 직접 입력 값을 허용합니다. P0에서 `m:ss` 형식 CHECK를 먼저 걸어 둡니다.

---

## 2. 네이밍 문제

프로젝트 규칙(`02-naming-conventions`: 약어 금지, boolean은 `is/has/should`, 의도를 드러내는 이름)에 비추어 정리했습니다. 이름만 바꾸는 항목은 [0006](../supabase/migrations/20261027090200_naming.sql)에 담겨 검증됐습니다.

### 2.1 값과 이름이 어긋남 (우선순위 높음)

| 현재 | 문제 | 제안 |
| :-- | :-- | :-- |
| `tracks.mv_link` | 이름은 링크인데 **값이 전부 YouTube 영상 ID**(8건 모두 11자) | `music_video_youtube_id` |
| `albums.file_name`, `concerts.file_name` | 이름과 코드 주석(`앨범 공식 영어 이름 변형`)은 slug처럼 보이지만 실제로는 **커버·포스터 이미지 파일명**. 이 때문에 제가 유일하다고 오해해 제약을 잘못 걸었다가 고쳤습니다 | `image_key` |
| `events` (테이블) | 일정 화면의 `EVENT(그 외)`와 혼동되고, 콘서트도 이벤트의 일종. 실제 내용은 **인터뷰·라디오·잡지 출연** | `media_appearances` |
| `events.host` | 라디오 프로그램, 매체, 유튜브 채널(`뜨거운삼각형`, `강원도민일보`, `sub_riot`)이 섞인 값 | `source_name` |
| `events.link` | platform에 따라 YouTube ID이거나 URL | **미결**: 3장 참고 |
| `tracks.singing` | 값은 노래방 번호(TJ, 금영) | `karaoke_numbers` |

### 2.2 모호하거나 SQL 예약어와 겹침

| 현재 | 제안 | 이유 |
| :-- | :-- | :-- |
| `albums/concerts/events.type` | `album_type`, `concert_type`, `appearance_type` | 세 테이블에 같은 이름의 서로 다른 개념. 조인 시 모호 |
| `concerts.date`, `year` | `start_date`, `end_date` (S3) | `date`는 SQL 타입 이름, `year`는 분리된 문자열 |
| `events.date` | `appeared_on` | 위와 같음 |
| `tracks.position` | `track_no` | `position`은 SQL 함수 이름 |
| `tracks.section` | `side` | 실제 값이 `Side A`, `Side B` |
| `concerts.content`, `events.content` | `title` | 값은 공연명·기사 제목 |
| `events.description_content` | `description` | 중복된 수식어 |

### 2.3 규칙 위반

| 현재 | 제안 | 규칙 |
| :-- | :-- | :-- |
| `en_title` | `title_en` | 약어 지양, `_en` 접미사 패턴으로 통일 |
| `age_limit`, `cd_only` (boolean) | `is_age_restricted`, `is_cd_only` | boolean은 `is/has/should` |
| `genre`, `style`, `lyricist`, `composer`, `arranger` (배열) | `genres`, `styles`, `lyricists`, `composers`, `arrangers` | 배열은 복수형 |
| `line_up`, `times` | `lineup`, `showtimes` | 한 단어 / 의미 명확화 |

### 2.4 내부 JSON·정책·기타

- **JSON 안의 키는 camelCase이고 접두사가 중복**됩니다: `ticketing.ticketingDate`, `ticketingTime`, `ticketingLink`, `soldOut`. TS 이름이 DB로 새어 나온 것입니다. S8에서 테이블로 옮기면 `opens_at`, `url`, `label`, `is_sold_out`이 됩니다.
- **가격 키**: `onSpot`(camelCase), `army`, `alien`, `monk`, `teacher`, `early`는 이름만으로 의미가 불분명합니다(`army`=군인, `alien`=외국인으로 추정되나 `monk`는 확인 필요). 테이블화할 때 코드와 한글 라벨을 함께 정해야 합니다.
- **정책 이름**에 공백·콜론이 있었습니다(`albums: public read`). `albums_public_read`로 정리합니다(0004).
- **PK 방식이 제각각**입니다. 앨범·곡은 사람이 읽는 자연 키 텍스트(`LP01`, `TRK_LP01_001`), 콘서트·이벤트는 `bigint identity`. 이름 문제라기보다 일관성 문제인데, 지금 URL이 id가 아니라 제목 slug를 쓰므로 당장 바꿀 필요는 없습니다.
- **스트리밍 플랫폼 라벨의 대소문자**가 혼재합니다(`YouTube`, `BUGS`, `genie`, `Melon`). 다만 이 값이 화면 아이콘을 찾는 키로 쓰이므로 **바꾸지 않습니다**. 대신 `platform` 컬럼 설명으로 남깁니다.

### 2.5 이름은 문제지만 건드리지 않는 것

- **앨범 타입 코드 `LP / EP / SP / LV / VN`**: `LP`가 "정규 앨범"과 "바이닐 표시 라벨"(`VN`의 라벨이 `LP`)로 겹치고 `SP`는 흔한 표기(`SG`, `single`)가 아닙니다. 그러나 이 코드가 앨범 id(`LP01`), 곡 id(`TRK_LP01_001`), 이미지 파일명, URL에 모두 박혀 있어 바꾸면 파급이 큽니다. **코드는 유지하고 의미를 컬럼 설명에 남기는 것**을 권합니다.
- **`concerts` 테이블명**: 음악감상회·페스티벌도 있어 `performances`가 더 정확하지만, 앱 전반이 `concert`를 쓰므로 이득이 작습니다.

---

## 3. 열린 결정 사항 (사람이 정해야 함)

| # | 결정 | 알 수 없는 이유 | 영향 |
| :-- | :-- | :-- | :-- |
| 1 | `concert_type` 분리 시 `TOUR` 3건·`BAND_TOUR` 2건을 어떤 값으로 옮길지 (S15) | 솔로 투어인지 합동 투어인지 원본에 없음 | 일정 화면의 공연 유형 라벨 |
| 2 | `events.link`를 정규화할지 (현재: YouTube ID 7건, URL 3건, 기타 1건) | `platform = Instagram`인데 11자 문자열이 있어 Instagram 게시물 코드인지 YouTube ID인지 값만으로 판정 불가 | 이벤트 링크·임베드 |
| 3 | 크레딧을 소개글에서 분리할지 (S7) | 화면에 보이는 소개글이 바뀜 | 앨범 상세 |
| 4 | `albums.volume`을 채울지 삭제할지 (S5) | "N집" 표기에서의 쓰임 확인 필요 | 앨범 목록·상세 표기 |
| 5 | 이미지를 Storage로 옮기는 시점 (S10) | 관리자 페이지에서 이미지 업로드를 만들 때가 자연스러움 | 이미지 경로 |
| 6 | 비공개(초안) 기능이 필요한지 (S11) | 관리자 작업 방식에 달림 | RLS 정책 |

---

## 4. 개선안 상세와 검증 결과

### 4.1 단계별 초안

| 파일 | 내용 | 비고 |
| :-- | :-- | :-- |
| [`0004_integrity_and_audit.sql`](../supabase/migrations/20261027090000_integrity_and_audit.sql) | S4 CHECK 제약, S12 생성·수정 시각 + 트리거, S16 재생시간 형식 CHECK, 정책 이름 정리, 컬럼 설명 | 데이터 변경 없음. 재시드 불필요 |
| [`0005_structure.sql`](../supabase/migrations/20261027090100_structure.sql) | S1·S2 `album_links`, S6 `track_origins`, S3 날짜 타입, S13 유니크, S11 `is_published` + RLS, S10 이미지 경로 컬럼 | **컬럼을 삭제**한다 (`store`, `streaming`, `original_track_ids`, `year`, `date`). 백필은 SQL 안에서 수행 |
| [`0006_naming.sql`](../supabase/migrations/20261027090200_naming.sql) | 2장의 이름 변경 중 값이 확정된 것 | 값 불변. 이름만 변경 |

### 4.2 검증 결과 (로컬 Postgres, 실제 데이터 기준 32/32 통과)

현재 마이그레이션 3개를 적용하고 실제 데이터를 넣은 뒤 초안 3개를 순서대로 적용했습니다.

- **0004:** 기존 데이터 전체가 새 제약을 통과합니다. 곡 id와 순서가 어긋나는 수정, 앨범 id와 타입이 어긋나는 수정, 잘못된 재생시간 형식은 차단됩니다. `updated_at`이 자동으로 갱신됩니다.
- **0005:** `album_links` 124행의 순서·값이 원본 JSON 키 순서와 20개 앨범 모두 동일합니다. `track_origins` 42행의 순서가 동일하고, 원곡이 참조 중인 곡 삭제는 FK로 차단됩니다. 콘서트 41건(`performance_dates` 포함)·이벤트 11건이 날짜 타입으로 바뀌었다가 **원본 문자열로 정확히 되돌아옵니다**. 중복 공연과 종료일<시작일은 차단됩니다. 비공개 앨범은 anon과 일반 로그인 사용자에게 보이지 않고(앨범 19, 수록곡 127), 그 링크도 숨겨지며, 관리자는 전부(20) 봅니다. anon 쓰기는 차단됩니다.
- **0006:** 테이블·컬럼 이름이 모두 반영되고, 값과 제약(곡 id 일치)이 유지되며, anon 읽기가 정상입니다.

**이 검증이 증명하지 못하는 것:** 로컬 Postgres는 Supabase 자체가 아닙니다(`auth.jwt()`는 같은 방식의 대역). 앱 코드(매퍼, 시드)는 아직 새 이름으로 바꾸지 않았으므로 **화면 결과가 동일한지는 코드 변경 후 빌드 산출물 비교로 다시 확인해야 합니다.** 검증 스크립트는 저장소에 넣지 않았습니다.

### 4.3 앱 코드 변경 범위

화면 컴포넌트와 `src/const/*` 어댑터는 바뀌지 않습니다.

| 파일 | 변경 |
| :-- | :-- |
| `src/types/content-row.ts` | 행 타입을 새 컬럼명·새 테이블(`AlbumLinkRow`, `TrackOriginRow`)로 갱신하고, 옮겨진 `store`·`streaming`·`original_track_ids` 필드는 제거 |
| `scripts/seed-rows.ts` | 새 이름으로 행 생성, 링크·원곡을 접합 테이블 행으로 생성 (`ContentRows`에 `albumLinks`, `trackOrigins` 추가) |
| `scripts/seed.ts` | 삽입·삭제 순서에 새 테이블 반영 |
| `src/apis/content/fetch-content-rows.ts` | 새 테이블 조회 추가 |
| `src/apis/content/mappers.ts` | 링크 행 → `Record<플랫폼, URL>`(정렬 순서대로), 원곡 행 → `originalTrackIds`, 날짜 → `'MM.DD'` 문자열 포맷, 이미지 경로 우선 적용 |
| `src/utils/album.ts`, `src/utils/concert.ts` | `cover_image_path`, `poster_image_path`가 있으면 우선 사용 (점진 이행) |
| `scripts/verify-mappers.ts` | 새 행 구조로 갱신 (그대로 7/7이어야 함) |

### 4.4 적용 순서 (런북)

1. **0004를 먼저 적용합니다.** 앱·데이터 변화가 없고 안전합니다. SQL Editor 또는 `supabase db push`.
2. 0005·0006은 **코드 변경과 같은 릴리스**로 묶습니다. 빌드가 `pull-content`로 라이브 DB를 읽으므로, DB만 바뀌고 매퍼가 그대로면 배포 빌드가 실패합니다. 이때 사이트는 이전 배포를 유지하니 **안전하게 실패**하지만, 순서를 맞춰야 합니다.
3. 적용 전에 롤백 수단을 확인합니다. 0005는 컬럼을 삭제하지만, 원본 데이터는 `src/const/fixtures/`와 커밋된 스냅샷에 있어 `seed.ts --force`로 복원할 수 있습니다(관리자 수정이 생기기 전이라면). 관리자 수정이 생긴 뒤에는 이 방법이 안 되므로 **P1은 관리자 페이지 전에** 해야 합니다.
4. 적용 후: `verify-mappers`, `pull:content`, 빌드, 빌드 산출물 비교(618개)로 화면 동일성을 다시 확인합니다.
5. 마이그레이션 이력: 초안을 `supabase/migrations/`로 옮길 때 타임스탬프 파일명을 붙입니다.

---

## 5. 하지 않는 것 (과설계 방지)

- **타입 값 룩업 테이블** (`album_types` 등): 값이 5~7개로 고정이고, CHECK 제약으로 충분합니다. 라벨은 앱 상수에 있습니다.
- **가사 분리 테이블**: 최대 1,078자, 곡 133개. 목록 조회가 가볍습니다.
- **회사 테이블** (`distributor`, `agency`): 값이 `아토엔터테인먼트` 19건, `천진우` 20건뿐입니다.
- **소프트 삭제, 변경 이력 테이블**: `updated_at`과 대시보드로 충분합니다. 필요해지면 그때 추가합니다.
- **스트리밍 플랫폼 룩업 테이블**: 라벨이 화면 아이콘 키로 쓰이므로 `album_links.platform`을 텍스트로 두는 편이 더 단순합니다.
