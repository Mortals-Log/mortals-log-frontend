-- 곡 순서 변경을 위해 "곡 ID = TRK_앨범ID_수록번호" 규칙을 "곡 ID 는 그 앨범의 곡 ID" 로 완화한다.
--
-- 배경: 수록 번호(position)를 바꾸려면 곡 ID 도 같이 바뀌어야 하는데, 곡 ID 는 코드(track_chords)와
-- 원곡 관계(track_origins)가 참조하고 on update cascade 도 없어서 바꿀 수 없다.
-- 그래서 ID 는 한 번 정하면 바뀌지 않는 식별자로 두고, 순서는 position 만 바꾼다.
-- 앨범과 어긋난 ID 를 막는 검사는 남긴다. 기존 데이터는 모두 이 조건을 만족한다.
--
-- 이 변경 뒤에는 ID 의 끝 번호와 수록 번호가 다를 수 있다 (예: 3번 곡을 1번으로 옮기면 TRK_LP01_003 이 1번 곡).

alter table public.tracks drop constraint tracks_id_matches_album_and_position;

alter table public.tracks
	add constraint tracks_id_belongs_to_album
	check (starts_with(id, 'TRK_' || album_id || '_'));

comment on constraint tracks_id_belongs_to_album on public.tracks is
	'곡 ID 는 TRK_앨범ID_ 로 시작한다. 끝 번호는 만들 때의 수록 번호이며, 순서를 바꿔도 ID 는 바뀌지 않는다.';
