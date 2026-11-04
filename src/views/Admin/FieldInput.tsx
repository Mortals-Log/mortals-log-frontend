'use client';

// @/views/Admin/FieldInput
// 필드 종류에 맞는 입력을 고른다. 목록·가격·예매·노래방·코드 악보는 StructuredInputs 에,
// 칩/드롭다운/참조 선택은 ComboInput 에 있고, 여기에는 라인업·원곡·이미지 입력이 있다.

import { useEffect, useState, type ChangeEvent, type KeyboardEvent } from 'react';
import toast from 'react-hot-toast';
import { cn } from '@/utils/cn';
import { CHIP_CLASS, CHIP_OFF_CLASS, CHIP_ON_CLASS, INPUT_CLASS, SECONDARY_BUTTON_CLASS } from './admin-classes';
import type { FieldConfig } from './admin-tables';
import { ChipSelect, ComboInput, RefSelect, SelectBox } from './ComboInput';
import {
	extractYoutubeId,
	toSlug,
	type ChordDraft,
	type FormValue,
	type FormValues,
	type KaraokeDraft,
	type Lookups,
	type PriceDraft,
	type TicketingDraft,
} from './form-codec';
import ListEditor from './ListEditor';
import { ChordsInput, KaraokeInput, PriceInput, StringsInput, TicketingInput } from './StructuredInputs';

/** 라인업 맨 위 칸에 따로 보여주는 이름 */
const PRIMARY_LINEUP_NAMES = ['천진우', '구토유발자들'];

const asText = (value: FormValue): string => (typeof value === 'string' ? value : '');
const asStrings = (value: FormValue): string[] =>
	Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
// 목록 종류별 배열은 필드 종류(kind)가 모양을 보장한다 (form-codec 의 toFormValue).
const asRows = <Row,>(value: FormValue): Row[] => (Array.isArray(value) ? (value as Row[]) : []);

// ── 수록 번호: 같은 앨범에서 쓰는 번호는 누가 쓰는지 보여주고 고를 수 없게 한다 ──

interface TrackNoSelectProps {
	id: string;
	value: string;
	albumId: string;
	rowId: string | null;
	lookups: Lookups;
	isDisabled: boolean;
	onChange: (value: string) => void;
}

const TrackNoSelect = ({ id, value, albumId, rowId, lookups, isDisabled, onChange }: TrackNoSelectProps) => {
	if (!albumId) {
		return (
			<SelectBox id={id} value="" disabled>
				<option value="">앨범을 먼저 선택하십시오</option>
			</SelectBox>
		);
	}

	const usedTitles = new Map(
		lookups.tracks
			.filter(track => track.album_id === albumId && track.id !== rowId)
			.map(track => [Number(track.track_no), String(track.title)]),
	);
	const lastNumber = Math.max(0, ...usedTitles.keys(), Number(value) || 0) + 1;

	return (
		<SelectBox id={id} value={value} disabled={isDisabled} onChange={event => onChange(event.target.value)}>
			<option value="">선택하십시오</option>
			{Array.from({ length: lastNumber }, (_, index) => index + 1).map(number => (
				<option key={number} value={String(number)} disabled={usedTitles.has(number)}>
					{number}번{usedTitles.has(number) ? ` (사용 중 — ${usedTitles.get(number)})` : ''}
				</option>
			))}
		</SelectBox>
	);
};

// ── 원곡: 곡을 목록에서 골라 +/− ──

interface OriginTracksInputProps {
	value: string[];
	lookups: Lookups;
	isDisabled: boolean;
	onChange: (items: string[]) => void;
}

const OriginTracksInput = ({ value, lookups, isDisabled, onChange }: OriginTracksInputProps) => (
	<ListEditor
		items={value}
		label="원곡"
		createItem={() => ''}
		isDisabled={isDisabled}
		onChange={onChange}
		renderItem={(trackId, _index, onItemChange) => (
			<RefSelect refTable="tracks" value={trackId} lookups={lookups} isDisabled={isDisabled} onChange={onItemChange} />
		)}
	/>
);

// ── 라인업: 위쪽에 천진우·구토유발자들, 아래쪽에 이전에 출연해 본 사람들 ──

