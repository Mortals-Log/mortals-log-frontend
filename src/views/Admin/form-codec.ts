// @/views/Admin/form-codec
// 폼(문자열·체크박스·목록·행 묶음) ↔ DB 행 값 변환. 잘못된 입력은 어느 필드인지 알리는 Error 로 올린다.

import type { FieldConfig, TableConfig } from './admin-tables';
import { PRICE_KIND_OPTIONS, getOptionLabel } from './labels';

export type TableRow = Record<string, unknown>;

export type ChordMode = 'integrated' | 'separated';

/** 코드 악보 한 버전. 튜닝·제공처가 없으면 빈 문자열이다. */
export interface ChordDraft {
	chords: string;
	tuning: string;
	provider: string;
	chordModeType: ChordMode;
}

/** 가격 한 줄. 같은 종류가 여러 줄이면(청소년/일반 ...) label 로 구분한다. */
export interface PriceDraft {
	kind: string;
	label: string;
	amount: string;
}

/** 예매 한 회차. date 는 <input type="date"> 형식(YYYY-MM-DD)이고 DB 에는 YYYY.MM.DD 로 저장한다. */
export interface TicketingDraft {
	label: string;
	date: string;
	time: string;
	link: string;
	soldOut: boolean;
}

export interface KaraokeDraft {
	category: string;
	number: string;
}

export type FormValue = string | boolean | string[] | ChordDraft[] | PriceDraft[] | TicketingDraft[] | KaraokeDraft[];
export type FormValues = Record<string, FormValue>;

/** 입력 칸의 "기존에 쓴 값" 목록 이름 */
export type VocabKey =
	| 'linkPlatforms'
	| 'mediaPlatforms'
	| 'genres'
	| 'styles'
	| 'people'
	| 'sides'
	| 'versions'
	| 'karaoke';

/** 한 번 불러 두고 여러 화면이 함께 쓰는 참조 데이터 */
export interface Lookups {
	albums: TableRow[];
	tracks: TableRow[];
	origins: TableRow[];
	lineupNames: string[];
	/** 이미 코드 악보가 등록된 곡의 id (같은 곡에 코드를 두 번 등록할 수 없다) */
	chordTrackIds: string[];
	/** 기존 데이터에서 모은 선택지 (많이 쓴 순) */
	vocab: Record<VocabKey, string[]>;
}

export interface FormContext {
	isCreate: boolean;
	lookups: Lookups;
}

/** 저장 값을 만들 때 필요한 맥락: 새로 만드는지, 수정이면 원래 행, 참조 데이터 */
export interface RowContext extends FormContext {
	row: TableRow | null;
}

export const EMPTY_VOCAB: Lookups['vocab'] = {
	linkPlatforms: [],
	mediaPlatforms: [],
	genres: [],
	styles: [],
	people: [],
	sides: [],
	versions: [],
	karaoke: [],
};

export const createEmptyChord = (): ChordDraft => ({
	chords: '',
	tuning: '',
	provider: '',
	chordModeType: 'separated',
});
export const createEmptyPrice = (): PriceDraft => ({ kind: '', label: '', amount: '' });
export const createEmptyTicketing = (): TicketingDraft => ({ label: '', date: '', time: '', link: '', soldOut: false });
export const createEmptyKaraoke = (): KaraokeDraft => ({ category: '', number: '' });

/** "Butcher Shop" → "butcher-shop" (영문 소문자, 공백은 -, 문장부호는 제거) */
export const toSlug = (text: string): string =>
	text
		.toLowerCase()
		.replace(/[^a-z0-9\s-]/g, '')
		.trim()
		.replace(/\s+/g, '-');

const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

/** YouTube 주소(watch, youtu.be, embed, shorts, live)나 영상 ID 에서 영상 ID 만 꺼낸다. 알아볼 수 없으면 null. */
export const extractYoutubeId = (input: string): string | null => {
	const text = input.trim();
	if (YOUTUBE_ID_PATTERN.test(text)) return text;

	try {
		const url = new URL(/^https?:\/\//.test(text) ? text : `https://${text}`);
		const host = url.hostname.replace(/^(www|m|music)\./, '');
		let id: string | null = null;
		if (host === 'youtu.be') {
			id = url.pathname.split('/')[1] ?? null;
		} else if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
			id = url.searchParams.get('v');
			if (!id) {
				const [, kind, value] = url.pathname.split('/');
				if (['embed', 'shorts', 'live', 'v'].includes(kind)) id = value ?? null;
			}
		}
		return id && YOUTUBE_ID_PATTERN.test(id) ? id : null;
	} catch {
		return null;
	}
};

const toChordDraft = (entry: unknown): ChordDraft => {
	const record = (entry ?? {}) as Record<string, unknown>;
	return {
		chords: String(record.chords ?? ''),
		tuning: String(record.tuning ?? ''),
		provider: String(record.provider ?? ''),
		chordModeType: record.chordModeType === 'integrated' ? 'integrated' : 'separated',
	};
};

