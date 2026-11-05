'use client';

// @/views/Admin/ListEditor
// +/− 로 칸을 늘리고 줄이는 목록 입력의 공통 틀. 항상 한 칸 이상을 유지하고(한 칸일 때는 −를 눌러도 지워지지 않는다),
// "초기화"는 모든 칸을 지우고 빈 한 칸으로 되돌린다. 칸 안의 입력은 renderItem 이 그린다.
// 할 수 없는 동작은 버튼을 막아 두지 않고 흐리게 보이게 한 뒤, 누르면 이유를 토스트로 알려준다.
// 카드 모양(card)은 접고 펼치기, 위·아래 이동, 카드 제목 줄 고정(sticky)을 쓸 수 있다.

import { useState, type ReactNode } from 'react';
import toast from 'react-hot-toast';
import { cn } from '@/utils/cn';
import { ICON_BUTTON_CLASS, SECONDARY_BUTTON_CLASS } from './admin-classes';

const LAST_ITEM_MESSAGE = '최소 한 칸은 있어야 하므로 삭제할 수 없습니다. 값을 비우려면 "초기화"를 누르십시오.';
const DEFAULT_BLOCKED_MESSAGE = '삭제할 수 없는 항목입니다.';

export interface CollapsibleOptions<Item> {
	/** 접었을 때 제목 옆에 보여줄 한 줄 요약 */
	getSummary: (item: Item) => string;
	isCollapsedByDefault?: (item: Item) => boolean;
}

interface ListEditorProps<Item> {
	items: Item[];
	/** "+ {label} 추가" 버튼과 접근성 이름에 쓴다 */
	label: string;
	createItem: () => Item;
	renderItem: (item: Item, index: number, onItemChange: (next: Item) => void) => ReactNode;
	/** inline: 입력 옆에 − 버튼 / card: 제목 줄에 − 버튼이 있는 상자 */
	variant?: 'inline' | 'card';
	getItemTitle?: (index: number) => string;
	/** 칸을 가리키는 고유 키. 순서를 바꾸거나 접어도 입력 상태가 엉키지 않으려면 필요하다. */
	getItemKey?: (item: Item, index: number) => string;
	/** card 에서 접고 펼칠 수 있게 한다 */
	collapsible?: CollapsibleOptions<Item>;
	/** card 에서 위·아래로 옮길 수 있게 한다 */
	isReorderable?: boolean;
	/** card 제목 줄에 붙일 클래스 (스크롤해도 따라오게 하는 sticky 등) */
	headerClassName?: string;
	/** false 를 돌려주면 그 칸은 삭제할 수 없다 (예: 이미 저장된 곡). 누르면 blockedMessage 를 알려준다. */
	canRemove?: (item: Item, index: number) => boolean;
	/** false 면 초기화할 수 없다 (지울 수 없는 칸이 있는 목록). 누르면 blockedMessage 를 알려준다. */
	canReset?: boolean;
	blockedMessage?: string;
	isDisabled: boolean;
	onChange: (items: Item[]) => void;
}

