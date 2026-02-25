// @pages/Schedule/ScheduleLabel

import * as S from '@/styles/pages/Schedule/ScheduleLabel.style';

import { memo } from 'react';
import { Schedule } from '@/types/schedule';
import { SCHEDULE_LABEL_MAP, SCHEDULE_TYPE_COLORS } from '@/const/schedule';

interface ScheduleLabelProps {
	activeFilters: Schedule['type'][];
	onToggleFilter: (type: Schedule['type']) => void;
	onToggleAllFilters: () => void;
	totalCount: number;
}

const ScheduleLabel = ({ activeFilters, onToggleFilter, onToggleAllFilters, totalCount }: ScheduleLabelProps) => {
	const labels = Object.keys(SCHEDULE_TYPE_COLORS) as Schedule['type'][];
	const isAllActive = activeFilters.length === totalCount;

	return (
		<S.LabelContainer>
			<S.FilterTitle>필터</S.FilterTitle>
			<S.LabelList>
				<S.LabelItem $isActive={isAllActive} onClick={onToggleAllFilters}>
					ALL
				</S.LabelItem>

				{labels.map(eventType => (
					<S.LabelItem
						key={eventType}
						$eventType={eventType}
						$isActive={activeFilters.includes(eventType)}
						onClick={() => onToggleFilter(eventType)}>
						{SCHEDULE_LABEL_MAP[eventType]}
					</S.LabelItem>
				))}
			</S.LabelList>
		</S.LabelContainer>
	);
};

export default memo(ScheduleLabel);
