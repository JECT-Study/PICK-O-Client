import React from 'react';
import { TalkPickDetail } from '@/types/talk-pick';
import store from '@/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import type { Meta, StoryObj } from '@storybook/react';
import TalkPickSection from '@/components/organisms/TalkPickSection/TalkPickSection';

const defaultTodayTalkPick: TalkPickDetail = {
  id: 0,
  title: '새우 껍질 논쟁, 당신의 선택은?',
  content:
    '(더미글이에욤) 건강과 지속 가능성을 추구하는 이들을 위해, 맛과 영양이 가득한 채식 요리 레시피를 소개합니다. 이 글에서는 간단하지만 맛있는 채식 요리 10가지를 선보입니다. 첫 번째 레시피는 아보카도 토스트, 아침 식사로 완벽하며 영양소가 풍부합니다. 두 번째는 콩과 야채를 사용한 푸짐한 채식 칠리, 포만감을 주는 동시에 영양소를 공급합니다. 세 번째는 색다른 맛의 채식 패드타이, 고소한 땅콩 소스로 풍미를 더합니다. 네 번째는 간단하고 건강한 콥 샐러드, 신선한 야채와 단백질이 가득합니다. 다섯 번째로는 향긋한 허브와 함께하는 채식 리조또, 크리미한 맛이 일품입니다. 여섯 번째는 에너지를 주는 채식 스무디 볼, 과일과 견과류의 완벽한 조합입니다. 여덟 번째는 채식 파스타 프리마베라, 신선한 야채와 토마토 소스의 조화가 뛰어납니다. 아홉 번째는 채식 볶음밥, 풍부한 맛과 영양으로 가득 차 있습니다. 마지막으로, 식사 후 달콤한 마무리를 위한 채식 초콜릿 케이크, 건강한 재료로 만들어 죄책감 없는 달콤함을 선사합니다. 이 레시피들은 채식을 선호하는 이들에게 새로운 요리 아이디어를 제공하며, 채식이 얼마나 다채롭고 맛있을 수 있는지 보여줍니다. 건강한 라이프스타일을 추구하는 모든 이들에게 이 레시피들이 영감을 줄 것입니다.',
  summary: {
    summaryFirstLine: '남친이 어쩌고 저쩌고 잘못했네 안했네 대충 더미글',
    summarySecondLine: '남친이 친구 새우 껍질을 어쩌고 저쩌고 뭐라뭐라',
    summaryThirdLine: '나 너무 속상한데 이걸 찬성해 말어',
  },
  optionA: '상관없다다다다다다다',
  optionB: '상관 있다',
  sourceUrl: '출처',
  imgUrls: [],
  imgStoredNames: [],
  votesCountOfOptionA: 1963,
  votesCountOfOptionB: 2635,
  views: 35254,
  bookmarks: 234,
  myBookmark: false,
  votedOption: 'A',
  writer: '닉네임593',
  createdAt: '2024-08-04',
  isUpdated: false,
};

const meta = {
  title: 'organisms/TalkPickSection',
  component: TalkPickSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    talkPick: defaultTodayTalkPick,
    myTalkPick: false,
    isTodayTalkPick: false,
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ReactQueryProvider>
          <Router>
            <Story />
          </Router>
        </ReactQueryProvider>
      </Provider>
    ),
  ],
} satisfies Meta<typeof TalkPickSection>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
