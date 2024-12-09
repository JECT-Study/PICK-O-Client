import React from 'react';
import MyContentBox from '@/components/molecules/MyContentBox/MyContentBox';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof MyContentBox> = {
  title: 'molecules/MyContentBox',
  component: MyContentBox,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    title: { control: { type: 'text' } },
    commentCount: { control: { type: 'number' } },
    bookmarks: { control: { type: 'number' } },
    showBookmark: { control: { type: 'boolean' } },
    bookmarked: { control: { type: 'boolean' } },
    onClick: { action: '클릭 이벤트 발생' },
  },
  args: {
    title: '내가 작성한 게시글',
    commentCount: 172,
    bookmarks: 85,
    showBookmark: true,
    bookmarked: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '내가 작성한 게시글',
    commentCount: 172,
    bookmarks: 85,
    showBookmark: true,
    bookmarked: false,
  },
};

export const All: Story = {
  render: (args) => (
    <div css={storyContainer}>
      <div css={storyInnerContainer}>
        <MyContentBox
          {...args}
          title="내가 작성한 게시글 1"
          commentCount={172}
          bookmarks={85}
          showBookmark
          bookmarked
        />
      </div>
      <div css={storyInnerContainer}>
        <MyContentBox
          {...args}
          title="내가 작성한 게시글 2"
          commentCount={256}
          bookmarks={90}
          showBookmark
          bookmarked={false}
        />
      </div>
      <div css={storyInnerContainer}>
        <MyContentBox
          {...args}
          title="내가 작성한 게시글 3"
          commentCount={151}
          bookmarks={60}
          showBookmark={false}
        />
      </div>
    </div>
  ),
};
