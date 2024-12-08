import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MobileCreateButton from '@/components/mobile/MobileCreateButton/MobileCreateButton';
import { BrowserRouter } from 'react-router-dom';

const meta: Meta<typeof MobileCreateButton> = {
  title: 'mobile/MobileCreateButton',
  component: MobileCreateButton,
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

export const TalkPick: Story = {
  args: {
    imageType: 'talkpick',
    label: '톡픽',
    onClick: () => console.log('TalkPick button clicked'),
  },
};

export const Game: Story = {
  args: {
    imageType: 'game',
    label: '밸런스 게임',
    onClick: () => console.log('Game button clicked'),
  },
};
