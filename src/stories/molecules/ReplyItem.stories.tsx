import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import store from '@/store';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { Comment } from '@/types/comment';
import ReplyItem from '@/components/molecules/ReplyItem/ReplyItem';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const exampleReply: Comment = {
  id: 1,
  talkPickId: 1,
  talkPickTitle: '톡픽 제목',
  nickname: '닉네임 4',
  profileImage: '',
  content: '피곤하게 산다... 그깟 새우 까주는게 뭐 대수라고!',
  voteOption: 'A',
  likesCount: 3,
  myLike: false,
  replyCount: 0,
  reportedCount: 0,
  createdAt: '2024-09-08T12:23:04.105815',
  lastModifiedAt: '2024-09-08T12:23:04.105815',
  edited: false,
  best: false,
};

const meta: Meta<typeof ReplyItem> = {
  title: 'molecules/ReplyItem',
  component: ReplyItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    reply: exampleReply,
  },
  args: {
    reply: exampleReply,
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
        <h3>타인 답글</h3>
        <ReplyItem {...args} />
        <h3>작성자 답글</h3>
        <ReplyItem {...args} talkPickWriter="닉네임 4" />
      </div>
    </div>
  ),
};
