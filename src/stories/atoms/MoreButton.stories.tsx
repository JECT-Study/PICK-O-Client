import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MoreButton from '@/components/atoms/MoreButton/MoreButton';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'atoms/MoreButton',
  component: MoreButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      options: ['plus', 'arrow'],
      control: { type: 'radio' },
    },
  },
  tags: ['autodocs'],
  args: {
    icon: 'plus',
  },
} satisfies Meta<typeof MoreButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>Plus icon</h3>
        <MoreButton {...args} />
      </li>
      <li css={storyInnerContainer}>
        <h3>Arrow icon</h3>
        <MoreButton icon="arrow" />
      </li>
    </ul>
  ),
};
