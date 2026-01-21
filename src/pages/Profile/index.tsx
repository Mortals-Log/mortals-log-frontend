// @src/pages/Profile/index

import * as S from '@styles/pages/Profile.style';
import { ProfileHeader } from '@pages/Profile/ProfileHeader';
import ProfileDetailSection from '@pages/Profile/ProfileDetailSection';
import ProfileLinkSection from './ProfileLinkSection';

const SECTION_TITLE = {
	PROFILE: {
		TITLE_KR: '프로필',
		TITLE_EN: 'Profile',
	},
	LINK: {
		TITLE_KR: '공식 링크',
		TITLE_EN: 'Official Links',
	},
} as const;

const Profile = () => {
	return (
		<S.MainContainer>
			<ProfileHeader />

			<ProfileDetailSection {...SECTION_TITLE.PROFILE} />

			<ProfileLinkSection {...SECTION_TITLE.LINK} />
		</S.MainContainer>
	);
};

export default Profile;
