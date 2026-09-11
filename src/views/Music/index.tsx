'use client';

// @/views/Music

import { useState } from 'react';
import Album from '@/views/Album';
import Song from '@/views/Song';
import { NAME } from '@/const/profile';
import { LAYOUT_MAIN_TITLE, LAYOUT_SUB_TITLE, LAYOUT_DESCRIPTION } from '@/const/layout-classes';
import { MUSIC_MAIN, MUSIC_TAB_GROUP, musicTab } from './music-classes';

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
		<main className={MUSIC_MAIN}>
			<span className={LAYOUT_SUB_TITLE}>{PAGE_TITLE.SUB}</span>
			<div className={LAYOUT_MAIN_TITLE}>{PAGE_TITLE.MAIN}</div>

			<div className={LAYOUT_DESCRIPTION}>{PAGE_TITLE.DESCRIPTION}</div>

			<ul className={MUSIC_TAB_GROUP}>
				{tabs.map(tab => (
					<li key={tab} className={musicTab(activeTab === tab)} onClick={() => handleTabClick(tab)}>
						{tab}
					</li>
				))}
			</ul>

			{activeTab === '앨범' ? <Album /> : <Song />}
		</main>
	);
};

export default Music;
