// @src/pages/Profile/components/ProfileHeader.tsx

import * as S from '@styles/pages/Profile/ProfileHeader.style';

import { PROFILE } from '@const/profile';
import { GetSnsLabel, GetSnsUrl } from '@utils/snsUrl';

export const ProfileHeader = () => {
	const { content, platform, account, contentTitle, postId } = PROFILE.description;

	return (
		<S.ProfileHeader>
			<S.MainImage src={PROFILE.mainImage} alt={PROFILE.name} />
			<S.InfoSummary>
				<S.NameGroup>
					<p className="name ">{PROFILE.name}</p>
					<span className="sub-name">{PROFILE.enName}</span>
					<span className="sub-name">{PROFILE.hanjaName}</span>
				</S.NameGroup>

				<S.Description>
					{content}
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