const toPriceDrafts = (value: unknown): PriceDraft[] => {
	if (!value || typeof value !== 'object') return [createEmptyPrice()];
	const drafts = Object.entries(value as Record<string, unknown>).flatMap(([kind, amount]): PriceDraft[] =>
		Array.isArray(amount)
			? amount.map(tier => ({ kind, label: String(tier?.label ?? ''), amount: String(tier?.amount ?? '') }))
			: [{ kind, label: '', amount: String(amount) }],
	);
	return drafts.length > 0 ? drafts : [createEmptyPrice()];
};

const toTicketingDrafts = (value: unknown): TicketingDraft[] => {
	const drafts = Array.isArray(value)
		? value.map((entry): TicketingDraft => {
				const record = (entry ?? {}) as Record<string, unknown>;
				return {
					label: String(record.label ?? ''),
					date: String(record.ticketingDate ?? '').replace(/\./g, '-'),
					time: String(record.ticketingTime ?? ''),
					link: String(record.ticketingLink ?? ''),
					soldOut: Boolean(record.soldOut),
				};
			})
		: [];
	return drafts.length > 0 ? drafts : [createEmptyTicketing()];
};

const toKaraokeDrafts = (value: unknown): KaraokeDraft[] => {
	const drafts =
		value && typeof value === 'object'
			? Object.entries(value as Record<string, unknown>).map(([category, number]) => ({
					category,
					number: String(number),
				}))
			: [];
	return drafts.length > 0 ? drafts : [createEmptyKaraoke()];
};

const toFormValue = (field: FieldConfig, value: unknown, isNew: boolean): FormValue => {
	if (isNew && field.defaultValue !== undefined) return field.defaultValue;

	switch (field.kind) {
		case 'boolean':
			return Boolean(value);
		case 'strings':
		case 'originTracks': {
			const items = Array.isArray(value) ? value.map(String) : [];
			return items.length > 0 ? items : [''];
		}
		case 'lineup':
			return Array.isArray(value) ? value.map(String) : [];
		case 'chords': {
			const drafts = Array.isArray(value) ? value.map(toChordDraft) : [];
			return drafts.length > 0 ? drafts : [createEmptyChord()];
		}
		case 'price':
			return toPriceDrafts(value);
		case 'ticketing':
			return toTicketingDrafts(value);
		case 'karaoke':
			return toKaraokeDrafts(value);
		default:
			return value === null || value === undefined ? '' : String(value);
	}
};

export const toFormValues = (config: TableConfig, row: TableRow | null): FormValues =>
	Object.fromEntries(config.fields.map(field => [field.name, toFormValue(field, row?.[field.name], row === null)]));

// 같은 이름을 두 번 고른 경우를 위해 중복은 한 번만 남긴다.
const toTrimmedList = (items: string[]): string[] => [...new Set(items.map(item => item.trim()).filter(Boolean))];

const toChords = (drafts: ChordDraft[]) =>
	drafts
		.filter(draft => draft.chords.trim() !== '')
		.map(draft => ({
			// 줄맞춤용 공백이 의미 있으므로 입력한 그대로 저장한다. (비어 있는지 판단할 때만 trim 한다.)
			chords: draft.chords,
			...(draft.tuning.trim() ? { tuning: draft.tuning.trim() } : {}),
			...(draft.provider ? { provider: draft.provider } : {}),
			chordModeType: draft.chordModeType,
		}));

const toAmount = (text: string, fail: (reason: string) => Error): number => {
	const amount = Number(text.trim());
	if (text.trim() === '' || Number.isNaN(amount) || amount < 0) throw fail('금액을 숫자로 입력하십시오.');
	return amount;
};

/** 가격 줄 → { 종류: 금액 } (같은 종류가 여러 줄이면 [{ label, amount }]). 종류의 첫 등장 순서를 유지한다. */
const toPrice = (drafts: PriceDraft[], fail: (reason: string) => Error): Record<string, unknown> | null => {
	const groups = new Map<string, PriceDraft[]>();
	for (const draft of drafts) {
		if (!draft.kind && !draft.label.trim() && !draft.amount.trim()) continue;
		if (!draft.kind) throw fail('종류를 선택하십시오.');
		groups.set(draft.kind, [...(groups.get(draft.kind) ?? []), draft]);
	}
	if (groups.size === 0) return null;

	const price: Record<string, unknown> = {};
	for (const [kind, group] of groups) {
		if (group.length === 1 && !group[0].label.trim()) {
			price[kind] = toAmount(group[0].amount, fail);
			continue;
		}
		const kindLabel = getOptionLabel(PRICE_KIND_OPTIONS, kind);
		price[kind] = group.map(draft => {
			if (!draft.label.trim()) throw fail(`${kindLabel}이(가) 여러 줄이면 세부 이름을 모두 입력하십시오.`);
			return { label: draft.label.trim(), amount: toAmount(draft.amount, fail) };
		});
	}
	return price;
};

