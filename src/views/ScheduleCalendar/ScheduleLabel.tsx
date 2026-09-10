// @/pages/ScheduleCalendar/ScheduleLabel

import { memo } from 'react';
import { Schedule } from '@/types/schedule';
import { SCHEDULE_LABEL_MAP, SCHEDULE_TYPE_COLORS } from '@/const/schedule';
import { SL_LABEL_CONTAINER, SL_FILTER_TITLE, SL_LABEL_LIST, slLabelItem } from './calendar-classes';

interface ScheduleLabelProps {
	activeFilters: Schedule['type'][];
	onToggleFilter: (type: Schedule['type']) => void;
	onToggleAllFilters: () => void;
	totalCount: number;
}

const LABEL_TYPES = Object.keys(SCHEDULE_TYPE_COLORS) as Schedule['type'][];

const ScheduleLabel = ({ activeFilters, onToggleFilter, onToggleAllFilters, totalCount }: ScheduleLabelProps) => {
	const isAllActive = activeFilters.length === totalCount;

	return (
		<div className={SL_LABEL_CONTAINER}>
			<span className={SL_FILTER_TITLE}>필터</span>
			<ul className={SL_LABEL_LIST}>
				<li className={slLabelItem(isAllActive)} onClick={onToggleAllFilters}>
					ALL
				</li>

				{LABEL_TYPES.map(eventType => (
					<li
						key={eventType}
						className={slLabelItem(activeFilters.includes(eventType), eventType)}
						onClick={() => onToggleFilter(eventType)}>
						{SCHEDULE_LABEL_MAP[eventType]}
					</li>
				))}
			</ul>
		</div>
	);
};

export default memo(ScheduleLabel);
