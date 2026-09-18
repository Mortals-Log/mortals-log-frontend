// @/pages/Profile/ProfileDetailSection

import { JSX } from 'react';
import { Table } from '@/components/Table';
import { LAYOUT_CONTENT_SECTION, LAYOUT_SECTION_TITLE } from '@/const/layout-classes';
import { TABLE_WRAPPER } from '@/const/component-classes';
import { PD_DEBUT_INFO } from './profile-classes';
import { PROFILE } from '@/const/profile';
import { ParseDate, CalculateKorAge, CalculateIntAge, CalculateElapsedDays, CalculateElapsedYears } from '@/utils/date';

export const ProfileDetailSection = ({ TITLE_KR, TITLE_EN }: { TITLE_KR: string; TITLE_EN: string }) => {
	const birthDate = ParseDate(PROFILE.birth[0]);
	const korAge = CalculateKorAge(birthDate);
	const intAge = CalculateIntAge(birthDate);
	const debutYears = CalculateElapsedYears(PROFILE.debut[0]);
	const debutDays = CalculateElapsedDays(PROFILE.debut[0]);

	const PROFILE_LABELS = {
		BIRTH: '출생',
		NATIONALITY: '국적',
		EDUCATION: '학력',
		JOB: '직업',
		MBTI_BLOOD: 'MBTI / 혈액형',
		ALIAS: '별명',
		DEBUT: '데뷔',
		FANDOM: '팬덤',
	} as const;

	const profileData = [
		{ key: 'BIRTH', values: [`${PROFILE.birth[0]} (${korAge}세, 만 ${intAge}세)`, PROFILE.birth[1]] },
		{ key: 'NATIONALITY', values: [PROFILE.nationality] },
		{ key: 'EDUCATION', values: [PROFILE.education] },
		{ key: 'JOB', values: [PROFILE.job.join(' / ')] },
		{ key: 'MBTI_BLOOD', values: [`${PROFILE.mbti} / ${PROFILE.bloodType}`] },
		{ key: 'ALIAS', values: [PROFILE.alias.join(', ')] },
		{
			key: 'DEBUT',
			values: [
				`${PROFILE.debut[0]} (${PROFILE.debut[1]})`,
				<span className={PD_DEBUT_INFO} key="debut-days">
					<span>
						데뷔일로부터 <b>D+{debutDays}일</b>
					</span>
					<span className="divider" />
					<b>{debutYears}주년</b>
				</span>,
			],
		},
		{ key: 'FANDOM', values: [PROFILE.fandom] },
	] as const;

	return (
		<section className={LAYOUT_CONTENT_SECTION}>
			<div className={LAYOUT_SECTION_TITLE}>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</div>

			<table className={TABLE_WRAPPER}>
				<tbody>
					{profileData.map(({ key, values }) => (
						<Table
							key={key}
							label={PROFILE_LABELS[key as keyof typeof PROFILE_LABELS]}
							values={values as unknown as (string | JSX.Element)[]}
						/>
					))}
				</tbody>
			</table>
		</section>
	);
};

export default ProfileDetailSection;
