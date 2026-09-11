// @/const/chords

/* eslint-disable storybook/default-exports */

import { Chord } from '@/types/chord';
import { CHORD_PROVIDERS } from '@/const/chord-providers';

export const MASTER_CHORDS: Record<string, Chord[]> = {
	TRK_LP01_001: [
		{
			chords: '카포 Am - Dm - E',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},

		{
			chords: `Am Dm Am Dm E7

Dm Am Dm Am Dm Am Dm E7

Am Dm Am Dm Am E7
Am Dm Am Dm Am E7 Am`,
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP01_002: [
		{
			chords: 'G - C - D',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
		{
			chords: `G C G C G D
G C G C G D G 

C G C G C G D 

G C G C G D
G C G C G D G 

G C G C G D
G C G C G D G`,
			tuning: '정튜닝 | 1카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP01_004: [
		{
			chords: `C        G           Am
사람에 맛이 있다면
난 좀 싱거운 맛이다
레시피 대로 했는데
밍숭맹숭한 맛이다
자극적이지가 않다
사람이 좀 재미없다
그래서 그런 것일까
가끔 남이 좀 부럽다
F                   C    F                 C
근데 어째 모기는 나만 쫓아다니나
F                   C       Dm                       G
사람들은 나더러 꼭 물에 물 탄 것 같다던데
C              Am
내 피 빨던 모기야 
Dm                     G
솔직하게 말해줘 무슨 맛이니
내 피 빨간색이야
국물 색깔만 보면 꼭 매운맛일 것 같아
`,
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'C - G - Am - F - Dm',
			tuning: '다운튜닝 | 2카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP01_005: [
		{
			chords: 'E - A - B7',
			tuning: '다운튜닝 | 1카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP01_006: [
		{
			chords: 'C - E - Am - F - G - Dm',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
		{
			chords: `C E7 Am F
Dm G C E7 Am
Dm G`,
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP01_007: [
		{
			chords: 'Dm, Gm, A | 우주 바깥에서도: Bb, F, C',
			tuning: '정튜닝 | 우주 바깥에서도: 2번 프렛 카포',
			provider: CHORD_PROVIDERS.KIM_SEODDANG,
			chordModeType: 'separated',
		},
	],

	TRK_LP01_008: [
		{
			chords: `G C D G C D G
C D B7 Em C D G
B7 Em Am Em
B7 Em Am B7
G Em C D`,
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP02_001: [
		{
			chords: 'C - F - G - Am | Am은 처음 간주와 중간 간주에서 사용',
			tuning: '다운튜닝 | 1카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
		{
			chords: `C F C F C G
C F C F C G C 

C G Am F C G CGC 

C F C G CGC
C F C G CGC 

Am G F G
Am G F G`,
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP02_003: [
		{
			chords: `    C          G                      Am       F
또 한 해를 잘 보내고 너의 생일이구나
    C            G         F             G    C
축하한다 어김없이 한살 더 먹었구나
    C            G              Am        F
호들갑은 떨지 말자 뭐 대수라더냐
    C            G              F       G     C
케이크는 내가 샀다 술값은 니가 내라
C
생일 존나 축하하고 일단 한잔해
F                             C
생일 존나 축하하고 일단 한잔해
C
생일 존나 축하하고 일단 한잔해
    G                  C
아무쪼록 건강해라
	`,
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'C G Am F C G C G C',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
		{
			chords: 'C - G - F - Am | 마지막 후렴 D - G - A',
			tuning: '다운튜닝 | 1카포 + 후반 마지막에 2카포로 기본코드 한번',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP02_004: [
		{
			chords: 'E - A - B7',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP02_005: [
		{
			chords: 'Am - F - E',
			tuning: '다운튜닝 | 2카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP02_006: [
		{
			chords: `C     E             F           G
그래 뭐가 됐든 결국 지나간다
칼에 맞은 데도 새살이 또 난다
과몰입하면은 결국 니가 진다
눈을 뜨고 상처가 아무는 걸 지켜봐

몸만 성하면은 다시 일어난다
적어도 니 순대는 뱃속에 있다
아픔은 잠깐 흉터는 영원하다
울지마라 칼빵은 많은게 멋이니까
E                   Am
너가 어떤 사람이든 상관없다
누군가는 너를 싫어할테니까
엄마 아빠 어딨냐고 물어보면
G
가정교육은 독학했다고 해라
E                   Am
너가 어떤 사람이든 상관없다
누군가는 너를 사랑할테니까
친구들이 괜찮냐고 물어보면
G
델꼬 나가 술값 니가 한 번 내라
C     E             F           G
그래 뭐가 됐든 결국 지나간다
칼에 한 번 맞았다고 울지마라
사람들은 약한 모습을 원한다
눈을 뜨고 적들을 향해 소릴 질러봐
	`,
			tuning: '정튜닝기준 2카포',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'C - E - F - G',
			tuning: '다운튜닝 | 4카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP02_007: [
		{
			chords: 'E - A - B7',
			tuning: '다운튜닝 | 4카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP02_008: [
		{
			chords: `Am*8
Dm     Am      E         Am
이렇게 벌어서 어떻게 사노
F         C         E      Am
하루에 세끼도 간당한디
Dm     Am      E         Am
이렇게 살아서 언제 누리노
F         C         E      Am
주말에 일해도 쥐꼬린디

F         C      E             Am
길어진 명줄 가늘게 더 가늘게
살아가는 중 모르게 남 모르게
아야야야야야이

Dm     Am      E         Am
돈벌래 돈벌래 돈벌래 나도
F         C         E      Am
대출도 이자도 갚을래 나도
Dm     Am      E         Am
돈벌래 돈벌래 돈벌래 나도
F         C         E      Am
청춘도 자유도 누릴래 다
Am

F         C         E      Am
부자가 될 줄 알았네 난 알았네
부채만 늘 줄 몰랐네 난 몰랐네
아야야야야야이

Dm     Am      E         Am
돈벌래 돈벌래 돈벌래 나도
F         C         E      Am
대출도 이자도 갚을래 나도
Dm     Am      E         Am
돈벌래 돈벌래 돈벌래 나도
F         C         E      Am
청춘도 자유도 누릴래 다`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'Dm - Am - E - C - F',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP02_009: [
		{
			chords: `A
  A                           A
이정도면 됐다 이제 집에 가자
  A                           A
집에 가서 샤워하고 잠좀 자자
      D                             A
오 너무 많은 일이 있었어
 E                           D              A E
휴대폰은 충전기로 나는 집으로
  A                           A
집에 가는 길을 왜 이렇게 멀까
  A                           A
다른 말로 나는 너무 멀리 왔나
      D                          A
오 어서 집에 가고 싶은데
 E                           D                           A E
근데 환승 세 번에다 따릉이도 타야 되네

A
지하철은 좁디 좁고 사람들은 너무 많고
의자 수는 별로 없고 내리는 사람은 적고
앞사람의 입김에선 돼지고기 냄새 나고
                                                               D
마늘쌈을 싸먹었나 속트름만 주구장창 하네
                        A
피할 길이 없구나
E                             D                         A E
매일 같이 다짐한다 돈 벌어서 택시타자
`,
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'A - E - B7',
			tuning: '다운튜닝 | 2카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP02_010: [
		{
			chords: 'Am - E - F - Dm',
			tuning: '다운튜닝 | 1카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP02_011: [
		{
			chords: 'C - F - G - Am',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP03_001: [
		{
			chords: `G - D - C - Bm`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
		{
			chords: 'G - D - C - Bm',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
		{
			chords: 'A E D A D A E E',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP03_007: [
		{
			chords: `E
E                     A 
나이를 한두살 더먹고
B7                  E
앞자리 숫자가 바뀌어도
E                 A
내마음 속에 한구석은
B7                            E
자라지 못하고 멈췄네
E A B7
`,
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
	],

	TRK_LP03_008: [
		{
			chords: `G  B7  C  D
G    B7        C            D
내년에는 더 밝게 살아야지
내 맘대로 되는 건 아니지만
내년에는 실수도 줄여야지
내 곁을 떠나는 사람이 많지 않게

G   B7        C              D
올해는 말도 많고 탈도 많고
쓸데없는 맘 고생도 했지
아무튼 내년엔 좀 다르겠지
G    B7        C           D
바뀌는 건 숫자뿐이지만

G               B7        C            D
자 올 한 해도 이걸로 막을 내릴까 합니다
뭐 후회해도 이젠 연말인데 어쩌겠어요
새 달력에는 공휴일들이 주말을 비켜가나요
설렘이 무뎌지지 않도록 꼭 확인하세요

자 올 한 해도 이걸로 막을 내릴까 합니다
뭐 후회해도 이젠 연말인데 어쩌겠어요
새 달력에는 공휴일들이 주말을 비켜가나요
설렘이 무뎌지지 않도록 꼭 확인하세요

자 올 한 해도 이걸로 막을 내릴까 합니다
뭐 후회해도 이젠 연말인데 어쩌겠어요
새 달력에는 공휴일들이 주말을 비켜가나요
설렘이 무뎌지지 않도록 꼭 확인하세요`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'G - B7 - C - D - Dsus4',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_LP04_002: [
		{
			chords: `Em A Em A Em A Em A
Em Em A Em A Em A Em A

Em     A              Em         A
새로운 피는 이제 말라버렸고
누구의 탓이라고 할 수도 없고
좋은 걸 물려주지 못할 것 같아

Em
우리의 대는 이제 여서 끝난다

Em A Em A Em A Em A

C                        G B7                           Em
노인의 노인을 위한 노인에 의한 나라가 돼`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
	],

	TRK_LP04_004: [
		{
			chords: `           Em     B7       Em
우리는 술먹고 토하는 친구들
Am                      Em 
세상에게 버림받은 악성종양들
Am                      Em
알코올을 상처입은 가슴에 붓는
B7                        Em
효과빠른 상처소독법

Em  B7  / Em Em
Am Am / Em Em 
Am Am / Em Em
B7  B7   / Em Em

Em                  Am                  
그렇습니다뭐 자괴감이드는건 분명한사실이지요
B7                   
그래도어쩌겠습니까 저따위에게
Em
세상은 기대가 너무도 큽니다
Em            
기대가 크면 배신감도 크다는것을
Am
우리는 일찍이 알고있었죠
    B7                                              Em
괜찮습니다 적어도 친구들은 영원히 제 곁에 있을테니까요
B7                                Em
죽음이 우릴 갈라놓을때까지

           Em     B7       Em
우리는 술먹고 토하는 친구들
Am                      Em 
세상에게 버림받은 악성종양들
Am                      Em
알코올을 상처입은 가슴에 붓는
B7                        Em
효과빠른 상처소독법
`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
	],

	TRK_LP04_007: [
		{
			chords: `
C                            D                             F                G           C
신경써야 할 것들이 너무 많은 탓에 나는 여행길을 미루고 미루네
정처없이 떠돌다가 발길 멈추는 곳에서 일몰을 지켜보고 싶네

            F                            C
그런데 나는 우선 그지라서 일을 쉬지 못하네
F                            C
쉰다 해도 해방감은 잠시뿐이네
F                            C
현재로썬 일이 없어 빌빌 대는 것보단
G
일하면서 욕하는게 맘이 편하네

신경써야 할 것들이 너무 많은 탓에 나는 어디로도 떠나지 못하네

그런데 나는 우선 그지라서 일을 쉬지 못하네
쉰다 해도 해방감은 잠시뿐이네
현재로썬 일이 없어 빌빌 대는 것보단
일하면서 욕하는게 맘이 편하네

C      Am     Dm         G
이젠 발목에 쇠사슬이 없어요
하기 싫으면 그만두면 되지요
근데 난 쇠사슬이 필요해
발목에다가 든든하게 감아주세요
쇠사슬을 감아주세요
쇠사슬을 감아주세요
쇠사슬을 감아주세요`,
			tuning: '정튜닝 기준 4카포 | 다운튜닝시 6카포',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'E , F# , A , B , C#m , F#m',
			provider: CHORD_PROVIDERS.KIM_SEODDANG,
			chordModeType: 'separated',
		},
	],

	TRK_LP04_008: [
		{
			chords: `Am           Em         F           C E7
 별 거 아닌 일에도 쉽게 화를 낸다
Am           Em         F           C E7
 진짜 큰일에는 더 건조해지면서
Am           Em         F           C E7
 당장 하루하루에 신경질을 내다
Am           Em         F           C E7
 인생은 우중충한 회색빛을 띈다

Am   Em      F     C  E7

Am           Em          F           C E7
 홧병에는 어떤 약이 잘 듣는지
Am           Em          F           C E7
 뭐에 지쳤는지 삶이 지겨운지
Am           Em          F           C E7
 홧김에 뱉었던 욕을 되새기다
Am           Em          F           C E7
 내 기분 내가 직접 잡치고야 만다

F             F               Am        Am 
 망가진 시곗바늘처럼 
F           F                 C         E7
 하루에 두 번 맞았네 대가리 총

C          E7          Am       Am    F        G              C                C
 인생은 죽어야만 끝이 나는데    조금은 즐길 수도 있지 않을까
 당장에 화낼 일이 너무 많아서   조금의 행복마저 저축을 했나
 우울한 날을 계속 끌어다 쓰면   노인이 됐을 때는 꽃밭이려나
C          E7          Am       Am    F        G              C                C
 인생은 죽어야만 끝이 나는데    조금은 즐길 수도 있지 않을까
 당장에 화낼 일이 너무 많아서   조금의 행복마저 저축을 했나
 우울한 날을 계속 끌어다 쓰면   노인이 됐을 때는 꽃밭이려나
		`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
	],

	TRK_LP04_009: [
		{
			chords: `Em                           Am
잔을 채워 독한 걸로 가득 부어줘
B7                           Em
이거 먹고 죽으려면 다섯 잔은 줘
Em                           Am
길바닥에 드러누워 노랠 불러 줘
B7                           Em
집 나갔던 마누라도 춤추며 노래할 거야

달이 밝은 언덕 위에 줄지어 서서
손을 잡고 빙빙 돌며 함께 있어 줘
저번 주에 큰나무에 목을 매달던
주정뱅이 빚쟁이도 춤추며 노래할 거야

Am                           Em
죽지 못해 사는 우리 동네 사람들을 봐
Am                          Em
술에 취해 입만 열면 웩웩웩
Am                          Em
빵을 만들 곡식으로 몽땅 술을 빚었어
Am                        Em
배고파서 헛구역질 웩웩웩

Am                         Em
떠나고 싶으면 기차 화물칸에 타
B7                        Em
이제 여기 남은 건 우 우 우 우

Em                     Am
주정뱅이 딴따라 미친년과 빚쟁이
B7                          Em
술에 취한 시한부 인생`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
	],

	TRK_LP06_002: [
		{
			chords: `F C Dm Am
Bb F Bb C
F C Dm Am
Bb F Bb C F

                     Bb               F
오늘은 왜 또 숙제를 안 했니
Bb           F             C
학원 숙제 하느라고 못했습니다
F                 Bb               F
학원이 그리 좋은가 봅니다
Bb            F           Bb     C      F
학원 가서 살지 학교는 왜 옵니까

Dm                      Am
그놈의 인스타 좀 지워버려라
학폭의 반은 마크 주커버그다
진짜 세상은 화면 밖에 있단다

Bb                           C
뭐가 그리 재밌다고 맨날 쳐다봐
F             C  Dm             Am
이번 방학엔 공부 좀 해라
Bb                F            Bb             C
이 썩을 놈의 쉐끼들 언제쯤 철이들까
F             C    Dm          Am
정신 차려라 한 번에 훅가
Bb              F              Bb      C     F
이미 엎질러진 물에다 코박고 죽고 싶냐`,
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'F, Bb, C, Dm, A',
			provider: CHORD_PROVIDERS.KIM_SEODDANG,
			chordModeType: 'separated',
		},
		{
			chords: 'C , G , Am , E , F',
			tuning: '정튜닝 기준 기타 5번 프렛에 카포',
			provider: CHORD_PROVIDERS.KIM_SEODDANG,
			chordModeType: 'separated',
		},
	],

	TRK_LP06_005: [
		{
			chords: `C Em Bb GF G C Am
C                                Em            Bb                  G
   어쩌면 나는 쓸모 없는 그런 사람이 되어가는가 봐
   아니면 나는 도대체 왜 끊임이 없이 나를 미워할까

F         G                 C             Am
    어른들은 말해 다 한순간의 방황이라고
    자라는 와중에 다 겪게 되는 마음이라고
    어른이 되면은 이 때를 추억하게 된다고
F             G
    그런데 지금 난

C                              Em              Bb               G
어쩌면 나는 필요없는 그런 사람이 이미 되었나 봐
아니면 나는 도대체 왜 끊임이 없이 외로워야 하나`,
			tuning: '정튜닝 1카포 | 다운튜닝 3카포',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
	],

	TRK_LP06_007: [
		{
			chords: `인트로
솔--파레-도레-파레-도레---솔파-솔

Am     F             C            G
차라리 뭐든 가능하다고 믿어
희망은 유행이 끝난 것 같지만
가만히 있어도 반이나 가는데
조금 더 해본다고 손해보겠어

F                  G        C             Am
   십년 뒤에 넌 아마 방황하고 있겠지
   높은 확률로 삼십대가 되고 나서도                  G
   그런데 너는 아직 대가리에 피도 안 마른 애가 그런 말을 해

Am     F             C             G
장래희망이 고작 돈을 많이 버는 거라면
우리는 확실히 아이를 잘못 키우고 있어
장례식에 오신 걸 환영해요 죽은 사람은  Am   F     C     G
대한민국 청소년들의 아이다움 그리고    낭만 방황 예술 청춘`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
	],

	TRK_LP06_008: [
		{
			chords: `C         E                 Am       F
  조금만 더 힘내보자 저 앞의 끝을 향해서
  지금까지 잘해왔잖아
  조금만 더 버텨보자 어쨌든 지금보다는
  모든게 더 나아질 거야

C        E       Am          F
  그 누구도 말해주지 않는 것 한 가지
  졸업 후엔 새로운 졸업이 기다린다
  그래도 뭐 이미 한 번 넘어본 고비는
  아무래도 조금은 더 쉽지 않으려나

C             E            Am         F
  초중고를 총 12년 마침내 성인이 되면
  비로소 넌 자유로울까
  재수하고 전역하고 어쩌면 휴학도 하고 
  졸이면 자유로울까

Em(약지,소지)  F(barre)
  어찌어찌 먹고 살길을 찾고
G(barre)           F(barre)
  삼십년 뒤 퇴직하면 자유일까

C        E         Am         F
  그 누구도 말해주지 않는 것 한 가지
  졸업 후엔 새로운 졸업이 기다린다
  그래도 뭐 이미 한 번 넘어본 고비는
  아무래도 조금은 더 쉽지 않으려나

C        E         Am         F
  그 누구도 말해주지 않는 것 한 가지
  졸업 후엔 새로운 졸업이 기다린다
  그래도 뭐 이미 한 번 넘어본 고비는
  아무래도 조금은 더 쉽지 않으려나`,
			tuning: '정튜닝 4카포 | 다운튜닝 6카포',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: `F, C, Dm, Bb`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KIM_SEODDANG,
			chordModeType: 'separated',
		},
	],

	TRK_LP06_010: [
		{
			chords: `C            A         Dm          G
무던하게 난 묻어가는게 좋아
튀면은 괜히 뒤에서 욕할까봐
난 무리에 섞여서 티도 안 났음 해

다른 사람들 다 사는 만치만
따라갈려고 땀을 뻘뻘 흘리네
난 무리해야 간신히 쫓아가는 중

Dm             G         Dm            G
다리가 짧은 뱁새는 얼굴이라도 귀엽지
Dm             G        C                         A
난 귀엽지도 않은데 다리를 있는 힘껏 찢어도
Dm         G
기껏해야 비둘기
C          A     Dm          G
이 도시는 나에겐 너무 커
비둘기는 어딜가나 있고
내 사소한 존재 가칠 위해 싸워
그 마저도 싸우지 않으면 없어

C              A        Dm            G 반복
전 말입니다 행복하기 위한 척도가 그렇게 높은 사람은 아닙니다
라면에 순두부 넣을 수 있을 정도만 돼도 감사할 수 있습니다
근데 저도 가끔은 이 통닭 같은게 땡길 때가 있단 말이죠
얼마 전엔 비싼 치킨 대신에 비둘기 튀김 같은 걸 팔면 어떨까 하는 생각도 해봤습니다. 치킨 대신에 피죤으로
아 이건 섬유유연제 회사랑 이름이 겹치네요 없던 일로 하겠습니다

Dm             G         Dm            G
다리가 짧은 뱁새는 얼굴이라도 귀엽지
Dm             G        C                         A
난 귀엽지도 않은데 다리를 있는 힘껏 찢어도
Dm         G
기껏해야 비둘기
C          A     Dm          G
이 도시는 나에겐 너무 커
비둘기는 어딜가나 있고
내 사소한 존재 가칠 위해 싸워
그 마저도 싸우지 않으면 없어`,
			tuning: '정튜닝 4카포 | 비둘기~ 다음 뚱땅띵: 2번줄 7 g 10 9 10 11 12프렛',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
	],

	TRK_EP01_001: [
		{
			chords: `
C                                F
믿어버렸어 친구놈을 한 번 더
C                           G
믿을만한 정보라더니
C                             F
모아놨던 돈 수업료로 날리고
C            G            C
묶어놨던 적금을 깼지
C                          F
나도 알아 뭐 내가 바보 같은 거
C                            G
남들처럼 살고 싶은데
C                                F
통장은 비고 반지하는 추운걸
C            G             C
곱등이가 안 나올 때만
F                     C           G                         C
괜찮은 사람이랑 오손도손 사는 것도 좋겠지
F                     C           G
괜찮은 사람이 내 룸메이트 바퀴벌레 곱등이랑
G(mute)
돈벌레를 싫어하지 않는다면 말이지
       C                     F
헤이호 헤이호 해가 뜨지를 않네
C                             G
떴다 해도 내 방에선 안 보이지만
       C                     F
헤이호 헤이호 아름답기는 개뿔
C             G             C
아프니까 그만 때려 개새끼들아
			`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'C - F - G',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
		{
			chords: `CFCG CFCGC
FCGAm FCG
CFCG CFCGC`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_EP01_002: [
		{
			chords: 'Am - E - Dm',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_EP01_003: [
		{
			chords: 'Em - Am - B7',
			tuning: '다운튜닝 | 4카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_EP01_004: [
		{
			chords: 'C - G - Am - F - Em',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
		{
			chords: `C G Am F C G Am

C G Am F C G Am 

Em Am Em Am Em Am F G 

C G Am F C G Am F 

C G Am F C G Am F `,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_EP01_005: [
		{
			chords: `[Am   Dm    G       C-G/B] <팜뮤트
    결국에 세상은 망하고
    우린 모두 죽고 말겠지
    수많은 고통과 기쁨도
    한 줌의 가루가 되겠지

울창한 도시의 빌딩도
언젠가는 가라앉겠지
피곤한 퇴근길 도로도
텅 빈 채로 남아있겠지

[E                        Am <스트로크- 오른손 다운 커팅-업-오른손 다운커팅-업
    거대한 화산이 폭발하든 아님
운석이라도 떨어지겠지
    아님 화가나서 서로에게 다시
폭탄이라도 터뜨리겠지

E                       Am]             Dm<천천히 다운1회, 1,2,3,1,2,3 번줄 피킹
뭐가 됐든 결국 남는 것은 아무것도 없겠지

G<천천히 다운1회, 1.2,3,1.2.3,1.2 번줄 피킹-다운업
그러니 괜찮아

Am  Dm  G        C-G/B < 코드 바뀔때마다 5,6번줄 한번 튕긴 다음 다운-업
잊고 싶은 기억은 모두
갈림길에 두고 오세요
가만 보면 사람들도 참
쓸데없이 감상적이야

모든 것이 끝날 때에도
굳이 눈물을 챙겨가니까
미안하단 말 한마디도
못 하고선, 이제 와서 왜?
			`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'Am - Dm - G - C - E',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
		{
			chords: `Am Dm G C E7
브릿지 E7 Am Dm G`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_EP01_006: [
		{
			chords: 'G - Cadd9 - Dsus4',
			tuning: '표준튜닝 | 다운튜닝 + 2카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_EP02_001: [
		{
			chords: 'E - A - B7',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_EP02_002: [
		{
			chords: `Dm  G            C            Am
기분 좋은 바람이 불어오면
콧잔등이 시큰해지곤 하죠
오랜 기억들은 냄새를 타고
가끔 날 눈물짓게 하죠

피곤함이 묻은 저녁 발걸음
가로등은 아직 켜지지 않고
파르스름한 거리를 걷다가
문득 날 혼자 웃게 하죠

F E   Am                         Dm   G       C
설명 할 수 없는 어떤 그리움 노스텔지어는
설령 오래되어 빛이 바래도 파스텔톤이죠

F G C Am F G C
F G C Am FG C

살아본 적 없는 시대 속에서
애타게 누군갈 찾기도 하고
어렴풋한 과거의 향취에다
많은 돈을 쓰기도 하죠

빠르게 많은 것이 바뀌지만
어떤 것은 내게 영원하겠죠
점차 희미해지는 기억에다
나는 많이 기대곤 하죠

설명 할 수 없는 어떤 그리움 노스텔지어는
설령 오래되어 빛이 바래도 파스텔톤이죠

설명 할 수 없는 어떤 그리움 노스텔지어는
설령 오래되어 빛이 바래도 파스텔톤이죠
	`,
			tuning: '정튜닝 (EADGEB)',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'Dm - G - C - Am - F - E',
			tuning: '다운튜닝 | 2카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_EP02_003: [
		{
			chords: 'C - F - G - Em - Am',
			tuning: '다운튜닝 | 3카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_EP02_004: [
		{
			chords: `            C               Am          Dm         G
이젠 더 할 일도 또 쉴 것도 다 해치웠군요
내일도 일하러 또 가려면 일찍 자야겠죠

C                     Am         Dm         G
그런데 왜인지 오늘 밤은 잠들 수 없죠
피곤한 두 눈을 끔뻑끔뻑 거리면서도

            C               Am          Dm         G
시간은 어느새 꽤 늦었죠 나도 자고 싶죠

어느새부턴가 내 잠에는 꿈이 사라졌죠
어릴 때 꾸었던 꿈을 이제 갚아야 할 때죠

오로지 충전만을 위한 잠을 자다가
배터리 수명 다 된 담엔 교체되겠죠

그런데 세상은 걱정 말라죠 교체 선수는 참 많으니까

이렇게 살다가 가는 가요 그게 맞는 거죠
내일도 일하고 또 쉬다가 잠을 자야겠죠

그래서일까요 오늘따라 잠이 무섭죠
정해진 죽음을 따라가는 연습 같아서
시간도 어느새 꽤 늦었죠 나도 자고 싶죠
			`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'G - Em - Am - D',
			tuning: '다운튜닝 | 5카포',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_SP01_001: [
		{
			chords: `C      Am     E     F
한 편으로 끝나는게
어땠을까 싶은 영화
끝에가서 미련을 남기고
속편으로 실망시키지
욕심으로 이어 가는
같은 인물 같은 대사
영원할 것 같지만 이 역시
끝이 나고 불이 켜지지

G    Am  G    Am   G    Am        Dm      G
올라가는 크레딧과 남아있는 관객들 그리고

C       Am   E             F
아무렇지 않단 표정으로
되살려낸 억지 감동처럼
어렴풋한 기댈 저버리
그저그런 뻔한 속편이야
아아

G    Am  G    Am   G    Am        Dm      G
올라가는 크레딧과 남아있는 관객들 그리고

C       Am   E             F
아무렇지 않단 표정으로
되살려낸 억지 감동처럼
어렴풋한 기댈 저버리고
그저그런 뻔한 속편이야
아아 아아 아아 아아
아아 아아 아아 아아`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
		{
			chords: 'C - Am - E - F - G - Dm',
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_SP02_001: [
		{
			chords: `C - E7 - Am - F - G
벌스. C - E7 - Am
프리코러스. F - C - G - Am
코러스. C - E7 - Am - F`,
			tuning: '다운튜닝',
			provider: CHORD_PROVIDERS.DOTSAE,
			chordModeType: 'separated',
		},
	],

	TRK_SP03_001: [
		{
			chords: `C           Am  Dm           G
사실 나는요 인간이 아닙니다
아주 멀리서 온 외계인이지요
너무나 재밌어 보이길래                C
인간들 틈에 섞여서 몇년 살아보았죠

Am Dm G

C           Am  Dm           G
멀리서 볼 땐 분명 희극이었죠
월세를 두 번 밀리기 전까진요
너무나 비참한 마음이라               C
오늘 저녁은 라면도 썩 내키지 않네요

Am Dm G

Dm      G         C           Am
    어떻게 이리 사나요 괜찮나요
    나야 뭐    UFO 타고 떠나면은

      Dm       G       Dsus4
그만이죠 잘 있어요
C        Am
이젠 안녕
Dm            G
인간으로는 못살겠어요
C        Am
이젠 안녕
Dm             G
트라우마는 간직할게요
		`,
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
	],

	TRK_SP04_001: [
		{
			chords: `5-5-2-3-4-2 아르페지오(G코드는 662342)
C-F-C-F 
C                     F
 시간이 지나면 그저
        G                         Am
 막연하게 뭐가 돼도 됐겠지
C                    F
눈을 감았다가 뜨니
        G                           C
이젠 어린 내게 증명해야 돼
C                     F
시간을 조금 더 줘요
        G                         Am
이미 제법 많이 쓴 것 같지만
C                     F
거울 속의 내 모습은
        G                          C
어른이라 부르기엔 부족해
F                      C
  혹시 언제까진가요
Am                  G
  방황할 수 있는 나이
F                      C
  혹시 벌써 지났나요
Am                          G
  기웃거리기만 하는 사이

C      F      G                Am
세모 네모 동그라미도 있죠
C      F      G                    C
근데 우린 이 모양 이 꼴이죠
이도 저도 아니긴 한가 봐요
외로운건 참으면 참아지죠
`,
			tuning: '정튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
	],

	TRK_SP05_001: [
		{
			chords: `C         G        Am       Em
낯선 표정 딱딱한 말투도
     F             G             C
그댄 오늘 날 처음 봤나요
C         G         Am      Em
마음 상한 일이 있었다면
        F          G            C
그대 차라리 말을 해줘요

F              G           Em   Am
어찌 이리 쉽게 말을 뱉는가요
나는 아직 준비되지 않았는데
깊이 생각하고 하는 말이겠죠

         F                            G
다시 주워담을 수 없는데도 오
F                G
그대 떠나면은
Em      Am
나는 어쩌나요
        F         G             C
혼자 남겨질 시간이 두려워요

F                 G
나만 여기두고
Em      Am
어딜 가시나요
        F              G   C
오늘 밤만 같이 있어주세요
			`,
			tuning: '하프다운튜닝',
			provider: CHORD_PROVIDERS.KWON_SAJANG,
			chordModeType: 'integrated',
		},
	],
};
