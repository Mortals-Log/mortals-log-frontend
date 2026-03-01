// @/const/albums

/* eslint-disable storybook/default-exports */

import { Album, AlbumList } from '@/types/album';
import { STORE_PLATFORM, MUSIC_PLATFORM } from '@const/links';

const getReleaseTime = (date: string) => Number(date.replace(/[^0-9]/g, ''));

const sortAlbumsLatest = (albums: Album[]) => {
	return [...albums].sort((a, b) => getReleaseTime(b.releaseDate) - getReleaseTime(a.releaseDate));
};

export const ALBUM_TYPE_LABEL: Record<string, string> = {
	LP: '정규 앨범',
	EP: 'EP',
	SP: '싱글',
	LV: '라이브 앨범',
	VN: 'LP',
};

export const LP_ALBUMS: Album[] = [
	{
		type: 'LP',
		volume: 1,
		title: '명상좀비',
		fileName: 'meditation-zombie',
		releaseDate: '2022.11.21',
		intro: `앨범 제목 '명상좀비(Meditation Zombie)'는 가장 이질적인 두 단어를 조합해 만들었습니다.
요즘 젊은이들이 끊임없이 느끼는 막연한 불안감과 경쟁심, 쉴 때 쉬지 못하는 피곤함 - 이 모든 것들이 어쩌면 외부 자극에서 비롯된다는 생각이 들었습니다.
큰 소리에 떼로 몰려다니는 좀비들, 인육냄새에 환장하는 춤추는 시체들에게 가장 필요한 것은 어쩌면 내적 평화가 아닐까요?
좀비도 명상으로 치유받을 수 있길 기원하며, 여덟곡 만들어 보았습니다. 재밌게 들어주세요.

Vocal, Guitar Recorded by 천진우
Harmonica, Kazoo Recorded by 천진우
Composed by 천진우 / Lyrics by 천진우 / Arranged by 천진우
Mixed and Masterd by 천진우
Special thanks to 안성훈(Ash)
제작지원 강원문화재단

[TRACK REVIEW]

01. 헐크호건 존시나가 같이 삽니다 (Hulk Hogan vs John Cena)
조용할 일 없는 우리 마을엔 헐크호건 존시나가 같이 삽니다.

02. 불나방 (Bulnabang) *TITLE
뛰어들어도, 결과는 이미 알잖아요. 그래도, 불나방이니까.

03. 내일을 위한 오늘은 없다 (I Don't Live For Tomorrow)
내일은 오늘보다 하루 더 죽음에 가깝습니다. 그러니 조금 더 장렬하게.

04. 매운인간 (Spicy Man)
저는 어째 사람보다 모기한테 인기가 더 좋아요.

05. 팡이 (Mold)
곰팡이 좀 피어도 괜찮아요. 소고기니까.

06. 여름좀비 (Summer Zombie)
별 뜻 없는 가사에 최대한 부드러운 멜로디를 붙여봤습니다.

07. 아파요 (Hurt)
잠을 못 자면, 두들겨 맞는 것처럼 아파요. 그래서 두들겨 맞는 사람처럼 불렀습니다.

08. 잘가요 (Farewell)
젊음이 불완전하고, 불안하며 불가피한 시간으로만 느껴지는 분들을 위한 노래입니다.`,
		tracks: ['TRK_LP01_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '26:08',
		agency: '천진우',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/uS8StuNj12Q?si=4rjDeG6rztKKcXtB',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11106041',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/76kVKnEUb6SPtu4R0skfBp',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/meditation-zombie/1657083277',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20529014?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=83193277',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'LP',
		volume: 2,
		title: '푸줏간',
		fileName: 'butcher-shop',
		releaseDate: '2023.04.01',
		intro: `친구와 술을 마시다가, 그런 얘길 들었습니다. 가수는 원래 2집으로 자기 음악을 증명해야 한다고. 친구는 술에 취해 한 말이었지만, 저는 왠지 그 말이 좋았습니다.
독립음악을 하는 인디뮤지션으로서 어떤 앨범을 만들어야 할까 고민했고, 결국 지금 제가 꽂혀있는 음악 장르를 소화해야겠다고 결심했습니다.
대중에게 얼마나 인기 있느냐, 시장에서 성공 가능성이 있느냐를 따지기보다 제 입맛에 맞췄습니다. 그리고 제 입맛엔, 여러분, 의심의 여지가 없습니다.
제가 차린 푸줏간으로 오세요. 맛 좋고 질 좋은 고기 11덩이 준비했습니다.

*TRACK*
01. 좆됐다 좆됐어 *TITLE
일상 속에서 느닷없이 '좆됐다'고 느끼는 순간이 있습니다. 그럴 때마다 이 노래를 곱씹어주세요.

02. 꽐라 블루스
세상이 빙빙 도는데, 어떻게든 귀가하려는 마음입니다. 술에 진탕 취한 것처럼 불렀습니다.

03. 생일축하해
스코틀랜드 민요 Auld Lang Syne과 미국 남북전쟁 전투찬가 John Brown's Body를 편곡/개사한 곡입니다. 생일 축하드립니다.

04. 마음농장 *TITLE
어른과 어린이 모두를 위한 동요를 쓰고 싶었습니다. 리코더, 트라이앵글, 콩주머니, 멜로디언 등 초등학교에서 사용하는 악기를 썼습니다.

05. 공포탄
Tom Waits를 위한 송가입니다. 탁한 뒷골목 냄새를 내고 싶었습니다. 시골마을 한 남자의 짝사랑 이야기입니다.

06. 그래 뭐가 됐든 결국 지나간다
만약 힘든 시간을 겪는 중이라면, 뭐가 됐든 결국 지나간다는 걸 잊지 마세요.

07. 자포자기
아이리쉬 음악의 신나는 리듬과 악기편성을 적극 활용한 노래입니다. 곰팡이와 싸우다 지친 반지하 주민의 이야기입니다.

08. 돈벌레
언제쯤 빛을 볼 수 있을까요. 아직은 잘 모르겠습니다. 마리아치 장르의 노래입니다.

09. 집에 가자
퇴근길은 물론 즐겁지만, 때론 집에 가는 길이 너무 멀게 느껴질 때가 있습니다. 꽉 찬 지하철에 갇혔다면 이 신나는 로커빌리 노래를 들어주세요.

10. 혼술
혼자 술을 마시는 사람은 알코올 중독에 걸릴 확률이 높다고 합니다. 하지만 가끔은 혼자 훌쩍 홀짝이고 싶은 걸요.

11. 도움을 받아요
'푸줏간' 앨범은 술에 대한 언급이 많습니다. 마지막 노래만큼은 경각심을 주고 싶었습니다. 들어주셔서 감사합니다.


*CREDIT*
Vocal, Guitar Recorded by 천진우
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우
Mixed and Masterd by 천진우
Special thanks to 안성훈(Ash)`,
		tracks: ['TRK_LP02_*'],
		genre: ['포크 팝'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '24:47',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-2집-푸줏간-cd/23612/category/29/display/1/',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/KG-3iAhPJjM?si=dNZyw-gY8IoK61LT',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11215393',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/0uFpvELN23fgKNHQ69zZg8',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/butcher-shop/1681015017',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20556844?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=83688438',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'LP',
		volume: 3,
		title: '천진우 캐롤 모음집',
		fileName: 'korean-carol',
		releaseDate: '2023.12.01',
		intro: `처음엔 분명 '크리스마스야 미안해' 한 곡만 싱글로 내려고 했습니다. 그런데 찾아 보니 옛날 캐롤 저작권이 대부분 만료되었더라구요.
아뿔싸... 마음속 작은 고블린이 또 채찍을 들었죠. 그리하여 4곡의 창작곡과 4곡의 번안곡으로 이루어진 정규 3집을 만들게 되었습니다.
포근하고 따듯한 제 캐롤들로 여러분의 겨울을 채워주세요. 스웨터를 입으시고 따듯한 코코아도 마셔요.
신나는 크리스마스, 즐거운 연말. 모두 행복이 가득하길!

*TRACK*
01. 크리스마스야 미안해 *TITLE
으레 주어지는 크리스마스의 기댓값을 충족하지 못한 나의 12월 25일에게. 미안.

02. We Wish You A Merry Christmas
모두 메리 크리스마스! 그리고 행복한 새해!

03. 징글벨
컨트리 느낌의 징글벨입니다. 썰매를 타던 동심을 떠올려보아요.

04. 고요한 밤 거룩한 밤
크리스마스라고 크게 다르진 않아요. 외로움과 취기는 제 짝꿍이죠.

05. 울면 안돼
눈물은 꾹 참으세요. 얼굴 찌푸리지 말아요. 못생겨져요.

06. 구석지기 산타
뽕짝 싸구려 싼타의 시장바닥 블루스.

07. 아이스크림
하릴없이 먹어가는 나이를 위한 이탈리아식 송가.

08. 12월 31일
연말은 늘 설레는 마음 반, 후회되는 마음 반. 어쩌겠습니까, 시간은 어김없이 흘렀죠. 내년에 봐요!


*CREDIT*
Vocal, Guitar Recorded by 천진우
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우
Mixed and Masterd by 천진우
Special thanks to 안성훈(Ash)`,
		tracks: ['TRK_LP03_*'],
		genre: ['포크 팝', '캐롤'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '19:41',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-3집-천진우-캐롤-모음집-cd/23613/category/29/display/1/',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/2aG3uwFmGJQ?si=axDZGjErVotWpoga',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11376188',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/3YRNi3ESZ10RIRVSZr20PP',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/korean-carol/1717714699',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20609206?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=84552915',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'LP',
		volume: 4,
		title: '나는 기계가 싫어요',
		fileName: 'luddite',
		releaseDate: '2024.11.11',
		intro: `좀 더 영혼이 담긴 앨범을 만들 순 없을까? 물론 최선을 다하지 않은 앨범은 없었지만.
미디, 가상악기, 홈레코딩, 혼자 작사, 작곡, 편곡. 어쩌면 골방에 틀어박혀서 하는 내 작업 방식이 조금은 틀에 박힌지도 모르겠다. 거기서 벗어나보고 싶었다. 이번에 만든 10곡의 노래는 멋진 뮤지션들과 함께 편곡했고, 단독공연을 진행하는 공연장에서 현장 녹음해 만들었다. 모험이었고, 다행히 결과물은 무척 마음에 든다.
중독자, 노인을 위한 나라, 터미네이터 등 가사에서도 기존 앨범들과 차별점을 두었다. 컨트리, 블루그래스 장르를 차용했지만 촌스러운 느낌의 가사는 지양했다. 결국 조금은 사회 선생 같은 가사가 나온 것 같지만.
이 프로젝트를 기획하고부터 고민도 많이 하고 고생도 했지만, 그래서인지 내가 지금까지 만든 앨범 중에 가장 사랑스럽다. 벌레로 치자면 화려한 딱정벌레의 박제가 아닌 살아서 꿈틀대는 바퀴벌레 같은 앨범이다. 함께 해준 전우들에게 진심으로 감사한다.

-TRACK-

01. 중독자
02. 노인을 위한 나라
03. 불면증
04. 좋은 친구들
05. 바퀴벌레
06. 터미네이터
07. 쇠사슬
08. 대가리총
09. 주정뱅이 딴따라 미친년과 빚쟁이
10. 장송곡

-CREDIT-

Vocal 천진우
Chorus 김한수 강주은 기토
Guitar 천진우
Banjitar 기토
Trumpet 김한수
Contrabass 강주은
Tambourine 천진우
Composed by 천진우
Arranged by 천진우 기토 김한수 강주은
Mixed & Mastered by 천진우
Recorded by 최종현
Photo by Kim Yeyeon
Special Thanks to 안성훈(ASH)`,
		tracks: ['TRK_LP04_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '32:09',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-나는-기계가-싫어요-cd/26620/category/29/display/1/',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://www.youtube.com/watch?v=ZLwYtp2Xd6o',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11637345',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/7lrlYIETvRxY9vsmVE2CAY',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/luddite/1777955241',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20683663?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=85757443',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'LP',
		volume: 5,
		title: '꽃순이',
		fileName: 'her',
		releaseDate: '2025.06.13',
		intro: `꽃순이의 일대기를 앨범으로 기록해보았습니다. 꽃순이의 입이 아닌 꽃순이 주변사람들의 입을 통해서요. 초반에는 꽃순이 아비의 이야기로, 중반부터는 성장한 꽃순이와 혼인하는 노총각 김씨의 이야기로 진행됩니다.
꽃순이는 어떤 사람이었을까요? 깡조밥만 먹던 어린 시절엔, 어미는 집나가고 아비도 죽어 혼자 남았을 땐, 애정 넘치는 김씨와 혼인한 뒤엔, 꽃순이는 무슨 생각을 하고 있었을까요?
저는 알 길이 없습니다. 옛 이야기를 옛 장르인 델타 블루스로 옮겨적었다고 생각해주세요.

*TRACK*
01. 깡조밥
02. 꽃순이네 아비는 파산했다
03. 귀신
04. 노총각
05. 소쩍새
06. 워메
07. 밥해주오
08. 금술 좋은 부부
09. 님 따라가오

*CREDIT*
Vocal 천진우
Guitar 천진우, 법영이
Drum and Percussion 리장단
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우, 리장단, 법영이
Mixed and Mastered by 천진우
Album Art by 정구팔
Special Thanks to 애쉬`,
		tracks: ['TRK_LP05_*'],
		genre: ['포크/어쿠스틱', '인디'],
		style: ['인디 포크'],
		distributor: '아토엔터테인먼트',
		totalDuration: '15:24',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-꽃순이-cd/28585/category/29/display/1/',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/n2a5FNFfBCw?si=vGMQ-Uu2ulGMnbqu',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11854704',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/34oObiY4E8jsue6l9Tg6X4',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/꽃순이/1819703988',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20732626?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=86380459',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'LP',
		volume: 6,
		title: '졸업앨범',
		fileName: 'yearbook',
		releaseDate: '2025.11.21',
		intro: `데뷔 3년 차에 정규 6집을 발매하는 천진우는 사실 중학교 기간제 교사로도 일하고 있습니다.
앨범이 발매된 2025년에는 서울의 금옥중학교 1학년 11반 담임이자 생활상담부 소속 사회 선생님이였습니다.
독특한 커리어를 이어오던 그가 드디어 예술가와 교사의 경계를 허문 앨범을 들고 왔습니다.
앨범 커버 모델은 금옥중 밴드부 아이들이 되었고, 몇 곡에서는 학생들이 악기 세션 녹음에 직접 참여하기도 했으며, 5번 트랙 사춘기라는 노래에서는 아예 중2 제자에게 노래까지 시킵니다.
가사 역시 학교를 주제로 천진우 특유의 은유적인 표현이 돋보여 청소년들은 물론 어른들도 즐겁게 공감할 수 있습니다.
졸업앨범은 단순한 과거의 기록이 아닌 언제든 펼치기만 하면 그 때로 돌아갈 수 있는 타임머신이죠.
탑승하세요, 여러분을 천진우의 학교로 초대합니다.

01. 아이들
- 아이들에게 미안합니다, 이제 신세 질 일만 남아서...
Vocal 천진우
Chorus Vocal 천진우
Banjitar 천진우

02. 이번 방학엔 공부 좀 해라
- 방학 때 학생답게 공부 좀 하십쇼. 놀 궁리만 하지 말고
Vocal 천진우
Chorus Vocal 양동훈, 천진우
Acoustic Guitar 천진우
Electric Guitar 법영이, 천진우
Bass 양동훈
Trumpet 김한수

03. 성장통
- 잘 하는 것도 하나 없는데 자라는 와중에도 아파야 하나?
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우
Electric Guitar 안성훈(ASH), 천진우

04. 스카
- 스터디 카페와 스카 펑크의 만남
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우
Electric Guitar 천진우

05. 사춘기
- 만들긴 했는데 내가 부르려니 도저히 감성이 안 살아서, 중2 제자가 부름.
Guest Vocal 박예음
Chorus Vocal 이승환
Acoustic Guitar 천진우
Bass 이하윤

06. 여드름
- 청소년기의 자괴감 독재자 여드름.
Vocal 천진우
Chorus Vocal 천진우
Electric Guitar 천진우
Bass 천진우

07. 장래희망
- 진로 상담을 하다보면 단순히 돈 많이 버는 직업이 꿈이라는 대답을 종종 듣는다. 더 이상 결핍이 기본값이 아니게 된 세상에서 이건 매우 슬픈 일이다.
Vocal 천진우
Acoustic Guitar 천진우
Electric Guitar 신재성, 천진우

08. 졸업 *title
- 이 앨범 중 가장 마지막에 만든 노래. 졸업은 곧 새로운 시작일 뿐.
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우
Electric Guitar 천진우
Bass 이하윤

09. 퇴근
- 학교 얘기는 이제 끝! 퇴근하면 나도 나만의 구질구질한 삶이 있다.
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우
Banjitar 법영이
Contrabass 강주은
Harmonica 천진우

10. 비둘기들의 도시
- 서울에서 산지 어느덧 4년. 이젠 떠나고 싶다.
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우

11. 휴식행 티켓
- 감기라도 걸리지 않고서는 맘 편히 쉬지도 못하는 나
Vocal 천진우
Chorus Vocal 천진우
Acoustic Guitar 천진우
Gayageum 이로운

[CREDIT]

Vocal 천진우
Guest Vocal 박예음
Chorus Vocal 천진우, 양동훈, 이승환
Acoustic Guitar 천진우
Electric Guitar 천진우, 법영이, 신재성, 안성훈(ASH)
Banjitar 법영이
Trumpet 김한수
Gayageum 이로운
Harmonica 천진우
Contrabass 강주은
Bass 양동훈, 이하윤, 천진우
Lyrics by 천진우
Composed by 천진우
Arranged by 천진우
Mixed and Mastered by 천진우
Photo by 천진우
Special Thanks to 안성훈(ASH)`,
		tracks: ['TRK_LP06_*'],
		genre: ['인디', '락/메탈'],
		style: ['인디 락'],
		distributor: '아토엔터테인먼트',
		totalDuration: '28:40',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-졸업앨범-cd/30244/category/29/display/1/',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/rbFkq0V5jVo?si=k9T1u7rCq3xRtYaR',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=12397639',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/6zB2odxBCXRaOuswzss65L',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/yearbook/1852687979',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20770857?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=86957365',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
];

const EP_ALBUMS: Album[] = [
	{
		type: 'EP',
		title: '굴다리',
		fileName: 'tunnel',
		releaseDate: '2022.08.20',
		intro: `굴다리 앞을 지나는데, 문득 제가 사는 반지하 방이 떠오르더랍니다.
파릇파릇해야 할 청춘인데, 굴다리에 깔린 이끼처럼 푸르딩딩하게 썩고 있네요.
어쩌겠습니까. 계속 살아봐야죠.
천진우의 첫 EP ‘굴다리(Tunnel)’입니다. 6곡 준비했습니다. 재밌게 들어주세요.

Vocal, Guitar Recorded by 천진우
Composed by 천진우 / Lyrics by 천진우 / Arranged by 천진우
Special thanks to 안성훈(Ash)

[TRACK REVIEW]

01. 청춘 (Youth) *TITLE
벌써 해가 떴던가요? 제 방에선 안 보이네요.

02. 카페인 (Coffee)
나이란 게 참. 아직 어린앤데, 또 너무 늙었어요.

03. 주정뱅이 딴따라 미친년과 빚쟁이 (Drunk)
인사불성으로 취하거나, 기차 꼬리 칸에 타고 떠나거나.

04. 시궁쥐 (Rat)
진창에서 발버둥 치는 쥐새끼를 봤습니다. 사람이라면 목놓아 엄마를 부르겠죠.

05. 멸망 (Fall)
잊지 못할 상처가 있다면, 잊어버리세요.

06. 다리에서요 (On the bridge)
굴다리 밑의 삶은 다리 위에서 내려다볼 때도 비극일까요?`,
		tracks: ['TRK_EP01_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '21:42',
		agency: '천진우',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/K9aIiynSPU4?si=YzCZS56zLSqIivlt',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11033850',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/3tNEpPagERcbv2Cgv7bfgV',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/tunnel-ep/1641679828',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20487623?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=82912759',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'EP',
		title: '일기장',
		fileName: 'diary',
		releaseDate: '2023.07.07',
		intro: `페르소나를 걷어내고 제 개인적인 상념을 일기처럼 풀어보았습니다. 쉬실 때 커피 한 잔 하시면서 가볍게 들어주세요.

*TRACK*
01. 내 마음속 작은 고블린
좀 쉬려고 하면 마음속 고블린이 채찍을 휘두릅니다. 게으른 녀석, 뭐든 해!

02. 노스텔지어 *TITLE
나를 사로잡는 막연한 아련함.

03. 배고파요
먹어도 먹어도 배가 고픕니다. 어쩌면 단순한 허기가 아닌 걸까요.

04. 꿈을 꾸었어요
어릴 때 꾸었던 꿈을 이제 갚을 때가 된 것 같습니다.


*CREDIT*

Vocal, Guitar Recorded by 천진우
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우
Mixed and Masterd by 천진우
Special thanks to 안성훈(Ash)
Album Cover by 이시헌
`,
		tracks: ['TRK_EP02_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '11:32',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-ep-일기장-cd/23611/category/29/display/1/',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/_4q-ZJZsyDc?si=tKoxVzohiQI29s4Z',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11281398',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/6VS9H8S2BdnHE21elu6Y5T',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/diary-ep/1694845859',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20576889?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=84019489',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'EP',
		title: '귀천',
		fileName: 'up',
		releaseDate: '2024.09.09',
		intro: `일기장2라고 보아도 좋을 것 같습니다. 사용된 5가지 악기를 모두 직접 연주해서 녹음했습니다.
앨범은 전체적으로 한 호흡입니다. 6곡이 1곡으로 느껴지길 바랐습니다. 그렇게 들어주셨으면 좋겠습니다.

*TRACK*
01. 쇠창살이 없는 감옥
02. 빈그릇
03. 감기네요
04. 안개
05. 우리는 나한테만 너무 가혹하다
06. 조각구름

*CREDIT*
Vocal 천진우
Acoustic Guitar 천진우
Concertina 천진우
Irish Whistle 천진우
Metal Cup 천진우
Glockenspiel 천진우
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우
Mixed and Masterd by 천진우
Special thanks to 안성훈(Ash)
Album Photo by 천진우`,
		tracks: ['TRK_EP03_*'],
		genre: ['포크/어쿠스틱', '인디'],
		style: ['포크 팝', '인디 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '09:06',
		agency: '천진우',
		store:
			'https://gimbabrecords.com/product/천진우-ep-귀천-cd-인간쓰레기-고백-세모-네모-동그라미-수록/26170/category/29/display/1/',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/qnKgeQQlu2I?si=WhQPTZ8O3iqQaX38',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11586993',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/5sAzmr1E8xXMtYcQdWySG1',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/up-ep/1766063977',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20669687?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=85575650',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
];

const SP_ALBUMS: Album[] = [
	{
		type: 'SP',
		title: '속편',
		fileName: 'sequel',
		releaseDate: '2023.01.25',
		intro: `열렬히 좋아했던 영화의 속편은 왜 늘 실망스러울까요. 같은 화면에서 같은 인물이 같은 대사를 읊지만, 주는 감동이 다릅니다.
어쩌면 헤어졌다 다시 사귀기를 반복하는 연애도 그런 맛이 아닐까 싶습니다.
다 끝난 영화를 어찌저찌 이어가려고 노력해보지만, 이미 본편이 아닌 속편입니다.
그럼에도 우리는 속편 소식에 불만스런 기대감을 감추지 못합니다. 그게 묘미라면 또 묘미니까요.

Vocal, Guitar Recorded by 천진우
Composed by 천진우 / Lyrics by 천진우 / Arranged by 천진우
Mixed and Masterd by 천진우
Special thanks to 안성훈(Ash)`,
		tracks: ['TRK_SP01_*'],
		genre: ['발라드'],
		style: ['발라드'],
		distributor: '아토엔터테인먼트',
		totalDuration: '03:31',
		agency: '천진우',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/wI4C5XwFb-Y?si=XbB07O369-XYhVzN',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11154192',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/3LKGSbooXoEV2ZT4vuydLG',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/sequel-single/1668934799',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20541819?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=83453549',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'SP',
		title: '인간쓰레기',
		fileName: 'trashman',
		releaseDate: '2024.03.03',
		intro: `천진우 느와르 3부작 중 첫번째 '인간쓰레기'
우리의 무능력함과 게으름은, 오로지 젊기에 역겹다.
인간쓰레기에는 불이 붙지 않는다.


*CREDIT*
Vocal, Guitar Recorded by 천진우
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우
Mixed and Masterd by 천진우
Special thanks to 안성훈(Ash)
Album Photo by KimYeyeon`,
		tracks: ['TRK_SP02_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '02:42',
		agency: '천진우',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/GllfjpQr6gE?si=ociv45VSvvB67BTu',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11431718',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/4MKhesHb4CYdvT2ettnXGP',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/trashman-single/1732392261',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20627597?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=84849356',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'SP',
		title: '고백',
		fileName: 'ufo',
		releaseDate: '2024.04.04',
		intro: `천진우 느와르 3부작 중 두번째 '고백'
인간의 삶은 멀리서 바라볼 땐 희극이지만, 직접 살아보면 비극이다.
인간으로는 더이상 살지 못할 것 같다. 다들 잘 있어요. 안녕!


*CREDIT*
Vocal, Guitar Recorded by 천진우
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우
Mixed and Masterd by 천진우
Special thanks to 안성훈(Ash)
Album Photo by KimYeyeon`,
		tracks: ['TRK_SP03_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '03:18',
		agency: '천진우',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/YEzFy4s5Fvo?si=WAw2iKRD2wFg0M9r',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11457554',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/4zvGAJeS1zOL3XGluGJGae',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/ufo-single/1738586760',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20634585?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=84959072',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'SP',
		title: '세모 네모 동그라미',
		fileName: 'triangle-square-circle',
		releaseDate: '2024.05.05',
		intro: `천진우의 음악은 어딘가 구슬픕니다. 멜로디는 서정적인데, 가사가 마냥 밝지만은 않습니다. 마치 블랙 코미디 영화처럼, 웃기지만 우습지는 않은 이야기를 노래로 풀어냅니다.
정형화된 따듯한 위로에 조금 질린 분들, 뒤틀린 미소와 씁쓸한 애착에 끌리시는 분들께 천진우의 음악을 추천합니다.

Instagram : 1000_jinwoo

2022.08.20. EP '굴다리' 발매
2022.11.21. 정규 1집 '명상좀비' 발매
2023.01.25. 싱글 '속편' 발매
2023.04.01. 정규 2집 '푸줏간' 발매
2023.07.07. EP '일기장' 발매
2023.12.01. 정규 3집 '천진우 캐롤 모음집' 발매
2024.01.11. EP '천진우 라이브' 발매
2024.03.03. 싱글 '인간쓰레기' 발매
2024.04.04. 싱글 '고백' 발매
2024.05.05. 싱글 '세모 네모 동그라미' 발매`,
		tracks: ['TRK_SP04_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '02:42',
		agency: '천진우',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/f8Mz4l683W0?si=NJlT2ev3tBEs7ocp',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11481143',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/6ipoblJ8BRnPMLmy1JTngG',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/triangle-square-circle-single/1743891770',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20641409?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=85110764',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'SP',
		title: '이별이 그대는 쉽나요',
		fileName: 'dont-leave-me',
		releaseDate: '2024.06.13',
		intro: `천진우가 50번째로 발매하는 노래는 그의 첫번째 공식 사랑노래이다. 대학 시절 첫사랑에 실패하던 기억을 떠올리며 가사를 썼다.
사랑은 결코 이성적일 수 없고, 이별엔 피해자도 가해자도 없다. 하지만 그걸 알면서도 억울한 건 어쩔 수 없다.
상대도 모르는 이유를 말해달라고 조를 뿐. 그러니 오늘밤만 같이 있어주세요.


*CREDIT*
Vocal, Guitar Recorded by 천진우
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우
Mixed and Masterd by 천진우
Special thanks to 안성훈(Ash)
Album Photo by KimYeyeon`,
		tracks: ['TRK_SP05_*'],
		genre: ['댄스 팝'],
		style: ['팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '03:38',
		agency: '천진우',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/4YZ0l2Eoyf8?si=1w92ReZfKYgeA7mB',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11510968',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/4XjCLRskW5AC5dCbnfxgNC',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/dont-leave-me-single/1752971778',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20649488?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=85301520',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
];

const LV_ALBUMS: Album[] = [
	{
		type: 'LV',
		title: '천진우 라이브',
		fileName: '1000-jinwoo-live',
		releaseDate: '2024.01.11',
		intro: `2023.12.16. 연말 단독공연 '앗-! 겁나게 뜨거! 여러분의사랑' Live in Hongdae

어릴 때부터 좋아하는 뮤지션이 생기면 라이브앨범을 꼭 찾아들었습니다.
가공이 안 된 날것의 연주는 관객들의 함성과 박수소리와 섞여 생생한 현장감을 주었죠.
그렇다보니 저도 늘 라이브 앨범을 내고 싶다는 생각을 해왔습니다.
그리고 마침내, 이번 연말 단독공연의 녹음본 중 8곡을 음원으로 내놓을까 합니다.
라이브 앨범을 처음 접하는 분들께는 신선한 충격을, 즐겨 듣는 분들께는 감동을 보장합니다.

*TRACK*
01. 매운인간+청춘 (Live-2023.12.16.)

02. 주정뱅이 딴따라 미친년과 빚쟁이 (Live-2023.12.16.)

03. 마음농장 (Live-2023.12.16.)

04. 시궁쥐 (Live-2023.12.16.)

05. 숫자의 상대성에 관하여 (Live-2023.12.16.)

06. 아이스크림 (Live-2023.12.16.) *TITLE

07. 생일축하해 (Live-2023.12.16.)

08. 집에 가자 (Live-2023.12.16.)

*CREDIT*
Vocal, Guitar Recorded by 천진우
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우
Mixed and Masterd by 천진우
Special thanks to 안성훈(Ash)
Album Photo by 가은율`,
		tracks: ['TRK_LV01_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '26:44',
		agency: '천진우',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/0RLAOFmkIcI?si=toKUnPrjZa4LmBJn',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11397197',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/7ypI6myFMWcUFbxfnyit9m',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/천진우-라이브-live-version/1726297792',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20617189?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=84691243',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'LV',
		title: '천진우 라이브2',
		fileName: '1000-jinwoo-live2',
		releaseDate: '2025.02.09',
		intro: `2024.04.06. 중식이밴드와 합동공연 '와따리 가따리' Live in Hongdae
2024.05.15. 천진우 10번째 단독공연 '여름이었다' Live in Hongdae

천진우의 라이브1 앨범이 원맨쇼의 정수였다면, 라이브2 앨범에선 다른 뮤지션들과 함께 했을 때 최상의 시너지를 선보인다.
중식이밴드와 함께한 와따리 가따리 공연에서는 중식이밴드 멤버인 샘사무엘(기타), 우자(베이스), 한우(드럼)와 함께 스탠딩 공연을 진행했으며 이 중 4곡을 선정해 앨범에 실었다.
전회 매진을 기록중인 천진우의 10번째 단독공연에서는 1부에서 김한수(트럼펫), 설규리(건반)와 함께 어쿠스틱 공연을, 2부에서는 오쉽 밴드의 멤버인 김재인(기타), 신재성(기타), 이은서(베이스), 문든(건반), 리장단(드럼)과 함께 신나는 로큰롤 공연을 펼쳐 각각 4곡, 3곡을 앨범에 실었다.
첫번째 라이브 앨범보다 보다 더욱 숙달된 천진우의 믹싱 실력이 돋보이며, 단순히 기록용이 아닌 독립된 음원으로서 팬들이 즐겁게 감상하길 바라는 마음을 함께 실었다(라이브 음원을 유독 좋아하는 변태 같은 취향을 여러분과 함께 공유하고 싶은 집착도 함께).
그런데 만약 라이브 앨범을 3탄까지 낸다면, 그땐 오케스트라 정도는 섭외해야하지 않을까? 아무래도 다음 라이브 앨범은 앞으로 10년은 더 걸릴 것 같다. 그러니 많이 들어주세요!

*TRACK*
01. 좆됐다 좆됐어 (Live-2024.05.15. with 김한수,설규리)
02. 멸망 (Live-2024.05.15. with 김한수,설규리)
03. 청춘 (Live-2024.05.15. with 김한수,설규리)
04. 혼술 (Live-2024.05.15. with 김한수,설규리)
05. 그래 뭐가 됐든 결국 지나간다 (Live-2024.05.15. with 오쉽)
06. 꽐라 블루스 (Live-2024.05.15. with 오쉽)
07. 아파요 (Live-2024.05.15. with 오쉽)
08. 헐크호건 존시나가 같이 삽니다 (Live-2024.04.06. with 중식이밴드)
09. 인간쓰레기 (Live-2024.04.06. with 중식이밴드)
10. 좆됐다 좆됐어 (Live-2024.04.06. with 중식이밴드)
11. 12월 31일 (Live-2024.04.06. with 중식이밴드)

*CREDIT*
Vocal 천진우
Acoustic Guitar 천진우
Electric Guitar 김재인, 신재성, 샘사무엘
Keyboard 문든, 설규리
Bass 우자, 이은서
Drum 리장단, 한우
Trumpet 김한수
Tambourine 천진우
Kazoo 천진우
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우, 김재인, 김한수, 리장단, 문든, 설규리, 신재성, 샘사무엘, 우자, 이은서, 한우
Mixed and Masterd by 천진우
Album Photo by 이준영`,
		tracks: ['TRK_LV02_*'],
		genre: ['포크/어쿠스틱', '인디'],
		style: ['포크 팝', '인디 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '33:38',
		agency: '천진우',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/ZSWFwJ8sROQ?si=_98VTmGHR4y1yrHM',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11551691',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/50SqrNS3UkF4Xew4D9sAPG',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/1000-jinwoo-live2-live-version/1759120911',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20660230?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=85458120',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'LV',
		title: '구토유발자들',
		fileName: 'gutoyubalzas',
		releaseDate: '2025.04.18',
		intro: `2025.01.25. 단독공연 '천진우와 무법자들' Live in Hongdae
2025.03.03. 단독공연 '구토유발자들' Live in Hongdae

벌써 라이브 앨범 3탄이네요. 라이브 음원에는 대체할 수 없는 색채가 있습니다. 생동감 넘치는 연주, 관객들의 비명소리, 공연장 특유의 공간감. 저는 이 모든 것을 사랑합니다.
이번 작업은 두 공연의 녹음본을 최대한 통일된 느낌으로 가다듬어 하나의 오롯한 앨범으로 내놓는 것이 목표였습니다. 그래서인지 마치 BEST 앨범 같은 느낌도 듭니다.
미친듯이 뛰어노는 사람들의 헐떡이는 에너지로 듣는 여러분도 어느새 구토유발!

*TRACK*
01. 좋은 친구들
02. 노인을 위한 나라
03. 시궁쥐
04. 다리에서요
05. 여름좀비
06. 아이스크림
07. 세모 네모 동그라미
08. 대가리총
09. 좆됐다 좆됐어
10. 멸망
11. 청춘
12. 집에 가자

*CREDIT*
Vocal 천진우, 김한수
Acoustic Guitar 천진우
Electric Guitar 법영이
Bass 강주은
Drum 리장단
Trumpet 김한수
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우, 강주은, 김한수, 리장단, 법영이
Mixed by 천진우, 애쉬
Masterd by 천진우
Album Photo by 김예연
Special Thanks to 애쉬`,
		tracks: ['TRK_LV03_*'],
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		distributor: '아토엔터테인먼트',
		totalDuration: '42:27',
		agency: '천진우',
		store: 'https://gimbabrecords.com/product/천진우-구토유발자들-cd/28090/category/29/display/1/',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://youtu.be/ojzc6do2e9E?si=2hkB3vVvocwZbWyv',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=11779545',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/1jqjHbMkmi7fUp8jzxVj1R',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/구토유발자들-live-version/1808348266',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20720351?wl_ref=list_ab_01_ab',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=86182359',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
	{
		type: 'LV',
		title: '부산불바다',
		fileName: 'Busan Bullbada',
		releaseDate: '2026.02.20',
		intro: `2026년 1월 17일, 부산에서 진행된 천진우의 단독공연을 기록하였습니다.
육군, 공군, 해병대, 예비역으로 뿔뿔이 흩어졌던 친구들이 모여 2년 만에 펼친 이 공연은 아드레날린과 땀냄새, 절규의 총집합이였습니다.
천진우의 노래들을 강한 록 사운드로 즐길 수 있는 이 앨범은 급히 도파민 분비가 필요한 상황에 안성맞춤입니다.

[TRACK]
01. 그래 뭐가 됐든 결국 지나간다
02. 장래희망
03. 스카
04. 이번 방학엔 공부 좀 해라

[CREDIT]
Vocal 천진우, 양동훈
Acoustic Guitar 천진우
Electric Guitar 기토, 법영이
Bass 양동훈
Drum 리장단
Saxophone 기토
Composed by 천진우
Lyrics by 천진우
Arranged by 천진우, 기토, 리장단, 법영이, 양동훈
Mixed by 천진우
Masterd by 천진우
Album Photo by 양건희
Special Thanks to 애쉬`,
		tracks: ['TRK_LV04_*'],
		genre: ['인디', '락/메탈'],
		style: ['인디 락'],
		distributor: '아토엔터테인먼트',
		totalDuration: '10:06',
		agency: '천진우',
		streaming: {
			[MUSIC_PLATFORM.YOUTUBE]: 'https://www.youtube.com/watch?v=dSMQHo6C1HQ',
			[MUSIC_PLATFORM.MELON]: 'https://www.melon.com/album/detail.htm?albumId=12869466',
			[MUSIC_PLATFORM.SPOTIFY]: 'https://open.spotify.com/album/255ixVUVJm8puJJUFxJslJ',
			[MUSIC_PLATFORM.APPLE_MUSIC]: 'https://music.apple.com/kr/album/busan-bullbada-live-version-ep/1876142920',
			[MUSIC_PLATFORM.BUGS]: 'https://music.bugs.co.kr/album/20790994?wl_ref=list_ab_01',
			[MUSIC_PLATFORM.GENIE]: 'https://www.genie.co.kr/detail/albumInfo?axnm=87251273',
			[MUSIC_PLATFORM.SOUNDCLOUD]: '',
		},
	},
];

const VN_ALBUMS: Album[] = [
	{
		type: 'VN',
		title: '굴다리 LP 앨범',
		fileName: 'tunnel',
		releaseDate: '2024.04.24',
		tracks: {
			'Side A': ['TRK_VN01_001', 'TRK_VN01_002', 'TRK_VN01_003'],
			'Side B': ['TRK_VN01_004', 'TRK_VN01_005', 'TRK_VN01_006'],
		},
		genre: ['포크/어쿠스틱'],
		style: ['포크 팝'],
		agency: '천진우',
		store: {
			[STORE_PLATFORM.LP]: 'https://smartstore.naver.com/irrelevant/products/10239470111',
			[STORE_PLATFORM.CD]:
				'https://gimbabrecords.com/product/천진우-굴다리-12-marble-colored-vinyl/25217/category/25/display/1/',
		},
	},
];

export const GET_LP_ALBUMS = sortAlbumsLatest(LP_ALBUMS);

export const GET_EP_ALBUMS = sortAlbumsLatest(EP_ALBUMS);

export const GET_SP_ALBUMS = sortAlbumsLatest(SP_ALBUMS);

export const GET_LV_ALBUMS = sortAlbumsLatest(LV_ALBUMS);

export const GET_VN_ALBUMS = sortAlbumsLatest(VN_ALBUMS);

export const GET_FULL_ALBUMS = () => {
	const allAlbums = [...LP_ALBUMS, ...EP_ALBUMS, ...SP_ALBUMS, ...LV_ALBUMS, ...VN_ALBUMS];
	const combinedMap: Record<string, Album[]> = {};

	allAlbums.forEach(album => {
		const year = album.releaseDate.split('.')[0].trim();
		if (!combinedMap[year]) combinedMap[year] = [];
		combinedMap[year].push(album);
	});

	return Object.keys(combinedMap)
		.sort((a, b) => Number(b) - Number(a))
		.map(year => ({
			year,
			items: sortAlbumsLatest(combinedMap[year]),
		}));
};

export const FULL_ALBUMS: AlbumList = GET_FULL_ALBUMS();
