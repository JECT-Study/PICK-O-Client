import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import store from '@/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { Comment } from '@/types/comment';
import CommentItem from '@/components/molecules/CommentItem/CommentItem';
import { ProfileSample } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const exampleComment: Comment = {
  id: 1,
  talkPickId: 1,
  talkPickTitle: '톡픽 제목',
  nickname: '닉네임 4',
  profileImage: ProfileSample,
  content: '피곤하게 산다... 그깟 새우 까주는게 뭐 대수라고!',
  voteOption: 'A',
  likesCount: 35,
  myLike: true,
  replyCount: 0,
  reportedCount: 0,
  createdAt: '2024-09-08T12:23:04.105815',
  lastModifiedAt: '2024-09-08T12:23:04.105815',
  edited: false,
  best: false,
};

const meta: Meta<typeof CommentItem> = {
  title: 'molecules/CommentItem',
  component: CommentItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    comment: exampleComment,
  },
  args: {
    comment: exampleComment,
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ReactQueryProvider>
          <Router>
            <Story />
          </Router>
        </ReactQueryProvider>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <div css={storyContainer}>
      <div css={storyInnerContainer}>
        <h3>타인 댓글</h3>
        <CommentItem {...args} />
        <h3>작성자 댓글</h3>
        <CommentItem {...args} talkPickWriter="닉네임 4" />
      </div>
    </div>
  ),
};
