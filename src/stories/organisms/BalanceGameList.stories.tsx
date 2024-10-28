/* eslint-disable no-console */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BalanceGameList from '@/components/organisms/BalanceGameList/BalanceGameList';
import { SampleFirst, SampleSecond } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof BalanceGameList> = {
  title: 'organisms/BalanceGameList',
  component: BalanceGameList,
  argTypes: {
    contents: {
      control: 'object',
    },
    selectedValue: {
      control: 'select',
      options: ['trend', 'recent'],
    },
    activeTab: {
      control: 'select',
      options: ['인기', '커플', '취향', '월드컵'],
    },
  },
  args: {
    contents: [
      {
        images: [SampleFirst, SampleSecond],
        id: 1,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: true,
      },
      {
        images: [SampleFirst, SampleSecond],
        id: 2,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
      },
    ],
    selectedValue: 'trend',
    activeTab: '인기',
    setSelectedValue: (value) => console.log('setSelectedValue:', value),
    setActiveTab: (value) => console.log('setActiveTab:', value),
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    contents: [
      {
        images: [SampleFirst, SampleSecond],
        id: 1,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: true,
      },
      {
        images: [SampleFirst, SampleSecond],
        id: 2,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
      },
    ],
    selectedValue: 'trend',
    activeTab: '인기',
    setSelectedValue: (value) => console.log('setSelectedValue:', value),
    setActiveTab: (value) => console.log('setActiveTab:', value),
  },
};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>하나의 항목</h3>
        <BalanceGameList
          contents={[args.contents[0]]}
          selectedValue={args.selectedValue}
          setSelectedValue={(value) => console.log('setSelectedValue:', value)}
          activeTab={args.activeTab}
          setActiveTab={(value) => console.log('setActiveTab:', value)}
        />
      </li>

      <li css={storyInnerContainer}>
        <h3>다수의 항목</h3>
        <BalanceGameList
          {...args}
          setSelectedValue={(value) => console.log('setSelectedValue:', value)}
          setActiveTab={(value) => console.log('setActiveTab:', value)}
        />
      </li>

      <li css={storyInnerContainer}>
        <h3>내용 없음</h3>
        <BalanceGameList
          contents={[]}
          selectedValue={args.selectedValue}
          setSelectedValue={(value) => console.log('setSelectedValue:', value)}
          activeTab={args.activeTab}
          setActiveTab={(value) => console.log('setActiveTab:', value)}
        />
      </li>
    </ul>
  ),
  args: {
    contents: [
      {
        images: [SampleFirst, SampleSecond],
        id: 1,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: true,
      },
      {
        images: [SampleFirst, SampleSecond],
        id: 2,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
      },
      {
        images: [SampleFirst, SampleSecond],
        id: 3,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
      },
      {
        images: [SampleFirst, SampleSecond],
        id: 4,
        title: '만원 지하철 1시간 등교 VS 좌석 널널한 버스 2시간 등교',
        mainTag: '인기',
        subTag: '화제의 중심',
        bookmarkState: false,
      },
    ],
    selectedValue: 'trend',
    activeTab: '인기',
    setSelectedValue: (value) => console.log('setSelectedValue:', value),
    setActiveTab: (value) => console.log('setActiveTab:', value),
  },
};
