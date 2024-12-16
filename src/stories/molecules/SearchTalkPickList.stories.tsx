/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchTalkPickListItem } from '@/types/search';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import SearchTalkPickList from '@/components/molecules/SearchTalkPickList/SearchTalkPickList';
import { SampleWhole } from '@/assets';

const searchTalkPickSample: SearchTalkPickListItem[] = Array.from(
  { length: 10 },
  (_, index) => ({
    id: 0,
    title: `톡픽 ${index + 1} - 인기 순위`,
    createdAt: '2024.08.26',
    content:
      '우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하',
    firstImgUrl: SampleWhole,
    keyword: '인기',
  }),
);

const meta = {
  title: 'molecules/SearchTalkPickList',
  component: SearchTalkPickList,
  tags: ['autodocs'],
  argTypes: {
    searchTalkPickList: { control: { type: 'object' } },
  },
  args: {
    searchTalkPickList: searchTalkPickSample,
    keyword: '우하하',
  },
} satisfies Meta<typeof SearchTalkPickList>;

export default meta;
type Story = StoryObj<typeof meta>;

const withReducedSize = (StoryFn: any) => (
  <div style={{ transform: 'scale(0.5)', transformOrigin: 'top left' }}>
    {StoryFn()}
  </div>
);

export const Default: Story = {
  decorators: [withReducedSize],
  args: {
    searchTalkPickList: [
      {
        id: 0,
        title: '월클 정국 VS 존잘 차은우',
        createdAt: '2024.08.26',
        content:
          '우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하우하하',
        firstImgUrl: SampleWhole,
        keyword: '우하하',
      },
    ],
    keyword: '우하하',
  },
};

export const All: Story = {
  decorators: [withReducedSize],
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>Single SearchTalkPickList</h3>
        <SearchTalkPickList
          {...args}
          searchTalkPickList={[args.searchTalkPickList[0]]}
        />
      </li>

      <li css={storyInnerContainer}>
        <h3>Multiple SearchTalkPickList</h3>
        <SearchTalkPickList {...args} />
      </li>

      <li css={storyInnerContainer}>
        <h3>None</h3>
        <SearchTalkPickList {...args} searchTalkPickList={[]} />
      </li>
    </ul>
  ),
};
