import React from 'react';
import CategoryBarChip from '@/components/atoms/CategoryBarChip/CategoryBarChip';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'atoms/CategoryBarChip',
  component: CategoryBarChip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['large', 'small'],
      control: { type: 'radio' },
    },
    children: { control: { type: 'text' } },
  },
  args: {
    size: 'large',
    children: 'CategoryBarChip',
  },
} satisfies Meta<typeof CategoryBarChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: 'large',
  },
};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h1>Size</h1>
        <CategoryBarChip {...args}>Large</CategoryBarChip>
        <CategoryBarChip size="small">Small</CategoryBarChip>
      </li>
    </ul>
  ),
};
