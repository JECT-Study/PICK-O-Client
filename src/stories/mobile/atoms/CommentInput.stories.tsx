import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';
import CommentInput from '@/components/mobile/atoms/CommentInput/CommentInput';

const meta: Meta<typeof CommentInput> = {
  title: 'mobile/atoms/CommentInput',
  component: CommentInput,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onCommentChange: { action: 'onCommentChange' },
    onCommentSubmit: { action: 'onCommentSubmit' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <CommentInput
          comment=""
          onCommentChange={() => {}}
          onCommentSubmit={() => {}}
          isEditing={false}
        />
        <CommentInput
          comment="안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕"
          onCommentChange={() => {}}
          onCommentSubmit={() => {}}
          isEditing={false}
        />
        <CommentInput
          comment={'아'.repeat(501)}
          onCommentChange={() => {}}
          onCommentSubmit={() => {}}
          isEditing={false}
        />
      </li>
    </ul>
  ),
};
