'use client';

// @/views/Admin/TrackMediaEditor
// "노래방" 탭(kind='karaoke')과 "MV" 탭(kind='video'): 그 항목이 이미 등록된 곡을 목록으로 보여주고, 확인·수정·삭제를 한다.
// 새로 등록하려면 "곡 추가"로 이미 있는 곡을 목록에 올린 뒤 입력한다. 수정은 바뀐 곡만 한 번에 저장한다.
// 곡 하나씩 열어서 고치는 곡 탭의 폼과 같은 규칙을 쓴다 (뮤직비디오는 YouTube 주소를 붙여 넣으면 영상 ID 만 저장).

import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTrackMedia, type TrackMediaKind, type TrackMediaRow } from '@/hooks/admin/useTrackMedia';
import { cn } from '@/utils/cn';
import { INPUT_CLASS, PRIMARY_BUTTON_CLASS, SECONDARY_BUTTON_CLASS, SMALL_BUTTON_CLASS } from './admin-classes';
import { SelectBox } from './ComboInput';
import { useAdminLookups } from './AdminLookups';
import { extractYoutubeId } from './form-codec';
import { getAlbumLabel, getKaraokeLabel } from './labels';

const SMALL_INPUT_CLASS = cn(INPUT_CLASS, 'min-h-10 py-1.5');

const getTrackOptionLabel = (row: TrackMediaRow): string => (row.version ? `${row.title} (${row.version})` : row.title);

/** 탭마다 달라지는 문구 */
const KIND_TEXT: Record<TrackMediaKind, { title: string; description: string; target: string; missing: string }> = {
	karaoke: {
		title: '노래방 번호',
		description:
			'노래방 번호(TJ·KY)가 등록된 곡의 목록입니다. 값을 바꾸면 테두리가 강조되고, 아래의 저장 버튼으로 한 번에 저장합니다. 새로 등록하려면 "곡 추가"로 곡을 고르십시오.',
		target: '노래방 번호',
		missing: '노래방 번호가 아직 없는 곡',
	},
	video: {
		title: '뮤직비디오',
		description:
			'뮤직비디오가 등록된 곡의 목록입니다. 값을 바꾸면 테두리가 강조되고, 아래의 저장 버튼으로 한 번에 저장합니다. 새로 등록하려면 "곡 추가"로 곡을 고르십시오. YouTube 주소를 그대로 붙여 넣으면 영상 ID만 저장됩니다.',
		target: '뮤직비디오',
		missing: '뮤직비디오가 아직 없는 곡',
	},
};

