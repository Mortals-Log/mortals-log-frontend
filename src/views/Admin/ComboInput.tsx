'use client';

// @/views/Admin/ComboInput
// 고르는 입력들: 칩 선택(ChipSelect), 기존 값 + "기타" 직접 입력(ComboInput), 앨범·곡 선택(RefSelect).
// "기타"로 직접 입력한 값은 저장하면 DB 에 들어가고, 다음부터 기존 값 목록에 나타난다.

import { useState, type ComponentProps } from 'react';
import { cn } from '@/utils/cn';
import { CHIP_CLASS, CHIP_OFF_CLASS, CHIP_ON_CLASS, INPUT_CLASS, SECONDARY_BUTTON_CLASS } from './admin-classes';
import type { Lookups } from './form-codec';
import { getAlbumLabel, type Option } from './labels';

// ── 선택 상자: 브라우저 기본 모양은 높이·여백을 무시하는 경우가 있어(Safari) 기본 모양을 끄고 화살표를 직접 그린다 ──

export const SelectBox = ({ className, children, ...props }: ComponentProps<'select'>) => (
	<div className="relative">
		<select {...props} className={cn(INPUT_CLASS, 'min-h-14 appearance-none pr-10', className)}>
			{children}
		</select>
		<span aria-hidden className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
			▾
		</span>
	</div>
);

// ── 칩으로 고르기 (종류 · 구분 · 형식 ...) ──

interface ChipSelectProps {
	options: readonly Option[];
	value: string;
	isDisabled: boolean;
	/** 필수가 아니면 선택된 칩을 다시 눌러 해제할 수 있다 */
	isRequired?: boolean;
	onChange: (value: string) => void;
}

export const ChipSelect = ({ options, value, isDisabled, isRequired, onChange }: ChipSelectProps) => (
	<div role="radiogroup" className="flex flex-wrap gap-2">
		{options.map(option => {
			const isSelected = option.value === value;
			return (
				<button
					key={option.value}
					type="button"
					role="radio"
					aria-checked={isSelected}
					disabled={isDisabled}
					onClick={() => onChange(isSelected && !isRequired ? '' : option.value)}
					className={cn(CHIP_CLASS, isSelected ? CHIP_ON_CLASS : CHIP_OFF_CLASS)}>
					{option.label}
				</button>
			);
		})}
	</div>
);

// ── 기존에 쓴 값 드롭다운 + 기타(직접 입력) ──

const OTHER_VALUE = '__other__';
const NONE_UNAVAILABLE: string[] = [];
const getSameText = (option: string): string => option;

interface ComboInputProps {
	value: string;
	/** 기존에 쓴 값 (많이 쓴 순) */
	options: string[];
	label: string;
	emptyLabel?: string;
	getOptionLabel?: (option: string) => string;
	isDisabled: boolean;
	onChange: (value: string) => void;
}

export const ComboInput = ({
	value,
	options,
	label,
	emptyLabel = '선택하십시오',
	getOptionLabel = getSameText,
	isDisabled,
	onChange,
}: ComboInputProps) => {
	const [isCustomMode, setIsCustomMode] = useState(false);
	// 목록에 없는 값(직접 입력해 저장한 값)은 처음부터 입력 칸으로 보여준다.
	const isCustom = isCustomMode || (value !== '' && !options.includes(value));

	if (isCustom) {
		return (
			<div className="flex flex-wrap gap-2">
				<input
					value={value}
					disabled={isDisabled}
					aria-label={`${label} 직접 입력`}
					autoFocus={isCustomMode}
					onChange={event => onChange(event.target.value)}
					className={cn(INPUT_CLASS, 'min-w-0 flex-1')}
				/>
				<button
					type="button"
					disabled={isDisabled}
					onClick={() => {
						setIsCustomMode(false);
						onChange('');
					}}
					className={cn(SECONDARY_BUTTON_CLASS, 'shrink-0')}>
					목록에서 선택
				</button>
			</div>
		);
	}

	return (
		<SelectBox
			value={value}
			disabled={isDisabled}
			aria-label={label}
			onChange={event => {
				if (event.target.value === OTHER_VALUE) {
					setIsCustomMode(true);
					onChange('');
				} else {
					onChange(event.target.value);
				}
			}}>
			<option value="">{emptyLabel}</option>
			{options.map(option => (
				<option key={option} value={option}>
					{getOptionLabel(option)}
				</option>
			))}
			<option value={OTHER_VALUE}>기타 (직접 입력)</option>
		</SelectBox>
	);
};

// ── 앨범 · 곡 고르기 ──

interface RefSelectProps {
	id?: string;
	refTable: 'albums' | 'tracks';
	value: string;
	lookups: Lookups;
	isDisabled: boolean;
	isRequired?: boolean;
	/** 선택할 수 없는 항목의 id (회색으로 보이고 "이미 등록됨" 이라고 표시한다) */
	unavailable?: string[];
	onChange: (value: string) => void;
}

const getSortedAlbums = (albums: Lookups['albums']) =>
	[...albums].sort((a, b) => String(b.release_date ?? '').localeCompare(String(a.release_date ?? '')));

export const RefSelect = ({
	id,
	refTable,
	value,
	lookups,
	isDisabled,
	isRequired,
	unavailable = NONE_UNAVAILABLE,
	onChange,
}: RefSelectProps) => {
	const albums = getSortedAlbums(lookups.albums);
	const isKnown =
		refTable === 'albums' ? albums.some(album => album.id === value) : lookups.tracks.some(track => track.id === value);

	return (
		<SelectBox
			id={id}
			value={value}
			disabled={isDisabled}
			required={isRequired}
			onChange={event => onChange(event.target.value)}>
			<option value="">선택하십시오</option>
			{value !== '' && !isKnown && <option value={value}>{value}</option>}
			{refTable === 'albums'
				? albums.map(album => (
						<option key={String(album.id)} value={String(album.id)}>
							{getAlbumLabel(album)}
						</option>
					))
				: albums.map(album => (
						<optgroup key={String(album.id)} label={getAlbumLabel(album)}>
							{lookups.tracks
								.filter(track => track.album_id === album.id)
								.sort((a, b) => Number(a.track_no) - Number(b.track_no))
								.map(track => (
									<option
										key={String(track.id)}
										value={String(track.id)}
										disabled={unavailable.includes(String(track.id))}>
										{String(track.track_no)}. {String(track.title)}
										{unavailable.includes(String(track.id)) ? ' (이미 등록됨)' : ''}
									</option>
								))}
						</optgroup>
					))}
		</SelectBox>
	);
};
