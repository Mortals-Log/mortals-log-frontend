'use client';

// @/views/Admin/StructuredInputs
// 여러 칸으로 이루어진 입력들: 문자열 목록, 가격, 예매 회차, 노래방 번호, 코드 악보.
// 모두 ListEditor 로 +/− 와 초기화를 쓰고, JSON 을 직접 쓰지 않아도 되게 칸마다 이름을 붙였다.

import { CHORD_PROVIDERS } from '@/const/chord-providers';
import { cn } from '@/utils/cn';
import { INPUT_CLASS } from './admin-classes';
import { ChipSelect, ComboInput, SelectBox } from './ComboInput';
import {
	createEmptyChord,
	createEmptyKaraoke,
	createEmptyPrice,
	createEmptyTicketing,
	type ChordDraft,
	type KaraokeDraft,
	type PriceDraft,
	type TicketingDraft,
} from './form-codec';
import { CHORD_MODE_OPTIONS, PRICE_KIND_OPTIONS, getKaraokeLabel } from './labels';
import ListEditor from './ListEditor';

/** 고를 수 있는 튜닝. 이 밖의 값(카포 포함)은 "기타"로 직접 입력한다. */
const TUNING_OPTIONS = ['다운튜닝', '정튜닝'];

/** 숫자만 든 문자열을 천 단위 쉼표로 보여준다 (저장하는 값은 쉼표 없는 숫자 그대로). */
const formatAmount = (digits: string): string => (digits === '' ? '' : Number(digits).toLocaleString('ko-KR'));

const CAPTION_CLASS = 'flex flex-col gap-1 text-sm text-gray-600';

interface InputProps<Value> {
	value: Value;
	isDisabled: boolean;
	onChange: (value: Value) => void;
}

// ── 문자열 목록 (장르 · 스타일 · 작사 · 공연 날짜 ...) ──

interface StringsInputProps extends InputProps<string[]> {
	label: string;
	inputType?: 'text' | 'date' | 'time';
	/** 있으면 칸마다 "기존에 쓴 값" 드롭다운 + 기타 직접 입력으로 받는다 */
	vocabOptions?: string[];
}

export const StringsInput = ({
	value,
	label,
	inputType = 'text',
	vocabOptions,
	isDisabled,
	onChange,
}: StringsInputProps) => (
	<ListEditor
		items={value}
		label={label}
		createItem={() => ''}
		isDisabled={isDisabled}
		onChange={onChange}
		renderItem={(item, index, onItemChange) =>
			vocabOptions ? (
				<ComboInput
					value={item}
					options={vocabOptions}
					label={`${label} ${index + 1}`}
					isDisabled={isDisabled}
					onChange={onItemChange}
				/>
			) : (
				<input
					type={inputType}
					value={item}
					disabled={isDisabled}
					aria-label={`${label} ${index + 1}`}
					onChange={event => onItemChange(event.target.value)}
					className={INPUT_CLASS}
				/>
			)
		}
	/>
);

// ── 가격: 종류 · 세부 이름 · 금액 ──

export const PriceInput = ({ value, isDisabled, onChange }: InputProps<PriceDraft[]>) => (
	<ListEditor
		items={value}
		label="가격"
		createItem={createEmptyPrice}
		isDisabled={isDisabled}
		onChange={onChange}
		renderItem={(item, _index, onItemChange) => {
			const isKnownKind = item.kind === '' || PRICE_KIND_OPTIONS.some(option => option.value === item.kind);
			return (
				<div className="grid grid-cols-3 gap-2 max-mobile:grid-cols-1">
					<label className={CAPTION_CLASS}>
						종류
						<SelectBox
							value={item.kind}
							disabled={isDisabled}
							onChange={event => onItemChange({ ...item, kind: event.target.value })}>
							<option value="">선택하십시오</option>
							{!isKnownKind && <option value={item.kind}>{item.kind}</option>}
							{PRICE_KIND_OPTIONS.map(option => (
								<option key={option.value} value={option.value}>
									{option.label}
								</option>
							))}
						</SelectBox>
					</label>
					<label className={CAPTION_CLASS}>
						세부 이름 (같은 종류가 나뉠 때)
						<input
							value={item.label}
							disabled={isDisabled}
							onChange={event => onItemChange({ ...item, label: event.target.value })}
							className={INPUT_CLASS}
						/>
					</label>
					<label className={CAPTION_CLASS}>
						금액 (원)
						<input
							inputMode="numeric"
							value={formatAmount(item.amount)}
							disabled={isDisabled}
							onChange={event => onItemChange({ ...item, amount: event.target.value.replace(/\D/g, '') })}
							className={INPUT_CLASS}
						/>
					</label>
				</div>
			);
		}}
	/>
);

// ── 예매 회차 ──

