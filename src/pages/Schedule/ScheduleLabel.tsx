// @pages/Schedule/ScheduleLabel

import * as S from '@styles/pages/Schedule/ScheduleLabel.style';
import { Schedule } from '@/types/schedule';
import { SCHEDULE_LABEL_MAP, SCHEDULE_TYPE_COLORS } from '@/const/schedule';

interface ScheduleLabelProps {
	activeFilters: string[];
	onToggleFilter: (type: string) => void;
}

const ScheduleLabel = ({ activeFilters, onToggleFilter }: ScheduleLabelProps) => {
	const labels = Object.keys(SCHEDULE_TYPE_COLORS) as Schedule['type'][];

	return (
		<S.LabelContainer>
			<S.LabelList>
				{labels.map(eventType => {
					const isActive = activeFilters.includes(eventType);

					return (
						<S.LabelItem
							key={eventType}
							eventType={eventType}
							isActive={isActive}
							onClick={() => onToggleFilter(eventType)}>
							<S.LabelBadge eventType={eventType} />
							{SCHEDULE_LABEL_MAP[eventType]}
						</S.LabelItem>
					);
				})}
			</S.LabelList>
		</S.LabelContainer>
	);
};

export default ScheduleLabel;
