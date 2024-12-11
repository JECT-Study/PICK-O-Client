import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import GameStageLabel from '@/components/mobile/atoms/GameStageLabel/GameStageLabel';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'mobile/atoms/GameStageLabel',
  component: GameStageLabel,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    color: {
      options: ['main', 'default'],
      control: { type: 'radio' },
    },
    stage: {
      control: { type: 'range', min: 0, max: 9 },
    },
  },
  args: {
    stage: 3,
    color: 'default',
  },
} satisfies Meta<typeof GameStageLabel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h1>default</h1>
        <GameStageLabel {...args} color="default" />
        <h1>main</h1>
        <GameStageLabel {...args} color="main" />
      </li>
    </ul>
  ),
};
