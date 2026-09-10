// @/pages/Profile/components/ProfileHeader

import { PH_HEADER, PH_MAIN_IMAGE, PH_INFO_SUMMARY, PH_NAME_GROUP, PH_DESCRIPTION } from './profile-classes';
import { PROFILE } from '@/const/profile';

export const ProfileHeader = () => {
	return (
		<section className={PH_HEADER}>
			<img className={PH_MAIN_IMAGE} src={PROFILE.mainImage} alt={PROFILE.name} />
			<div className={PH_INFO_SUMMARY}>
				<div className={PH_NAME_GROUP}>
					<p className="name ">{PROFILE.name}</p>
					<span className="sub-name">{PROFILE.enName}</span>
					<span className="sub-name">{PROFILE.hanjaName}</span>
				</div>

				<blockquote className={PH_DESCRIPTION}>{PROFILE.description}</blockquote>
			</div>
		</section>
	);
};

export default ProfileHeader;
