// @pages/Schedule/ScheduleLabel

import * as S from '@styles/pages/Schedule/ScheduleLabel.style';
import { Schedule } from '@/types/schedule';
import { SCHEDULE_LABEL_MAP, SCHEDULE_TYPE_COLORS } from '@/const/schedule';

const ScheduleLabel = () => {
	return (
		<S.LabelContainer>
			<S.LabelList>
				{(Object.keys(SCHEDULE_TYPE_COLORS) as Schedule['type'][]).map(eventType => {
					return (
						<S.LabelItem eventType={eventType} key={eventType}>
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
