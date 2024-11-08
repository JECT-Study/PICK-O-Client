/* eslint-disable no-alert */
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import BalanceGameButton from '@/components/atoms/BalanceGameButton/BalanceGameButton';
import { SampleWhole, PinkGameBg } from '@/assets';
import { storyContainer, storyInnerContainer } from '@/stories/story.styles';

const meta = {
  title: 'atoms/BalanceGameButton',
  component: BalanceGameButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    imgUrl: { control: 'text' },
    name: { control: 'text' },
    optionType: {
      control: { type: 'radio' },
      options: ['A', 'B'],
    },
    description: { control: 'text' },
    selectedButton: {
      control: 'radio',
      options: ['A', 'B', null],
    },
  },
  args: {
    imgUrl: SampleWhole,
    name: '1000억 부자 유병재',
    optionType: 'A',
    description: '어쩌고 저쩌고 저쩌고 어쩌고저쩌고 더미글',
    selectedButton: null,
    randomImage: PinkGameBg,
    onClick: (optionType: 'A' | 'B') => alert(`Clicked ${optionType}`),
  },
} satisfies Meta<typeof BalanceGameButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const All: Story = {
  render: (args) => (
    <ul css={storyContainer}>
      <li css={storyInnerContainer}>
        <h3>Image</h3>
        <BalanceGameButton {...args} />
      </li>
      <li css={storyInnerContainer}>
        <h3>No Image</h3>
        <BalanceGameButton {...args} imgUrl={null} />
      </li>
    </ul>
  ),
};
