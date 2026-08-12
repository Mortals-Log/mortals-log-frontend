// @/pages/Music

import * as S from '@/styles/pages/Music/Music.style';

import { useState, useEffect } from 'react';
import Album from '@/pages/Album';
import Song from '@/pages/Song';
import { NAME } from '@/const/profile';
import { METADATA } from '@/const/contents';
import { UpdateMetaTags } from '@/utils/meta';

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

	useEffect(() => {
		const pageTitle = `${METADATA.NAME} | Music`;
		const description = PAGE_TITLE.DESCRIPTION;

		UpdateMetaTags(pageTitle, description, undefined, 'website');

		return () => {
			UpdateMetaTags(METADATA.NAME, METADATA.DESCRIPTION, undefined, 'website');
		};
	});

	return (
		<S.MainContainer>
			<S.SubTitle>{PAGE_TITLE.SUB}</S.SubTitle>
			<S.MainTitle>{PAGE_TITLE.MAIN}</S.MainTitle>

			<S.Description>{PAGE_TITLE.DESCRIPTION}</S.Description>

			<S.TabGroup>
				{tabs.map(tab => (
					<S.TabItem key={tab} $isActive={activeTab === tab} onClick={() => handleTabClick(tab)}>
						{tab}
					</S.TabItem>
				))}
			</S.TabGroup>

			{activeTab === '앨범' ? <Album /> : <Song />}
		</S.MainContainer>
	);
};

export default Music;
