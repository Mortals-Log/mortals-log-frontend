// @/pages/Profile/components/ProfileHeader

import * as S from '@/styles/pages/Profile/ProfileHeader.style';

import { PROFILE } from '@/const/profile';

export const ProfileHeader = () => {
	return (
		<S.ProfileHeader>
			<S.MainImage src={PROFILE.mainImage} alt={PROFILE.name} />
			<S.InfoSummary>
				<S.NameGroup>
					<p className="name ">{PROFILE.name}</p>
					<span className="sub-name">{PROFILE.enName}</span>
					<span className="sub-name">{PROFILE.hanjaName}</span>
				</S.NameGroup>

				<S.Description>{PROFILE.description}</S.Description>
			</S.InfoSummary>
		</S.ProfileHeader>
	);
};

export default ProfileHeader;
