import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import store from '@/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { GameOption, GameDetail, GameSet } from '@/types/game';
import { SampleWhole } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import BalanceGameSection from '@/components/mobile/organisms/BalanceGameSection/BalanceGameSection';

const exampleOptions: GameOption[] = [
  {
    id: 0,
    name: '제목은글자제한30자제목은글자제한30자제목은글자제한30자',
    imgUrl: SampleWhole,
    description:
      '상황설명글자제한50자상황설명글자제한50자상황설명글자제한50자상황설명글자제한50자상황설명글자제한50자',
    optionType: 'A',
  },
  {
    id: 0,
    name: '제목은글자제한30자제목은글자제한30자제목은글자제한30자',
    imgUrl: SampleWhole,
    description:
      '상황설명글자제한50자상황설명글자제한50자상황설명글자제한50자상황설명글자제한50자상황설명글자제한50자',
    optionType: 'B',
  },
];

const exampleGames: GameDetail[] = [
  {
    id: 0,
    description:
      '상황설명글자제한100자상황설명글자제한100자상황설명글자제한100자상황설명글자제한100자상황설명글자제한100자상황설명글자제한100자상황설명글자제한100자상황설명글자제한100자상황설명100자',
    gameOptions: exampleOptions,
    votesCountOfOptionA: 0,
    votesCountOfOptionB: 0,
    myBookmark: false,
    votedOption: 'A',
  },
];

const exampleGameSet: GameSet = {
  member: '닉네임246',
  title:
    '제목은글자제한50자제목은글자제한50자제목은글자제한50자제목은글자제한50자제목은글자제한50자',
  createdAt: '2024-10-24T13:52:50.153Z',
  mainTag: '커플',
  subTag: '연예인',
  gameDetailResponses: exampleGames,
  isEndGameSet: false,
  isEndBookmarked: false,
};

const meta: Meta<typeof BalanceGameSection> = {
  title: 'mobile/organisms/BalanceGameSection',
  component: BalanceGameSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    gameSetId: 0,
    game: exampleGameSet,
    isMyGame: false,
    currentStage: 0,
    setCurrentStage: () => {},
    handleNextGame: () => {},
    handlePrevGame: () => {},
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
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div css={storyContainer}>
      <div css={storyInnerContainer}>
        <BalanceGameSection {...args} />
      </div>
    </div>
  ),
};
