'use client';

// @/pages/Profile

import * as S from '@/styles/pages/Profile/Profile.style';

import { ProfileHeader } from '@/pages/Profile/ProfileHeader';
import ProfileDetailSection from '@/pages/Profile/ProfileDetailSection';
import ProfileLinkSection from '@/pages/Profile/ProfileLinkSection';
import ProfileCareerSection from '@/pages/Profile/ProfileCareerSection';
import ProfileDiscographySection from '@/pages/Profile/ProfileDiscographySection';

const SECTION_TITLE = {
	PROFILE: {
		TITLE_KR: '프로필',
		TITLE_EN: 'Profile',
	},
	LINK: {
		TITLE_KR: '공식 링크',
		TITLE_EN: 'Official Links',
	},
	CAREER: {
		TITLE_KR: '주요 활동',
		TITLE_EN: 'Career',
	},

	DISCOGRAPHY: {
		TITLE_KR: '앨범',
		TITLE_EN: 'Album',
	},
} as const;

const Profile = () => {
	return (
		<S.MainContainer>
			<ProfileHeader />

			<ProfileDetailSection {...SECTION_TITLE.PROFILE} />

			<ProfileDiscographySection {...SECTION_TITLE.DISCOGRAPHY} />

			<ProfileLinkSection {...SECTION_TITLE.LINK} />

			<ProfileCareerSection {...SECTION_TITLE.CAREER} />
	</S.MainContainer>
	);
};

export default Profile;