const ListEditor = <Item,>({
	items,
	label,
	createItem,
	renderItem,
	variant = 'inline',
	getItemTitle,
	getItemKey,
	collapsible,
	isReorderable = false,
	headerClassName,
	canRemove,
	canReset = true,
	blockedMessage = DEFAULT_BLOCKED_MESSAGE,
	isDisabled,
	onChange,
}: ListEditorProps<Item>) => {
	// 사용자가 직접 접거나 편 칸만 기록한다. 기록이 없으면 기본값(isCollapsedByDefault)을 따른다.
	const [collapsedByKey, setCollapsedByKey] = useState<Record<string, boolean>>({});
	const isOnlyItem = items.length <= 1;

	const getKey = (item: Item, index: number) => getItemKey?.(item, index) ?? String(index);
	const isCollapsed = (item: Item, index: number) =>
		collapsedByKey[getKey(item, index)] ?? collapsible?.isCollapsedByDefault?.(item) ?? false;

	const handleToggle = (item: Item, index: number) =>
		setCollapsedByKey(previous => ({ ...previous, [getKey(item, index)]: !isCollapsed(item, index) }));

	// 하나라도 펼쳐져 있으면 "모두 접기", 전부 접혀 있으면 "모두 펼치기" 로 한 버튼이 번갈아 동작한다.
	const isAllCollapsed = items.every((item, index) => isCollapsed(item, index));

	const handleSetAll = (shouldCollapse: boolean) =>
		setCollapsedByKey(Object.fromEntries(items.map((item, index) => [getKey(item, index), shouldCollapse])));

	const handleMove = (index: number, direction: -1 | 1) => {
		const target = index + direction;
		if (target < 0) {
			toast.error('맨 위입니다. 더 위로 옮길 수 없습니다.');
			return;
		}
		if (target >= items.length) {
			toast.error('맨 아래입니다. 더 아래로 옮길 수 없습니다.');
			return;
		}
		const next = [...items];
		[next[index], next[target]] = [next[target], next[index]];
		onChange(next);
	};

	const renderRemoveButton = (item: Item, index: number) => {
		const isBlockedItem = canRemove ? !canRemove(item, index) : false;
		const isBlocked = isBlockedItem || isOnlyItem;

		const handleRemove = () => {
			if (isBlockedItem) toast.error(blockedMessage);
			else if (isOnlyItem) toast.error(LAST_ITEM_MESSAGE);
			else onChange(items.filter((_, position) => position !== index));
		};

		return (
			<button
				type="button"
				disabled={isDisabled}
				aria-label={`${label} ${index + 1} 삭제`}
				aria-disabled={isBlocked}
				onClick={handleRemove}
				className={cn(ICON_BUTTON_CLASS, isBlocked && 'opacity-50')}>
				−
			</button>
		);
	};

	const renderMoveButtons = (index: number) =>
		(
			[
				['위로', -1, '↑'],
				['아래로', 1, '↓'],
			] as const
		).map(([name, direction, symbol]) => {
			const isEdge = direction === -1 ? index === 0 : index === items.length - 1;
			return (
				<button
					key={name}
					type="button"
					disabled={isDisabled}
					aria-label={`${label} ${index + 1} ${name} 이동`}
					aria-disabled={isEdge}
					onClick={() => handleMove(index, direction)}
					className={cn(ICON_BUTTON_CLASS, isEdge && 'opacity-50')}>
					{symbol}
				</button>
			);
		});

	const handleReset = () => {
		if (canReset) onChange([createItem()]);
		else toast.error(blockedMessage);
	};

	return (
		<div className="flex flex-col gap-3">
			{variant === 'card' && collapsible && items.length > 1 && (
				<button
					type="button"
					onClick={() => handleSetAll(!isAllCollapsed)}
					className="self-start text-sm text-gray-500 underline">
					{isAllCollapsed ? '모두 펼치기' : '모두 접기'}
				</button>
			)}

			{items.map((item, index) => {
				const key = getKey(item, index);
				const handleItemChange = (next: Item) =>
					onChange(items.map((current, position) => (position === index ? next : current)));

				if (variant !== 'card') {
					return (
						<div key={key} className="flex items-start gap-2">
							<div className="min-w-0 flex-1">{renderItem(item, index, handleItemChange)}</div>
							{renderRemoveButton(item, index)}
						</div>
					);
				}

				const isItemCollapsed = collapsible ? isCollapsed(item, index) : false;
				const title = getItemTitle?.(index) ?? `${label} ${index + 1}`;

				return (
					<div key={key} className="flex flex-col gap-3 rounded-md border border-gray-200 bg-gray-50 p-4">
						<div className={cn('flex min-h-11 items-center justify-between gap-2', headerClassName)}>
							{collapsible ? (
								<button
									type="button"
									aria-expanded={!isItemCollapsed}
									onClick={() => handleToggle(item, index)}
									className="flex min-h-11 min-w-0 flex-1 items-center gap-2 text-left font-sans">
									<span aria-hidden className="text-gray-500">
										{isItemCollapsed ? '▸' : '▾'}
									</span>
									<span className="shrink-0 text-base font-medium text-gray-700">{title}</span>
									<span className="min-w-0 truncate text-base text-gray-500">{collapsible.getSummary(item)}</span>
								</button>
							) : (
								<span className="text-base font-medium text-gray-700">{title}</span>
							)}
							<div className="flex shrink-0 gap-2">
								{isReorderable && renderMoveButtons(index)}
								{renderRemoveButton(item, index)}
							</div>
						</div>
						{!isItemCollapsed && renderItem(item, index, handleItemChange)}
					</div>
				);
			})}

			<div className="flex flex-wrap items-center gap-2">
				<button
					type="button"
					disabled={isDisabled}
					onClick={() => onChange([...items, createItem()])}
					className={SECONDARY_BUTTON_CLASS}>
					+ {label} 추가
				</button>
				<button
					type="button"
					disabled={isDisabled}
					aria-disabled={!canReset}
					onClick={handleReset}
					className={cn(
						SECONDARY_BUTTON_CLASS,
						'border-transparent px-3 text-gray-500 underline',
						!canReset && 'opacity-50',
					)}>
					초기화
				</button>
			</div>
		</div>
	);
};

export default ListEditor;
