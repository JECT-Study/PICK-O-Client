import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import OptionSelector from '@/components/molecules/OptionSelector/OptionSelector';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof OptionSelector> = {
  title: 'molecules/OptionSelector',
  component: OptionSelector,
  argTypes: {
    options: {
      control: { type: 'object' },
    },
    selectedOption: {
      control: { type: 'radio' },
      options: ['bookmarks', 'votes', 'comments', 'written'],
    },
    onSelect: { action: 'Option 선택됨' },
  },
  args: {
    options: [
      { label: '내가 저장한', value: 'bookmarks' },
      { label: '내가 투표한', value: 'votes' },
      { label: '내가 댓글단', value: 'comments' },
      { label: '내가 작성한', value: 'written' },
    ],
    selectedOption: 'comments',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: [
      { label: '내가 저장한', value: 'bookmarks' },
      { label: '내가 투표한', value: 'votes' },
      { label: '내가 댓글단', value: 'comments' },
      { label: '내가 작성한', value: 'written' },
    ],
    selectedOption: 'comments',
  },
};

export const All: Story = {
  args: {
    options: [
      { label: '내가 저장한', value: 'bookmarks' },
      { label: '내가 투표한', value: 'votes' },
      { label: '내가 댓글단', value: 'comments' },
      { label: '내가 작성한', value: 'written' },
    ],
  },
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>내가 저장한 Tab</h3>
        <OptionSelector {...args} selectedOption="bookmarks" />
      </li>
      <li css={storyInnerContainer}>
        <h3>내가 투표한 Tab</h3>
        <OptionSelector {...args} selectedOption="votes" />
      </li>
      <li css={storyInnerContainer}>
        <h3>내가 댓글단 Tab</h3>
        <OptionSelector {...args} selectedOption="comments" />
      </li>
      <li css={storyInnerContainer}>
        <h3>내가 작성한 Tab</h3>
        <OptionSelector {...args} selectedOption="written" />
      </li>
    </ul>
  ),
};
