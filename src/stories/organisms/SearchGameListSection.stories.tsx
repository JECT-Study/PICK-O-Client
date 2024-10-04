import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchGameListSection from '@/components/organisms/SearchGameListSection/SearchGameListSection';
import { SampleFirst, SampleSecond } from '@/assets';

const meta: Meta<typeof SearchGameListSection> = {
  title: 'organisms/SearchGameListSection',
  component: SearchGameListSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const gameListSample = [
  {
    optionAImg: SampleFirst,
    optionBImg: SampleSecond,
    title: '게임 1 - 유진 VS 민지 사복 고르기',
    mainTag: '취향',
    subTag: '얼마나 맞나 보자',
  },
  {
    optionAImg: SampleFirst,
    optionBImg: SampleSecond,
    title: '게임 2 - 유진 VS 민지 사복 고르기',
    mainTag: '취향',
    subTag: '얼마나 맞나 보자',
  },
];

export const Default: Story = {
  args: {
    gameList: gameListSample,
  },
};

export const All: Story = {
  render: (args) => (
    <>
      <div style={{ marginBottom: '40px' }}>
        <h3>게임 목록이 9개 이상 있는 경우</h3>
        <SearchGameListSection
          {...args}
          gameList={Array.from({ length: 18 }, (_, index) => ({
            optionAImg: SampleFirst,
            optionBImg: SampleSecond,
            title: `게임 ${index + 1} - 유진 VS 민지 사복 고르기`,
            mainTag: '취향',
            subTag: '얼마나 맞나 보자',
          }))}
        />
      </div>
      <div style={{ marginBottom: '40px' }}>
        <h3>게임 목록이 9개 미만인 경우 (2개)</h3>
        <SearchGameListSection
          {...args}
          gameList={[
            {
              optionAImg: SampleFirst,
              optionBImg: SampleSecond,
              title: '게임 1 - 유진 VS 민지 사복 고르기',
              mainTag: '취향',
              subTag: '얼마나 맞나 보자',
            },
            {
              optionAImg: SampleFirst,
              optionBImg: SampleSecond,
              title: '게임 2 - 유진 VS 민지 사복 고르기',
              mainTag: '취향',
              subTag: '얼마나 맞나 보자',
            },
          ]}
        />
      </div>
      <div>
        <h3>게임 목록이 없는 경우</h3>
        <SearchGameListSection {...args} gameList={[]} />
      </div>
    </>
  ),
};
