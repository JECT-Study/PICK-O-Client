import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import ActionBox from '@/components/molecules/ActionBox/ActionBox';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'molecules/ActionBox',
  component: ActionBox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <BrowserRouter>
        <Story />
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof ActionBox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: () => (
    <div css={storyContainer}>
      <div css={storyInnerContainer}>
        <h3>활동 내역, 회원정보 수정, 회원탈퇴 버튼</h3>
        <ActionBox />
      </div>
    </div>
  ),
};
