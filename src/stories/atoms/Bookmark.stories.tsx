import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Bookmark from '@/components/atoms/Bookmark/Bookmark';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof Bookmark> = {
  title: 'atoms/Bookmark',
  component: Bookmark,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    bookmarked: { control: 'boolean' },
  },
  args: {
    bookmarked: false,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    bookmarked: false,
  },
};

export const All: Story = {
  render: (args) => (
    <div css={storyContainer}>
      <div css={storyInnerContainer}>
        <h3>Default State</h3>
        <Bookmark {...args} bookmarked={false} />

        <h3>Pressed State</h3>
        <Bookmark {...args} bookmarked />
      </div>
    </div>
  ),
};
