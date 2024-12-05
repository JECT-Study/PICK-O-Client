import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SearchGameListSection from '@/components/organisms/SearchGameListSection/SearchGameListSection';
import { SampleFirst, SampleSecond } from '@/assets';
import { MemoryRouter } from 'react-router-dom';

const meta: Meta<typeof SearchGameListSection> = {
  title: 'organisms/SearchGameListSection',
  component: SearchGameListSection,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onPageChange: { action: '페이지 변경' },
    onSortChange: { action: '정렬 변경' },
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

const gameListSample = Array.from({ length: 18 }, (_, index) => ({
  id: index + 1,
  title: `게임 ${index + 1} - 유진 VS 민지 사복 고르기`,
  mainTag: '취향',
  subTag: '얼마나 맞나 보자',
  images: [SampleFirst, SampleSecond],
}));

export const Default: Story = {
  args: {
    gameList: gameListSample.slice(0, 9),
    keyword: '예시 키워드',
    selectedPage: 1,
    totalPages: 2,
    sort: { fileId: 'views', order: 'desc' },
    isLoading: false,
  },
};
