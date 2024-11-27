import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchGameResult from '@/components/organisms/SearchGameResult/SearchGameResult';
import { BrowserRouter } from 'react-router-dom';
import { SampleFirst, SampleSecond } from '@/assets';

const meta: Meta<typeof SearchGameResult> = {
  title: 'organisms/SearchGameResult',
  component: SearchGameResult,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const createGameList = (length: number) =>
  Array.from({ length }, (_, index) => ({
    optionAImg: SampleFirst,
    optionBImg: SampleSecond,
    title: `게임 ${index + 1} - 유진 VS 민지 사복 고르기`,
    mainTag: '취향',
    subTag: '얼마나 맞나 보자',
  }));

const gameListSample = createGameList(9);

export const Default: Story = {
  args: {
    gameList: gameListSample,
    keyword: '유진',
    isLoading: false,
  },
};

export const All: Story = {
  render: (args) => (
    <>
      <div style={{ marginBottom: '40px' }}>
        <h3>게임 목록이 9개 미만인 경우 (5개)</h3>
        <SearchGameResult
          {...args}
          gameList={createGameList(5)}
          keyword="유진"
        />
      </div>
      <div>
        <h3>게임 목록이 9개인 경우</h3>
        <SearchGameResult {...args} gameList={gameListSample} keyword="유진" />
      </div>
    </>
  ),
};