const LineupInput = ({ value, lookups, isDisabled, onChange }: OriginTracksInputProps) => {
	const [customName, setCustomName] = useState('');
	const previousNames = lookups.lineupNames.filter(name => !PRIMARY_LINEUP_NAMES.includes(name));
	// 고른 이름이 목록에 없어도(예전 공연의 이름) 칩으로 보이게 한다.
	const otherNames = [
		...previousNames,
		...value.filter(name => !PRIMARY_LINEUP_NAMES.includes(name) && !previousNames.includes(name)),
	].sort((a, b) => a.localeCompare(b, 'ko'));

	const handleToggle = (name: string) =>
		onChange(value.includes(name) ? value.filter(current => current !== name) : [...value, name]);

	const handleAddCustom = () => {
		const name = customName.trim();
		if (name && !value.includes(name)) onChange([...value, name]);
		setCustomName('');
	};

	const handleCustomKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key !== 'Enter') return;
		event.preventDefault();
		handleAddCustom();
	};

	const renderChips = (names: string[]) => (
		<div className="flex flex-wrap gap-2">
			{names.map(name => {
				const isSelected = value.includes(name);
				return (
					<button
						key={name}
						type="button"
						aria-pressed={isSelected}
						disabled={isDisabled}
						onClick={() => handleToggle(name)}
						className={cn(CHIP_CLASS, isSelected ? CHIP_ON_CLASS : CHIP_OFF_CLASS)}>
						{name}
					</button>
				);
			})}
		</div>
	);

	return (
		<div className="flex flex-col gap-3">
			{renderChips(PRIMARY_LINEUP_NAMES)}
			<hr className="border-gray-200" />
			<p className="text-sm text-gray-500">이전에 출연해 본 사람 (가나다순)</p>
			{renderChips(otherNames)}
			<div className="flex gap-2">
				<input
					value={customName}
					disabled={isDisabled}
					aria-label="목록에 없는 이름 직접 추가"
					onChange={event => setCustomName(event.target.value)}
					onKeyDown={handleCustomKeyDown}
					className={INPUT_CLASS}
				/>
				<button
					type="button"
					disabled={isDisabled || customName.trim() === ''}
					onClick={handleAddCustom}
					className={cn(SECONDARY_BUTTON_CLASS, 'shrink-0')}>
					이름 추가
				</button>
			</div>
		</div>
	);
};

// ── 이미지: 폴더(갤러리)에서 파일을 고른다. 저장할 때 Storage 에 올라간다. ──

interface ImageInputProps {
	previewUrl: string | null;
	/** 고른 파일이 저장될 이름 (사이트 규칙에 따라 자동으로 정해진다) */
	targetName: string | null;
	file: File | null;
	isDisabled: boolean;
	onFileChange: (file: File | null) => void;
}

export const ImageInput = ({ previewUrl, targetName, file, isDisabled, onFileChange }: ImageInputProps) => {
	const [localUrl, setLocalUrl] = useState<string | null>(null);
	const [failedUrl, setFailedUrl] = useState<string | null>(null);

	// 미리보기용 임시 주소는 바뀌거나 화면이 닫힐 때 해제한다.
	useEffect(
		() => () => {
			if (localUrl) URL.revokeObjectURL(localUrl);
		},
		[localUrl],
	);

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const picked = event.target.files?.[0] ?? null;
		event.target.value = '';
		if (!picked) return;
		if (!picked.type.startsWith('image/')) {
			toast.error('이미지 파일만 고를 수 있습니다.');
			return;
		}
		setLocalUrl(URL.createObjectURL(picked));
		onFileChange(picked);
	};

	const handleClear = () => {
		setLocalUrl(null);
		onFileChange(null);
	};

	const shownUrl = file ? localUrl : previewUrl;
	const hasImage = shownUrl !== null && shownUrl !== failedUrl;

	return (
		<div className="flex flex-col items-start gap-3">
			{hasImage ? (
				<img
					src={shownUrl}
					alt="이미지 미리보기"
					onError={() => setFailedUrl(shownUrl)}
					className="max-h-64 max-w-full rounded-md border border-gray-200 object-contain"
				/>
			) : (
				<div className="flex h-32 w-full max-w-xs items-center justify-center rounded-md border border-dashed border-gray-300 text-sm text-gray-500">
					등록된 이미지가 없습니다
				</div>
			)}
			<div className="flex flex-wrap items-center gap-2">
				<label
					className={cn(
						SECONDARY_BUTTON_CLASS,
						'inline-flex cursor-pointer items-center',
						isDisabled && 'pointer-events-none opacity-50',
					)}>
					{hasImage ? '다른 이미지 선택' : '폴더에서 이미지 선택'}
					<input type="file" accept="image/*" disabled={isDisabled} onChange={handleFileChange} className="sr-only" />
				</label>
				{file && (
					<button type="button" disabled={isDisabled} onClick={handleClear} className="text-sm text-gray-500 underline">
						선택 취소
					</button>
				)}
			</div>
			{file && (
				<p className="break-all text-sm text-gray-500">
					{file.name} → 저장할 때 {targetName ? `"${targetName}"` : '사이트 규칙에 맞는 이름'}으로 올라갑니다.
				</p>
			)}
		</div>
	);
};

// ── 필드 종류에 맞는 입력 ──

