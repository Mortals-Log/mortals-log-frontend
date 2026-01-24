// @src/pages/Profile/components/ProfileHeader.tsx

import * as S from '@styles/pages/Profile/ProfileHeader.style';
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
					<S.VerticalBar> | </S.VerticalBar>
					{PROFILE.hanjaName}
				</S.NameGroup>

				<S.Description>
					{content}
					<br />
					<S.SourceLink
						href={GetSnsUrl(platform, postId) ?? undefined}
						$disabled={!GetSnsUrl(platform, postId)}
						target="_blank"
						rel="noreferrer">
						{GetSnsLabel(platform, account, contentTitle)}
					</S.SourceLink>
				</S.Description>
			</S.InfoSummary>
		</S.ProfileHeader>
	);
};

export default ProfileHeader;
