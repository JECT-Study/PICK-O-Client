/* eslint-disable no-console */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FloatingButton from '@/components/mobile/atoms/FloatingButton/FloatingButton';
import { BrowserRouter } from 'react-router-dom';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta: Meta<typeof FloatingButton> = {
  title: 'mobile/atoms/FloatingButton',
  component: FloatingButton,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {
  render: () => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>톡픽</h3>
        <FloatingButton
          imageType="talkpick"
          label="톡픽"
          onClick={() => console.log('TalkPick button clicked')}
        />
      </li>
      <li css={storyInnerContainer}>
        <h3>밸런스 게임</h3>
        <FloatingButton
          imageType="game"
          label="밸런스 게임"
          onClick={() => console.log('Game button clicked')}
        />
      </li>
    </ul>
  ),
};
