// @pages/Schedule/ScheduleLabel

import * as S from '@styles/pages/Schedule/ScheduleLabel.style';
import { Schedule } from '@/types/schedule';
import { SCHEDULE_LABEL_MAP, SCHEDULE_TYPE_COLORS } from '@/const/schedule';

interface ScheduleLabelProps {
	activeFilters: string[];
	onToggleFilter: (type: string) => void;
	onToggleAllFilters: () => void;
	totalCount: number;
}

const ScheduleLabel = ({ activeFilters, onToggleFilter, onToggleAllFilters, totalCount }: ScheduleLabelProps) => {
	const labels = Object.keys(SCHEDULE_TYPE_COLORS) as Schedule['type'][];
	const isAllActive = activeFilters.length === totalCount;

	return (
		<S.LabelContainer>
			<span>필터</span>
			<S.LabelList>
				<S.LabelItem isActive={isAllActive} onClick={onToggleAllFilters}>
					ALL
				</S.LabelItem>

				{labels.map(eventType => {
					const isActive = activeFilters.includes(eventType);

					return (
						<S.LabelItem
							key={eventType}
							eventType={eventType}
							isActive={isActive}
							onClick={() => onToggleFilter(eventType)}>
							{SCHEDULE_LABEL_MAP[eventType]}
						</S.LabelItem>
					);
				})}
			</S.LabelList>
		</S.LabelContainer>
	);
};

export default ScheduleLabel;