const TrackMediaEditor = ({ kind }: { kind: TrackMediaKind }) => {
	const text = KIND_TEXT[kind];
	const { lookups } = useAdminLookups();
	const {
		rows,
		registeredRows,
		candidates,
		inputs,
		categories,
		changedIds,
		errorMessage,
		isSaving,
		setKaraoke,
		setVideo,
		addTrack,
		remove,
		discardChanges,
		save,
	} = useTrackMedia(kind);
	const [albumId, setAlbumId] = useState('');
	const [isAdding, setIsAdding] = useState(false);
	const [pendingTrackId, setPendingTrackId] = useState('');

	// 최신 발매 앨범이 위에 오도록 정렬한다.
	const sortedAlbums = [...lookups.albums].sort((a, b) => String(b.release_date).localeCompare(String(a.release_date)));
	const filterAlbums = sortedAlbums.filter(album => registeredRows.some(row => row.albumId === album.id));
	const candidateAlbums = sortedAlbums.filter(album => candidates.some(row => row.albumId === album.id));

	const groups = filterAlbums
		.filter(album => albumId === '' || album.id === albumId)
		.map(album => ({ album, tracks: registeredRows.filter(row => row.albumId === album.id) }));
	const visibleCount = groups.reduce((sum, group) => sum + group.tracks.length, 0);

	const handleAdd = () => {
		const target = candidates.find(row => row.id === pendingTrackId);
		if (!target) {
			toast.error('추가할 곡을 고르십시오.');
			return;
		}
		addTrack(target.id);
		setAlbumId('');
		setPendingTrackId('');
		toast.success(`"${target.title}"을(를) 목록에 추가했습니다. ${text.target}을(를) 입력한 뒤 저장하십시오.`);
	};

	const handleRemove = (row: TrackMediaRow) => {
		const message = `"${row.title}"의 ${text.target}을(를) 삭제합니다. 곡 자체와 다른 항목은 그대로 남고, 삭제하면 되돌릴 수 없습니다. 삭제하시겠습니까?`;
		if (window.confirm(message)) void remove(row);
	};

	return (
		<div className="flex max-w-3xl flex-col gap-6">
			<div className="flex flex-col gap-1">
				<h2 className="font-sans text-xl font-semibold text-gray-700">{text.title}</h2>
				<p className="text-sm text-gray-500">{text.description}</p>
			</div>

			<div className="flex flex-wrap items-center gap-3">
				<button
					type="button"
					disabled={isSaving || rows === null}
					onClick={() => setIsAdding(previous => !previous)}
					className={cn(PRIMARY_BUTTON_CLASS, 'min-h-14')}>
					{isAdding ? '추가 닫기' : '+ 곡 추가'}
				</button>
				<div className="min-w-64 max-w-full flex-1 sm:flex-none">
					<SelectBox value={albumId} aria-label="앨범 선택" onChange={event => setAlbumId(event.target.value)}>
						<option value="">전체 앨범</option>
						{filterAlbums.map(album => (
							<option key={String(album.id)} value={String(album.id)}>
								{getAlbumLabel(album)}
							</option>
						))}
					</SelectBox>
				</div>
			</div>

			{isAdding && (
				<div className="flex flex-col gap-3 rounded-md border border-gray-200 bg-gray-50 p-4">
					<label htmlFor="media-add-track" className="text-sm font-medium text-gray-600">
						목록에 추가할 곡 ({text.missing})
					</label>
					<SelectBox
						id="media-add-track"
						value={pendingTrackId}
						disabled={candidates.length === 0}
						onChange={event => setPendingTrackId(event.target.value)}>
						<option value="">{candidates.length === 0 ? '추가할 수 있는 곡이 없습니다' : '곡을 선택하십시오'}</option>
						{candidateAlbums.map(album => (
							<optgroup key={String(album.id)} label={getAlbumLabel(album)}>
								{candidates
									.filter(row => row.albumId === album.id)
									.map(row => (
										<option key={row.id} value={row.id}>
											{getTrackOptionLabel(row)}
										</option>
									))}
							</optgroup>
						))}
					</SelectBox>
					<div className="flex gap-2">
						<button type="button" disabled={pendingTrackId === ''} onClick={handleAdd} className={PRIMARY_BUTTON_CLASS}>
							목록에 추가
						</button>
						<button type="button" onClick={() => setIsAdding(false)} className={SECONDARY_BUTTON_CLASS}>
							닫기
						</button>
					</div>
				</div>
			)}

			{errorMessage && <p className="text-base text-pink-600">{errorMessage}</p>}
			{rows === null && !errorMessage && <p className="text-base text-gray-500">불러오는 중...</p>}
			{rows !== null && <p className="text-sm text-gray-500">{visibleCount}곡 등록됨</p>}

			{groups.map(({ album, tracks }) => (
				<section key={String(album.id)} className="flex flex-col gap-3">
					<h3 className="text-base font-semibold text-gray-700">{getAlbumLabel(album)}</h3>
					<ul className="flex flex-col gap-3">
						{tracks.map(row => {
							const input = inputs[row.id];
							if (!input) return null;
							const videoId = input.video.trim() === '' ? null : extractYoutubeId(input.video);
							const isInvalidVideo = input.video.trim() !== '' && !videoId;
							return (
								<li
									key={row.id}
									className={cn(
										'render-lazy flex flex-col gap-3 rounded-md border bg-white p-4 [--render-lazy-size:12rem]',
										changedIds.includes(row.id) ? 'border-primary' : 'border-gray-200',
									)}>
									<div className="flex items-start justify-between gap-3">
										<p className="min-w-0 break-words text-base font-semibold text-gray-700">
											{row.title}
											{row.version && <span className="ml-2 text-sm font-normal text-gray-500">{row.version}</span>}
										</p>
										<button
											type="button"
											disabled={isSaving}
											onClick={() => handleRemove(row)}
											className={cn(SMALL_BUTTON_CLASS, 'shrink-0 text-pink-600')}>
											삭제
										</button>
									</div>

									{kind === 'karaoke' ? (
										<div className="grid grid-cols-[repeat(auto-fit,minmax(8rem,1fr))] gap-2">
											{categories.map(category => (
												<label key={category} className="flex flex-col gap-1 text-sm text-gray-600">
													{getKaraokeLabel(category)}
													<input
														value={input.karaoke[category] ?? ''}
														disabled={isSaving}
														onChange={event => setKaraoke(row.id, category, event.target.value)}
														className={SMALL_INPUT_CLASS}
													/>
												</label>
											))}
										</div>
									) : (
										<>
											<label className="flex flex-col gap-1 text-sm text-gray-600">
												뮤직비디오
												<input
													value={input.video}
													placeholder="YouTube 주소 또는 영상 ID"
													disabled={isSaving}
													onChange={event => setVideo(row.id, event.target.value)}
													aria-invalid={isInvalidVideo}
													className={cn(SMALL_INPUT_CLASS, isInvalidVideo && 'border-pink-600')}
												/>
											</label>
											{isInvalidVideo && (
												<p className="text-sm text-pink-600">YouTube 주소나 영상 ID(11자)로 알아볼 수 없습니다.</p>
											)}
											{videoId && (
												<a
													href={`https://www.youtube.com/watch?v=${videoId}`}
													target="_blank"
													rel="noopener noreferrer"
													className="flex min-h-11 items-center self-start text-sm text-gray-500 underline">
													영상 확인 ({videoId})
												</a>
											)}
										</>
									)}
								</li>
							);
						})}
					</ul>
				</section>
			))}

			{rows !== null && visibleCount === 0 && (
				<p className="text-base text-gray-500">
					{text.target}이(가) 등록된 곡이 없습니다. "+ 곡 추가"로 등록할 곡을 고르십시오.
				</p>
			)}

			{/* 스크롤해도 화면 아래에 붙어 따라오는 저장 줄 */}
			<div className="sticky bottom-0 z-20 flex flex-wrap items-center gap-3 border-t border-gray-200 bg-white py-3">
				<button
					type="button"
					disabled={isSaving || changedIds.length === 0}
					onClick={() => void save()}
					className={PRIMARY_BUTTON_CLASS}>
					{isSaving ? '저장 중...' : changedIds.length > 0 ? `${changedIds.length}곡 저장` : '저장'}
				</button>
				<button
					type="button"
					disabled={isSaving || changedIds.length === 0}
					onClick={discardChanges}
					className={SECONDARY_BUTTON_CLASS}>
					변경 취소
				</button>
				<p className="text-sm text-gray-500">
					{changedIds.length > 0 ? '다른 탭으로 이동하면 저장하지 않은 변경이 사라집니다.' : '바꾼 곡이 없습니다.'}
				</p>
			</div>
		</div>
	);
};

export default TrackMediaEditor;