interface FieldInputProps {
	field: FieldConfig;
	value: FormValue;
	/** 폼 전체 값 (다른 필드에 따라 선택지가 달라지는 입력에 쓴다) */
	form: FormValues;
	/** 수정 중인 행의 id (새로 만들 때는 null) */
	rowId: string | null;
	lookups: Lookups;
	isDisabled: boolean;
	onChange: (value: FormValue) => void;
}

export const FieldInput = ({ field, value, form, rowId, lookups, isDisabled, onChange }: FieldInputProps) => {
	const id = `field-${field.name}`;
	const vocabOptions = field.vocab ? lookups.vocab[field.vocab] : undefined;

	switch (field.kind) {
		case 'boolean':
			return (
				<input
					id={id}
					type="checkbox"
					checked={value === true}
					disabled={isDisabled}
					onChange={event => onChange(event.target.checked)}
					className="size-6 accent-primary"
				/>
			);
		case 'select':
			return (
				<ChipSelect
					options={field.options ?? []}
					value={asText(value)}
					isRequired={field.required}
					isDisabled={isDisabled}
					onChange={onChange}
				/>
			);
		case 'trackNo':
			return (
				<TrackNoSelect
					id={id}
					value={asText(value)}
					albumId={asText(form.album_id)}
					rowId={rowId}
					lookups={lookups}
					isDisabled={isDisabled}
					onChange={onChange}
				/>
			);
		case 'ref':
			return (
				<RefSelect
					id={id}
					refTable={field.refTable ?? 'albums'}
					value={asText(value)}
					lookups={lookups}
					isDisabled={isDisabled}
					isRequired={field.required}
					unavailable={field.unavailable?.(lookups)}
					onChange={onChange}
				/>
			);
		case 'strings':
			return (
				<StringsInput
					value={asStrings(value)}
					label={field.label}
					inputType={field.inputType}
					vocabOptions={vocabOptions}
					isDisabled={isDisabled}
					onChange={onChange}
				/>
			);
		case 'lineup':
			return <LineupInput value={asStrings(value)} lookups={lookups} isDisabled={isDisabled} onChange={onChange} />;
		case 'originTracks':
			return (
				<OriginTracksInput value={asStrings(value)} lookups={lookups} isDisabled={isDisabled} onChange={onChange} />
			);
		case 'chords':
			return <ChordsInput value={asRows<ChordDraft>(value)} isDisabled={isDisabled} onChange={onChange} />;
		case 'price':
			return <PriceInput value={asRows<PriceDraft>(value)} isDisabled={isDisabled} onChange={onChange} />;
		case 'ticketing':
			return <TicketingInput value={asRows<TicketingDraft>(value)} isDisabled={isDisabled} onChange={onChange} />;
		case 'karaoke':
			return (
				<KaraokeInput
					value={asRows<KaraokeDraft>(value)}
					categories={vocabOptions ?? []}
					isDisabled={isDisabled}
					onChange={onChange}
				/>
			);
		case 'textarea':
			return (
				<textarea
					id={id}
					value={asText(value)}
					rows={6}
					disabled={isDisabled}
					required={field.required}
					onChange={event => onChange(event.target.value)}
					className={INPUT_CLASS}
				/>
			);
		case 'slug': {
			const text = asText(value);
			const slug = toSlug(text);
			return (
				<div className="flex flex-col gap-1">
					<input
						id={id}
						value={text}
						disabled={isDisabled}
						onChange={event => onChange(event.target.value)}
						className={INPUT_CLASS}
					/>
					{slug !== '' && slug !== text && (
						<p className="text-sm text-gray-500">파일명으로는 “{slug}” 로 저장됩니다.</p>
					)}
				</div>
			);
		}
		default: {
			const text = asText(value);
			if (field.kind === 'text' && vocabOptions) {
				return (
					<ComboInput
						value={text}
						options={vocabOptions}
						label={field.label}
						emptyLabel={field.required ? '선택하십시오' : '(없음)'}
						isDisabled={isDisabled}
						onChange={onChange}
					/>
				);
			}
			const youtubeId = field.normalize === 'youtube' && text.trim() ? extractYoutubeId(text) : null;
			return (
				<div className="flex flex-col gap-1">
					<input
						id={id}
						type={field.kind === 'number' ? 'number' : field.kind === 'date' ? 'date' : 'text'}
						inputMode={field.kind === 'number' ? 'numeric' : undefined}
						value={text}
						disabled={isDisabled}
						required={field.required}
						onChange={event => onChange(event.target.value)}
						className={INPUT_CLASS}
					/>
					{field.normalize === 'youtube' && text.trim() !== '' && (
						<p className={cn('text-sm', youtubeId ? 'text-gray-500' : 'text-pink-600')}>
							{youtubeId ? `저장되는 영상 ID: ${youtubeId}` : 'YouTube 주소나 영상 ID를 알아볼 수 없습니다.'}
						</p>
					)}
				</div>
			);
		}
	}
};
