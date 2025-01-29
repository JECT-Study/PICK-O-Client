import React from 'react';
import Divider from '@/components/atoms/Divider/Divider';
import type { Meta, StoryObj } from '@storybook/react';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'atoms/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    orientation: {
      options: ['width', 'height'],
      control: { type: 'radio' },
    },
    tone: {
      options: ['gy', 'wv'],
      control: { type: 'radio' },
    },
    length: { control: { type: 'number' } },
  },
  args: {
    orientation: 'height',
    length: 14,
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    orientation: 'height',
    tone: 'gy',
    length: 14,
  },
};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>Height Divider</h3>
        <Divider {...args} />
        <Divider {...args} tone="wv" />
      </li>
      <li css={storyInnerContainer}>
        <h3>Width Divider</h3>
        <Divider orientation="width" length={522} />
        <Divider orientation="width" length={522} tone="wv" />
      </li>
    </ul>
  ),
};
