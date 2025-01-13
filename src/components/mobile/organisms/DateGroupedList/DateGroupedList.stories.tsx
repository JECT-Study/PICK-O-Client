import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import DateGroupedList from '@/components/mobile/organisms/DateGroupedList/DateGroupedList';
import { ProfileInfoSample } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof DateGroupedList> = {
  title: 'mobile/organisms/DateGroupedList',
  component: DateGroupedList,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    date: {
      control: 'text',
      description: '날짜를 나타냅니다.',
      defaultValue: '2024.08.06',
    },
    items: {
      control: 'object',
      description: '리스트 항목 배열. title과 imgUrl 속성을 포함합니다.',
      defaultValue: [
        { id: 1, title: '제목제목제목제목', imgUrl: ProfileInfoSample },
        { id: 2, title: '제목제목제목제목제목', imgUrl: ProfileInfoSample },
        { id: 3, title: '제목제목제목제목제목제목', imgUrl: ProfileInfoSample },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    date: '2024.08.06',
    items: [
      { id: 1, title: '제목제목제목제목', imgUrl: ProfileInfoSample },
      { id: 2, title: '제목제목제목제목제목', imgUrl: ProfileInfoSample },
      { id: 3, title: '제목제목제목제목제목제목', imgUrl: ProfileInfoSample },
    ],
  },
};

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <DateGroupedList
          date="2024.08.06"
          items={[
            { id: 1, title: '제목 1', imgUrl: ProfileInfoSample },
            { id: 2, title: '제목 2', imgUrl: ProfileInfoSample },
          ]}
        />
        <DateGroupedList
          date="2024.08.07"
          items={[
            { id: 1, title: '다른 제목 1', imgUrl: ProfileInfoSample },
            { id: 2, title: '다른 제목 2', imgUrl: ProfileInfoSample },
            { id: 3, title: '다른 제목 3', imgUrl: ProfileInfoSample },
          ]}
        />
      </li>
    </ul>
  ),
};
