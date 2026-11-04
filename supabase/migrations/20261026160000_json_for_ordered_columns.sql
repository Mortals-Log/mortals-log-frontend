-- jsonb 는 객체의 키 순서를 보존하지 않는다 (키를 길이 -> 사전순으로 다시 배열한다).
-- 아래 컬럼은 키 순서가 곧 화면 표시 순서(스트리밍 플랫폼 아이콘, 가격 라벨 등)라서 json 으로 둔다.
-- json 은 입력한 텍스트를 그대로 보관하므로 순서가 유지된다.
-- 기존 값은 이미 jsonb 순서로 저장돼 있으므로, 이 마이그레이션 뒤에 시드를 다시 넣어 원래 순서를 복원한다.

alter table public.albums alter column store type json using store::json;
alter table public.albums alter column streaming type json using streaming::json;
alter table public.tracks alter column singing type json using singing::json;
alter table public.concerts alter column price type json using price::json;
