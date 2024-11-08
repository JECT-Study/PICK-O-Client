import React from 'react';
import Chips from '@/components/atoms/Chips/Chips';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'atoms/Chips',
  component: Chips,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: ['outline', 'roundOutline'],
      control: { type: 'radio' },
    },
    children: { control: { type: 'text' } },
  },
  args: {
    variant: 'outline',
    children: 'CHIP',
  },
} satisfies Meta<typeof Chips>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>Size</h3>
        <Chips>Large</Chips>
      </li>
      <li css={storyContainer}>
        <h3>Variant</h3>
        <Chips>outline</Chips>
        <Chips variant="roundOutline">roundOutline</Chips>
      </li>
    </ul>
  ),
};
