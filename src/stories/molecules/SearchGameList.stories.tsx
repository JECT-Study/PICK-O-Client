import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchGameList from '@/components/molecules/SearchGameList/SearchGameList';
import { SampleFirst, SampleSecond } from '@/assets';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof SearchGameList> = {
  title: 'molecules/SearchGameList',
  component: SearchGameList,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const gameListSample = {
  optionAImg: SampleFirst,
  optionBImg: SampleSecond,
  title: '유진 VS 민지 사복 고르기',
  mainTag: '취향',
  subTag: '얼마나 맞나 보자',
};

export const Default: Story = {
  render: (args) => (
    <MemoryRouter>
      <SearchGameList
        {...args}
        gameList={Array.from({ length: 9 }, (_, index) => ({
          ...gameListSample,
          id: index + 1,
          title: `${index + 1}번 - 유진 VS 민지 사복 고르기`,
        }))}
        keyword="사복"
      />
    </MemoryRouter>
  ),
};

export const All: Story = {
  render: (args) => (
    <MemoryRouter>
      <SearchGameList
        {...args}
        gameList={[
          {
            ...gameListSample,
            id: 1,
            title: '유진 VS 민지 사복 고르기',
          },
          {
            ...gameListSample,
            id: 2,
            title: '직장인 VS 대학생 출근룩',
          },
          {
            ...gameListSample,
            id: 3,
            title: '봄 VS 가을 패션 선택',
          },
        ]}
        keyword="패션"
      />
    </MemoryRouter>
  ),
};
