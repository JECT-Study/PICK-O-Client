import React from 'react';
import { TalkPickListItem } from '@/types/talk-pick';
import TalkPickItem from '@/components/atoms/TalkPickItem/TalkPickItem';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import { MemoryRouter } from 'react-router-dom';

const defaultTalkPick: TalkPickListItem = {
  id: 5197,
  title: '혁신적인 스타트업 아이디어:성공을 위한 핵심 전략',
  writer: '칸데르니아',
  createdAt: '2024-07-10',
  views: 395,
  bookmarks: 1182,
};

const bestTalkPick: TalkPickListItem = {
  id: 5142,
  title: '효과적인 의사소통을 위한 비언어적 신호',
  writer: '닉네임593',
  createdAt: '2024-07-10',
  views: 2000,
  bookmarks: 3000,
};

const meta = {
  title: 'atoms/TalkPickItem',
  component: TalkPickItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      options: ['header', 'default', 'best'],
      control: { type: 'radio' },
    },
  },
  args: {
    type: 'header',
    rank: 1,
  },
} satisfies Meta<typeof TalkPickItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>Header </h3>
        <TalkPickItem {...args} />
        <h3>Default</h3>
        <TalkPickItem type="default" talkPickItem={defaultTalkPick} />
        <h3>Best</h3>
        <TalkPickItem type="best" rank={1} talkPickItem={bestTalkPick} />
      </li>
    </ul>
  ),
};
