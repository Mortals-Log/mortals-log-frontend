-- 이미지 저장소: 공개 버킷 'images'. 앨범 커버(albums/...)와 콘서트 포스터(concerts/...)를 둔다.
-- 읽기는 공개 URL(/storage/v1/object/public/images/...)로 누구나 가능하고(공개 버킷),
-- 올리기·수정·삭제는 관리자(app_metadata.role = 'admin')만 한다. service_role 은 RLS 를 우회한다.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('images', 'images', true, 5242880, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do nothing;

create policy images_admin_select on storage.objects for select to authenticated
	using (bucket_id = 'images' and (select public.is_admin()));

create policy images_admin_insert on storage.objects for insert to authenticated
	with check (bucket_id = 'images' and (select public.is_admin()));

create policy images_admin_update on storage.objects for update to authenticated
	using (bucket_id = 'images' and (select public.is_admin()))
	with check (bucket_id = 'images' and (select public.is_admin()));

create policy images_admin_delete on storage.objects for delete to authenticated
	using (bucket_id = 'images' and (select public.is_admin()));

comment on column public.albums.cover_image_path is '버킷 images 안의 경로 (예: albums/LP_2022_meditation-zombie.webp). 있으면 화면이 이 이미지를 쓰고, 비어 있으면 public/ 의 파일명 규칙(album_type_연도_image_key)을 쓴다.';
comment on column public.concerts.poster_image_path is '버킷 images 안의 경로 (예: concerts/SOLO_20231216.webp). 있으면 화면이 이 이미지를 쓰고, 비어 있으면 public/ 의 파일명 규칙을 쓴다.';
