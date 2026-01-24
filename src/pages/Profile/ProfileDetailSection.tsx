// @src/pages/Profile/ProfileDetailSection.tsx

import * as S from '@styles/pages/Profile/ProfileDetailSection.style';
import { JSX } from 'react';
import { Table } from '@components/Table';
import { PROFILE } from '@const/contents';
import { ParseDate, CalculateKorAge, CalculateIntAge, CalculateElapsedDays, CalculateElapsedYears } from '@utils/date';

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
				<span>
					데뷔일로부터 <b>D+{debutDays}일</b>
					<S.VerticalBar> | </S.VerticalBar>
					<b>{debutYears}주년</b>
				</span>,
			],
		},
		{ key: 'FANDOM', values: [PROFILE.fandom] },
	] as const;

	return (
		<S.ContentSection>
			<S.SectionTitle>
				{TITLE_KR}
				<span>{TITLE_EN}</span>
			</S.SectionTitle>

			<S.Table>
				<tbody>
					{profileData.map(({ key, values }) => (
						<Table
							key={key}
							label={PROFILE_LABELS[key as keyof typeof PROFILE_LABELS]}
							values={values as unknown as (string | number | JSX.Element)[]}
						/>
					))}
				</tbody>
			</S.Table>
		</S.ContentSection>
	);
};

export default ProfileDetailSection;
