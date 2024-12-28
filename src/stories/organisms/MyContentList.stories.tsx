import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import MyContentList from '@/components/organisms/MyContentList/MyContentList';
import { storyContainer } from '@/stories/story.styles';

const meta = {
  title: 'organisms/MyContentList',
  component: MyContentList,
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
        title: '유진 사복 패션 VS 민지 사복 패션',
        commentCount: 172,
        bookmarks: 172,
        showBookmark: true,
        bookmarked: false,
      },
      {
        id: 2,
        editedAt: '2024.08.06',
        title: '유진 사복 패션 VS 민지 사복 패션',
        commentCount: 250,
        bookmarks: 200,
        showBookmark: true,
        bookmarked: true,
      },
      {
        id: 3,
        editedAt: '2024.08.05',
        title: '유진 사복 패션 VS 민지 사복 패션',
        commentCount: 100,
        bookmarks: 50,
        showBookmark: false,
      },
    ],
  },
} satisfies Meta<typeof MyContentList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <MemoryRouter>
      <div css={storyContainer}>
        <MyContentList {...args} />
      </div>
    </MemoryRouter>
  ),
};
