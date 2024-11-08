import React from 'react';
import { ProfileSample } from '@/assets';
import { ToggleGroupItem } from '@/components/atoms/ToggleGroup/ToggleGroup';
import type { Meta, StoryObj } from '@storybook/react';
import store from '@/store';
import { Provider } from 'react-redux';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { Comment, CommentsPagination } from '@/types/comment';
import CommentsSection from '@/components/organisms/CommentsSection/CommentsSection';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const exampleCommentList: Comment[] = Array.from({ length: 7 }, (_, index) => ({
  id: index,
  talkPickId: 1,
  talkPickTitle: '톡픽 제목',
  nickname: '닉네임 4',
  profileImage: ProfileSample,
  content: '피곤하게 산다... 그깟 새우 까주는게 뭐 대수라고!',
  voteOption: 'A',
  likesCount: 35,
  myLike: false,
  parentId: 4,
  replyCount: 0,
  reportedCount: 0,
  createdAt: '2024-09-08T12:23:04.105815',
  lastModifiedAt: '2024-09-08T12:23:04.105815',
  edited: false,
  best: false,
}));

const exampleCommentPagination: CommentsPagination = {
  totalPages: Math.ceil(exampleCommentList.length / 20),
  totalElements: exampleCommentList.length,
  size: 7,
  content: exampleCommentList,
  number: 0,
  sort: {
    empty: false,
    sorted: true,
    unsorted: false,
  },
  numberOfElements:
    exampleCommentList.length > 7 ? 7 : exampleCommentList.length,
  pageable: {
    offset: 0,
    sort: {
      empty: false,
      sorted: true,
      unsorted: false,
    },
    pageNumber: 0,
    pageSize: 20,
    paged: true,
    unpaged: false,
  },
  first: true,
  last: false,
  empty: exampleCommentList.length === 0,
};

const toggleItem: ToggleGroupItem[] = [
  {
    label: '인기순',
    value: 'trend',
  },
  {
    label: '최신순',
    value: 'recent',
  },
];

const meta: Meta<typeof CommentsSection> = {
  title: 'organisms/CommentsSection',
  component: CommentsSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    commentList: exampleCommentPagination,
    voted: true,
    toggleItem,
    selectedValue: 'trend',
    setToggleValue: () => {},
  },
  argTypes: {
    voted: {
      control: {
        type: 'boolean',
      },
      description: '투표 여부에 따라서 블러 처리가 됩니다.',
      defaultValue: true,
    },
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <ReactQueryProvider>
          <Story />
        </ReactQueryProvider>
      </Provider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    voted: true,
  },
  render: (args) => (
    <div css={storyContainer}>
      <div css={storyInnerContainer}>
        <CommentsSection {...args} />
      </div>
    </div>
  ),
};

export const All: Story = {
  args: {
    voted: false,
  },
  render: (args) => (
    <div css={storyContainer}>
      <div css={storyInnerContainer}>
        <CommentsSection {...args} />
      </div>
    </div>
  ),
};
