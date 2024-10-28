import React from 'react';
import color from '@/styles/color';
import NotificationItem from '@/components/atoms/NotificationItem/NotificationItem';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'atoms/NotificationItem',
  component: NotificationItem,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'gray',
      values: [
        {
          name: 'gray',
          value: color.GY[2],
        },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    category: { control: { type: 'text' } },
    createdAt: { control: { type: 'text' } },
    postTitle: { control: { type: 'text' } },
    message: { control: { type: 'text' } },
    isNew: { control: { type: 'boolean' } },
  },
  args: {
    category: '카테고리',
    createdAt: '24.07.29',
    postTitle: '제목',
    message: '· 알림 내용',
    isNew: false,
  },
} satisfies Meta<typeof NotificationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    category: '카테고리',
    createdAt: '24.07.29',
    postTitle: '제목',
    message: '· 알림 내용',
    isNew: false,
  },
};

export const All: Story = {
  parameters: {
    backgrounds: {
      default: 'gray',
    },
  },
  render: (args) => {
    return (
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>Default Notification</h3>
          <NotificationItem {...args} />
        </li>
        <li css={storyInnerContainer}>
          <h3>New Notification</h3>
          <NotificationItem
            category="톡픽"
            createdAt="24.07.16"
            postTitle="이별 사유 이게 말이 돼?"
            message="· 작성한 댓글이 하트 10개를 달성했어요."
            isNew
          />
        </li>
      </ul>
    );
  },
};