export const TicketingInput = ({ value, isDisabled, onChange }: InputProps<TicketingDraft[]>) => (
	<ListEditor
		items={value}
		label="예매 회차"
		variant="card"
		getItemTitle={index => `예매 ${index + 1}회차`}
		createItem={createEmptyTicketing}
		isDisabled={isDisabled}
		onChange={onChange}
		renderItem={(item, _index, onItemChange) => (
			<div className="flex flex-col gap-3">
				<div className="grid grid-cols-3 gap-3 max-mobile:grid-cols-1">
					<label className={CAPTION_CLASS}>
						회차 이름 (예: 얼리버드, 일반)
						<input
							value={item.label}
							disabled={isDisabled}
							onChange={event => onItemChange({ ...item, label: event.target.value })}
							className={INPUT_CLASS}
						/>
					</label>
					<label className={CAPTION_CLASS}>
						예매 날짜
						<input
							type="date"
							value={item.date}
							disabled={isDisabled}
							onChange={event => onItemChange({ ...item, date: event.target.value })}
							className={INPUT_CLASS}
						/>
					</label>
					<label className={CAPTION_CLASS}>
						예매 시간
						<input
							type="time"
							value={item.time}
							disabled={isDisabled}
							onChange={event => onItemChange({ ...item, time: event.target.value })}
							className={INPUT_CLASS}
						/>
					</label>
				</div>
				<label className={CAPTION_CLASS}>
					예매 링크
					<input
						value={item.link}
						disabled={isDisabled}
						onChange={event => onItemChange({ ...item, link: event.target.value })}
						className={INPUT_CLASS}
					/>
				</label>
				<label className="flex items-center gap-3 text-base text-gray-700">
					<input
						type="checkbox"
						checked={item.soldOut}
						disabled={isDisabled}
						onChange={event => onItemChange({ ...item, soldOut: event.target.checked })}
						className="size-6 accent-primary"
					/>
					매진
				</label>
			</div>
		)}
	/>
);

// ── 노래방 번호: 카테고리(기존 + 기타) · 번호 ──

interface KaraokeInputProps extends InputProps<KaraokeDraft[]> {
	categories: string[];
}

export const KaraokeInput = ({ value, categories, isDisabled, onChange }: KaraokeInputProps) => (
	<ListEditor
		items={value}
		label="노래방 번호"
		createItem={createEmptyKaraoke}
		isDisabled={isDisabled}
		onChange={onChange}
		renderItem={(item, index, onItemChange) => (
			<div className="grid grid-cols-2 gap-2 max-mobile:grid-cols-1">
				<div className={CAPTION_CLASS}>
					카테고리
					<ComboInput
						value={item.category}
						options={categories}
						label={`노래방 카테고리 ${index + 1}`}
						getOptionLabel={getKaraokeLabel}
						isDisabled={isDisabled}
						onChange={category => onItemChange({ ...item, category })}
					/>
				</div>
				<label className={CAPTION_CLASS}>
					번호
					<input
						value={item.number}
						disabled={isDisabled}
						onChange={event => onItemChange({ ...item, number: event.target.value })}
						className={INPUT_CLASS}
					/>
				</label>
			</div>
		)}
	/>
);

// ── 코드 악보: 버전마다 튜닝 · 제공처 · 표시 방식 · 악보 ──

export const ChordsInput = ({ value, isDisabled, onChange }: InputProps<ChordDraft[]>) => (
	<ListEditor
		items={value}
		label="버전"
		variant="card"
		getItemTitle={index => `버전 ${index + 1}`}
		createItem={createEmptyChord}
		isDisabled={isDisabled}
		onChange={onChange}
		renderItem={(draft, _index, onItemChange) => {
			const providers: string[] = Object.values(CHORD_PROVIDERS);
			if (draft.provider && !providers.includes(draft.provider)) providers.push(draft.provider);

			return (
				<div className="flex flex-col gap-3">
					<div className="grid grid-cols-2 gap-3 max-mobile:grid-cols-1">
						<div className={CAPTION_CLASS}>
							튜닝 · 카포
							<ComboInput
								value={draft.tuning}
								options={TUNING_OPTIONS}
								label="튜닝"
								emptyLabel="(없음)"
								isDisabled={isDisabled}
								onChange={tuning => onItemChange({ ...draft, tuning })}
							/>
							<span className="text-gray-500">그 밖의 튜닝이나 카포는 &quot;기타&quot;를 선택해 직접 입력합니다.</span>
						</div>
						<label className={CAPTION_CLASS}>
							악보 제공
							<SelectBox
								value={draft.provider}
								disabled={isDisabled}
								onChange={event => onItemChange({ ...draft, provider: event.target.value })}>
								<option value="">(없음)</option>
								{providers.map(provider => (
									<option key={provider} value={provider}>
										{provider}
									</option>
								))}
							</SelectBox>
						</label>
					</div>
					<div className={CAPTION_CLASS}>
						표시 방식
						<ChipSelect
							options={CHORD_MODE_OPTIONS}
							value={draft.chordModeType}
							isRequired
							isDisabled={isDisabled}
							onChange={mode =>
								onItemChange({ ...draft, chordModeType: mode === 'integrated' ? 'integrated' : 'separated' })
							}
						/>
					</div>
					<label className={CAPTION_CLASS}>
						코드 악보 (줄·공백 그대로 저장됩니다)
						<textarea
							value={draft.chords}
							rows={10}
							wrap="off"
							spellCheck={false}
							disabled={isDisabled}
							onChange={event => onItemChange({ ...draft, chords: event.target.value })}
							className={cn(INPUT_CLASS, 'overflow-x-auto whitespace-pre font-mono')}
						/>
					</label>
				</div>
			);
		}}
	/>
);
