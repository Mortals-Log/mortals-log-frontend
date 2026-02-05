// @pages/Schedule/ScheduleLabel

import * as S from '@styles/pages/Schedule/ScheduleLabel.style';
import { Schedule, SCHEDULE_TYPE_COLORS } from '@/types/schedule';

const ScheduleLabel = () => {
	return (
		<S.LabelContainer>
			<S.LabelList>
				{(Object.keys(SCHEDULE_TYPE_COLORS) as Schedule['type'][]).map(eventType => {
					const labelMap = {
						ALBUM: '앨범',
						CONCERT: '공연/음악감상회',
						ANNIVERSARY: '기념일',
						BIRTHDAY: '생일',
						EVENT: '그 외',
					};

					return (
						<S.LabelItem eventType={eventType} key={eventType}>
							<S.LabelBadge eventType={eventType} />
							{labelMap[eventType]}
						</S.LabelItem>
					);
				})}
			</S.LabelList>
		</S.LabelContainer>
	);
};

export default ScheduleLabel;
