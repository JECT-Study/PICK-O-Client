import React from 'react';
import { TalkPickListItem } from '@/types/talk-pick';
import BestTalkPick from '@/components/molecules/BestTalkPick/BestTalkPick';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

const bestTalkPickList: TalkPickListItem[] = [
  {
    id: 5142,
    title: '효과적인 의사소통을 위한 비언어적 신호',
    writer: '닉네임593',
    createdAt: '2024-07-10',
    views: 2000,
    bookmarks: 3000,
  },
  {
    id: 5149,
    title: '세계 최초 3D 프린팅 인간 장기 이식 성공',
    writer: '닉네임593',
    createdAt: '2024-07-10',
    views: 1254,
    bookmarks: 1127,
  },
  {
    id: 4216,
    title: '역대급 인공지능 슈퍼컴퓨터 개발, 과학 기술 혁신 촉진',
    writer: '닉네임593',
    createdAt: '2024-07-10',
    views: 1030,
    bookmarks: 752,
  },
];

const meta = {
  title: 'molecules/BestTalkPick',
  component: BestTalkPick,
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
  args: {
    bestTalkPick: bestTalkPickList,
  },
} satisfies Meta<typeof BestTalkPick>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
