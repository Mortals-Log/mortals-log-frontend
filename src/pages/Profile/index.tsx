// @src/pages/Profile/index

import * as S from '@styles/pages/Profile.style';
import * as SLink from '@styles/components/SourceLink.style';
import * as SVerticalBar from '@styles/components/VerticalBar.style';
import { LINKS, PROFILE } from '@const/contents';
import { LinkGroup } from '@/types/links';
import { JSX } from 'react';
import { ParseDate, CalculateKorAge, CalculateIntAge, CalculateElapsedDays, CalculateElapsedYears } from '@utils/date';
import { GetSnsLabel, GetSnsUrl } from '@/utils/snsUrl';
import { ICON_CONFIG } from '@const/icons';
import { IconKey } from '@/types/icon';

const SECTION_TITLE = {
	PROFILE: {
		KR: '프로필',
		EN: 'Profile',
	},
	LINK: {
		KR: '공식 링크',
		EN: 'Official Links',
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
					<SVerticalBar.VerticalBar> | </SVerticalBar.VerticalBar>
					<b>{debutYears}주년</b>
				</span>,
			],
		},
		{ key: 'FANDOM', values: [PROFILE.fandom] },
	] as const;

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

			<S.ContentSection>
				<S.SectionTitle>
					{SECTION_TITLE.PROFILE.KR} <span>{SECTION_TITLE.PROFILE.EN}</span>
				</S.SectionTitle>

				<S.ProfileTable>
					<tbody>
						{profileData.map(({ key, values }) => (
							<InfoRow
								key={key}
								label={PROFILE_LABELS[key as keyof typeof PROFILE_LABELS]}
								values={values as unknown as (string | number | JSX.Element)[]}
							/>
						))}
					</tbody>
				</S.ProfileTable>
			</S.ContentSection>

			<S.ContentSection>
				<S.SectionTitle>
					{SECTION_TITLE.LINK.KR} <span>{SECTION_TITLE.LINK.EN}</span>
				</S.SectionTitle>

				<S.ProfileTable>
					<tbody>
						{LINKS.map((group: LinkGroup) => (
							<InfoRow
								key={group.category}
								label={group.category}
								values={[
									<S.LinkWrapper key={group.category}>
										{group.items.map(item => {
											const key = item.label.toLowerCase().replace(/\s+/g, '') as IconKey;
											const config = ICON_CONFIG[key] || { icon: null, label: item.label };
											const Icon = config.icon;

											return (
												<S.LinkButton key={item.label} href={item.url} target="_blank" rel="noreferrer">
													<Icon width={16} height={16} />
													{config.label}
												</S.LinkButton>
											);
										})}
									</S.LinkWrapper>,
								]}
							/>
						))}
					</tbody>
				</S.ProfileTable>
			</S.ContentSection>
		</S.MainContainer>
	);
};

export default Profile;
