// @src/pages/Profile/components/ProfileHeader.tsx

import * as S from '@styles/pages/Profile.style';
import * as SLink from '@styles/components/SourceLink.style';
import * as SVerticalBar from '@styles/components/VerticalBar.style';
import { PROFILE } from '@const/contents';
import { GetSnsLabel, GetSnsUrl } from '@/utils/snsUrl';

export const ProfileHeader = () => {
	const { content, platform, account, contentTitle, postId } = PROFILE.description;

	return (
		<S.ProfileHeader>
			<S.MainImage src={PROFILE.mainImage} alt={PROFILE.name} />
			<S.InfoSummary>
				<S.NameGroup>
					<h1>{PROFILE.name}</h1>
					{PROFILE.enName}
					<SVerticalBar.VerticalBar> | </SVerticalBar.VerticalBar>
					{PROFILE.hanjaName}
				</S.NameGroup>

				<S.Description>
					{content}
					<br />
					<SLink.SourceLink
						href={GetSnsUrl(platform, postId) ?? undefined}
						$disabled={!GetSnsUrl(platform, postId)}
						target="_blank"
						rel="noreferrer">
						{GetSnsLabel(platform, account, contentTitle)}
					</SLink.SourceLink>
				</S.Description>
			</S.InfoSummary>
		</S.ProfileHeader>
	);
};

export default ProfileHeader;