const toTicketing = (drafts: TicketingDraft[]) =>
	drafts
		.filter(draft => draft.label.trim() || draft.date || draft.time || draft.link.trim() || draft.soldOut)
		.map(draft => ({
			...(draft.date ? { ticketingDate: draft.date.replace(/-/g, '.') } : {}),
			...(draft.time ? { ticketingTime: draft.time } : {}),
			...(draft.link.trim() ? { ticketingLink: draft.link.trim() } : {}),
			...(draft.label.trim() ? { label: draft.label.trim() } : {}),
			...(draft.soldOut ? { soldOut: true } : {}),
		}));

const toKaraoke = (drafts: KaraokeDraft[], fail: (reason: string) => Error): Record<string, string> | null => {
	const numbers: Record<string, string> = {};
	for (const draft of drafts) {
		const category = draft.category.trim();
		const number = draft.number.trim();
		if (!category && !number) continue;
		if (!category) throw fail('카테고리를 선택하거나 입력하십시오.');
		if (!number) throw fail(`${category}: 번호를 입력하십시오.`);
		if (category in numbers) throw fail(`${category}가 두 번 입력됐습니다.`);
		numbers[category] = number;
	}
	return Object.keys(numbers).length > 0 ? numbers : null;
};

const toRowValue = (field: FieldConfig, raw: FormValue, original: unknown, form: FormValues): unknown => {
	const fail = (reason: string) => new Error(`${field.label}: ${reason}`);

	if (typeof raw === 'boolean') return raw;

	if (Array.isArray(raw)) {
		switch (field.kind) {
			case 'chords': {
				const chords = toChords(raw as ChordDraft[]);
				if (chords.length === 0 && field.required) throw fail('코드를 한 개 이상 입력하십시오.');
				return chords.length > 0 ? chords : null;
			}
			case 'price':
				return toPrice(raw as PriceDraft[], fail);
			case 'ticketing': {
				const ticketing = toTicketing(raw as TicketingDraft[]);
				return ticketing.length > 0 ? ticketing : null;
			}
			case 'karaoke':
				return toKaraoke(raw as KaraokeDraft[], fail);
			default: {
				const items = toTrimmedList(raw as string[]);
				return items.length > 0 || field.required ? items : null;
			}
		}
	}

	const text = raw.trim();

	switch (field.kind) {
		case 'number':
		case 'trackNo': {
			if (text === '') {
				if (field.required) throw fail('값을 입력하십시오.');
				return null;
			}
			const parsed = Number(text);
			if (Number.isNaN(parsed)) throw fail('숫자로 입력하십시오.');
			return parsed;
		}
		case 'slug': {
			if (text === '') return null;
			// 이미 저장된 값(예: 공백이 든 옛 파일명)은 바꾸지 않아야 기존 이미지 경로가 유지된다.
			if (text === original) return text;
			const slug = toSlug(text);
			if (slug === '') throw fail('영어로 입력하십시오.');
			return slug;
		}
		case 'textarea':
			// 가사처럼 줄바꿈·앞뒤 공백이 의미 있는 글은 그대로 두고, 비었을 때만 null
			return text === '' ? (field.required ? '' : null) : raw;
		default: {
			if (text === '') return field.required ? '' : null;
			const isYoutube =
				field.normalize === 'youtube' ||
				(field.normalize === 'youtube-by-platform' && String(form.platform).toLowerCase() === 'youtube');
			if (!isYoutube) return text;
			const youtubeId = extractYoutubeId(text);
			if (!youtubeId) throw fail('YouTube 주소나 영상 ID를 알아볼 수 없습니다.');
			return youtubeId;
		}
	}
};

/**
 * 폼 값을 DB 에 보낼 값으로 바꾼다. 수정할 때는 기본 키를, 새로 만들 때는 자동 필드를 보내지 않는다.
 * 화면에서 숨긴 필드(showIf)는 null 로 보내고, 저장 대상이 아닌 필드(virtual)와 다른 테이블에 저장하는 필드(originTracks)는 건너뛴다.
 */
export const toRowValues = (config: TableConfig, form: FormValues, context: RowContext): TableRow => {
	const { isCreate, row, lookups } = context;
	const values: TableRow = {};
	for (const field of config.fields) {
		if (field.virtual || field.kind === 'originTracks') continue;
		if (isCreate ? field.autoOnCreate : config.keys.includes(field.name) || field.autoOnCreate) continue;
		if (field.showIf && !field.showIf(form, lookups)) {
			values[field.name] = null;
			continue;
		}
		values[field.name] = toRowValue(field, form[field.name], row?.[field.name], form);
	}
	config.validate?.(values, context);
	return isCreate && config.prepare ? config.prepare(values, lookups) : values;
};
