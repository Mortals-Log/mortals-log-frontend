// @src/pages/Album/AlbumTypeSection

import * as S from '@styles/pages/Music/Music.style';
import { useState } from 'react';
import Album from '../Album';
import Song from '../Song';
import { NAME } from '@/const/profile';
import AlbumPromotionSection from '../Album/AlbumPromotionSection';

const Music = () => {
	const PAGE_TITLE = {
		MAIN: '음악',
		SUB: 'Music',
		DESCRIPTION: `${NAME.KOREAN}의 정규 앨범부터 싱글, 라이브까지 각 앨범의 상세 정보와 수록곡을 확인할 수 있습니다.`,
	} as const;

	const [activeTab, setActiveTab] = useState('앨범');

	const tabs = ['앨범', '곡'] as const;

	const handleTabClick = (tab: (typeof tabs)[number]) => {
		setActiveTab(tab);
	};

	return (
		<S.MainContainer>
			<S.SubTitle>{PAGE_TITLE.SUB}</S.SubTitle>
			<S.MainTitle>{PAGE_TITLE.MAIN}</S.MainTitle>

			<S.Description>{PAGE_TITLE.DESCRIPTION}</S.Description>

			<AlbumPromotionSection />

			<S.TabList>
				<S.TabGroup>
					{tabs.map(tab => (
						<S.TabItem key={tab} $isActive={activeTab === tab} onClick={() => handleTabClick(tab)}>
							{tab}
						</S.TabItem>
					))}
				</S.TabGroup>
			</S.TabList>

			{activeTab === '앨범' ? <Album /> : <Song />}
		</S.MainContainer>
	);
};

export default Music;
