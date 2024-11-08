import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import BalanceGameList from '@/components/organisms/BalanceGameList/BalanceGameList';
import { SampleFirst, SampleSecond } from '@/assets';

const meta: Meta<typeof BalanceGameList> = {
  title: 'organisms/BalanceGameList',
  component: BalanceGameList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    contents: {
      control: { type: 'object' },
    },
  },
  args: {
    contents: [
      {
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        id: 1,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: true,
        optionA: '만원 지하철 1시간 등교',
        optionB: '좌석 널널한 버스 2시간 등교',
      },
      {
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        id: 2,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
        optionA: '만원 지하철 1시간 등교',
        optionB: '좌석 널널한 버스 2시간 등교',
      },
      {
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        id: 3,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
        optionA: '만원 지하철 1시간 등교',
        optionB: '좌석 널널한 버스 2시간 등교',
      },
      {
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        id: 4,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
        optionA: '만원 지하철 1시간 등교',
        optionB: '좌석 널널한 버스 2시간 등교',
      },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    contents: [
      {
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        id: 1,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
        optionA: '만원 지하철 1시간 등교',
        optionB: '좌석 널널한 버스 2시간 등교',
      },
      {
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        id: 2,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
        optionA: '만원 지하철 1시간 등교',
        optionB: '좌석 널널한 버스 2시간 등교',
      },
      {
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        id: 3,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
        optionA: '만원 지하철 1시간 등교',
        optionB: '좌석 널널한 버스 2시간 등교',
      },
      {
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        id: 4,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
        optionA: '만원 지하철 1시간 등교',
        optionB: '좌석 널널한 버스 2시간 등교',
      },
    ],
  },
};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>하나의 항목</h3>
        <BalanceGameList contents={[args.contents[0]]} />
      </li>

      <li css={storyInnerContainer}>
        <h3>다수의 항목</h3>
        <BalanceGameList {...args} />
      </li>

      <li css={storyInnerContainer}>
        <h3>내용 없음</h3>
        <BalanceGameList contents={[]} />
      </li>
    </ul>
  ),
  args: {
    contents: [
      {
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        id: 1,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
        optionA: '만원 지하철 1시간 등교',
        optionB: '좌석 널널한 버스 2시간 등교',
      },
      {
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        id: 2,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
        optionA: '만원 지하철 1시간 등교',
        optionB: '좌석 널널한 버스 2시간 등교',
      },
      {
        optionAImg: SampleFirst,
        optionBImg: SampleSecond,
        id: 3,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
        optionA: '만원 지하철 1시간 등교',
        optionB: '좌석 널널한 버스 2시간 등교',
      },
    ],
  },
};
