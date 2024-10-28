import React from 'react';
import { TalkPickListItem } from '@/types/talk-pick';
import TalkPickList from '@/components/molecules/TalkPickList/TalkPickList';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

const exampleTalkPickList: TalkPickListItem[] = [
  {
    id: 5200,
    title: '효과적인 의사소통을 위한 비언어적 신호',
    writer: '닉네임593',
    createdAt: '2024-07-10',
    views: 2000,
    bookmarks: 3000,
  },
  {
    id: 5199,
    title:
      '와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와와',
    writer: '단단무지',
    createdAt: '2024-07-10',
    views: 2000,
    bookmarks: 3000,
  },
  {
    id: 5198,
    title: '혁신적인 스타트업 아이디어: 성공을 위한 핵심 전략',
    writer: '칸데르니아',
    createdAt: '2024-07-10',
    views: 1254,
    bookmarks: 1127,
  },
  {
    id: 5197,
    title: '패션 스타일링:개인 맞춤형 옷차림의 중요성',
    writer: '차투리',
    createdAt: '2024-07-10',
    views: 1030,
    bookmarks: 752,
  },
  {
    id: 5196,
    title: '고효율 작업을 위한 생산성 도구 추천',
    writer: '이선생',
    createdAt: '2024-07-10',
    views: 2000,
    bookmarks: 3000,
  },
  {
    id: 5195,
    title: '자기 계발의 시작:5가지 효과적인 습관',
    writer: '명훈명훈',
    createdAt: '2024-07-10',
    views: 1254,
    bookmarks: 1127,
  },
  {
    id: 5194,
    title: '고효율 작업을 위한 생산성 도구 추천',
    writer: '칸데르니아',
    createdAt: '2024-07-10',
    views: 1030,
    bookmarks: 752,
  },
  {
    id: 5193,
    title: '건강한 아침식사 아이디어:에너지 충전을 위한 메뉴',
    writer: '얏따',
    createdAt: '2024-07-10',
    views: 2000,
    bookmarks: 3000,
  },
  {
    id: 5192,
    title: '건강한 라이프스타일을 위한 스트레스 관리 방법',
    writer: '칸데르니아',
    createdAt: '2024-07-10',
    views: 1254,
    bookmarks: 1127,
  },
  {
    id: 5191,
    title: '현대인을 위한 멘탈 헬스 관리 방법',
    writer: '소풍왔니',
    createdAt: '2024-07-10',
    views: 1030,
    bookmarks: 752,
  },
];

const meta = {
  title: 'molecules/TalkPickList',
  component: TalkPickList,
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
    talkPickList: exampleTalkPickList,
  },
} satisfies Meta<typeof TalkPickList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
