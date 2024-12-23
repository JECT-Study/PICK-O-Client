import { SampleFirst, SampleSecond } from '@/assets';
import { GameContent } from '@/types/game';
import { TodayTalkPick } from '@/types/talk-pick';

export const todayTalkPickDummyData: TodayTalkPick[] = [
  {
    id: 20000,
    title: '제목 #20000',
    optionA: 'A',
    optionB: 'B',
  },
  {
    id: 20000,
    title: '제목 #20000',
    optionA: 'A',
    optionB: 'B',
  },
];

export const todayBalanceGameDummyData: GameContent[] = [
  {
    id: 1,
    title: '남자친구와 첫 데이트 어디가 좋을까?',
    mainTag: '커플',
    subTag: '연애',
    images: [SampleFirst, SampleSecond],
    bookmarkState: false,
  },
  {
    id: 2,
    title: '남자친구와 첫 데이트 어디가 좋을까?',
    mainTag: '커플',
    subTag: '연애',
    images: [SampleFirst, SampleSecond],
    bookmarkState: false,
  },
];
