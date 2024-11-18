import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import InfoList from '@/components/organisms/InfoList/InfoList';
import { MemoryRouter } from 'react-router-dom';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'organisms/InfoList',
  component: InfoList,
  argTypes: {
    items: {
      control: { type: 'object' },
    },
  },
  args: {
    items: [
      {
        id: 1,
        editedAt: '2024.08.06',
        title: '매달 아르 음료 500 대기업 VS 주4일 일급 250 칼퇴근 중소',
        prefix: '내 댓글',
        commentContent: '나는 바닥 또 닦고 운동하는게 꿈이라구^^',
        commentCount: 172,
        bookmarks: 172,
      },
      {
        id: 2,
        editedAt: '2024.08.06',
        title: '매일 5달란 양아 VS 매일 용돈 10만원 아빠',
        prefix: '내 댓글',
        commentContent: '양아 고생하시고, 10만원으로 배달음식 먹을게요',
        commentCount: 172,
        bookmarks: 172,
      },
      {
        id: 3,
        editedAt: '2024.08.05',
        title: '매일 술 취한 만취남친 VS 자신에게 취한 자취남친',
        prefix: '내 댓글',
        commentContent: '매일 빈집 털리는중...',
        commentCount: 172,
        bookmarks: 172,
      },
    ],
  },
} satisfies Meta<typeof InfoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <MemoryRouter>
      <InfoList {...args} />
    </MemoryRouter>
  ),
};

export const All: Story = {
  render: (args) => (
    <MemoryRouter>
      <ul css={storyContainer}>
        <li css={storyInnerContainer}>
          <h3>2024.08.06</h3>
          <InfoList
            {...args}
            items={[
              {
                id: 22,
                editedAt: '2024.08.06',
                title:
                  '매달 아르 음료 500 대기업 VS 주4일 일급 250 칼퇴근 중소',
                prefix: '내 댓글',
                commentContent: '나는 바닥 또 닦고 운동하는게 꿈이라구^^',
                commentCount: 172,
                bookmarks: 172,
              },
              {
                id: 27,
                editedAt: '2024.08.06',
                title: '매일 5달란 양아 VS 매일 용돈 10만원 아빠',
                prefix: '내 댓글',
                commentContent: '양아 고생하시고, 10만원으로 배달음식 먹을게요',
                commentCount: 172,
                bookmarks: 172,
              },
            ]}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>2024.08.05</h3>
          <InfoList
            {...args}
            items={[
              {
                id: 29,
                editedAt: '2024.08.05',
                title: '매일 술 취한 만취남친 VS 자신에게 취한 자취남친',
                prefix: '내 댓글',
                commentContent: '매일 빈집 털리는중...',
                commentCount: 172,
                bookmarks: 172,
              },
            ]}
          />
        </li>
        <li css={storyInnerContainer}>
          <h3>2024.08.04</h3>
          <InfoList
            {...args}
            items={[
              {
                id: 33,
                editedAt: '2024.08.04',
                title: '맛잘알 미식가 추석 여친 VS 먹방 BJ 꿈나무 집밥 여친',
                prefix: '내 댓글',
                commentContent: '짭잘한 집밥 진짜 싫다구',
                commentCount: 172,
                bookmarks: 172,
              },
            ]}
          />
        </li>
      </ul>
    </MemoryRouter>
  ),
};
