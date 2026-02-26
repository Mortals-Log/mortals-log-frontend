// @src/pages/Profile/components/ProfileHeader.tsx

import * as S from '@/styles/pages/Profile/ProfileHeader.style';

import { PROFILE } from '@/const/profile';
import { GetSnsLabel, GetSnsUrl } from '@/utils/snsUrl';

export const ProfileHeader = () => {
	const { content, platform, account, contentTitle, postId } = PROFILE.description;
	const SnsUrl = GetSnsUrl(platform, postId);

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

					{SnsUrl ? (
						<S.SourceLink to={SnsUrl} $disabled={!GetSnsUrl(platform, postId)} target="_blank" rel="noreferrer">
							{GetSnsLabel(platform, account, contentTitle)}
						</S.SourceLink>
					) : (
						<span className="disabled">{GetSnsLabel(platform, account, contentTitle)}</span>
					)}
				</S.Description>
			</S.InfoSummary>
		</S.ProfileHeader>
	);
};

export default ProfileHeader;
