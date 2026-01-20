// @src/pages/Profile/index
import * as S from '@styles/pages/Profile.style';
import * as SLink from '@styles/components/SourceLink.style';
import * as SVerticalBar from '@styles/components/VerticalBar.style';
import { PROFILE } from '@const/contents';
import { JSX } from 'react';
import { ParseDate, CalculateKorAge, CalculateIntAge, CalculateElapsedDays, CalculateElapsedYears } from '@utils/date';
import { GetSnsLabel, GetSnsUrl } from '@/utils/snsUrl';

const SECTION_TITLE = {
	PROFILE: {
		KR: '프로필',
		EN: 'Profile',
	},
} as const;

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

const InfoRow = ({ label, values }: { label: string; values: (string | number | JSX.Element)[] }) => (
	<tr>
		<th>{label}</th>
		<td>
			{values.map((v, idx) => (
				<div key={idx}>
					<S.ValueItem>{v}</S.ValueItem>
					{idx < values.length - 1 && <S.RowSeparator />}
				</div>
			))}
		</td>
	</tr>
);

const Profile = () => {
	const birthDate = ParseDate(PROFILE.birth[0]);
	const korAge = CalculateKorAge(birthDate);
	const intAge = CalculateIntAge(birthDate);
	const debutYears = CalculateElapsedYears(PROFILE.debut[0]);
	const debutDays = CalculateElapsedDays(PROFILE.debut[0]);

	const { content, platform, account, contentTitle, postId } = PROFILE.description;

	return (
		<S.MainContainer>
			<S.ProfileHeader>
				<S.MainImage src={PROFILE.mainImage} alt={PROFILE.name} />
				<S.InfoSummary>
					<S.NameGroup>
						<h1>{PROFILE.name}</h1>
						{PROFILE.enName} <SVerticalBar.VerticalBar>|</SVerticalBar.VerticalBar> {PROFILE.hanjaName}
					</S.NameGroup>

					<S.Description>
						{content}
						<br />
						<SLink.SourceLink href={GetSnsUrl(platform, postId)} target="_blank" rel="noreferrer">
							{GetSnsLabel(platform, account, contentTitle)}
						</SLink.SourceLink>
					</S.Description>
				</S.InfoSummary>
			</S.ProfileHeader>

			<S.ProfileSection>
				<S.SectionTitle>
					{SECTION_TITLE.PROFILE.KR} <span>{SECTION_TITLE.PROFILE.EN}</span>
				</S.SectionTitle>
				<S.InfoTable>
					<tbody>
						<InfoRow
							label={PROFILE_LABELS.BIRTH}
							values={[`${PROFILE.birth[0]} (${korAge}세, 만 ${intAge}세)`, PROFILE.birth[1]]}
						/>
						<InfoRow label={PROFILE_LABELS.NATIONALITY} values={[PROFILE.nationality]} />
						<InfoRow label={PROFILE_LABELS.EDUCATION} values={[PROFILE.education]} />
						<InfoRow label={PROFILE_LABELS.JOB} values={[PROFILE.job.join(' / ')]} />
						<InfoRow label={PROFILE_LABELS.MBTI_BLOOD} values={[`${PROFILE.mbti} / ${PROFILE.bloodType}`]} />

						<InfoRow label={PROFILE_LABELS.ALIAS} values={[PROFILE.alias.join(', ')]} />

						<InfoRow
							label={PROFILE_LABELS.DEBUT}
							values={[
								`${PROFILE.debut[0]} (${PROFILE.debut[1]})`,
								<span>
									데뷔일로부터 <b>D+{debutDays}일</b>
									<SVerticalBar.VerticalBar> | </SVerticalBar.VerticalBar>
									<b>{debutYears}주년</b>
								</span>,
							]}
						/>
						<InfoRow label={PROFILE_LABELS.FANDOM} values={[PROFILE.fandom]} />
					</tbody>
				</S.InfoTable>
			</S.ProfileSection>
		</S.MainContainer>
	);
};

export default Profile;
