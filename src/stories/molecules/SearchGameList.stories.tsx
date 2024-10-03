import type { Meta, StoryObj } from '@storybook/react';
import SearchGameList from '@/components/molecules/SearchGameList/SearchGameList';
import { SampleFirst, SampleSecond } from '@/assets';

const meta: Meta<typeof SearchGameList> = {
  title: 'molecules/SearchGameList',
  component: SearchGameList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const gameDataSample = {
  id: '',
  optionAImg: SampleFirst,
  optionBImg: SampleSecond,
  title: '유진 VS 민지 사복 고르기',
  mainTag: '취향',
  subTag: '얼마나 맞나 보자',
};

export const Default: Story = {
  args: {
    gameData: Array.from({ length: 9 }, (_, index) => ({
      ...gameDataSample,
      id: `game-${index + 1}`,
      title: `${index + 1}번 - 유진 VS 민지 사복 고르기`,
    })),
  },
};

export const All: Story = {
  args: {
    gameData: Array.from({ length: 9 }, (_, index) => ({
      ...gameDataSample,
      id: `game-${index + 1}`,
      title: `${index + 1}번 - 유진 VS 민지 사복 고르기`,
    })),
  },
};
