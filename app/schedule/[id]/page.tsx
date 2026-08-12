import type { Metadata } from 'next';
import { ALL_SCHEDULE_LIST } from '@utils/schedule';
import { FULL_CONCERTS } from '@const/concert';
import { SCHEDULE_LABEL_MAP } from '@const/schedule';
import { METADATA } from '@const/contents';
import ScheduleDetail from '@pages/ScheduleDetail';

export const generateStaticParams = () => {
	return ALL_SCHEDULE_LIST.map(item => ({ id: String(item.id) }));
};

export const generateMetadata = async ({
	params,
}: {
	params: Promise<{ id: string }>;
}): Promise<Metadata> => {
	const { id } = await params;
	const scheduleBase = ALL_SCHEDULE_LIST.find(item => String(item.id) === id);

	if (!scheduleBase) {
		return { title: METADATA.NAME, description: METADATA.DESCRIPTION };
	}

	const concertMatch = FULL_CONCERTS.flatMap(g => g.items).find(i => scheduleBase.content.includes(i.content));
	const displayTitle = concertMatch?.content || scheduleBase.content;
	const categoryLabel = SCHEDULE_LABEL_MAP[scheduleBase.type];

	return {
		title: `${METADATA.NAME} | [${categoryLabel}] ${displayTitle}`,
		description: `${scheduleBase.date} - ${displayTitle} 일정을 확인하세요.`,
		openGraph: { images: scheduleBase.imageUrl ? [scheduleBase.imageUrl] : undefined },
	};
};

const Page = () => <ScheduleDetail />;

export default Page;
