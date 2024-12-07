import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import TempGameButton from '@/components/mobile/atoms/TempGameButton/TempGameButton';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'mobile/atoms/TempGameButton',
  component: TempGameButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    action: {
      options: ['save', 'get'],
      control: { type: 'radio' },
    },
  },
  args: {
    action: 'save',
  },
} satisfies Meta<typeof TempGameButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h1>임시저장하기</h1>
        <TempGameButton {...args} />
        <h1>임시저장 불러오기</h1>
        <TempGameButton action="get" />
      </li>
    </ul>
  ),
};
